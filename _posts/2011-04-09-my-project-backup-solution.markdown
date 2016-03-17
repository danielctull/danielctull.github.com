---
layout: post
title: My Project Backup Solution
---

I have finally got to a point where I feel confident of my backup situation of my projects and important files.

Dropbox
-------

I already use Dropbox to sync files between Macs; I couldn't use multiple machines in the past because I could never guarantee the state of my files when booting up. Dropbox syncs all of my projects so I know as long as I turn on a machine with Internet access, I'll have the latest version of my code. Because my Dropbox folder exists on a server, this I view as my first layer of safety.

Git
---

After this, I've put every important file under a versioning system so I can always get back to every point in history. While Dropbox has a versioning system, it's pretty hard to use for full versioning and you have to be online to get at. For this I chose [Git](http://git-scm.com) for its wide use in the community, its integration in Xcode 4 and some neat extra tools that extend it. You could use any Distributed Version Control System (DVCS).

These Git-backed projects are stored in my Dropbox and so the whole repository gets synced and backed up. I've never had a problem as I only work on the project on one machine at a time and let Dropbox fully sync before starting work. The only time I have had an issue, I'm sure [I was using Dropbox outside its comfort zone](http://danieltull.co.uk/blog/2011/04/08/multiple-partitions-and-dropbox/).

gitbox
------

Next I create a hidden folder (.gitbox) in the root of my Dropbox directory and use the pretty cool [gitbox](https://github.com/karalabe/gitbox) script to easily import repositories into it. This gives me one location where all repos live, and gives me an "absolute" copy of the repository; I can mess about all I like with my working copy and know that I can always re-clone from a copy because it's local. Again, this folder is in my Dropbox, so all these copies of the repositories get synced too.

Time Machine
------------

My iMac is permanently connected to my Time Capsule at home. Any time I work from my laptop, if it has an Internet connection Dropbox will sync the machines and my work will get saved with [Time Machine](http://www.apple.com/macosx/what-is-macosx/time-machine.html). This is my second place of backups.

MobileMe Backup
---------------

The third comes with MobileMe, using an application from years ago called [Backup](http://support.apple.com/kb/dl1025). This performs an incremental backup of whatever folders or data you choose to iDisk or some other media. There's an option to perform this manually or automatically every so often, I have this set up to backup my gitbox repositories folder every night. This gives me a second offsite backup for all of my projects.

On a side note, Backup's logs show you what files were uploaded on each backup session, so you can easily gauge how active you've been on any given day with the provided count; You can also inspect which projects exactly got updated.

Conclusion
----------

The best thing about this system is the automation. Apart from pushing changes to my gitbox from working copies, the whole thing is completely automated, and is the only way a backup solution should be. Between my Time Capsule, Dropbox and MobileMe, I have my projects backed up in three different physical places. I'm fairly confident that I will always be able to get that data back. And not just the current projects, everything I've ever committed.
