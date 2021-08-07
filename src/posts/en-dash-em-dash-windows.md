---
title: 'Inserting En dash and Em dash on Windows'
date: '2019-02-06'
tags:
  - Windows
  - AutoHotkey
---

Inserting En (–) dashes and Em (—) dashes on Windows can be difficult. Some word processing apps
will convert multiple dashes into them, but usually I need them in websites or other apps.

Keyboards with a numpad allow you to press Alt+0150 or Alt+0151, but what if you don’t
have a numpad or don't want to remember the numbers?

The solution I use is [AutoHotkey](https://www.autohotkey.com/). It’s a free scripting tool that
lets you do all kinds of things. Here, I want to replicate Mac’s keyboard shortcuts:

- Alt+Minus for En dash
- Alt+Shift+Minus for Em dash

The AutoHotkey script for it is pretty simple:

```autohotkey
; Alt+Minus = En dash
!-:: 
Send {–}
return

; Shift+Alt+Minus = Em dash
+!-::
Send {—}
return
```

Put that in your AutoHotkey script, reload AutoHotkey, and then you’ll be able to use
those keyboard shortcuts practically anywhere.