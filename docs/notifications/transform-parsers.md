---
sidebar_position: 13
---
# Transform Parsers

Builtin payload transformers convert external webhook payloads into standard message structures without you crafting titles/bodies manually.

## How It Works
1. You POST raw JSON to `/api/v1/messages/transform?parser=<name>&bucketId=<bucket>`
2. Zentik validates the parser name and payload shape.
3. The parser returns a `CreateMessageDto` (title, subtitle, body, deliveryType, etc.).
4. A message + notifications are created as normal.

## Built-in Parsers

| Parser | Query Name | Enum Type | Description | Key Fields Used |
|--------|------------|-----------|-------------|-----------------|
| Authentik | `authentik` | ZENTIK_AUTHENTIK | Maps Authentik event bodies (login/logout/loginFailed + unmapped) | `body`, `user_email`, `user_username`, embedded JSON after colon |
| Servarr | `servarr` | ZENTIK_SERVARR | Handles Radarr/Sonarr/Prowlarr events (download/import/indexer status) | `eventType`, `movie` / `series` / `episodes` / `indexer*` |
| Railway | `railway` | ZENTIK_RAILWAY | Transforms Railway.com webhook events (deployments, alerts) | `type`, `project.name` (required), `service.name` (optional), `status` (optional) |
| GitHub | `github` | ZENTIK_GITHUB | Handles GitHub webhook events (push, PR, issues, releases, workflows, checks) | `repository.name`, `sender.login`, `action`, event-specific fields |
| Expo | `expo` | ZENTIK_EXPO | Handles Expo Application Services (EAS) build/submit events | `accountName`, `projectName`, `platform`, `status`, `metadata` |
| Status.io | `statusio` | ZENTIK_STATUS_IO | Handles Status.io incidents and scheduled maintenance events | `title`, `details`, `status_page_url`, `incident_url` / `maintenance_url` |
| Instatus | `instatus` | ZENTIK_INSTATUS | Handles Instatus incidents, maintenance, and component updates | `meta`, `page.url`, `incident` / `maintenance` / `component_update` |
| Atlassian Statuspage | `atlas-statuspage` | ZENTIK_ATLAS_STATUSPAGE | Handles Atlassian Statuspage incidents and component updates | `meta`, `page.id`, `incident` / `component_update` |

## Parser Requirements
Some parsers require additional user settings configuration:

- **GitHub**: Requires `GithubEventsFilter` setting to filter events (optional - can specify comma-separated event types like "push,pull_request" or special filters "all_success" or "all_failure")
- **Expo**: Requires `ExpoKey` setting for webhook signature verification (optional - HMAC-SHA1 signature verification)

Other parsers work without additional configuration.

## Delivery Type Mapping
Parsers decide `deliveryType` based on severity / eventType (implementation may evolve; inspect produced messages if tuning priority is needed).

## Example Authentik
```bash
curl -X POST \
  "http://localhost:3001/api/v1/messages/transform?parser=authentik&bucketId=<bucket-uuid>" \
  -H "Authorization: Bearer <jwt-access-token>" \
  -H "Content-Type: application/json" \
  -d '{"body":"loginSuccess: {...}","severity":"info","user_email":"user@example.com","user_username":"alice"}'
```

## Example Servarr
```bash
curl -X POST \
  "http://localhost:3001/api/v1/messages/transform?parser=servarr&bucketId=<bucket-uuid>" \
  -H "Authorization: Bearer <jwt-access-token>" \
  -H "Content-Type: application/json" \
  -d '{"eventType":"download","instanceName":"radarr-main","movie":{"title":"Inception","year":2010,"tmdbId":123}}'
```

## Example Railway
```bash
curl -X POST \
  "http://localhost:3001/api/v1/messages/transform?parser=railway&bucketId=<bucket-uuid>" \
  -H "Authorization: Bearer <jwt-access-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "DEPLOY",
    "project": {
      "id": "a418f086-cacf-432f-b209-334e17397ae2",
      "name": "my-app",
      "description": "My application",
      "createdAt": "2025-08-25T22:37:27.337Z"
    },
    "service": {
      "id": "bece679c-d79e-4895-84c0-aad3c62ea70c",
      "name": "backend"
    },
    "environment": {
      "id": "4af5f898-f125-46a2-bd11-acfb0b7760d7",
      "name": "production"
    },
    "status": "SUCCESS",
    "timestamp": "2025-09-21T08:36:24.208Z",
    "deployment": {
      "id": "39380b1e-40a3-4c41-b1ea-3972f5406945",
      "creator": {
        "id": "4eb5aac7-8e08-4768-8dcb-1ff1064ff206",
        "name": "Developer Name",
        "avatar": "https://avatars.githubusercontent.com/u/23080650?v=4"
      },
      "meta": {
        "buildOnly": false,
        "reason": "deploy",
        "runtime": "V2"
      }
    }
  }'
```

## Example GitHub
```bash
curl -X POST \
  "http://localhost:3001/api/v1/messages/transform?parser=github&bucketId=<bucket-uuid>" \
  -H "Authorization: Bearer <jwt-access-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "opened",
    "repository": {
      "name": "zentik-notifier",
      "full_name": "Zentik-notifier/zentik-notifier",
      "html_url": "https://github.com/Zentik-notifier/zentik-notifier",
      "owner": {
        "login": "Zentik-notifier",
        "avatar_url": "https://avatars.githubusercontent.com/u/12345"
      }
    },
    "sender": {
      "login": "developer",
      "avatar_url": "https://avatars.githubusercontent.com/u/67890"
    },
    "pull_request": {
      "number": 42,
      "title": "Add GitHub webhook parser",
      "state": "open",
      "html_url": "https://github.com/Zentik-notifier/zentik-notifier/pull/42",
      "user": {
        "login": "developer"
      },
      "draft": false
    }
  }'
```

