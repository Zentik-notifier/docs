---
sidebar_position: 3
---
# Notifications

This section describes in detail how to use Zentik's notification endpoints, including all possible values and available configurations.

## Delivery Flows Overview

### Cloud & Self-hosted Flows (Side by Side)

<div style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',alignItems:'flex-start'}}>
  <figure style={{margin:0,flex:'1 1 420px',minWidth:'340px'}}>
    <img src="/img/cloud-flow-vertical.svg" alt="Cloud (Managed) Flow" style={{width:'100%',height:'auto',border:'1px solid var(--ifm-toc-border-color)',borderRadius:8,padding:'4px',background:'var(--ifm-background-surface-color)'}} />
    <figcaption style={{textAlign:'center',marginTop:'.5rem',fontSize:'0.85rem',opacity:.8}}>Cloud (Managed) Flow</figcaption>
  </figure>
  <figure style={{margin:0,flex:'1 1 420px',minWidth:'340px'}}>
    <img src="/img/self-hosted-flow-vertical.svg" alt="Self-hosted Flow" style={{width:'100%',height:'auto',border:'1px solid var(--ifm-toc-border-color)',borderRadius:8,padding:'4px',background:'var(--ifm-background-surface-color)'}} />
  <figcaption style={{textAlign:'center',marginTop:'.5rem',fontSize:'0.85rem',opacity:.8}}>Self-hosted Flow (Encrypted payload via Pass-through Relay)</figcaption>
  </figure>
</div>

## Quick Start: Create and Send a Message
This concise guide covers only the essentials: (1) authenticate, (2) create a bucket and an access token, (3) create and send your first message. For advanced options see the API Reference.

### Step 1 · Login with Username/Password
Endpoint: **POST** `/api/v1/auth/login`  <a href="/scalar#tag/Auth/POST/api/v1/auth/login" target="_blank" rel="noopener">Open in API Reference ↗</a>

Request:
```jsonc
{
  "email": "user@example.com",
  "password": "your_password"
}
```
Response (excerpt):
```json
{
  "accessToken": "<jwt-access-token>",
  "refreshToken": "<jwt-refresh-token>",
  "user": { "id": "<user-uuid>", "email": "user@example.com" }
}
```
Keep the `accessToken`; you'll use it in `Authorization: Bearer <accessToken>` for the next steps.

### Step 2 · Create a Bucket
Endpoint: **POST** `/api/v1/buckets`  <a href="/scalar#tag/buckets/post/api/v1/buckets" target="_blank" rel="noopener">Open in API Reference ↗</a>

Request:
```jsonc
{
  "name": "Marketing",
  "description": "Marketing campaign bucket"
}
```
Response (excerpt):
```json
{
  "id": "<bucket-uuid>",
  "name": "Marketing",
  "description": "Marketing campaign bucket"
}
```
Store `id` as `bucketId`.

### Step 3 · Create a User Access Token
Endpoint: **POST** `/api/v1/access-tokens`  <a href="/scalar#tag/access-tokens/post/api/v1/access-tokens" target="_blank" rel="noopener">Open in API Reference ↗</a>

Header: `Authorization: Bearer <jwt-access-token>`

Minimal request:
```jsonc
{
  "name": "CI Pipeline",
  "scopes": ["messages:create"]
}
```
Response (excerpt):
```json
{
  "id": "<token-uuid>",
  "token": "zat_<raw-token>",
  "scopes": ["messages:create"],
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```
Store the full `token` (with `zat_` prefix). You can now use `Authorization: Bearer zat_<raw-token>` for server-to-server calls.

### Step 4 · Create a Message (REST)
Endpoint: **POST** `/api/v1/messages`  <a href="http://localhost:3001/scalar#tag/messages/post/api/v1/messages" target="_blank" rel="noopener">Open in API Reference ↗</a>

Typical headers:
```http
Authorization: Bearer <jwt-access-token>
Content-Type: application/json
```
Minimal body:
```jsonc
{
  "title": "Welcome!",
  "bucketId": "<bucket-uuid>",
  "deliveryType": "NORMAL"
}
```
Response (excerpt):
```json
{
  "id": "<message-uuid>",
  "title": "Order Confirmed",
  "bucketId": "<bucket-uuid>",
  "createdAt": "2025-01-01T12:00:00.000Z"
}
```

### Message Parameters
Below is the complete list of fields you can send when creating a message. Unless marked Required, all fields are optional.

| Field | Type | Required | Default | Description | Example |
|-------|------|----------|---------|-------------|---------|
| title | string (max 100) | Yes | - | Primary title shown to user | "Order Confirmed" |
| subtitle | string (max 100) | No | - | Secondary line below title | "Payment received" |
| body | string (max 500) | No | - | Longer descriptive text | "Your order #12345 has been confirmed" |
| bucketId | string | Yes | - | Bucket UUID or name; name will be resolved server-side | "d3f0..." or "Marketing" |
| deliveryType | enum NotificationDeliveryType | Yes | - | Delivery strategy (e.g. NORMAL, SILENT, CRITICAL if supported) | "NORMAL" |
| attachments | AttachmentDto[] | No | [] | Rich media attachments (see attachment fields) | See below |
| actions | ActionDto[] | No | [] | Array of interactive actions/buttons | See below |
| tapAction | ActionDto | No | - | Primary action when user taps message | `{ "type":"NAVIGATE", "value":"/orders/123" }` |
| sound | string | No | - | Custom sound identifier | "ping.aiff" |
| addMarkAsReadAction | boolean | No | false | Adds a predefined "Mark as Read" action | true |
| addOpenNotificationAction | boolean | No | false | Adds a predefined "Open" action | true |
| addDeleteAction | boolean | No | false | Adds a predefined "Delete" action | true |
| snoozes | number[] | No | [] | Allowed snooze durations (minutes) | [5,10,30] |
| locale | string | No | - | Locale override for client rendering | "en-EN" |
| groupId | string | No | bucketId | Logical group for stacking | "orders" |
| collapseId | string | No | - | APNs collapse identifier (replaces by same id) | "order-update-123" |
| userIds | string[] | No | All bucket users | Target subset of users (IDs or usernames) | ["user-uuid-1","user-uuid-2"] |
| imageUrl | string | No | - | Shortcut: creates image attachment automatically | "https://.../image.png" |
| videoUrl | string | No | - | Shortcut: creates video attachment automatically | "https://.../clip.mp4" |
| gifUrl | string | No | - | Shortcut: creates GIF attachment automatically | "https://.../fun.gif" |
| tapUrl | string | No | - | Shortcut: sets tapAction to NAVIGATE with this URL | "https://app.zentik.app/orders/123" |

AttachmentDto fields:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| mediaType | enum MediaType | Yes | IMAGE, VIDEO, GIF, DOCUMENT, etc. |
| name | string | No | Friendly filename / label |
| url | string | Cond. | Provide either url or attachmentUuid |
| attachmentUuid | string | Cond. | Server-stored attachment reference |
| saveOnServer | boolean | No | If true with url, server persists a copy |

ActionDto fields (used in actions, tapAction):

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| type | enum NotificationActionType | Yes | e.g. NAVIGATE, OPEN_URL, DISMISS |
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
- title ≤ 100 chars; subtitle ≤ 100; body ≤ 500.
- Each attachment/action object validated individually; unknown fields ignored.
- Invalid JSON in stringified arrays will cause a validation error.ƒ

---
For advanced features (custom actions, multiple attachments, snooze, media types) visit the <a href="/scalar" target="_blank" rel="noopener">full API Reference ↗</a>.
