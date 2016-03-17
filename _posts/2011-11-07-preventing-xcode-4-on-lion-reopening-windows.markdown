---
layout: post
title: Preventing Xcode 4 on Lion reopening windows
---

Xcode 4 on Mac OS X Lion reopens all the projects from the last session. This is pretty frustrating to me most of the time as I switch from working on a client app or two plus a couple of my own. I'd rather be able to quit and reopen a fresh session to work on what I want at that moment, not have to sift through four or five spaces with different Xcode projects to find the one I want... every time I switch to and from another app.

There used to be a way of preventing this in Xcode's preference plist, but this no longer works. Instead, a solution is to set the following folder as locked, so Xcode can't write to it to save the state.

    ~/Library/Saved\ Application\ State/com.apple.dt.Xcode.savedState

You'll want to delete the contents of this, then get info and click the locked checkbox. Et voila, no more projects reopening themselves.

Thanks again to [Pete](http://twitter.com/dative) for letting me know about this. He should really be blogging these little facts!
