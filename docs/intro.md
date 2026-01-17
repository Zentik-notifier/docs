---
sidebar_position: 1
title: Introduction
---

import Carousel from '@site/src/components/Carousel';
import MediaViewer from '@site/src/components/MediaViewer';
import TwoColumnLayout from '@site/src/components/TwoColumnLayout';

Zentik is another notifier system, yes another one. Why did I create it? I was looking for a versatile system to use the potential of iOS push notifications and to be able to interface any of my system. I tried all of them but no one had all the functionalities I was looking for. My main issues were:
- Limited possibilities to have custom actions on the push notifications
- Limited amount of attachments to be sent on a notification
- I had to adapt the system to send the notifications, or have a server in the middle to translate messages

---

## Main functionalities
- Mobile focused, especially iOS, to show very rich notifications with multiple attachments and custom actions
- Versatile, send any kind of notifications from any system, any method, any payload. Create your own mappers to shape the notifications.
- Full configurability of notifications. Add any action you would like to, many builtin included: znooses, postpones, repeat-until-confirm, and many more
- Self hostable!

### Backend
Based on NestJS, it contains the whole system of notifications orchestration to all main providers (iOS, Android, Web) and will interface with clients via REST and GQL, you could potentially write your own client. The Zentik principal backend will contain all the tools to send notifications to all the devices (certificates, configurations, problems.), but no worries! Self-hosted will be able to passthrough notifications to the main Zentik server to dispatch them on their behalf, request a token [here](https://notifier.zentik.app/self-service/token-requests). The system ensures a short live for both notifications and attachments. Notifications will be deleted as soon as all the devices have acked the receipt (max 7 days), attachments will be deleted as well after 7 days

### Frontend
Based on React native (Expo). Zentik will offer official iOS and Android apps. Self hosters will be able to use them configuring the app to point to their own server, or just use the onboarded self hosted PWA instance.
Mobile will make massive use of SQLlite (iOS/Android) and IDB (Web/PWA) to store data. All notifications and medias will be retained locally for a configurable amount of time, your devices will be the source of truth, not the server. The server will retain only the metadata required to all your devices.

## First Steps

Follow these initial actions to get a working end‑to‑end notification in seconds:

1. **Access the app** – Get the mobile app ([iOS](https://testflight.apple.com/join/dFqETQEm)) or access the PWA ([Official one](https://notifier.zentik.app) or your onboarded self hosted) and register to the platform
2. **Go through the onboarding** – An onboarding will be shown right away to go through the main steps
3. **Create a new bucket** – Create a new Bucket, it will be the target for your notifications, it will identify one of your system. 
Check the magic code, it will allow to send notifications with one single identifier, or check the token creation checkbox, it will automatically generate a token specific for the newly created bucket
4. **Send your first notification** – Head to the settings page, straight to bucket. Selecting the newly created bucket you will see the list of access tokens usable with the bucket. Click on the second button and check all the possible endpoints usable 

---

### See it in action

<TwoColumnLayout
  left={
    <Carousel
      items={[
        { type: 'image', src: '/img/login-page.png', alt: 'Login page', description: 'Login to your Zentik account' },
        { type: 'image', src: '/img/login.png', alt: 'Login page', description: 'Login with SSOs' },
        { type: 'image', src: '/img/ios-push-notification.jpg', alt: 'iOS rich push notification', description: 'Rich notifications with attachments' }
      ]}
    />
  }
  right={
    <MediaViewer
      type="video"
      src="/video/onboarding.mp4"
      description="Onboarding experience"
    />
  }
/>

## Next Steps
1. Start sending messages: [Notifications](./notifications)
2. Configure your experience: [Settings](./settings)
3. Deploy or try locally: [Self-hosted Installation](./self-hosted/installation)

---

> Need a feature? Open a discussion or propose a PR — Zentik is community‑driven. Join the Discord: [discord.gg/DzhJ4s7N](https://discord.gg/DzhJ4s7N)

_This overview will evolve; feel free to suggest improvements._
