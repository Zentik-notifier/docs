---
sidebar_position: 10
---
# Attachments

This page explains how attachments work, storage rules, validation and ways to include them in messages.

## Ways to Add Attachments

| Method | Endpoint | Use Case | Notes |
|--------|----------|----------|-------|
| Inline URL shortcut | POST /api/v1/messages | Quick add of a single media via `imageUrl` / `videoUrl` / `gifUrl` | Creates transient attachment objects (not persisted if `saveOnServer=false`). |
| JSON attachments array | POST /api/v1/messages | Multiple attachments or fine-grained control | Provide objects with `mediaType` + `url` OR `attachmentUuid`. |
| Uploaded file (multipart) | POST /api/v1/messages/with-attachment | Direct file upload | Returns a message with linked stored attachment. |
| Reuse stored file | POST /api/v1/messages | Reference existing `attachmentUuid` | Avoids re-upload / re-download.

## Attachments API Reference
Use these endpoints when you want to upload or register files ahead of time and later reference them by `attachmentUuid` inside a message `attachments` array.

| Purpose | Method & Path | Ref | Notes |
|---------|---------------|-----|-------|
| Upload file (multipart) | POST `/api/v1/attachments/upload` | <a href="/scalar#tag/attachments/post/api/v1/attachments/upload" target="_blank" rel="noopener">API ↗</a> | Form field: `file`; optional `filename`, `mediaType` (auto-detected if omitted). |
| Download & persist from URL | POST `/api/v1/attachments/download-from-url` | <a href="/scalar#tag/attachments/post/api/v1/attachments/download-from-url" target="_blank" rel="noopener">API ↗</a> | Server fetches remote file; optional `filename`, `mediaType`. |
| Get one (metadata) | GET `/api/v1/attachments/{id}` | <a href="/scalar#tag/attachments/get/api/v1/attachments/{id}" target="_blank" rel="noopener">API ↗</a> | Returns metadata (auth required). |
| Download (auth) | GET `/api/v1/attachments/{id}/download` | <a href="/scalar#tag/attachments/get/api/v1/attachments/{id}/download" target="_blank" rel="noopener">API ↗</a> | Binary stream (requires auth). |
| Download (public) | GET `/api/v1/attachments/{id}/download/public` | <a href="/scalar#tag/attachments/get/api/v1/attachments/{id}/download/public" target="_blank" rel="noopener">API ↗</a> | Only for public attachments (linked to message or bucket ICON). |
| List by message | GET `/api/v1/attachments/message/{messageId}` | <a href="/scalar#tag/attachments/get/api/v1/attachments/message/{messageId}" target="_blank" rel="noopener">API ↗</a> | Inspect attachments after message creation. |
| Delete | DELETE `/api/v1/attachments/{id}` | <a href="/scalar#tag/attachments/delete/api/v1/attachments/{id}" target="_blank" rel="noopener">API ↗</a> | Permanently removes attachment (breaks references). |

Auth: All endpoints require `Authorization: Bearer <jwt-access-token>` or an access token (`zat_...`) except the explicit public download.

### Upload Example
```bash
curl -X POST http://localhost:3001/api/v1/attachments/upload \
  -H "Authorization: Bearer <jwt-access-token>" \
  -F "file=@banner.png" \
  -F "filename=banner.png" \
  -F "mediaType=IMAGE"
```
Response (excerpt):
```json
{
  "id": "<attachment-uuid>",
  "filename": "banner.png",
  "mediaType": "IMAGE"
}
```

### Download & Persist From Remote URL
```bash
curl -X POST http://localhost:3001/api/v1/attachments/download-from-url \
  -H "Authorization: Bearer <jwt-access-token>" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/image.png","filename":"promo.png","mediaType":"IMAGE"}'
```

