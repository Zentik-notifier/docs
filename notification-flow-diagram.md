# Notification Flow: Ntfy → Zentik → APN → App

```mermaid
flowchart LR
    subgraph SelfHosted["Self-Hosted"]
        Ntfy["Ntfy<br/>(self-hosted)"]
        Backend["Zentik Backend<br/>(self-hosted)"]
    end

    subgraph Cloud["Zentik Cloud"]
        ZentikCloud["Zentik Cloud"]
    end

    subgraph Apple["Apple"]
        APN["APNs<br/>(Apple Push Notification service)"]
    end

    subgraph Device["User Device"]
        App["Zentik App<br/>(decryption)"]
    end

    Ntfy -->|"1. SSE"| Backend
    Backend -->|"2. Encrypted payload"| ZentikCloud
    ZentikCloud -->|"3. Encrypted payload"| APN
    APN -->|"4. Encrypted payload"| App
    App -->|"5. Decrypt & display"| App
```

## Detailed Flow

| Step | From | To | Payload State |
|------|------|-----|---------------|
| 1 | Ntfy | Zentik Backend | SSE (Server-Sent Events) |
| 2 | Zentik Backend | Zentik Cloud | **Encrypted** |
| 3 | Zentik Cloud | APNs | **Encrypted** |
| 4 | APNs | Zentik App | **Encrypted** |
| 5 | Zentik App | — | **Decrypted** (displayed to user) |
