---
layout: post
title: Multiple Partitions and Dropbox
---

I've recently partitioned my MacBook Air's small hard drive to boot two OSes [for some reason](http://www.apple.com/macosx/lion/) which leaves only a little space for anything else. I thought I'd be clever by running Dropbox.app on both installed OSes, but point the second install to sync the Dropbox folder in my Snow Leopard partition; BAD IDEA!

When Dropbox.app loads, it seemingly knows what it should have in that folder, if it differs from its internal knowledge (or data stored in the user's library), it then starts manically re-indexing the whole folder. After this, the files that had changed while I was in the other OS were left broken and unusable.

After this I set up Dropbox afresh in both OSes with their own Dropbox folders, using selective sync to only sync the stuff I really need, and Dropbox now works like you'd expect.
