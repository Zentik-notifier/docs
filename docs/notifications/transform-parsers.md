---
sidebar_position: 13
---
# Transform Parsers

Builtin payload transformers convert external webhook payloads into standard message structures without you crafting titles/bodies manually.

## How It Works
1. You POST raw JSON to `/transform?parser=<name>&bucketId=<bucket>`
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

### Option 1: Using Token + Bucket ID
```bash
curl -X POST \
  "https://your-public-url/transform?parser=authentik&bucketId=<bucket-uuid>" \
  -H "Authorization: Bearer <jwt-access-token>" \
  -H "Content-Type: application/json" \
  -d '{"body":"loginSuccess: {...}","severity":"info","user_email":"user@example.com","user_username":"alice"}'
```

### Option 2: Using Magic Code
```bash
curl -X POST \
  "https://your-public-url/transform?parser=authentik&magicCode=<your-magic-code>" \
  -H "Content-Type: application/json" \
  -d '{"body":"loginSuccess: {...}","severity":"info","user_email":"user@example.com","user_username":"alice"}'
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
If output seems incomplete, log the raw payload you send and compare with parser expectations (see source code for interim logic). For rapid iteration, start with the standard POST /message endpoint before formalizing a parser request.

---
Return to main notifications: [Notifications Overview](../notifications)
