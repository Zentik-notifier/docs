---
sidebar_position: 4
---

# Retention Policy - Data Retention Management

This section describes how Zentik manages automatic data retention, including configurable policies and cleanup cron jobs.

## Overview

Zentik implements an automatic data retention management system for:

- **Storage optimization**: Automatically remove data no longer needed
- **Privacy compliance**: Implement configurable data retention policies
- **Performance maintenance**: Avoid accumulation of obsolete data in the database
- **Compliance**: Adhere to enterprise data retention policies

## Message Retention Policies

### Deletion Criteria

Messages are automatically deleted when they meet **AT LEAST ONE** of the following criteria:

1. **All notifications delivered**: All devices have received the notification
2. **Maximum age exceeded**: Message is older than the configured limit
3. **Orphan message**: No associated notifications (edge case)

### Configuration

```env
# Enable/disable cleanup job (default: true)
MESSAGES_DELETE_JOB_ENABLED=true

# Maximum age of messages before deletion
# Supported formats: number (seconds), Xs, Xm, Xh, Xd
MESSAGES_MAX_AGE=30d

# Cron job schedule (cron format)
# Default: every hour (0 0 * * * *)
MESSAGES_DELETE_CRON_JOB=0 0 * * * *
```

### Cleanup Logic

```typescript
// Pseudo-code of deletion logic
for (const message of messages) {
  const isExpired = maxAgeMs && (now - message.createdAt) >= maxAgeMs;
  
  if (isExpired) {
    // Delete for age
    deleteMessage(message.id);
    continue;
  }
  
  const notifications = getNotificationsForMessage(message.id);
  
  if (notifications.length === 0) {
    // Delete orphan message
    deleteMessage(message.id);
    continue;
  }
  
  const allReceived = notifications.every(n => 
    n.receivedAt && n.userDeviceId
  );
  
  if (allReceived) {
    // Delete completely delivered message
    deleteMessage(message.id);
  }
}
```

## Attachment Retention Policies

### Deletion Criteria

Attachments are automatically deleted when:

1. **Maximum age exceeded**: Attachment is older than the configured limit
2. **File no longer referenced**: No message uses it anymore

**Note**: Icons (`MediaType.ICON`) are **excluded** from automatic cleanup to preserve bucket and notification icons permanently.

### Configuration

```env
# Enable/disable attachment cleanup job
ATTACHMENTS_DELETE_JOB_ENABLED=true

# Maximum age of attachments before deletion
# Supported formats: number (seconds), Xs, Xm, Xh, Xd
ATTACHMENTS_MAX_AGE=30d

# Cron job schedule (cron format)
# Default: every hour (0 0 * * * *)
ATTACHMENTS_DELETE_CRON_JOB=0 0 * * * *
```

### Attachment Cleanup Process

1. **Scanning**: Identifies attachments older than `ATTACHMENTS_MAX_AGE` (excluding icons)
2. **Physical deletion**: Removes files from filesystem
3. **Database cleanup**: Deletes records from database
4. **Logging**: Records number of deleted attachments

### Icon Preservation

Icons are permanently preserved and never deleted by the cleanup process:

```typescript
// Attachment cleanup logic
const oldAttachments = await this.attachmentsRepository.find({
  where: { 
    createdAt: LessThan(cutoff),
    mediaType: Not(MediaType.ICON) // Icons are excluded
  },
});
```

This ensures that:
- **Bucket icons** remain available for UI display
- **Notification icons** are preserved for historical notifications
- **Custom icons** uploaded by users are never lost

## Cleanup Cron Jobs

### Integrated Scheduler

Zentik uses `@nestjs/schedule` to manage automatic cron jobs:

```typescript
// MessagesCleanupScheduler
@Injectable()
export class MessagesCleanupScheduler implements OnModuleInit {
  onModuleInit() {
    const cronExpr = this.configService.get<string>('MESSAGES_DELETE_CRON_JOB') || '0 0 * * * *';
    const job = new CronJob(cronExpr, () => this.handleCleanup());
    this.schedulerRegistry.addCronJob('messagesCleanup', job);
    job.start();
  }
}
```

### Default Schedules

| Cron Expression | Description | Usage |
|-----------------|-------------|-------|
| `0 0 * * * *` | Every hour | **Default** for both jobs |
| `0 0 2 * * *` | Every day at 2:00 AM | Production (low activity) |
| `0 */6 * * * *` | Every 6 hours | Performance/update balance |
| `0 0 0 * * 0` | Every Sunday at midnight | Weekly cleanup |

### Schedule Customization

```env
# Cleanup every 6 hours
MESSAGES_DELETE_CRON_JOB=0 0 */6 * * *
ATTACHMENTS_DELETE_CRON_JOB=0 0 */6 * * *

# Cleanup every day at 3:00 AM
MESSAGES_DELETE_CRON_JOB=0 0 3 * * *
ATTACHMENTS_DELETE_CRON_JOB=0 0 3 * * *

# Cleanup every 30 minutes (testing only)
MESSAGES_DELETE_CRON_JOB=0 */30 * * * *
ATTACHMENTS_DELETE_CRON_JOB=0 */30 * * * *
```

