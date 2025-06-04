---
title: 'Using PowerShell to launch multiple npm/yarn scripts in a multi-pane Windows Terminal'
date: '2021-11-11'
tags:
  - Windows
  - PowerShell
  - Windows Terminal
  - yarn
  - npm
socialImage: https://simshaun.com/images/posts/powershell-yarn-multipane-windows-terminal.png
---

I have a monorepo with multiple TypeScript projects, each with its own dev
server or file watcher.

Manually opening multiple terminals and starting each dev server became
repetitive, so I looked for a way to automate it.

My solution uses Windows Terminal's split pane feature, similar to tmux.
Windows Terminal provides a CLI interface to launch a terminal, split it into
multiple panes, and run a command in each one.

I wrote this PowerShell script as a shortcut:

```powershell
$WtArgs = (
  "new-tab -d . pwsh -NoProfile -NoExit -Command yarn workspace @foxandfly/package-1 run start ; ",
  "split-pane -d . pwsh -NoProfile -NoExit -Command yarn workspace @foxandfly/package-2 run start ; ",
  "split-pane -d . pwsh -NoProfile -NoExit -Command yarn workspace @foxandfly/package-3 run start "
)

Start-Process wt $WtArgs
```
So now, whenever I want to start all my dev servers, I just run dev.ps1 from
the root of my monorepo.

![Example of multi-pane terminal running multiple dev servers](/images/posts/powershell-yarn-multipane-windows-terminal.png)
