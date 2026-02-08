---
title: Gotify
---

# Gotify Integration

## Overview

Zentik can act as a **proxy** between [Gotify](https://gotify.net/) and your devices. You link a bucket to a Gotify server and application: messages sent to that application are delivered as Zentik notifications, and you can send notifications from Zentik to Gotify.

- **Gotify → Zentik**: When a message is sent to your Gotify application (via Gotify API or other clients), Zentik can receive it and create a notification in the linked bucket (if you configure a webhook or similar in Gotify pointing to Zentik).
- **Zentik → Gotify**: When you send a notification to a bucket linked to Gotify, Zentik publishes it to your Gotify server using the application token you configured for that bucket.

Supported: any self-hosted [Gotify](https://gotify.net/) instance.

## Where to enter credentials

In Gotify, authentication is **per Application**. You do **not** enter any credentials when creating the external system—only the **Base URL** of your Gotify server.

When you **create or edit a bucket** and link it to Gotify, you must enter the **Application token** in the bucket form (field **"Application token (Gotify)"**). This is the token you get when you create an Application in your Gotify server. Each bucket can use a different application (and thus a different token). The token is stored per (external system + channel) so that multiple buckets can link to the same Gotify server with different applications.

## What is the Channel

The **External system channel** (or **Channel**) is an identifier that ties this bucket to a specific Gotify application. You can use the Gotify **Application ID** (numeric) or any label you prefer (e.g. `alerts`, `backup`). The channel has two roles:

1. **Identify the link**: It distinguishes this bucket’s connection when you have several buckets linked to the same Gotify server. Each bucket should use a distinct channel (e.g. one per Gotify application).
2. **Store the token**: Zentik stores the Application token by (system + channel). When you set the channel and the Application token in the bucket form, that token is used for all messages to/from this bucket for that Gotify application.

Use the same channel value whenever you refer to the same logical “application” (e.g. always `5` for Application ID 5, or always `my-alerts` for your alerts app).

## Prerequisites

- A Zentik account
- A Gotify server (self-hosted)
- A bucket in Zentik (see [Bucket Creation](../notifications/buckets/creation))
- At least one **Application** created in Gotify and its **Application token**

## Procedure: Link Gotify to Zentik

### 1. Create a Gotify external system

In Zentik, create an **External notify system** of type **Gotify**:

| Field | Description |
|-------|-------------|
| **Name** | Label for this system (e.g. "Gotify Home") |
| **Base URL** | Gotify server URL, e.g. `https://gotify.example.com` or `http://your-server:8080` |

Do **not** enter any auth in the external system. Credentials are set per bucket (see step 2).

The base URL must not end with a slash. Example: `https://gotify.example.com`.

### 2. Create or edit a bucket and link it to Gotify

1. Create a new bucket or open an existing one.
2. Set **External notify system** to the Gotify system you created.
3. Set **External system channel** to an identifier for this link (e.g. the Gotify Application ID like `5`, or a label like `my-alerts`). This must be unique among buckets using the same Gotify system if they use different applications.
4. Enter **Application token (Gotify)**: the token of the Gotify Application you want to use for this bucket. You get this token when you create the application in your Gotify server (Application → Create → copy the token).

After saving, Zentik will use this token to publish messages to Gotify when you send notifications to this bucket. If you configure Gotify (or another service) to forward messages to Zentik, incoming messages will appear in this bucket.

### 3. Sending from Zentik to Gotify

When you send a notification to a bucket that is linked to Gotify with a channel and application token, Zentik publishes the message to your Gotify server. The message appears in the Gotify app and for any other clients subscribed to that application.

### 4. Receiving from Gotify to Zentik

To have messages sent to your Gotify application appear in Zentik, you need to configure your Gotify server or another service to forward messages to Zentik (e.g. webhook or custom script). The exact setup depends on your Gotify version and how you want to trigger the forward. The bucket must be linked to Gotify with the correct channel and application token so that Zentik can associate incoming payloads with the right bucket if needed.

## Supported parameters

### Outgoing (Zentik → Gotify)

When Zentik publishes to Gotify (notification sent to a Gotify-linked bucket), the following are sent:

| Zentik source | Gotify effect |
|----------------|---------------|
| Title | `title` |
| Body / message | `message` |
| Delivery type | `priority` (Silent→2, Normal→5, Critical→10) |

### Incoming (Gotify → Zentik)

When a message is received from Gotify and created as a Zentik notification, supported fields are mapped as follows:

| Gotify field | Zentik mapping |
|--------------|----------------|
| `title` | Notification title |
| `message` | Notification body (or title if no body) |
| `priority` | Delivery type (mapped to Silent / Normal / Critical) |

## Resources

- [Gotify documentation](https://gotify.net/docs/) (API, applications, messages)
- [Bucket Creation](../notifications/buckets/creation) – create buckets and manage access
- [Notifications](../notifications) – Zentik notification options
