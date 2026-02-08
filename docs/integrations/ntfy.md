---
title: NTFY
---

# NTFY Integration

## Overview

Zentik can act as a **proxy** between [ntfy](https://ntfy.sh) and your devices. You subscribe to one or more NTFY topics through Zentik: any message published to those topics is delivered as a Zentik notification. You can also send notifications from Zentik to an NTFY topic (they appear in ntfy and on any other subscribers).

- **NTFY → Zentik**: Zentik subscribes to your NTFY topic(s). When someone (or another app) publishes to the topic, Zentik receives the message and creates a notification in the linked bucket.
- **Zentik → NTFY**: When you send a notification to a bucket linked to NTFY, Zentik publishes it to the same topic. Messages sent by Zentik are tagged so they are not re-ingested (no duplicate notifications).

Supported NTFY servers: [ntfy.sh](https://ntfy.sh) or any self-hosted ntfy instance.

## Prerequisites

- A Zentik account
- An NTFY server (public ntfy.sh or your own instance)
- A bucket in Zentik (see [Bucket Creation](../notifications/buckets/creation))

## Procedure: Proxy NTFY to Zentik

### 1. Create an NTFY external system

In Zentik, create an **External notify system** of type **NTFY**:

| Field | Description |
|-------|-------------|
| **Name** | Label for this system (e.g. "NTFY Home") |
| **Base URL** | NTFY server URL, e.g. `https://ntfy.sh` or `http://your-server:8080` |
| **Auth** (optional) | If your topic is protected: **Auth user** + **Auth password**, or **Auth token** (Bearer) |

The base URL must not end with a slash. Example: `https://ntfy.sh`.

### 2. Create or edit a bucket and link it to NTFY

1. Create a new bucket or open an existing one.
2. Set **External notify system** to the NTFY system you created.
3. Set **External system channel** (topic) to the NTFY topic you want to subscribe to, e.g. `my-alerts` or a long random string for privacy (the topic acts as a shared secret).

After saving, Zentik subscribes to that topic. Any message published to it will create a notification in this bucket.

### 3. Publish to the topic from NTFY

Use the NTFY API or CLI to publish to the same topic. Example with curl:

```bash
curl -d "Server is down!" https://ntfy.sh/my-alerts
```

With title and priority:

```bash
curl -H "Title: Alert" -H "Priority: high" -d "Disk full on server-01" https://ntfy.sh/my-alerts
```

If you configured auth on the external system, use the same credentials when publishing (e.g. `-u user:pass` or `-H "Authorization: Bearer YOUR_TOKEN"`).

Messages appear as notifications in the linked Zentik bucket and are delivered to your devices according to bucket and app settings.

### 4. Sending from Zentik to NTFY

When you send a notification to a bucket that is linked to NTFY with a channel (topic), Zentik also publishes that message to the NTFY topic. Other NTFY subscribers (phone app, other integrations) will see it. Zentik adds an internal tag so that the same message is not re-ingested from the subscription (no loop).

## Supported parameters

Parameters that NTFY sends in published messages are mapped to Zentik notifications when the message is received (NTFY → Zentik). Parameters that Zentik sends when publishing to NTFY (Zentik → NTFY) are listed under outgoing.

### Incoming (NTFY → Zentik)

When a message is published to your NTFY topic, the following NTFY fields are supported and mapped into Zentik:

| NTFY parameter | NTFY example / notes | Zentik mapping |
|----------------|------------------------|----------------|
| **Title** | `X-Title` header | Notification title |
| **Message** | Request body | Notification body (or title if no title) |
| **Priority** | `X-Priority` (1–5) | Delivery type: 1–2 → Silent, 3–4 → Normal, 5 → Critical |
| **Tags** | `X-Tags` (comma-separated) | Subtitle (joined as text). Messages with tag `Zentik` are ignored (sent by Zentik). |
| **Click** | `X-Click` URL | Tap action: open URL |
| **Actions** | `X-Actions` | **view** → open URL, **http** → webhook |
| **Attachment** | `X-Attach` or file upload | Image/audio/video attachment (URL or ntfy file URL) |

**Not mapped** from NTFY to Zentik: icon URL (not used due to the bucket icons)

### Outgoing (Zentik → NTFY)

When Zentik publishes to NTFY (notification sent to an NTFY-linked bucket), the following are sent:

| Zentik source | NTFY effect |
|----------------|-------------|
| Title | `X-Title` |
| Body / message | Request body |
| Delivery type | `X-Priority` (Silent→2, Normal→3, Critical→5) |
| Subtitle | `X-Tags` (plus internal `Zentik` tag) |
| Tap action (navigate) | `X-Click` |
| Bucket icon URL | `X-Icon` |
| First image attachment | `X-Attach` |
| Actions | `X-Actions`: NAVIGATE→view, WEBHOOK→http |

## Self-hosted and iOS push (APN)

If you run Zentik **self-hosted** and want to use the **ready-made APN** (Apple Push Notification) infrastructure so that iOS devices receive push without you managing certificates, you need to request a **passthrough token**. Your self-hosted backend will then forward notifications to the Zentik cloud for delivery to iOS. Request a token here: [Self-service token requests](https://notifier.zentik.app/self-service/token-requests).

## Resources

- [ntfy documentation](https://docs.ntfy.sh/) (publish, subscribe, API)
- [Bucket Creation](../notifications/buckets/creation) – create buckets and manage access
- [Notifications](../notifications) – Zentik notification options