## Session and Token Management

### Expired Session Cleanup

Expired JWT sessions are automatically cleaned up:

```typescript
// SessionService
async cleanupExpiredSessions(): Promise<void> {
  await this.sessionRepository.update(
    {
      isActive: true,
      expiresAt: LessThan(new Date()),
    },
    { isActive: false },
  );
}
```

### Expired Permission Cleanup

Entity permissions with expired `expiresAt` are deleted:

```typescript
// EntityPermissionService
async cleanupExpiredPermissions(): Promise<number> {
  const result = await this.entityPermissionRepository.delete({
    expiresAt: LessThan(new Date()),
  });
  return result.affected || 0;
}
```

## Mobile Cache and Retention

### Local Media Cache

The mobile app implements retention policies for local cache:

```typescript
// MediaCacheService
private async cleanup(): Promise<void> {
  const retentionPolicies = await userSettings.getMediaCacheRetentionPolicies();
  const maxCacheSizeMB = retentionPolicies.maxCacheSizeMB;
  const maxCacheAge = retentionPolicies.maxCageAgeDays;
  
  // Delete expired files
  for (const [key, item] of Object.entries(this.metadata)) {
    const isExpired = maxCacheAge && (Date.now() - item.timestamp) > maxCacheAge;
    if (isExpired) {
      await this.deleteItem(key);
    }
  }
  
  // Handle cache size limit
  if (maxCacheSize && totalSize > maxCacheSize) {
    // Delete oldest files until 80% of limit
  }
}
```

### User Cache Configuration

```typescript
interface MediaCacheRetentionPolicies {
  maxCacheSizeMB?: number;      // Maximum cache size in MB
  maxCageAgeDays?: number;      // Maximum file age in days
}
```

## Monitoring and Logging

### Cleanup Logs

Each cleanup job logs detailed information:

```typescript
// Example logs
this.logger.log('Cron started: delete fully-read messages');
this.logger.log(`Scanning messages for cleanup (all notifications received or older than ${maxAgeMs}ms)`);
this.logger.log(`Deleting ${deletableMessageIds.length} fully-received message(s)`);
this.logger.log(`Deleted ${deleted} message(s)`);
```

### Available Metrics

- **Deleted messages**: Count for each execution
- **Deleted attachments**: Count for each execution
- **Execution time**: Job performance
- **Errors**: Any issues during cleanup

## Production Configuration

### Recommendations

```env
# Production - Night cleanup
MESSAGES_DELETE_CRON_JOB=0 0 2 * * *
ATTACHMENTS_DELETE_CRON_JOB=0 0 3 * * *

# Conservative retention
MESSAGES_MAX_AGE=90d
ATTACHMENTS_MAX_AGE=60d

# Enable all jobs
MESSAGES_DELETE_JOB_ENABLED=true
ATTACHMENTS_DELETE_JOB_ENABLED=true
```

### Development Environment

```env
# Development - Frequent cleanup
MESSAGES_DELETE_CRON_JOB=0 */15 * * * *
ATTACHMENTS_DELETE_CRON_JOB=0 */15 * * * *

# Short retention for testing
MESSAGES_MAX_AGE=1d
ATTACHMENTS_MAX_AGE=1d
```

## Cleanup Disabling

### Complete Disabling

```env
# Disable all cleanup jobs
MESSAGES_DELETE_JOB_ENABLED=false
ATTACHMENTS_DELETE_JOB_ENABLED=false
```

### Selective Disabling

```env
# Keep only message cleanup
MESSAGES_DELETE_JOB_ENABLED=true
ATTACHMENTS_DELETE_JOB_ENABLED=false

# Keep only attachment cleanup
MESSAGES_DELETE_JOB_ENABLED=false
ATTACHMENTS_DELETE_JOB_ENABLED=true
```

## Troubleshooting

### Common Issues

1. **Jobs not executed**: Verify `*_DELETE_JOB_ENABLED=true`
2. **Invalid cron**: Check cron expression format
3. **File permissions**: Verify filesystem access for attachments
4. **Database locks**: Check long transactions blocking cleanup

### Debug and Monitoring

```bash
# Check cleanup logs
tail -f logs/zentik.log | grep -E "(cleanup|delete|Cron)"

# Check active jobs
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/health

# Verify configuration
grep -E "(DELETE_JOB|MAX_AGE|CRON_JOB)" .env
```

### Performance Metrics

- **Average cleanup time**: Target < 30 seconds
- **Execution frequency**: Respect configured schedule
- **Storage usage**: Monitor disk space growth/decline
- **Database performance**: Verify cleanup queries are non-blocking
