---
title: Scrypted
---

import Carousel from '@site/src/components/Carousel';

# Scrypted Integration

## Overview

Zentik integrates seamlessly with Scrypted to send notifications from your Scrypted automations and devices to your Zentik-connected devices. This allows you to receive rich notifications on your mobile devices when events occur in your Scrypted setup.

The **Advanced Notifier** plugin in Scrypted is fully integrated with Zentik, providing comprehensive notification capabilities. With this integration, you can send multiple media attachments simultaneously in a single notification, making it perfect for security camera feeds, event recordings, and rich media alerts.

## Prerequisites

Before proceeding, ensure you have:

- ✅ A Zentik account
- ✅ Scrypted installed and running
- ✅ A bucket created with an **Access Token** generated

For detailed instructions on creating a bucket and generating access tokens, see [Bucket Creation](../notifications/bucket-creation.md).

## Create a Bucket with Access Token

First, you need to create a bucket in Zentik and generate an access token:

1. Create a new bucket in Zentik (or use an existing one)
2. Navigate to your bucket settings
3. Go to the **Access Tokens** section
4. Click **Generate New Token**
5. Copy both the **Bucket ID** and **Access Token** - you'll need both for the Scrypted configuration

> **Note**: Make sure to save your Access Token securely, as it won't be shown again after generation.

## Install the Plugin

Install the Zentik Notifier plugin in Scrypted:

1. Open your Scrypted dashboard
2. Go to **Plugins** or use the plugin marketplace
3. Search for "Zentik" or "Zentik Notifier"
4. Click **Install** to add the plugin to your Scrypted instance
5. Wait for the installation to complete

<Carousel
  items={[
    { type: 'image', src: '/scrypted/plugin-install.png', alt: 'Install Zentik plugin in Scrypted', description: 'Install the Zentik Notifier plugin from the Scrypted plugin marketplace' }
  ]}
/>

## Configure Credentials

After installing the plugin, configure it with your Zentik bucket credentials:

1. Open the Zentik Notifier plugin in Scrypted
2. Navigate to the plugin settings/configuration page
3. Enter your Zentik credentials:
   - **Bucket ID**: Paste your Zentik bucket ID
   - **Access Token**: Paste your Zentik access token
   - **Server URL** (optional): Your Zentik API endpoint (defaults to `https://notifier-api.zentik.app/messages`)
4. Click **Save** or **Apply** to save the configuration

<Carousel
  items={[
    { type: 'image', src: '/scrypted/plugin-main-screen.png', alt: 'Zentik plugin main screen', description: 'Main configuration screen of the Zentik Notifier plugin' },
    { type: 'image', src: '/scrypted/notifier-creation.png', alt: 'Create notifier in Scrypted', description: 'Create and configure the Zentik notifier with bucket credentials' }
  ]}
/>

## Usage

Once configured, you can use Zentik as a notification provider in your Scrypted automations:

1. Create or edit an automation in Scrypted
2. Add a **Send Notification** action
3. Select **Zentik** as the notification provider
4. Configure your notification message, title, and any additional options
5. Test the automation to verify notifications are being sent

## Testing

To verify the integration is working:

1. Use the **Test** button in the Zentik Notifier plugin settings, or
2. Trigger a test notification from one of your Scrypted automations
3. Check your Zentik-connected devices - you should receive the notification

If you don't receive notifications, verify:
- Your Bucket ID and Access Token are correct
- The plugin is enabled and running
- Your device is connected to Zentik and subscribed to the bucket
- Check Scrypted logs for any errors

## Features

- **Rich Notifications**: Send detailed notifications with titles, messages, and metadata
- **Multiple Media Attachments**: Send multiple images, videos, or other media files simultaneously in a single notification
- **Advanced Notifier Integration**: Full integration with Scrypted's Advanced Notifier plugin for enhanced notification capabilities
- **Automation Integration**: Use Zentik notifications in Scrypted automations and rules
- **Device Targeting**: Target specific users or devices through bucket configuration
- **Reliable Delivery**: Direct integration with Zentik's notification infrastructure

## Resources

- **Bucket Creation Guide**: [How to create buckets and generate credentials](../notifications/bucket-creation.md)
- **Scrypted Documentation**: [Official Scrypted documentation](https://docs.scrypted.app/)
- **Notifications Documentation**: [Learn more about Zentik notifications](../notifications/)
