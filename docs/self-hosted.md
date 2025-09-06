---
sidebar_position: 5
---

# Self Hosted - Local Setup

This section describes how to configure and start Zentik locally for development and testing.

## Prerequisites

### Required Software

- **Node.js**: Version 18.0 or higher
- **PostgreSQL**: Version 13.0 or higher
- **Git**: To clone the repository
- **Docker** (optional): For containerization

### System Requirements

- **RAM**: Minimum 2GB, recommended 4GB+
- **Storage**: Minimum 5GB free space
- **CPU**: 2 cores, recommended 4 cores+
- **OS**: Linux, macOS, Windows (with WSL2)

## Installation

### 1. Repository Cloning

```bash
# Clone the repository
git clone https://github.com/yourusername/zentik.git
cd zentik

# Install workspace dependencies
npm install
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy configuration file
cp .env.example .env
```

### 3. Mobile Setup (Optional)

```bash
# Navigate to mobile directory
cd ../frontend

# Install dependencies
npm install

# Generate API types
npm run codegen
```

## Database Configuration

### Local PostgreSQL

#### PostgreSQL Installation

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**macOS (with Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

#### Database Creation

```bash
# Access as postgres user
sudo -u postgres psql

# Create user and database
CREATE USER zentik_user WITH PASSWORD 'zentik_password';
CREATE DATABASE zentik OWNER zentik_user;
GRANT ALL PRIVILEGES ON DATABASE zentik TO zentik_user;
\q
```

### Docker Compose (Recommended)

```bash
# From project root
docker-compose up -d db

# Verify database is active
docker-compose ps
```

## Environment Variables Configuration

### Main .env File

Create a `.env` file in the `backend/` directory:

```env
# =============================================================================
# GENERAL CONFIGURATION
# =============================================================================
NODE_ENV=development
PORT=3000
BACKEND_API_PREFIX=/api

# =============================================================================
# DATABASE
# =============================================================================
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=zentik_user
DB_PASSWORD=zentik_password
DB_NAME=zentik
DB_SYNCHRONIZE=true
DB_LOGGING=true
DB_DROP_SCHEMA=false

# =============================================================================
# JWT AND AUTHENTICATION
# =============================================================================
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=1d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
JWT_REFRESH_TOKEN_EXPIRATION=7d

# =============================================================================
# RATE LIMITING
# =============================================================================
RATE_LIMIT_TTL_MS=60000
RATE_LIMIT_LIMIT=100
RATE_LIMIT_BLOCK_MS=300000
RATE_LIMIT_MESSAGES_RPS=10
RATE_LIMIT_MESSAGES_TTL_MS=1000

# =============================================================================
# ATTACHMENTS AND STORAGE
# =============================================================================
ATTACHMENTS_STORAGE_PATH=./storage/attachments
ATTACHMENTS_MAX_FILE_SIZE=10485760
ATTACHMENTS_ALLOWED_MIME_TYPES=image/jpeg,image/png,image/gif,video/mp4,audio/mpeg,application/pdf,text/plain
ATTACHMENTS_MAX_AGE=30d
ATTACHMENTS_DELETE_JOB_ENABLED=true
ATTACHMENTS_DELETE_CRON_JOB=0 0 * * * *

# =============================================================================
# MESSAGES AND NOTIFICATIONS
# =============================================================================
MESSAGES_MAX_AGE=30d
MESSAGES_DELETE_JOB_ENABLED=true
MESSAGES_DELETE_CRON_JOB=0 0 * * * *

# =============================================================================
# PUSH NOTIFICATIONS
# =============================================================================
PUSH_NOTIFICATIONS_PASSTHROUGH_ENABLED=false

# APNs (iOS)
APN_KEY_ID=your_apn_key_id
APN_TEAM_ID=your_apn_team_id
APN_PRIVATE_KEY_PATH=./keys/apn-key.p8
APN_BUNDLE_ID=com.example.zentik
APN_PRODUCTION=false

# Firebase (Android)
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# =============================================================================
# OAUTH PROVIDERS
# =============================================================================
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# =============================================================================
# EMAIL
# =============================================================================
EMAIL_ENABLED=false
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# =============================================================================
# LOGGING
# =============================================================================
LOG_LEVEL=debug
```

### Main Environment Variables

#### Database
| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `DB_TYPE` | Database type | `postgres` | `postgres`, `sqlite` |
| `DB_HOST` | Database host | `localhost` | `127.0.0.1`, `db` |
| `DB_PORT` | Database port | `5432` | `5432` |
| `DB_USERNAME` | Database username | `zentik_user` | `postgres` |
| `DB_PASSWORD` | Database password | `zentik_password` | `mypassword` |
| `DB_NAME` | Database name | `zentik` | `zentik_dev` |
| `DB_SYNCHRONIZE` | Schema synchronization | `true` | `true`, `false` |
| `DB_LOGGING` | Database query logging | `true` | `true`, `false` |

#### JWT and Security
| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `JWT_SECRET` | JWT secret key | - | Random 32+ character key |
| `JWT_EXPIRATION` | Access token expiration | `1d` | `1h`, `7d`, `30d` |
| `JWT_REFRESH_SECRET` | Refresh secret key | - | Different random key |
| `JWT_REFRESH_TOKEN_EXPIRATION` | Refresh token expiration | `7d` | `7d`, `30d` |

#### Rate Limiting
| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `RATE_LIMIT_TTL_MS` | Rate limit interval | `60000` | `30000`, `120000` |
| `RATE_LIMIT_LIMIT` | Requests per interval | `100` | `50`, `200` |
| `RATE_LIMIT_BLOCK_MS` | Block on exceed | - | `300000` (5 min) |
| `RATE_LIMIT_MESSAGES_RPS` | Message requests/sec | `10` | `5`, `20` |

#### Attachments
| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `ATTACHMENTS_STORAGE_PATH` | Storage path | `./storage/attachments` | `/var/zentik/attachments` |
| `ATTACHMENTS_MAX_FILE_SIZE` | Max file size (bytes) | `10485760` | `5242880` (5MB) |
| `ATTACHMENTS_MAX_AGE` | Max attachment age | `30d` | `7d`, `90d` |
| `ATTACHMENTS_DELETE_JOB_ENABLED` | Enable cleanup | `true` | `true`, `false` |

#### Push Notifications
| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `PUSH_NOTIFICATIONS_PASSTHROUGH_ENABLED` | Passthrough mode | `false` | `true`, `false` |
| `APN_KEY_ID` | APNs key ID | - | `ABC123DEF4` |
| `APN_TEAM_ID` | Apple team ID | - | `TEAM123456` |
| `APN_BUNDLE_ID` | App bundle ID | - | `com.example.zentik` |
| `APN_PRODUCTION` | APNs environment | `false` | `true`, `false` |

## Starting Services

### 1. Starting Backend

```bash
# From backend directory
cd backend

# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

### 2. Starting Mobile (Optional)

```bash
# From mobile directory
cd mobile

# Start Expo
npm run start:ios      # iOS Simulator
npm run start:android  # Android Emulator
npm run start          # Web browser
```

### 3. Complete Startup with Docker

```bash
# From project root
docker-compose up -d

# Verify services
docker-compose ps

# Real-time logs
docker-compose logs -f backend
```

## Installation Verification

### 1. Backend Health Check

```bash
# Check API status
curl http://localhost:3000/api/health

# Check GraphQL
curl -X POST http://localhost:3000/api/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __schema { types { name } } }"}'
```

### 2. Database Verification

```bash
# Direct connection
psql -h localhost -U zentik_user -d zentik

# Check tables
\dt

# Check data
SELECT COUNT(*) FROM users;
```

### 3. Mobile Verification

```bash
# Check Expo
npx expo doctor

# Check build
npx expo run:ios --device
```

## Development Configuration

### Development Environment

```env
# .env.development
NODE_ENV=development
DB_SYNCHRONIZE=true
DB_LOGGING=true
LOG_LEVEL=debug
ATTACHMENTS_DELETE_JOB_ENABLED=false
MESSAGES_DELETE_JOB_ENABLED=false
```

### Test Environment

```env
# .env.test
NODE_ENV=test
DB_TYPE=sqlite
DB_DATABASE=:memory:
DB_SYNCHRONIZE=true
DB_DROP_SCHEMA=true
JWT_SECRET=test-secret
```

### Production Environment

```env
# .env.production
NODE_ENV=production
DB_SYNCHRONIZE=false
DB_LOGGING=false
LOG_LEVEL=info
ATTACHMENTS_DELETE_JOB_ENABLED=true
MESSAGES_DELETE_JOB_ENABLED=true
```

## Troubleshooting

### Common Issues

#### Database Connection Error
```bash
# Check PostgreSQL service
sudo systemctl status postgresql

# Check connection
psql -h localhost -U zentik_user -d zentik

# Check environment variables
echo $DB_HOST $DB_PORT $DB_USERNAME
```

#### Port Already in Use
```bash
# Find process using the port
lsof -i :3000

# Terminate process
kill -9 <PID>

# Change port in .env
PORT=3001
```

#### File Permissions
```bash
# Check storage directory permissions
ls -la storage/

# Create directory if it doesn't exist
mkdir -p storage/attachments
chmod 755 storage/attachments
```

#### Dependencies Error
```bash
# Clean npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Logs and Debug

#### Enable Detailed Logs
```env
LOG_LEVEL=debug
DB_LOGGING=true
```

#### Check Real-Time Logs
```bash
# Backend logs
tail -f backend/logs/zentik.log

# Docker logs
docker-compose logs -f backend

# System logs
journalctl -u zentik -f
```

## Performance and Optimization

### Database Configuration

```env
# PostgreSQL optimizations
DB_LOGGING=false
DB_SYNCHRONIZE=false  # Only in production
```

### Rate Limiting Configuration

```env
# Conservative rate limit for development
RATE_LIMIT_LIMIT=1000
RATE_LIMIT_MESSAGES_RPS=50
```

### Cleanup Configuration

```env
# Frequent cleanup for development
ATTACHMENTS_DELETE_CRON_JOB=0 */30 * * * *
MESSAGES_DELETE_CRON_JOB=0 */30 * * * *
```

## Security

### Keys and Secrets

```bash
# Generate secure JWT secret
openssl rand -hex 32

# Generate different refresh secret
openssl rand -hex 32

# Protect .env file
chmod 600 .env
```

### Firewall and Access

```bash
# Limit database access
sudo ufw allow from 127.0.0.1 to any port 5432

# Limit API access
sudo ufw allow from 127.0.0.1 to any port 3000
```

### Backup and Recovery

```bash
# Database backup
pg_dump -h localhost -U zentik_user zentik > backup.sql

# Database restore
psql -h localhost -U zentik_user zentik < backup.sql
```

## Next Steps

After configuring the local environment:

1. **Test APIs**: Use Postman or curl to test endpoints
2. **Configure OAuth**: Add OAuth providers for authentication
3. **Setup Push Notifications**: Configure APNs and Firebase
4. **Deploy Mobile**: Test mobile app with local backend
5. **Monitoring**: Implement advanced logging and metrics
