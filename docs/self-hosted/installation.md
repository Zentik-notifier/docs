---
sidebar_position: 2
title: Installation
---

# Installation

## Overview

Zentik is fully self-hostable and can be installed using Docker Compose. The backend is built with **NestJS** and uses **PostgreSQL 14+** as the database.

## Prerequisites

Before installing Zentik, ensure you have:
- **Docker** and **Docker Compose** installed
- **PostgreSQL 14+** (tested with PostgreSQL 16)

## Quick Start with Docker Compose

The easiest way to run Zentik is using Docker compose

### Docker Compose File

The complete `docker-compose.yml` is available in the repository:

[View docker-compose.yml on GitHub](https://github.com/Zentik-notifier/zentik-notifier/blob/main/docker-compose.yml)

```yaml
version: '3.9'
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ${DB_NAME:-zentik}
      POSTGRES_USER: ${DB_USERNAME:-zentik_user}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-zentik_password}
    volumes:
      - db_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    image: ghcr.io/zentik-notifier/zentik-notifier:latest
    environment:
      DB_HOST: db
      DB_PORT: 5432
      DB_NAME: ${DB_NAME:-zentik}
      DB_USERNAME: ${DB_USERNAME:-zentik_user}
      DB_PASSWORD: ${DB_PASSWORD:-zentik_password}
      DB_SSL: ${DB_SSL:-false}
      DB_SYNCHRONIZE: ${DB_SYNCHRONIZE:-false}
      DB_DROP_SCHEMA: ${DB_DROP_SCHEMA:-false}
      ADMIN_USERS: ${ADMIN_USERS:-admin}
      ADMIN_DEFAULT_PASSWORD: ${ADMIN_DEFAULT_PASSWORD:-admin}
      PUBLIC_BACKEND_URL: ${PUBLIC_BACKEND_URL:-}
    ports:
      - "3000:3000"
    volumes:
      - ./data:/data
      - ./attachments:/attachments
      - ./backups:/backups
    depends_on:
      - db

volumes:
  db_data:
```

## Next Steps

- Configure [Server Settings](./settings.md) for your environment
- Set up [Push Notifications](./push-notifications.md)
- Create your first [Bucket](../getting-started/buckets.md)
- Review [API Documentation](../api/graphql.md)

## Troubleshooting

### Check Health

```bash
curl http://localhost:3000/api/health
```

### Database Connection Issues

```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Check backend can connect
docker logs zentik-notifier_backend_1 | grep -i "database"
```

### Port Conflicts

Edit the `docker-compose.yml` file to change ports:

```yaml
ports:
  - "3001:3000"  # Change host port to 3001
```

### Migration Issues

Migrations run automatically on startup. To check:

```bash
docker logs zentik-notifier_backend_1 | grep -i migration
```

## Support

- Documentation: [docs.zentik.app](https://docs.zentik.app)
- Repository: [GitHub](https://github.com/Zentik-notifier/zentik-notifier)
- Issues: [GitHub Issues](https://github.com/Zentik-notifier/zentik-notifier/issues)
