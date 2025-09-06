---
sidebar_position: 3
---

# Notifications - API Reference

This section describes in detail how to use Zentik's notification endpoints, including all possible values and available configurations.

## Authentication

Before using the notification endpoints, you need to authenticate with the system. Zentik supports two authentication methods:

### 1. Username/Password Authentication

#### Login via REST API
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "username": "username"
  }
}
```

#### Login via GraphQL
```graphql
mutation Login($input: LoginDto!) {
  login(input: $input) {
    accessToken
    refreshToken
    user {
      id
      email
      username
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "email": "user@example.com",
    "password": "your_password"
  }
}
```

### 2. Access Token Authentication

#### Creating Access Tokens via REST
```bash
POST /access-tokens
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "API Integration",
  "expiresAt": "2024-12-31T23:59:59Z",
  "scopes": ["messages:create", "notifications:read"]
}
```

**Response:**
```json
{
  "token": "zat_abc123def456...",
  "id": "token-uuid",
  "name": "API Integration",
  "expiresAt": "2024-12-31T23:59:59Z",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Creating Access Tokens via GraphQL
```graphql
mutation CreateAccessToken($input: CreateAccessTokenDto!) {
  createAccessToken(input: $input) {
    token
    id
    name
    expiresAt
    createdAt
  }
}
```

**Variables:**
```json
{
  "input": {
    "name": "API Integration",
    "expiresAt": "2024-12-31T23:59:59Z",
    "scopes": ["messages:create", "notifications:read"]
  }
}
```

#### Using Access Tokens
```bash
Authorization: Bearer zat_<raw-token>
```

**Format**: `zat_` followed by the raw token (32 hexadecimal characters)

**Note**: Access tokens can also be created directly from the mobile application in the user settings section.

## Main Endpoints

### 1. Notification Creation

#### POST `/messages`
Creates a new notification and sends push notifications to users of the specified bucket.

**Authentication**: Requires JWT token or User Access Token

**Supported Content-Types**:
- `application/json`
- `application/x-www-form-urlencoded`
- `text/plain`

**Rate Limiting**: Configurable via environment variables
- `RATE_LIMIT_MESSAGES_RPS`: Requests per second (default: 10)
- `RATE_LIMIT_MESSAGES_TTL_MS`: Time interval in milliseconds (default: 1000)

#### POST `/messages/with-attachment`
Creates a notification with file attachment. Supports multipart/form-data upload.

### 2. GraphQL Endpoints

#### Mutation `createMessage`
```graphql
mutation CreateMessage($input: CreateMessageDto!) {
  createMessage(input: $input) {
    id
    title
    body
    bucketId
    createdAt
    # ... other fields
  }
}
```

## Input Parameters

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | string | Notification title (max 100 characters) | "New message" |
| `bucketId` | string | Destination bucket ID | "bucket-uuid" |
| `deliveryType` | enum | Delivery type | `NORMAL` |

### Optional Fields

#### Content
| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `subtitle` | string | Subtitle (max 100 characters) | "Important update" |
| `body` | string | Message body (max 500 characters) | "Detailed content..." |
| `locale` | string | Notification language | "en-US" |

#### Actions and Interactions
| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `addMarkAsReadAction` | boolean | Adds "Mark as read" action | `true` |
| `addOpenNotificationAction` | boolean | Adds "Open notification" action | `true` |
| `addDeleteAction` | boolean | Adds "Delete" action | `false` |

#### Custom Actions
| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `actions` | array | List of custom actions | See Actions section |
| `tapAction` | object | Action executed on tap | See Actions section |

#### Attachments
| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `attachments` | array | List of multimedia attachments | See Attachments section |

#### Advanced Configuration
| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `sound` | string | Custom sound | "notification.wav" |
| `snoozes` | array | Snooze times in hours | `[2, 4, 8]` |

## Delivery Types

### NotificationDeliveryType

| Value | Description | Behavior |
|-------|-------------|----------|
| `SILENT` | Silent notification | No sound, badge only |
| `NORMAL` | Standard notification | Normal sound and vibration |
| `CRITICAL` | Critical notification | High priority, bypasses silent mode |

## Notification Actions

### NotificationActionType

| Type | Description | Usage |
|------|-------------|-------|
| `NAVIGATE` | Internal navigation | Opens specific app screen |
| `BACKGROUND_CALL` | Background call | External service integration |
| `MARK_AS_READ` | Mark as read | Updates notification status |
| `SNOOZE` | Snooze notification | Postpones for specific hours |
| `OPEN_NOTIFICATION` | Open notification | Shows complete details |
| `WEBHOOK` | Webhook call | Notifies external server |
| `DELETE` | Delete notification | Removes from system |

### Action Structure
```json
{
  "type": "NAVIGATE",
  "value": "/(mobile)/notifications",
  "destructive": false,
  "icon": "arrow-right",
  "title": "Open Notifications"
}
```

## Multimedia Attachments

### MediaType

| Type | Description | Supported Extensions |
|------|-------------|---------------------|
| `VIDEO` | Video files | mp4, mov, avi |
| `IMAGE` | Images | jpg, png, gif |
| `GIF` | GIF animations | gif |
| `AUDIO` | Audio files | mp3, wav, aac |
| `ICON` | Icons | png, svg |

### Attachment Structure
```json
{
  "mediaType": "IMAGE",
  "name": "Screenshot",
  "url": "https://example.com/image.jpg",
  "saveOnServer": true
}
```

**Notes**:
- `url`: External attachment URL
- `attachmentUuid`: UUID of already saved attachment in the system
- `saveOnServer`: If `true`, saves attachment locally

## Multiple Data Sources

The `/messages` endpoint supports sending data from multiple sources with priority:

1. **HTTP Headers** (`x-message-*`) - Highest priority
2. **Path Parameters** - Second priority  
3. **Query Parameters** - Third priority
4. **Body** - Lowest priority

### Header Examples
```bash
x-message-title: "Title via header"
x-message-body: "Body via header"
x-message-bucket-id: "bucket-uuid"
x-message-delivery-type: "CRITICAL"
```

## Practical Examples

### Simple Notification
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Welcome!",
    "body": "Thank you for installing Zentik",
    "bucketId": "bucket-uuid",
    "deliveryType": "NORMAL"
  }'
