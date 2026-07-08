---
publishedAt: 2021-06-28
category: Design
tags: ["AI","Design","JavaScript","Technology","Terminal","UX","Web Development","Windows"]
---

# Windows 11 — Specific Requirements: Some Details

Not a secret, requirements for Windows 11 are not typical. This article discloses details encountered while preparing a PC for Windows 11.

## Modern CPU

Your CPU must be modern. You can find more information about what processor you need in lists below:

- [Intel](https://docs.microsoft.com/en-us/windows-hardware/design/minimum/supported/windows-11-supported-intel-processors)
- [AMD](https://docs.microsoft.com/en-us/windows-hardware/design/minimum/supported/windows-11-supported-amd-processors)

## UEFI / TPM 2.0

UEFI is a modern analogue of BIOS. Most modern computers have this option by default, but it's not obvious that:

- You need to enable TPM in UEFI options — it can be difficult if you are not familiar with UEFI options — so watch your motherboard manual to find an option called "TPM" or "Secure boot" or "fTPM" and then try to enable it.
- Your hard disk must use GPT instead of MBR — you can see this option in some software like [AOMEI Partition Assistant](https://www.diskpart.com/free-partition-manager.html) or [EaseUS Partition Master](https://www.easeus.com/partition-manager/epm-free.html), and these tools must be useful when you'll try to convert MBR to GPT. Another way to convert MBR to GPT is to use Windows command line tools, but be careful — not all of these tools converts your data without loss, read manuals closely.

## DirectX 12 with WDDM 2.0

DirectX 12 was released in 2015 — so if your video card has been bought this year or after, you're almost certainly equipped with this capability.
