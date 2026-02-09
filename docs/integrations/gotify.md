---
title: Gotify
---

# Gotify Integration

## Overview

Zentik can act as a **proxy** between [Gotify](https://gotify.net/) and your devices. You link a bucket to a Gotify server: messages sent to Gotify can be received as Zentik notifications, and you can send notifications from Zentik to Gotify.

- **Gotify → Zentik**: When a message is sent to your Gotify application (via Gotify API or other clients), Zentik can receive it and create a notification in the linked bucket. To receive messages, you configure a **client token** on the Gotify external system (see below).
- **Zentik → Gotify**: When you send a notification to a bucket linked to Gotify, Zentik publishes it to your Gotify server.

Supported: any self-hosted [Gotify](https://gotify.net/) instance.

## Where to enter credentials

When you create or edit the Gotify external system, you can set a **Client token**. This is a token from Gotify **Clients**. Zentik uses it to open the Gotify WebSocket stream and receive messages from Gotify. See [How to register a new client token (Gotify)](#how-to-register-a-new-client-token-gotify) for how to create one. No token is entered at bucket level.

## What is the Channel

The **External system channel** (or **Channel**) is an identifier that ties this bucket to a specific Gotify application. You can use the Gotify **Application ID** (numeric) or any label you prefer (e.g. `alerts`, `backup`). It distinguishes this bucket’s connection when you have several buckets linked to the same Gotify server. Each bucket should use a distinct channel (e.g. one per Gotify application).

Use the same channel value whenever you refer to the same logical “application” (e.g. always `5` for Application ID 5, or always `my-alerts` for your alerts app).

## How to register a new client token (Gotify)

To **receive** messages from Gotify in Zentik (stream/subscription), Zentik uses a **client token**. You create it in Gotify under **Clients**:

1. Open your Gotify server in the browser (e.g. `https://gotify.example.com`).
2. Log in if required.
3. Go to **Clients** (in the main menu or dashboard).
4. Click **Create client** (or **Add client**).
5. Enter a **Name** for the client (e.g. "Zentik" or "Zentik stream"). This is only for display in Gotify.
6. Click **Create** (or **Save**).
7. Gotify shows the **client token**. **Copy it** and store it safely.

In Zentik, when you **create or edit the Gotify external system** (step 1 of the procedure below), enter this token in the **Client token** field. Zentik uses it to open the Gotify WebSocket stream and receive messages.

## Prerequisites

- A Zentik account
- A Gotify server (self-hosted)
- A bucket in Zentik (see [Bucket Creation](../notifications/buckets/creation))
- A **Client** created in Gotify and its **client token** to receive messages (see [How to register a new client token (Gotify)](#how-to-register-a-new-client-token-gotify))

## Procedure: Link Gotify to Zentik

### 1. Create a Gotify external system

In Zentik, create an **External notify system** of type **Gotify**:

| Field | Description |
|-------|-------------|
| **Name** | Label for this system (e.g. "Gotify Home") |
| **Base URL** | Gotify server URL, e.g. `https://gotify.example.com` or `http://your-server:8080` |
| **Client token** | Required to receive messages from Gotify (stream). See [How to register a new client token (Gotify)](#how-to-register-a-new-client-token-gotify) above. |

The base URL must not end with a slash. Example: `https://gotify.example.com`.

### 2. Create or edit a bucket and link it to Gotify

1. Create a new bucket or open an existing one.
2. Set **External notify system** to the Gotify system you created.
3. Set **External system channel** to an identifier for this link (e.g. the Gotify Application ID like `5`, or a label like `my-alerts`). This must be unique among buckets using the same Gotify system if they use different applications.

After saving, when you send notifications to this bucket Zentik will publish them to Gotify. If you set a client token on the external system, messages received from Gotify (stream) will appear in the linked bucket.

### 3. Sending from Zentik to Gotify

When you send a notification to a bucket that is linked to Gotify (with a channel), Zentik publishes the message to your Gotify server. The message appears in the Gotify app and for any other clients subscribed to that application.

### 4. Receiving from Gotify to Zentik

With a **client token** set on the Gotify external system, Zentik opens the Gotify WebSocket stream and receives messages. Incoming messages are associated with the right bucket via the channel. To have messages sent to your Gotify application appear in Zentik, ensure the bucket is linked to Gotify with the correct channel; no extra configuration is needed beyond the client token on the external system.

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