```

### Notification with Actions
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Order",
    "body": "Order #12345 confirmed",
    "bucketId": "bucket-uuid",
    "deliveryType": "NORMAL",
    "actions": [
      {
        "type": "NAVIGATE",
        "value": "/(mobile)/orders/12345",
        "destructive": false,
        "icon": "shopping-cart",
        "title": "View Order"
      }
    ],
    "addMarkAsReadAction": true
  }'
```

### Notification with Attachment
```bash
curl -X POST http://localhost:3000/api/messages/with-attachment \
  -H "Authorization: Bearer <token>" \
  -F "title=New Image" \
  -F "body=Image shared in bucket" \
  -F "bucketId=bucket-uuid" \
  -F "deliveryType=NORMAL" \
  -F "attachment=@image.jpg"
```

### Notification via Headers
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Authorization: Bearer <token>" \
  -H "x-message-title: Notification via Header" \
  -H "x-message-body: Content via header" \
  -H "x-message-bucket-id: bucket-uuid" \
  -H "x-message-delivery-type: CRITICAL"
```

## Error Handling

### Common Response Codes

| Code | Description | Solution |
|------|-------------|----------|
| `400` | Invalid data | Verify format and required values |
| `401` | Unauthorized | Verify authentication token |
| `403` | Access denied | Verify bucket permissions |
| `404` | Bucket not found | Verify bucket ID |
| `429` | Rate limit exceeded | Slow down request frequency |
| `500` | Internal error | Contact support |

### Input Validation

- **Title**: Required, max 100 characters
- **Body**: Optional, max 500 characters  
- **BucketId**: Required, valid UUID format
- **DeliveryType**: Required, valid enum value
- **Attachments**: Valid object array if provided

## Best Practices

1. **Rate Limiting**: Respect configured limits
2. **Validation**: Always verify data before sending
3. **Error Handling**: Handle errors appropriately
4. **Logging**: Maintain operation logs for debugging
5. **Security**: Use HTTPS in production
6. **Token Management**: Regularly rotate access tokens
