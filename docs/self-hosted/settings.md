---
sidebar_position: 2
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

### Authentication & JWT

Configuration for JWT tokens and user authentication:

- `JwtAccessTokenExpiration` - Duration for access token validity (default: `3h`)
- `JwtRefreshTokenExpiration` - Duration for refresh token validity (default: `7d`) 
- `JwtSecret` - Secret key for JWT access tokens (auto-generated)
- `JwtRefreshSecret` - Secret key for JWT refresh tokens (auto-generated)
- `SocialLoginEnabled` - Enable social login functionality (default: `false`), oauth providers will need to be setup in the proper administration section
- `LocalRegistrationEnabled` - Enable local user registration via email/password (default: `false`)
- `SocialRegistrationEnabled` - Enable social registration functionality (default: `false`). If disabled, oauth providers can be used only for the login following a local registration

### Apple Push Notification (APN)

Configuration for Apple Push Notifications. All these configurations will require the mobile app to be built locally with the whole Apple setup. Request a passthrough token and set ApnPush to Passthrough to utilize the public server:

- `ApnPush` - APN push mode: `Off`, `Local`, `Onboard`, `Passthrough` (default: `Off`)
- `ApnKeyId` - Apple Push Notification Key ID (required for `Onboard` mode)
- `ApnTeamId` - Apple Team ID (required for `Onboard` mode)
- `ApnPrivateKeyPath` - Path to APN private key file (required for `Onboard` mode)
- `ApnBundleId` - App bundle identifier (required for `Onboard` mode)
- `ApnProduction` - Use production APN environment (default: `true`)

### Firebase Cloud Messaging (FCM)

Configuration for Firebase push notifications. All these configurations will require the mobile app to be built locally with the whole FCM setup. Request a passthrough token and set FirebasePush to Passthrough to utilize the public server:

- `FirebasePush` - Firebase push mode: `Off`, `Local`, `Onboard`, `Passthrough` (default: `Off`)
- `FirebaseProjectId` - Firebase project ID (required for `Onboard` mode)
- `FirebasePrivateKey` - Firebase service account private key (required for `Onboard` mode)
- `FirebaseClientEmail` - Firebase service account client email (required for `Onboard` mode)

### Web Push Notification

Configuration for web push notifications:

- `WebPush` - Web push mode: `Off`, `Local`, `Onboard`, `Passthrough` (default: `Onboard`)
- `VapidSubject` - VAPID subject for web push (required for `Onboard` mode, default to `mailto:zentik@notifier.com`)

### Push Passthrough

Configuration for push notification passthrough service:

- `PushNotificationsPassthroughServer` - Passthrough server URL (default: `https://notifier-api.zentik.app/api/v1`)
- `PushPassthroughToken` - Authentication token for passthrough service
- `SystemTokenUsageStats` - System token usage statistics (JSON format). Contains the montly calls left to the requested token

### Email Configuration

Configuration for email notifications. The server can send emails for the various auth flows and some more events. It supports out of the box a generig SMTP ([Brevo](https://www.brevo.com/) is  very easy to setup with a good free tier) or Resend as HTTP protocol

- `EmailEnabled` - Enable email functionality (default: `false`)
- `EmailFrom` - Sender email address
- `EmailFromName` - Sender display name
- `EmailType` - Email service type: `SMTP`, `Resend` (default: `SMTP`)
- `EmailHost` - SMTP server host (for SMTP type)
- `EmailPort` - SMTP server port (for SMTP type)
- `EmailSecure` - Use secure SMTP connection (for SMTP type)
- `EmailUser` - SMTP username (for SMTP type)
- `EmailPass` - SMTP password (for SMTP type)
- `ResendApiKey` - Resend service API key (for Resend type)

### Attachments

Configuration for file attachments:

- `AttachmentsEnabled` - Enable attachment functionality (default: `false`)
- `IconUploaderEnabled` - Enable icon upload feature (default: `true`)
- `AttachmentsStoragePath` - File storage path for attachments (default: `/attachments`)
- `AttachmentsMaxFileSize` - Maximum file size in bytes (default: `10485760` - 10MB)
- `AttachmentsAllowedMimeTypes` - Comma-separated list of allowed MIME types
- `AttachmentsDeleteJobEnabled` - Enable automatic cleanup of old attachments (default: `true`)
- `AttachmentsMaxAge` - Maximum age for attachments before cleanup (default: `7d`)

### Database Backup

Configuration for automated database backups:

- `BackupEnabled` - Enable automatic database backups (default: `false`)
- `BackupExecuteOnStart` - Execute backup on server startup (default: `true`)
- `BackupStoragePath` - Directory for backup files (default: `/backups`)
- `BackupMaxToKeep` - Maximum number of backup files to retain (default: `10`)
- `BackupCronJob` - Cron expression for backup schedule (default: `0 */12 * * *` - every 12 hours)

### Server Files

Configuration for server file storage. Utility to handle files stored on backend, i.e. keys for notification providers

- `ServerFilesDirectory` - Directory for server files (default: `/data`)

### Messages Retention

Configuration for message cleanup:

- `MessagesDeleteJobEnabled` - Enable automatic message cleanup (default: `true`)
- `MessagesMaxAge` - Maximum age for messages before cleanup (default: `7d`)

### Rate Limiting

Configuration for API rate limiting. Needed when the server runs behind a proxy server to avoid limiting of the clients, which will be recognized by the same proxy IP

- `RateLimitTrustProxyEnabled` - Trust proxy headers for rate limiting
- `RateLimitForwardHeader` - Header to use for forwarded IP addresses
- `RateLimitTtlMs` - Rate limit window duration in milliseconds (default: `60000` - 1 minute)
- `RateLimitLimit` - Maximum requests per window (default: `100`)
- `RateLimitBlockMs` - Block duration after limit exceeded in milliseconds (default: `10000` - 10 seconds)
- `RateLimitMessagesRps` - Messages per second rate limit (default: `10`)
- `RateLimitMessagesTtlMs` - Messages rate limit window in milliseconds (default: `1000` - 1 second)

### CORS & Security

Configuration for Cross-Origin Resource Sharing:

- `CorsOrigin` - Allowed CORS origins (comma-separated)
- `CorsCredentials` - Allow credentials in CORS requests

### Logging

Configuration for application logging:

- `LogLevel` - Logging level (debug, info, warn, error)

### Log Storage

Configuration for log storage and retention:

- `LogStorageEnabled` - Enable log storage to database
- `LogRetentionDays` - Number of days to retain logs

### Prometheus Metrics

Configuration for metrics collection, exposes a /metrics endpoint. Generate a system token with `prometheus` to authorize the pull.

- `PrometheusEnabled` - Enable Prometheus metrics endpoint (default: `false`)

### System Access Tokens

Configuration for system-level access tokens:

- `EnableSystemTokenRequests` - Enable system token request functionality (default: `false`)

