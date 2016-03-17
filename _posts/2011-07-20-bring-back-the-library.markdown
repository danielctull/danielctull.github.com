---
layout: post
title: Bring back the ~/Library
---

By default in Mac OS X Lion, the ~/Library folder is hidden. This is a great thing for "normal" users, but when you're going in there daily to put scripts, remove Xcode preferences and such, it's a little bit of a hassle. Running the following command will make it unhidden.

    chflags nohidden ~/Library/

Also if you hold down option while clicking "Go" in Finder's menu, the Library will show up in the menu.

Thanks to [Pete](http://twitter.com/dative) for letting me know.
