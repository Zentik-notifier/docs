---
title: Sharing
---

import MediaViewer from '@site/src/components/MediaViewer';

# Bucket Sharing

Buckets can be shared with other users to enable collaborative notification management. Zentik provides two flexible sharing mechanisms: sharing via user identifier and sharing via redeem code.

## Overview

When you share a bucket, the recipient gains access to:
- View all notifications in the bucket
- Receive notifications sent to the bucket
- Manage notifications (mark as read/unread, delete, etc.)

The bucket owner maintains full control and can revoke access at any time.

## Sharing Methods

### Sharing via User Identifier

This method allows you to share a bucket directly with another Zentik user by their user identifier (email or username).

**How it works:**

1. Open your bucket settings
2. Navigate to the **Sharing** section
3. Enter the user identifier (email or username) of the person you want to share with
4. Click **Share**
5. The user will receive access immediately and can start viewing notifications

**Use cases:**
- Sharing with team members whose Zentik accounts you know
- Quick sharing with specific users
- Direct collaboration with identified users

### Sharing via Redeem Code

This method generates a unique redeem code that can be shared with anyone, even if they don't have a Zentik account yet.

**How it works:**

1. Open your bucket settings
2. Navigate to the **Sharing** section
3. Click **Generate Redeem Code**
4. Copy the generated code
5. Share the code with anyone (via email, chat, documentation, etc.)
6. The recipient enters the code in their Zentik account to gain access

**Use cases:**
- Sharing with users who don't have Zentik accounts yet
- Public distribution (e.g., in documentation or community forums)
- One-time sharing without needing to know user identifiers
- Flexible onboarding workflows

<MediaViewer
  type="video"
  src="/video/bucket_sharing.mp4"
  description="Sharing buckets in Zentik"
/>

## Managing Shared Access

As a bucket owner, you can:

- **View all shared users**: See who has access to your bucket
- **Revoke access**: Remove a user's access at any time
- **Regenerate redeem codes**: Create new codes and invalidate old ones
- **Set permissions**: Control what shared users can do (view-only vs. full access)

## Security Considerations

- **Redeem codes** are single-use: once redeemed, they cannot be used again
- **User identifier sharing** requires the recipient to have an active Zentik account
- Bucket owners can revoke access at any time
- Shared users cannot modify bucket settings or delete the bucket
- All sharing activities are logged for audit purposes

## Best Practices

- Use **user identifier sharing** for known team members and collaborators
- Use **redeem codes** for public sharing or when you don't know the recipient's account
- Regularly review shared access and revoke unused permissions
- Keep redeem codes secure and share them through trusted channels
- Consider the security implications before sharing buckets containing sensitive notifications
