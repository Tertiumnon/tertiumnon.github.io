---
publishedAt: 2020-12-13
categories: ["Hacks"]
tags: ["Tips"]
---

# Your Cloud Firestore Database Has Insecure Rules

## Development Configuration

During initial development, Firebase allows a temporary ruleset that grants full access:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

This configuration permits all users to read and write to any document without authentication.

## The Problem

Deploying a public instance with these permissive rules creates significant vulnerabilities. Google actively monitors for this configuration and sends warning notifications to affected users.

## Fix

Before moving to production, implement proper access controls. The [Firebase documentation](https://firebase.google.com/docs/rules) provides guidance on establishing secure rules appropriate for live environments.
