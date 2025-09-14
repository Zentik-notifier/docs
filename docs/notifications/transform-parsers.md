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

## Adding New Parsers
Need another integration? Request it—new built-ins can be added on demand. A self-service web UI for custom parser creation (upload / edit mapping logic) will be available with the upcoming web release.

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