### Reference in a Message
```jsonc
{
  "title": "Promo Available",
  "bucketId": "<bucket-uuid>",
  "deliveryType": "NORMAL",
  "attachments": [
    { "attachmentUuid": "<attachment-uuid>", "mediaType": "IMAGE" }
  ]
}
```

### Notes
- If both `url` and `attachmentUuid` are provided in a single attachment object, `attachmentUuid` wins.
- To persist a remote file inline (without pre-upload) you can use `attachments[].url` + `saveOnServer=true` directly in the message body.
- Public download succeeds only for attachments considered public (linked to a message or bucket icon). Otherwise use the authenticated download endpoint.

## Attachment Object

Either `url` or `attachmentUuid` must be provided (mutually exclusive).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| mediaType | enum MediaType | Yes | One of: `VIDEO`, `IMAGE`, `GIF`, `AUDIO`, `ICON` (ICON also fallback for generic/docs). |
| name | string | No | Friendly display name (filename). |
| url | string | Conditional | Remote URL to fetch/display. Can't be used with `attachmentUuid`. |
| attachmentUuid | string | Conditional | Existing stored attachment ID. Can't be used with `url`. |
| saveOnServer | boolean | No | If true with `url`, server downloads and persists a copy (requires attachments enabled). |

Validation errors occur if both or neither of `url` and `attachmentUuid` are supplied.

## Storage Layout

Files are persisted under a per-user, per-media-type, per-attachment folder structure:
```
/attachments/<userId>/<mediaType>/<attachmentId>/<attachmentId>.<ext>
```

Bucket icons may automatically be injected as an `ICON` attachment if present and not duplicated.

## File Size & Types

Defaults (overridable by env):
- Max size: `ATTACHMENTS_MAX_FILE_SIZE` (default 10MB)
- Allowed MIME types: `ATTACHMENTS_ALLOWED_MIME_TYPES` (image/jpeg, image/png, image/gif, image/webp, video/mp4, video/webm, audio/mpeg, audio/wav, audio/ogg, application/pdf, text/plain)

If the MIME type or size fails validation a 400 is returned.

## Public Access

Only attachments linked to a message OR bucket icon type (`ICON`) are publicly accessible through any public endpoint (if exposed). Others remain private.

## Automatic URL Shortcuts

Shortcuts convert single URLs into implicit attachments:
- `imageUrl` => IMAGE attachment
- `videoUrl` => VIDEO attachment
- `gifUrl` => GIF attachment

These are merged with explicitly provided `attachments` if both forms are used.

## Download & Persist Remote URL

Set `saveOnServer: true` on a URL-based attachment to have the server fetch and store the file, replacing `url` with a generated `attachmentUuid`.

## Reusing Attachments

To reuse a file in multiple messages:
1. Upload once (multipart or URL + `saveOnServer`)
2. Reference via `attachmentUuid` in subsequent message payloads

## Cleanup

A background cleanup job can remove old attachments (excluding ICON) based on retention settings. Ensure you don't rely on very old unreferenced files.

## Example Payload (Mixed)
```jsonc
{
  "title": "Release Media",
  "bucketId": "<bucket-uuid>",
  "deliveryType": "NORMAL",
  "attachments": [
    { "mediaType": "IMAGE", "url": "https://example.com/banner.png", "saveOnServer": true },
    { "mediaType": "AUDIO", "attachmentUuid": "<existing-audio-uuid>", "name": "Theme" }
  ],
  "videoUrl": "https://cdn.example.com/teaser.mp4"
}
```

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| 400 both url & attachmentUuid | Provided both fields | Remove one of them |
| 400 invalid mediaType | Typo or unsupported value | Use an enum value exactly as listed |
| 400 file size exceeds | File > max size | Increase env limit or compress file |
| Attachment not visible | Not linked to message and not ICON | Ensure message linkage or mediaType ICON |
| Download timeout | Remote host slow/unreachable | Host file on faster CDN or retry |

---
Return to main notifications: [Notifications Overview](../notifications)
