---
publishedAt: 2018-10-12
categories: ["System Administration"]
tags: ["Terminal","Windows"]
---

# Windows: How to Set Sound Volume by Keyboard

Use [Autohotkey](https://autohotkey.com/) to create custom shortcuts for adjusting volume.

1. Download and install Autohotkey
2. Create two script files:

**setVolumeUp.ahk**
```
^!>::Send {Volume_Up}
```

**setVolumeDown.ahk**
```
^!<::Send {Volume_Down}
```

3. Run each script by double-clicking it. "H" icons will appear in your taskbar.

**Ctrl + Alt + Shift + >** — increase volume  
**Ctrl + Alt + Shift + <** — decrease volume