## Example Expo
```bash
curl -X POST \
  "http://localhost:3001/api/v1/messages/transform?parser=expo&bucketId=<bucket-uuid>" \
  -H "Authorization: Bearer <jwt-access-token>" \
  -H "Content-Type: application/json" \
  -H "expo-signature: sha1=<signature>" \
  -d '{
    "id": "abc123",
    "accountName": "my-account",
    "projectName": "my-app",
    "appId": "com.example.app",
    "platform": "ios",
    "status": "finished",
    "buildDetailsPageUrl": "https://expo.dev/accounts/my-account/projects/my-app/builds/abc123",
    "metadata": {
      "appVersion": "1.0.0",
      "appBuildVersion": "1",
      "buildProfile": "production",
      "gitCommitMessage": "Initial release"
    },
    "createdAt": "2025-01-15T10:00:00Z",
    "completedAt": "2025-01-15T10:05:00Z"
  }'
```

## Example Status.io
```bash
curl -X POST \
  "http://localhost:3001/api/v1/messages/transform?parser=statusio&bucketId=<bucket-uuid>" \
  -H "Authorization: Bearer <jwt-access-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "551edb8331a9664b11000005",
    "message_id": "531adb8331a9553b11000008",
    "title": "Database Issues",
    "datetime": "2015-04-03T18:27:15.344Z",
    "datetime_start": "2015-04-03T18:27:15+00:00",
    "datetime_resolve": "",
    "current_status": "Degraded Performance",
    "current_state": "Identified",
    "components": [{"name": "Database", "_id": "comp1"}],
    "details": "A database instance has become unhealthy",
    "incident_url": "https://status.io/pages/incident/5516e01e2e55e4e917000005/5116e01e2e33e4e413000001",
    "status_page_url": "https://status.io/pages/5516e01e2e55e4e917000005"
  }'
```

## Example Instatus
```bash
curl -X POST \
  "http://localhost:3001/api/v1/messages/transform?parser=instatus&bucketId=<bucket-uuid>" \
  -H "Authorization: Bearer <jwt-access-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "meta": {
      "unsubscribe": "https://example.com/unsubscribe",
      "documentation": "https://instatus.com/help/webhooks"
    },
    "page": {
      "id": "page123",
      "status_indicator": "HASISSUES",
      "status_description": "Some systems are experiencing issues",
      "url": "https://status.example.com"
    },
    "incident": {
      "id": "incident123",
      "name": "Database Connection Issues",
      "status": "INVESTIGATING",
      "impact": "MAJOROUTAGE",
      "created_at": "2023-10-20T10:00:00Z",
      "resolved_at": "",
      "url": "https://status.example.com/incidents/incident123",
      "incident_updates": [{
        "id": "update1",
        "body": "We are investigating",
        "status": "INVESTIGATING"
      }]
    }
  }'
```

## Example Atlassian Statuspage
```bash
curl -X POST \
  "http://localhost:3001/api/v1/messages/transform?parser=atlas-statuspage&bucketId=<bucket-uuid>" \
  -H "Authorization: Bearer <jwt-access-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "meta": {
      "unsubscribe": "http://statustest.example.com/?unsubscribe=j0vqr9kl3513",
      "documentation": "http://doers.statuspage.io/customer-notifications/webhooks/"
    },
    "page": {
      "id": "j2mfxwj97wnj",
      "status_indicator": "critical",
      "status_description": "Major System Outage"
    },
    "incident": {
      "id": "lbkhbwn21v5q",
      "name": "Virginia Is Down",
      "status": "investigating",
      "impact": "critical",
      "created_at": "2013-05-29T15:08:51-06:00",
      "updated_at": "2013-05-29T16:30:35-06:00",
      "started_at": "2013-05-29T15:08:51-06:00",
      "shortlink": "http://j.mp/18zyDQx",
      "incident_updates": [{
        "id": "drfcwbnpxnr6",
        "status": "investigating",
        "body": "We are investigating reports of outages.",
        "created_at": "2013-05-29T15:08:51-06:00"
      }],
      "components": []
    }
  }'
```

## Adding New Parsers
Need another integration? Request it—new built-ins can be added on demand.

You can now create custom parsers directly from the Zentik web app! Visit the Payload Mapper section to upload and edit your own mapping logic, as demonstrated in the video below.

<video controls width="100%" style={{maxWidth: '800px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}>
  <source src="/video/payload-mapper-creation.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

<p><em>Video: Creating custom parsers in Zentik web app</em></p>

## Validation Failures
| Scenario | Response |
|----------|----------|
| Unknown parser | 404 Not Found |
| Missing parser param | 400 Bad Request |
| Invalid payload shape | 400 Bad Request |

## Debugging
If output seems incomplete, log the raw payload you send and compare with parser expectations (see source code for interim logic). For rapid iteration, start with the standard POST /messages endpoint before formalizing a parser request.

---
Return to main notifications: [Notifications Overview](../notifications)
