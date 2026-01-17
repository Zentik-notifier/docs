---
sidebar_position: 14
---

import ApiAuthMethods from '@site/src/components/ApiAuthMethods';

# Template Messages

Template messages allow you to define reusable message structures with placeholders, which are then populated dynamically using data provided at runtime.

## How It Works
1. You create a **User Template** (via API or UI) defining the title, subtitle, and body with Handlebars-style placeholders (e.g., `{{variable}}`).
2. You POST to `/template` including:
   - `template`: The name or UUID of the template to use (query param).
   - `bucketId` or `magicCode`: Target bucket (query param).
   - Body: A JSON object containing the values for the placeholders.
3. Zentik renders the final message content by merging the template with the data.
4. The message is delivered as normal.

## Creating Templates
Templates are stored as `UserTemplate` entities. They can be managed via the GraphQL API or the web interface.

A template consists of:
- **Name**: Unique identifier for the template.
- **Title**: Template for the message title.
- **Subtitle**: Template for the message subtitle (optional).
- **Body**: Template for the message body.

## Using Templates in Messages

To send a message using a template, use the dedicated endpoint:

**POST** `/template`

### Parameters

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `template` | String | Query | The **name** or **UUID** of the template to use. |
| `bucketId` | String | Query | Target bucket ID (required if not using magicCode). |
| `magicCode` | String | Query | Magic code (alternative to bucketId + token). |
| Body | JSON | Body | Key-value pairs to populate the template placeholders. |

### Example

Assuming you have a template named `welcome-alert` with:
- Title: `Welcome {{username}}!`
- Body: `Your account was created on {{date}}.`

You can send a message using this template:

<ApiAuthMethods 
  endpoint="/template?template=welcome-alert&deliveryType=CRITICAL&imageUrl=https://example.com/image.png"
  method="POST"
  headers='-H "Content-Type: application/json"'
  body='{"username":"Alice","date":"2023-10-27"}'
/>

This will result in a message with:
- Title: "Welcome Alice!"
- Body: "Your account was created on 2023-10-27."
- Delivery Type: CRITICAL
- Image: https://example.com/image.png

## Template Data Sources
Data for templates can come from:
1. The JSON body (as shown above).
2. Query parameters or Headers starting with `template-` (e.g., `?template-username=Alice` becomes `username: "Alice"` in the data).
3. Other message parameters can also be passed via query params (e.g. `deliveryType`, `imageUrl`, `priority`, `sound`).

### Example with Query Params
```bash
curl -X POST "https://your-public-url/template?template=welcome-alert&bucketId=<bucket-uuid>&template-username=Bob&template-date=2023-10-28&deliveryType=CRITICAL&sound=alert.mp3" \
  -H "Authorization: Bearer <jwt-access-token>"
```

### Example with Headers
You can also pass template variables via headers using the `x-message-template-` prefix.

```bash
curl -X POST "https://your-public-url/template?template=welcome-alert&bucketId=<bucket-uuid>" \
  -H "Authorization: Bearer <jwt-access-token>" \
  -H "x-message-template-username: Charlie" \
  -H "x-message-template-date: 2023-10-29" \
  -H "x-message-deliveryType: CRITICAL"
```
