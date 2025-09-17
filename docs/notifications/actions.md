---
sidebar_position: 11
---
# Actions

Detailed reference for `NotificationActionType` and how actions are generated, displayed and processed.

## Action Types

Each action adds an interactive capability to a delivered message. Below are the allowed `type` values, the expected `value` format (when applicable) and the intended effect. Client implementations may vary; this section is agnostic of a specific mobile/web codebase.

| Type | Value Required | Value Format / Examples | Effect |
|------|----------------|-------------------------|--------|
| `NAVIGATE` | Yes | Internal path (`/orders/123`) or external URL (`https://example.com`) | Opens a screen (internal) or external link. |
| `OPEN_NOTIFICATION` | Optional | Notification ID (e.g. `550e8400-e29b...`) | Opens the detailed view of that notification (or inbox if empty). |
| `MARK_AS_READ` | Yes | Arbitrary non-empty token (e.g. `mark_as_read_notification`) | Marks the notification/message as read. |
| `DELETE` | Yes | Arbitrary non-empty token (e.g. `delete_notification`) | Removes the notification from the user list. |
| `SNOOZE` | Yes | `<minutes>` (e.g. `5`, `30`) | Temporarily hides the notification for the specified minutes. |
| `WEBHOOK` | Yes | Webhook ID or identifier (UUID) | Triggers a configured outbound webhook. |
| `BACKGROUND_CALL` | Yes | `METHOD::URL` (e.g. `GET::https://api.example.com/ping`) | Invokes a background HTTP request without opening UI. |

Guidelines:
- `value` must match the format listed; clients that do not understand the format may ignore the action.
- For `SNOOZE` provide only values corresponding to allowed durations (also listed in the message `snoozes` array when auto-generated).
- `OPEN_NOTIFICATION` can omit `value` to mean: open the general notifications area.
- Use distinct values to differentiate similar actions if needed; values are opaque to the server except where format is specified.

Minimal JSON shape:
```jsonc
{ "type": "DELETE", "value": "delete_notification" }
```

Optional fields applicable to any action object:
- `title`: Custom button label (string)
- `icon`: Icon identifier (string). On iOS this should be a valid SF Symbol name, e.g. `sfsymbols:arrow.down.circle`.
- `destructive`: Boolean hint for UI styling (commonly true for `DELETE`)

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
