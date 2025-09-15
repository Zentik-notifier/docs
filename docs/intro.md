---
sidebar_position: 1
title: Introduction
---

Zentik is a **native‑first notification hub** providing secure, multi‑channel delivery (mobile + web) with a self‑hostable backend and an offline‑capable mobile client. This page gives you a concise architectural overview before you dive into specific guides.

> Goal: Deliver the right message to the right device, exactly once, with strong guarantees on security, retention and observability.

---

## Core Concepts

| Concept | Summary |
|---------|---------|
| Channel Abstraction | Unified model for APNs (iOS), FCM (Android), Web Push + future channels. |
| Device Intelligence | Per‑device capability flags (rich media, actions, background fetch) drive payload shaping. |
| Secure Payload Flow | Optional end‑to‑end encrypted “passthrough” messages + provider‑level transport encryption. |
| Minimal Retention | Messages & attachments retained only until confirmed delivery to all target devices or max 7 days. |
| Multi Auth Models | Public & private OAuth providers + system access tokens + email links for critical flows. |
| Extensibility | Webhooks, GraphQL schema, and modular domain packages allow controlled extension. |

---

## High-level Architecture

```
Client (iOS / Android / Web)  <--->  API (REST / GraphQL)
					  | 
			Domain Layer (NestJS Modules)
					  |
		Provider Adapters (APNs / FCM / Web Push)
					  |
		   External Delivery Networks
```

**Backend** exposes REST + GraphQL, orchestrates device registration, encryption, routing, and persistence. **Frontend (mobile)** focuses on a rich native experience, local caching and secure rendering of payloads & attachments.

---

## Backend Architecture

Built with **NestJS (TypeScript)** leveraging modular, strongly‑typed domains and dependency inversion.

### Key Building Blocks

- **Flexible notification delivery**
- **Retention policy**
- **Authentication (email flows + public/private OAuth providers)**
- **APN / FCM / Web Push support (passthrough for self‑hosted)**
- **Self hostable**

---

## Frontend (Mobile) Architecture

Implemented with **React Native + Expo** (native‑first orientation), focusing on resilience, offline usability and advanced notification UX.

### Strengths

- **Local Caching (SQLite)**: Messages, metadata and attachments cached for offline viewing and fast cold starts.
- **Optimistic & Offline‑first**: Outgoing user actions queued locally and synchronized when connectivity returns.
- **Rich Native Presentation**: Support for actionable notifications, deep links, category mapping, rich (multiple) media preview, silent/background updates.
- **Secure Storage Segmentation**: Sensitive tokens / encryption material separated from general cache.
- **Background Sync Hooks**: Periodic wake to reconcile acknowledgements & fetch newly available attachments.

---

## First Steps

Follow these initial actions to get a working end‑to‑end notification in seconds:

1. **Access the app** – Log into the mobile (TestFlight) or forthcoming web client with your account.
2. **Create a new bucket** – Buckets group users/devices for targeted delivery (e.g. "engineering", "beta-testers").
3. **Create a new access token** – Generate a new token for server‑to‑server or CLI usage.
4. **Send your first notification** – Use the Notifications guide or the `Notification settings` section on app to send a test notification.

<!-- ![First steps demo placeholder](/img/first-steps-demo.gif) -->

---

## Next Steps
1. Start sending messages: [Notifications](./notifications)
2. Manage application identities: [Applications](./applications)
3. Configure delivery & retention: [Retention Policy](./retention-policy)
4. Configure your experience: [Settings](./settings)
5. Explore real-time & webhooks: [Webhooks](./webhooks)

---

> Need a feature? Open a discussion or propose a PR — Zentik is community‑driven. Join the Discord: [discord.gg/DzhJ4s7N](https://discord.gg/DzhJ4s7N)

_This overview will evolve; feel free to suggest improvements._
