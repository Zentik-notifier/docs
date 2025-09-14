---
sidebar_position: 11
---
# Actions

Detailed reference for `NotificationActionType` and how actions are generated, displayed and processed.

## Action Types

| Type | Purpose | Backend Behavior | Typical `value` | UI Notes |
|------|---------|------------------|-----------------|----------|
| `NAVIGATE` | Navigate user to in-app route or deep-link | Client interprets value as path/URL | `/orders/123` | Primary tapAction commonly uses this |
| `BACKGROUND_CALL` | Trigger background logic without opening UI | Server/client dispatch to internal handler | `job:refresh-cache` | Should appear subtle (no navigation) |
| `MARK_AS_READ` | Mark related notification/message as read | Backend sets read flag | `mark_as_read_notification` | Often auto-generated via flag |
| `SNOOZE` | Temporarily hide and re-schedule notification | Backend schedules re-delivery after minutes | `snooze_10` | One entry per allowed duration |
| `OPEN_NOTIFICATION` | Open detailed view of notification | Client locates notification by ID | `<notification-id>` | Auto-generated when enabled |
| `WEBHOOK` | Server-side POST to configured endpoint | Backend performs outbound call | `webhook:<id>` | Advanced / admin usage |
| `DELETE` | Delete notification from user inbox | Backend deletes or flags removed | `delete_notification` | Marked destructive |

All values are UPPER_SNAKE_CASE except free-form navigation paths or structured strings.

## Adding Automatic Actions
Flags in the message payload generate actions automatically:

| Flag | Generates | Notes |
|------|-----------|-------|
| `addMarkAsReadAction` | `MARK_AS_READ` | Localized title & platform icon |
| `addOpenNotificationAction` | `OPEN_NOTIFICATION` | Uses notification ID as value |
| `addDeleteAction` | `DELETE` | Marked destructive, platform-specific icon |
| `snoozes` array | Multiple `SNOOZE` | One per duration minutes |

## Manual Actions Array
You can also provide custom `actions` array with objects:
```jsonc
{
  "actions": [
    { "type": "NAVIGATE", "value": "/settings/profile", "icon": "settings", "title": "Profile" },
    { "type": "BACKGROUND_CALL", "value": "job:refresh-metrics" }
  ]
}
```
Conflicts: If you manually add an action of the same logical effect as an auto-generated one, both may appear; avoid duplicates by disabling the flag.

## tapAction
`tapAction` is a single action executed when the notification itself is tapped (not from the buttons row). If absent and `tapUrl` is provided, it is auto-created as a `NAVIGATE`.

## Icons & Localization
Platform-specific icon hints are applied to automatic actions; custom actions should specify `icon` where useful. Titles for auto-generated actions are localized based on `locale`.

## Validation Rules
- `type` must be one of the enum values exactly.
- `value` is required; semantics depend on `type`.
- `destructive` optional, hint for UI styling.
- `icon` & `title` optional; backend does not enforce uniqueness.

## Example Combined
```jsonc
{
  "title": "Security Alert",
  "bucketId": "<bucket-uuid>",
  "deliveryType": "NORMAL",
  "addMarkAsReadAction": true,
  "snoozes": [10,30],
  "tapUrl": "https://app.example.com/security/alerts/abc",
  "actions": [
    { "type": "WEBHOOK", "value": "webhook:notify-admin" },
    { "type": "DELETE", "value": "delete_notification", "destructive": true }
  ]
}
```

---
Return to main notifications: [Notifications Overview](../notifications)
