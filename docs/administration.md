---
sidebar_position: 6
---

# Administration - System Management

This section covers administrative functions and system-level configurations for Zentik, including System Access Tokens, user management, and system monitoring.

## System Access Tokens

System Access Tokens allow server-to-server authentication without user credentials. These tokens are typically used for:

- **External integrations** with third-party services
- **Automated scripts** and cron jobs
- **System-to-system communication**
- **Monitoring and health checks**

### Creating System Access Tokens

#### Via REST API (Admin Only)
```bash
POST /system-access-tokens
Authorization: Bearer <jwt-admin-token>
Content-Type: application/json

{
  "maxCalls": 1000,
  "expiresAt": "2024-12-31T23:59:59Z",
  "description": "Token for external integration",
  "requesterId": "user-uuid"
}
```

**Parameters:**
- `maxCalls`: Maximum number of API calls allowed (0 = unlimited)
- `expiresAt`: Expiration date (optional)
- `description`: Human-readable description of the token's purpose
- `requesterId`: ID of the user requesting the token (optional)

**Response:**
```json
{
  "id": "token-uuid",
  "rawToken": "abc123def456...",
  "maxCalls": 1000,
  "calls": 0,
  "expiresAt": "2024-12-31T23:59:59Z",
  "requesterId": "user-uuid",
  "description": "Token for external integration",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Via GraphQL (Admin Only)
```graphql
mutation CreateSystemToken(
  $maxCalls: Float!, 
  $expiresAt: String, 
  $requesterId: String, 
  $description: String
) {
  createSystemToken(
    maxCalls: $maxCalls
    expiresAt: $expiresAt
    requesterId: $requesterId
    description: $description
  ) {
    id
    rawToken
    maxCalls
    calls
    expiresAt
    requesterId
    description
    createdAt
  }
}
```

**Variables:**
```json
{
  "maxCalls": 1000,
  "expiresAt": "2024-12-31T23:59:59Z",
  "requesterId": "user-uuid",
  "description": "Token for external integration"
}
```

### Using System Access Tokens

#### Authentication Header
```bash
Authorization: Bearer sat_<raw-token>
```

**Format**: `sat_` followed by the raw token (24 hexadecimal characters)

#### Example Usage
```bash
# Health check
curl -H "Authorization: Bearer sat_abc123def456..." \
  http://localhost:3000/api/health

# Create notification
curl -X POST http://localhost:3000/api/messages \
  -H "Authorization: Bearer sat_abc123def456..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "System Alert",
    "body": "Server maintenance completed",
    "bucketId": "system-bucket-uuid",
    "deliveryType": "NORMAL"
  }'
```

### Managing System Access Tokens

#### List All Tokens
```bash
GET /system-access-tokens
Authorization: Bearer <jwt-admin-token>
```

#### Revoke Token
```bash
DELETE /system-access-tokens/{token-id}
Authorization: Bearer <jwt-admin-token>
```

#### GraphQL Operations
```graphql
# List all tokens
query GetSystemAccessTokens {
  listSystemTokens {
    id
    maxCalls
    calls
    expiresAt
    requesterId
    description
    createdAt
  }
}

# Revoke token
mutation RevokeSystemToken($id: String!) {
  revokeSystemToken(id: $id)
}
```

## User Management

### User Roles and Permissions

Zentik supports different user roles with varying levels of access:

- **Regular User**: Basic notification and bucket management
- **Admin**: Full system access, user management, system tokens
- **System**: Automated processes and integrations

### User Administration

#### List Users
```bash
GET /users
Authorization: Bearer <jwt-admin-token>
```

#### Update User Role
```bash
PATCH /users/{user-id}
Authorization: Bearer <jwt-admin-token>
Content-Type: application/json

{
  "role": "admin"
}
```

#### Delete User
```bash
DELETE /users/{user-id}
Authorization: Bearer <jwt-admin-token>
```

### Entity Permissions

Manage access to specific resources (buckets, notifications, etc.):

#### Grant Permissions
```bash
POST /entity-permissions
Authorization: Bearer <jwt-admin-token>
Content-Type: application/json

{
  "resourceType": "BUCKET",
  "resourceId": "bucket-uuid",
  "userEmail": "user@example.com",
  "permissions": ["READ", "WRITE"],
  "expiresAt": "2024-12-31T23:59:59Z"
}
```

#### Revoke Permissions
```bash
POST /entity-permissions/revoke
Authorization: Bearer <jwt-admin-token>
Content-Type: application/json

