---
publishedAt: 2019-11-16
---

# If Your Windows Wakes up at Night

## Solution 1

Identify what's causing the wake-up:

```
powercfg -waketimers
```

You might see output like:

> "Timer set by [SERVICE] \Device\HarddiskVolume2\Windows\System32\svchost.exe (SystemEventsBroker) expires at 7:26:28 PM on 11/29/2019. Reason: Windows will execute 'NT TASK\Microsoft\Windows\UpdateOrchestrator\Backup Scan' scheduled task..."

To disable the problematic task:

1. Download [PSTools](https://docs.microsoft.com/en-us/sysinternals/downloads/pstools) from Microsoft's Sysinternals
2. Extract the files
3. Run from the extracted directory:

```
.\PsExec.exe -s schtasks /change /tn "\Microsoft\Windows\UpdateOrchestrator\Backup Scan" /DISABLE
```

## Solution 2

Immediately after your computer wakes up, run:

```
powercfg /lastwake
```

This identifies the device responsible.

Open Device Manager:

```
Win + R, then devmgmt.msc
```

Locate the device, open its Properties, select the Power Management tab, and uncheck "Allow this device to wake up the computer."
