---
title: Creation
---

import MediaViewer from '@site/src/components/MediaViewer';

# Bucket Creation

Before integrating Zentik with external services, you need to create a bucket and obtain the necessary credentials. This section explains how to create buckets, generate access tokens, and configure them for use with various services.

## Overview

A **bucket** is a container for notifications in Zentik. Each bucket can have:
- A **Bucket ID** (UUID) - unique identifier for your bucket
- An **Access Token** - used for authenticated API calls
- A **Magic Code** - a simple, authentication-free way to identify your bucket
- Optional **presets** - pre-configured templates for specific services

## Creating a Bucket

To create a new bucket:

1. Log in to your Zentik account
2. Navigate to the **Buckets** section
3. Click **Create Bucket** or use the onboarding flow
4. Choose a name for your bucket
5. (Optional) Select a **preset** if available (e.g., "Servarr", "Home Assistant", etc.) to get pre-configured settings

<MediaViewer
  type="video"
  src="/video/bucket_creation.mp4"
  description="Creating a bucket in Zentik"
/>

## Generating Credentials

After creating a bucket, you can obtain credentials in two ways:

### Magic Code

The Magic Code is a simple, human-readable identifier that doesn't require authentication. To enable it:

1. Open your bucket settings
2. Enable **Magic Code**
3. Copy the generated code (keep it secure, as it doesn't require authentication)

### Access Token

Access Tokens provide authenticated access to your bucket. To generate one:

1. Open your bucket settings
2. Go to the **Access Tokens** section
3. Click **Generate New Token**
4. Copy both the **Bucket ID** and **Access Token** (you'll need both)

> **Security Note**: Treat your Magic Code and Access Token like passwords. Never commit them to version control or share them publicly.

## Using Credentials

Depending on your integration, you can use either authentication method:

- **Magic Code**: Use for simple integrations via `?magicCode=<your-magic-code>`
- **Bucket ID + Access Token**: Use for authenticated requests with `Authorization: Bearer <token>` header

Both methods are secure, but Magic Code is more convenient for simple webhook integrations that don't support custom headers.

## Linking to external systems

You can connect a bucket to an **external notification system** (e.g. [NTFY](/docs/integrations/ntfy)) so that Zentik subscribes to a topic or channel and delivers those messages as notifications in the bucket. You can also send notifications from Zentik to the same external system.

To link a bucket to an external system:

1. **Create an external system** (if you haven’t already) in your Zentik settings. Add a system of the desired type (e.g. NTFY), set its **base URL** and, if the service requires it, **auth** (user/password or token).
2. **Edit the bucket** and set **External notify system** to that system.
3. **Set the channel** (e.g. **External system channel**): for NTFY this is the topic name; for other systems it may be a channel ID or similar. This identifies the stream you subscribe to and, when sending from Zentik, the target you publish to.

After saving, Zentik will subscribe to the configured channel. Incoming messages are created as notifications in the bucket; notifications you send to the bucket can be published to the same channel (behavior depends on the integration).

For step-by-step and supported parameters per system, see the integration docs (e.g. [NTFY](/docs/integrations/ntfy), [Gotify](/docs/integrations/gotify)).