{
  "resourceType": "BUCKET",
  "resourceId": "bucket-uuid",
  "userEmail": "user@example.com"
}
```

## System Monitoring

### Health Checks

#### Basic Health Check
```bash
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00Z",
  "version": "1.0.0"
}
```

#### Detailed Health Check
```bash
GET /health/detailed
Authorization: Bearer <jwt-admin-token>
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00Z",
  "version": "1.0.0",
  "database": {
    "status": "connected",
    "responseTime": "2ms"
  },
  "storage": {
    "status": "available",
    "freeSpace": "10GB"
  },
  "services": {
    "pushNotifications": "operational",
    "emailService": "operational"
  }
}
```

### System Metrics

#### Performance Metrics
```bash
GET /admin/metrics
Authorization: Bearer <jwt-admin-token>
```

**Available Metrics:**
- API request count and response times
- Database query performance
- Storage usage statistics
- Push notification delivery rates
- Error rates and types

#### Logs and Debugging
```bash
GET /admin/logs?level=error&limit=100
Authorization: Bearer <jwt-admin-token>
```

## Configuration Management

### Environment Variables

#### Critical Settings
```env
# Database
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=zentik_user
DB_PASSWORD=secure_password
DB_NAME=zentik

# Security
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=1d
JWT_REFRESH_SECRET=your-super-secret-refresh-key

# Rate Limiting
RATE_LIMIT_TTL_MS=60000
RATE_LIMIT_LIMIT=100
RATE_LIMIT_BLOCK_MS=300000

# Cleanup Jobs
MESSAGES_DELETE_JOB_ENABLED=true
ATTACHMENTS_DELETE_JOB_ENABLED=true
MESSAGES_MAX_AGE=30d
ATTACHMENTS_MAX_AGE=30d
```

#### Push Notification Settings
```env
# APNs (iOS)
APN_KEY_ID=your_apn_key_id
APN_TEAM_ID=your_team_id
APN_PRIVATE_KEY_PATH=./keys/apn-key.p8
APN_BUNDLE_ID=com.example.zentik
APN_PRODUCTION=false

# Firebase (Android)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
```

### Backup and Recovery

#### Database Backup
```bash
# PostgreSQL backup
pg_dump -h localhost -U zentik_user zentik > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore from backup
psql -h localhost -U zentik_user zentik < backup_20240101_120000.sql
```

#### File Storage Backup
```bash
# Backup attachments
tar -czf attachments_backup_$(date +%Y%m%d_%H%M%S).tar.gz storage/attachments/

# Restore attachments
tar -xzf attachments_backup_20240101_120000.tar.gz
```

## Security Best Practices

### Token Management

1. **Regular Rotation**: Rotate system tokens every 90 days
2. **Minimal Scope**: Grant only necessary permissions
3. **Monitoring**: Track token usage and revoke unused tokens
4. **Secure Storage**: Store tokens securely, never in version control

### Access Control

1. **Principle of Least Privilege**: Grant minimal required access
2. **Regular Audits**: Review permissions quarterly
3. **Temporary Access**: Use expiring tokens for temporary access
4. **Monitoring**: Log all administrative actions

### System Hardening

1. **Firewall Rules**: Restrict access to necessary ports only
2. **SSL/TLS**: Use HTTPS for all API communications
3. **Rate Limiting**: Implement appropriate rate limits
4. **Input Validation**: Validate all inputs and sanitize data

## Troubleshooting

### Common Issues

#### Token Authentication Failures
```bash
# Check token format
echo "sat_abc123def456..." | grep -E "^sat_[a-f0-9]{24}$"

# Verify token in database
psql -h localhost -U zentik_user -d zentik -c "SELECT * FROM system_access_tokens WHERE id = 'token-uuid';"
```

#### Permission Denied Errors
```bash
# Check user role
curl -H "Authorization: Bearer <jwt-token>" http://localhost:3000/api/users/me

# Verify entity permissions
curl -H "Authorization: Bearer <jwt-token>" http://localhost:3000/api/entity-permissions
```

#### System Performance Issues
```bash
# Check database connections
psql -h localhost -U zentik_user -d zentik -c "SELECT count(*) FROM pg_stat_activity;"

# Monitor system resources
top -p $(pgrep -f "node.*dist/main.js")
```

### Debug Mode

Enable debug logging for troubleshooting:

```env
LOG_LEVEL=debug
DB_LOGGING=true
```

### Support and Monitoring

- **Health Checks**: Monitor system status regularly
- **Log Analysis**: Review logs for errors and performance issues
- **Metrics Dashboard**: Use system metrics to identify bottlenecks
- **Backup Verification**: Regularly test backup and recovery procedures
