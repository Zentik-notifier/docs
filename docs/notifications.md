---
sidebar_position: 3
---
# Notifications

This section describes in detail how to use Zentik's notification endpoints, including all possible values and available configurations.

<!-- ## Delivery Flows Overview -->

<!-- ### Cloud & Self-hosted Flows (Side by Side) -->

<!-- <div style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',alignItems:'flex-start'}}>
  <figure style={{margin:0,flex:'1 1 420px',minWidth:'340px'}}>
    <img src="/img/cloud-flow-vertical.svg" alt="Cloud (Managed) Flow" style={{width:'100%',height:'auto',border:'1px solid var(--ifm-toc-border-color)',borderRadius:8,padding:'4px',background:'var(--ifm-background-surface-color)'}} />
    <figcaption style={{textAlign:'center',marginTop:'.5rem',fontSize:'0.85rem',opacity:.8}}>Cloud (Managed) Flow</figcaption>
  </figure>
  <figure style={{margin:0,flex:'1 1 420px',minWidth:'340px'}}>
    <img src="/img/self-hosted-flow-vertical.svg" alt="Self-hosted Flow" style={{width:'100%',height:'auto',border:'1px solid var(--ifm-toc-border-color)',borderRadius:8,padding:'4px',background:'var(--ifm-background-surface-color)'}} />
  <figcaption style={{textAlign:'center',marginTop:'.5rem',fontSize:'0.85rem',opacity:.8}}>Self-hosted Flow (Encrypted payload via Pass-through Relay)</figcaption>
  </figure>
</div> -->

## How it works

Zentik can send notification to all the main providers:
- iOS via APN
- Android via FCM
- PWA/web via Webpush

The flow goes as following:
- User creates a message
- The message gets notified to all user's registered devices
- The devices will ack the notification to the server when received
- When all notifications are acked, the message will be deleted from the server and kept only locally on the devices (or after 7 days regardless)
- If postpone/reminder is used, the message is protected until the notifications are finalized

The notification are always end-to-end encrypted with keys stored on server and device, providers won't see the messages in clear. 

If you are a self hoster and you want to have access to iOS/FCM notifications without struggling with the hassle of the configuration, you will be able to "passthrough" the notifications to the zentik servers, which will act as a simple bridge, nothing will be stored (messages will be anyways encrypted). To do so ask for a passthrough token.

PWA notifications will work out of the box even on self hosted servers


### Quick start
- Register to the platform with email/password or using one of the many available social providers
- Create a bucket (or follow the onboarding), enable the magic code to uniquely identify your bucket in the whole system. Keep it safe since it won't require any authentication
- Send a notification in any of the possible ways

## GET
```bash
curl "https://your-public-url/api/v1/messages?magicCode=b0f59f31&title=Hello&body=Test message"
``` 

## GET with payload mapping
```bash
curl -X POST \
  "https://your-public-url/api/v1/messages/transform?parser=authentik&bucketId=<bucket-uuid>" \
  -H "Authorization: Bearer <jwt-access-token>" \
  -H "Content-Type: application/json" \
  -d '{"body":"loginSuccess: {...}","severity":"info","user_email":"user@example.com","user_username":"alice"}'
```

## POST
```bash
curl -X POST "https://your-public-url/api/v1/messages" \
  -H "Content-Type: application/json" \
  -d '{
    "magicCode": "b0f59f31",
    "title": "Hello",
    "body": "Test message"
  }'
``` 

## POST with form data
```bash
curl -X POST "https://your-public-url/api/v1/messages" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "magicCode=b0f59f31" \
  -d "title=Hello" \
  -d "body=Test message"
```

### Message Parameters
Below is the complete list of fields you can send when creating a message. Unless marked Required, all fields are optional.

| Field | Type | Required | Default | Description | Example |
|-------|------|----------|---------|-------------|---------|
| title | string (max 100) | Yes | - | Primary title shown to user | "Order Confirmed" |
| subtitle | string (max 100) | No | - | Secondary line below title | "Payment received" |
| body | string (max 500) | No | - | Longer descriptive text | "Your order #12345 has been confirmed" |
| bucketId | string | No | - | Bucket UUID or name; name will be resolved server-side | "d3f0..." or "Marketing" |
| magicCode | string | No | - | Bucket magic code, identifies an user's bucket | "d3f0..." |
| deliveryType | enum NotificationDeliveryType | Yes | - | `SILENT` | `NORMAL` | `CRITICAL` (SILENT=no alert, CRITICAL=high priority) | "NORMAL" |
| attachments | AttachmentDto[] | No | [] | Rich media attachments (see attachment fields) | See below |
| actions | ActionDto[] | No | [] | Array of interactive actions/buttons | See below |
| tapAction | ActionDto | No | `{ "type":"OPEN_NOTIFICATION" }` | Primary action when user taps message | `{ "type":"NAVIGATE", "value":"/orders/123" }` |
| sound | string | No | - | Custom sound identifier | "ping.aiff" |
| addMarkAsReadAction | boolean | No | true | Adds a predefined "Mark as Read" action | true |
| addOpenNotificationAction | boolean | No | false | Adds a predefined "Open" action | true |
| addDeleteAction | boolean | No | true | Adds a predefined "Delete" action | true |
| snoozes | number[] | No | [] | Predefined snooze actions (minutes) | [5,10,30] |
| postpones | number[] | No | [] | Predefined postpone actions (minutes) | [5,10,30] |
| locale | string | No | - | Locale override for client rendering | "en-EN" |
| groupId | string | No | bucketId | Logical group for stacking | "orders" |
| collapseId | string | No | - | APNs collapse identifier (replaces by same id) | "order-update-123" |
| userIds | string[] | No | All bucket users | Target subset of users (IDs or usernames) | ["user-uuid-1","user-uuid-2"] |
| imageUrl | string | No | - | Shortcut: creates image attachment automatically | "https://.../image.png" |
| videoUrl | string | No | - | Shortcut: creates video attachment automatically | "https://.../clip.mp4" |
| gifUrl | string | No | - | Shortcut: creates GIF attachment automatically | "https://.../fun.gif" |
| tapUrl | string | No | - | Shortcut: sets tapAction to NAVIGATE with this URL | "https://app.zentik.app/orders/123" |
| maxReminders | number | No | 5 | Maximum reminders to send for a reminder notification | 3 |
| remindEveryMinutes | number | No | - | Send notification reminders at regular intervals until user opens a notification | 60 |

