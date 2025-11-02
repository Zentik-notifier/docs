---
sidebar_position: 1
title: Settings
---

# Settings

## Environment variables

The following environment variables can be configured in the backend `.env` file:

### Database

- `DB_SYNCHRONIZE` - Enable automatic schema synchronization (development only, default: `false`)
- `DB_DROP_SCHEMA` - Drop existing schema on startup (default: `false`)
- `DB_USERNAME` - Database username (default: `zentik_user`)
- `DB_PASSWORD` - Database password (default: `zentik_password`)
- `DB_NAME` - Database name (default: `zentik`)
- `DB_HOST` - Database host (default: `localhost`)
- `DB_PORT` - Database port (default: `5432`)
- `DB_SSL` - Enable SSL connection (default: `false`)

### Server Configuration

- `PUBLIC_BACKEND_URL` - Public backend URL

### Administration

- `ADMIN_USERS` - Comma-separated list of administrator users (default: `admin`)
- `ADMIN_DEFAULT_PASSWORD` - Default password for administrator users (default: `admin`)

## Server settings

In addition to environment variables, Zentik provides a wide range of configurable settings through the `ServerSetting` entity. These settings are stored in the database and can be fully configured through the admin UI or GraphQL API.

### JWT (JSON Web Tokens)

- `JwtAccessTokenExpiration` - Access token duration
- `JwtRefreshTokenExpiration` - Refresh token duration
- `JwtSecret` - Secret key for JWT tokens
- `JwtRefreshSecret` - Secret key for refresh tokens

### Push Notifications - APN (Apple Push Notification)

- `ApnPush` - Enable APN push notifications
- `ApnKeyId` - APN key ID
- `ApnTeamId` - APN team ID
- `ApnPrivateKeyPath` - Path to APN private key
- `ApnBundleId` - Application bundle ID
- `ApnProduction` - Production mode for APN

### Push Notifications - Firebase

- `FirebasePush` - Enable Firebase push notifications
- `FirebaseProjectId` - Firebase project ID
- `FirebasePrivateKey` - Firebase private key
- `FirebaseClientEmail` - Firebase client email

### Push Notifications - Web Push

- `WebPush` - Enable Web Push notifications
- `VapidSubject` - Subject for VAPID keys

### Push Notifications - Passthrough

- `PushNotificationsPassthroughServer` - Passthrough server for notifications
- `PushPassthroughToken` - Passthrough token

### Attachments

- `AttachmentsEnabled` - Enable attachments
- `AttachmentsStoragePath` - Path for attachment storage (default: `/attachments`)
- `AttachmentsMaxFileSize` - Maximum file size
- `AttachmentsAllowedMimeTypes` - Allowed MIME types
- `AttachmentsDeleteJobEnabled` - Enable automatic deletion job
- `AttachmentsMaxAge` - Maximum attachment age

### Backup

- `BackupEnabled` - Enable automatic backups
- `BackupExecuteOnStart` - Execute backup on startup
- `BackupStoragePath` - Path for backup storage (default: `/backups`)
- `BackupMaxToKeep` - Maximum number of backups to keep
- `BackupCronJob` - Cron expression for backups

### Server Files

- `ServerFilesDirectory` - Directory for server file storage

### Messages

- `MessagesMaxAge` - Maximum message age
- `MessagesDeleteJobEnabled` - Enable automatic deletion job

### Email

- `EmailEnabled` - Enable email sending
- `EmailType` - Email service type (SMTP, Resend, etc.)
- `EmailHost` - SMTP host
- `EmailPort` - SMTP port
- `EmailSecure` - Enable secure connection
- `EmailUser` - SMTP username
- `EmailPass` - SMTP password
- `EmailFrom` - Sender email address
- `EmailFromName` - Sender name
- `ResendApiKey` - Resend API key

### Rate Limiting

- `RateLimitTrustProxyEnabled` - Enable trust proxy for rate limiting
- `RateLimitForwardHeader` - Header for IP forwarding
- `RateLimitTtlMs` - Time-to-live for rate limiting
- `RateLimitLimit` - Maximum request limit
- `RateLimitBlockMs` - Block duration
- `RateLimitMessagesRps` - Requests per second for messages
- `RateLimitMessagesTtlMs` - TTL for message rate limiting

### CORS

- `CorsOrigin` - Allowed origins for CORS
- `CorsCredentials` - Enable CORS credentials

### Logging

- `LogLevel` - Logging level (DEBUG, INFO, WARN, ERROR)
- `LogStorageEnabled` - Enable log storage
- `LogRetentionDays` - Log retention days

### Prometheus Metrics

- `PrometheusEnabled` - Enable Prometheus metrics

### Advanced Configuration

- `ServerStableIdentifier` - Stable server identifier (UUID generated at bootstrap)
- `EnableSystemTokenRequests` - Enable system token requests
- `SystemTokenUsageStats` - System token usage statistics
