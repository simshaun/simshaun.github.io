---
title: 'Using PowerShell to launch multiple npm/yarn scripts in a multi-pane Windows Terminal'
date: '2021-11-11'
tags:
  - Windows
  - PowerShell
  - Windows Terminal
  - yarn
  - npm
socialImage: https://shaun.pub/images/posts/powershell-yarn-multipane-windows-terminal.png
---

I have a monorepo consisting of multiple TypeScript projects, each one having
its own dev server or file watcher.

Firing up multiple terminals and manually starting the dev servers was getting
tedious. So, I began looking for a way to automate it. Here's what I came up
with.

My solution uses Windows Terminal's split pane feature, which is sort of like
tmux. Windows Terminal offers a CLI approach to launch a terminal, split it
in to multiple panes, and execute a command in each one.

I put together this PowerShell script to act as a shortcut:

```powershell
$WtArgs = (
  "new-tab -d . pwsh -NoProfile -NoExit -Command yarn workspace @foxandfly/package-1 run start ; ",
  "split-pane -d . pwsh -NoProfile -NoExit -Command yarn workspace @foxandfly/package-2 run start ; ",
  "split-pane -d . pwsh -NoProfile -NoExit -Command yarn workspace @foxandfly/package-3 run start "
)

Start-Process wt $WtArgs
```

So I create this file (dev.ps1) in my monorepo root and run it when I want to
launch all of my dev servers at one time.

![Example of multi-pane terminal running multiple dev servers](/images/posts/powershell-yarn-multipane-windows-terminal.png)
