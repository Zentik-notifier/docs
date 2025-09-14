---
sidebar_position: 12
---
# Delivery Types

Understanding how `NotificationDeliveryType` influences user experience and platform behavior.

## Enum Values

| Value | Behavior | Typical Use | Notes |
|-------|----------|-------------|-------|
| `SILENT` | No alert sound / minimal visual interruption | Background sync, counters, passive updates | Still stored & retrievable; may not wake device |
| `NORMAL` | Standard notification delivery | Most product messages | Default choice |
| `CRITICAL` | High-priority; may bypass Do Not Disturb / focus (platform permitting) | Security incident, urgent operational alert | Use sparingly; abuse can reduce trust |

## Choosing the Right Type
- Prefer `NORMAL` unless clear UX reason otherwise.
- Use `SILENT` for frequently changing state (e.g. progress) to avoid user fatigue.
- Reserve `CRITICAL` for actionable, time-sensitive issues.

## Platform Notes
- Actual platform enforcement for `CRITICAL` depends on OS/device capabilities and user settings.
- Overuse of high-priority alerts can lead users to disable notifications entirely.

## Example
```jsonc
{
  "title": "Backup Completed",
  "bucketId": "<bucket-uuid>",
  "deliveryType": "SILENT"
}
```

---
Return to main notifications: [Notifications Overview](../notifications)
