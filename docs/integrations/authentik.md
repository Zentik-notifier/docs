---
title: Authentik
---

import Carousel from '@site/src/components/Carousel';
import ApiAuthMethods from '@site/src/components/ApiAuthMethods';

# Authentik Integration

## Overview

Zentik integrates with Authentik to send authentication and security event notifications directly to your Zentik-connected devices. When Authentik detects login events, security issues, or other authentication-related activities, you'll receive rich notifications on your mobile devices.

Zentik automatically parses and transforms Authentik webhook payloads, so no manual mapping is required. Simply configure the webhook URL and Zentik will handle the rest.

## Prerequisites

Before proceeding, ensure you have:

- ✅ A Zentik account
- ✅ Authentik installed and running
- ✅ A bucket created with an **Access Token** generated (or Magic Code enabled)

For detailed instructions on creating a bucket and generating credentials, see [Bucket Creation](../notifications/bucket-creation.md).

## Create a Bucket with Access Token

First, you need to create a bucket in Zentik and obtain your credentials:

1. Create a new bucket in Zentik (or use an existing one)
2. Navigate to your bucket settings
3. Choose one of the following authentication methods:
   - **Option 1**: Generate an **Access Token**:
     - Go to the **Access Tokens** section
     - Click **Generate New Token**
     - Copy both the **Bucket ID** and **Access Token**
   - **Option 2**: Enable **Magic Code**:
     - Enable **Magic Code** in your bucket settings
     - Copy the generated code

> **Note**: Make sure to save your credentials securely, as Access Tokens won't be shown again after generation.

## Configure in Authentik

Configure Zentik as a webhook notification transport in Authentik:

1. Open your Authentik dashboard
2. Go to **Applications** → **Notification transports** (or **System** → **Notification transports**)
3. Click **Create** to create a new notification transport
4. Configure the transport:
   - **Name**: Give your transport a descriptive name (e.g., "Zentik Notifications")
   - **Mode**: Select **Webhook (generic)**
   - **Webhook URL**: Build the webhook URL:
     
     <ApiAuthMethods 
       endpoint="https://notifier-api.zentik.app/transform?parser=ZENTIK_AUTHENTIK"
       method="POST"
     />
5. Click **Save** to create the transport
6. Click **Test** to send a test notification and verify the integration is working

<Carousel
  items={[
    { type: 'image', src: '/authentik/1.png', alt: 'Navigate to Notification transports', description: 'Go to Notification transports in Authentik' },
    { type: 'image', src: '/authentik/2.png', alt: 'Configure webhook transport', description: 'Create a new webhook transport with Zentik URL' }
  ]}
/>

> **Note**: The `parser=ZENTIK_AUTHENTIK` parameter tells Zentik to automatically parse and transform the Authentik webhook payload into a formatted Zentik notification. No additional mapping configuration is needed.

## Assign to Notification Rules

After creating the transport, you need to assign it to the notification rules where you want to receive Authentik events:

1. Go to **Applications** → **Notification rules** (or **System** → **Notification rules**)
2. Select or create a notification rule
3. In the rule settings, select your Zentik transport in the **Transports** field
4. Configure which events should trigger notifications (login success, login failure, password reset, etc.)
5. Save the notification rule

The Zentik transport will now send notifications to your Zentik-connected devices for all events matching the notification rule.

## Features

- **Automatic Payload Parsing**: Zentik automatically parses Authentik webhook payloads - no manual mapping required
- **Rich Notifications**: Receive detailed information about authentication events, including user details, IP addresses, and event types
- **Multiple Event Types**: Configure notifications for login events, security alerts, password changes, and more
- **No Manual Mapping**: Zentik handles all payload transformation automatically through the built-in `ZENTIK_AUTHENTIK` parser
- **Reliable Delivery**: Direct integration with Zentik's notification infrastructure

## Resources

- **Bucket Creation Guide**: [How to create buckets and generate credentials](../notifications/bucket-creation.md)
- **Authentik Documentation**: [Official Authentik documentation](https://goauthentik.io/docs/)
- **Transform Parsers**: [Learn more about Zentik parsers](../notifications/transform-parsers.md)
- **Notifications Documentation**: [Learn more about Zentik notifications](../notifications/)
