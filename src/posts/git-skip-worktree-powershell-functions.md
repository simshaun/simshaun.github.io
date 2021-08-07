---
title: 'git skip-worktree PowerShell aliases'
date: '2021-08-06'
tags:
  - Windows
  - Git
  - PowerShell
---

I frequently need Git to ignore a change I make to a file. To do that, I use [git's skip-worktree feature](https://git-scm.com/docs/git-update-index#_skip_worktree_bit).

These PowerShell functions make it easier and faster to mark/unmark files.

## Instructions

Add the code below to your PowerShell profile. To find out where that is, open PowerShell and enter:
`$PROFILE`.

To learn more about profiles, check out [the Microsoft docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles).

## Code

```powershell
<#
Command: gitskipped
Description: List skipped files in git
Usage: gitskipped
#>
function gitskipped {
  (git ls-files -v $args) -split "\r\n" | Select-String -Pattern '^S ' | ForEach-Object {
    Write-Output $_.Line.Substring(2)
  }
}


<#
Command: gitskip
Description: Mark file(s) as "skip-worktree" in git
Usage: gitskip .env
#>
function gitskip {
  git update-index --skip-worktree $args
}


<#
Command: gitunskip
Description: Unmark file(s) as "skip-worktree" in git
Usage: gitunskip .env
#>
function gitunskip {
  git update-index --no-skip-worktree $args
}


<#
Command: gitunskipall
Description: Unmark all skipped files in git
Usage: gitunskipall
#>
function gitunskipall {
  $files = @((git ls-files -v $args) -split "\r\n" | Select-String -Pattern '^S ' | ForEach-Object { $_.Line.Substring(2) })
  git update-index --no-skip-worktree $files
}
```
