---
publishedAt: 2020-05-01
categories: ["System Administration"]
tags: ["Terminal","Windows"]
---

# Windows: Free up some disk space on your SSD

## AppData\Roaming

Located at `C:\Users\{{username}}\AppData\Roaming`, this folder often grows to unexpected sizes — the author's example reached over 40 GB, primarily due to Unity3D extensions.

To relocate this directory:

1. Right-click the folder and open Properties
2. Navigate to the Location tab
3. Click Move to transfer it to a secondary drive (e.g., `D:\Users\{{username}}\AppData\Roaming`)
4. Close all running programs before proceeding
5. Restart your computer
6. Delete the original folder (after backing it up)

**Note:** Some program preferences may reset, but reconfiguration is typically straightforward. If deletion fails with permission errors, remove all folders except the Microsoft folder.

## Swap File

To redirect virtual memory to a larger drive:

1. Open Virtual Memory settings
2. Set disk C (SSD) to "No paging file"
3. Configure disk D to "System managed"
4. Restart