AttachmentDto fields:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| mediaType | enum MediaType | Yes | `VIDEO`, `IMAGE`, `GIF`, `AUDIO`, `ICON` |
| name | string | No | Friendly filename / label |
| url | string | Cond. | Provide either url or attachmentUuid |
| attachmentUuid | string | Cond. | Server-stored attachment reference |
| saveOnServer | boolean | No | If true with url, server persists a copy |

ActionDto fields (used in actions, tapAction):

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| type | enum NotificationActionType | Yes | `NAVIGATE`, `BACKGROUND_CALL`, `MARK_AS_READ`, `SNOOZE`, `OPEN_NOTIFICATION`, `WEBHOOK`, `DELETE` |
| value | string | Yes | Semantics depend on type (path, url, id) |
| destructive | boolean | No | Mark action as destructive (UI hint) |
| icon | string | No | Icon identifier/name |
| title | string | No | Button label override |

Automatic shortcuts:
- imageUrl / videoUrl / gifUrl => injects an attachment of corresponding mediaType.
- tapUrl => sets tapAction `{ type: NAVIGATE, value: tapUrl }` if tapAction not explicitly provided.
- userIds can be CSV or JSON array; server normalizes.
- attachments / actions / tapAction accept JSON strings (when sent as multipart form fields) which are parsed server-side.

Validation & limits:
- Either magicCode or bucketId + authentication mean should be provided
- title ≤ 100 chars; subtitle ≤ 100; body ≤ 500.
- Each attachment/action object validated individually; unknown fields ignored.
- Invalid JSON in stringified arrays will cause a validation error.

### Uploading a File (Multipart Endpoint)
When you need to attach a binary file directly you can use the multipart endpoint instead of crafting an `attachments` array manually.

Endpoint: **POST** `/api/v1/messages/with-attachment`  <a href="http://localhost:3001/scalar#tag/messages/post/api/v1/messages/with-attachment" target="_blank" rel="noopener">Open in API Reference ↗</a>

Example:
```bash
curl -X POST http://localhost:3001/api/v1/messages/with-attachment \
  -H "Authorization: Bearer zat_<raw-token>" \
  -F "title=Invoice" \
  -F "bucketId=<bucket-uuid>" \
  -F "deliveryType=NORMAL" \
  -F "attachment=@invoice.pdf"
```

Notes:
- Booleans can be passed as `true`/`false` strings (they are transformed server-side).
- You can still mix a JSON `attachments` array plus the uploaded file if you need multiple attachments.
- To reuse a previously uploaded file, call the JSON endpoint with `attachmentUuid` instead.

### Sending a Message via GET (Query Parameters)
For very simple integrations or quick tests you can trigger a message using a GET request with query parameters. This requires an Access Token (`Authorization: Bearer zat_<raw-token>`). Avoid using GET in production for complex or sensitive payloads (limited length, appears in logs).

Endpoint: **GET** `/api/v1/messages`  <a href="http://localhost:3001/scalar#tag/messages/get/api/v1/messages" target="_blank" rel="noopener">Open in API Reference ↗</a>

> Note: This pattern is especially useful for legacy / constrained platforms that only allow configuring outbound webhooks as HTTP GET (no POST support). Keep payload minimal (title, bucketId, deliveryType) to avoid URL length issues and leaking excessive data in logs.

Example:
```bash
curl "http://localhost:3001/api/v1/messages?title=Ping&bucketId=<bucket-uuid>&deliveryType=NORMAL" \\
  -H "Authorization: Bearer zat_<raw-token>"
```

You can pass any field supported by the POST endpoint as a query string (arrays/objects must be JSON encoded). For readability, prefer POST for anything beyond a trivial title.

### Transform & Create Endpoint
Use this when you receive a webhook/payload from a known external system and want Zentik to parse it into a message automatically.

Endpoint: **POST** `/api/v1/messages/transform?parser=<parser>&bucketId=<bucket-uuid>`  <a href="http://localhost:3001/scalar#tag/messages/post/api/v1/messages/transform" target="_blank" rel="noopener">Open in API Reference ↗</a>

Required query params:
- `parser` – the builtin parser name (e.g. `authentik`)
- `bucketId` – target bucket id or name

Body: raw JSON payload from the source system.

For a complete list of available parsers, examples, and detailed usage instructions, see [Transform Parsers](./notifications/transform-parsers.md).

Example:
```bash
curl -X POST "http://localhost:3001/api/v1/messages/transform?parser=authentik&bucketId=<bucket-uuid>" \\
  -H "Authorization: Bearer <jwt-access-token>" \\
  -H "Content-Type: application/json" \\
  -d '{"event":"user.login","username":"alice"}'
```

If the parser matches, it will map the incoming structure to a standard message (title/body/actions). If required query params are missing or parser not found, a 400/404 is returned.

---
For advanced features (custom actions, multiple attachments, snooze, media types) visit the <a href="/scalar" target="_blank" rel="noopener">full API Reference ↗</a>.
