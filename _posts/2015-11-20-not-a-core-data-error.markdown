---
layout: post
title: Not a Core Data error
---

This morning I came across `SQLite error code:522, 'not an error’` before seeing the app crash. Clearly not an error!

In [Issues](http://danieltull.co.uk/issues) I make use of Core Data and one thing I decided early on was to use its store as a cache only: All data in the Core Data store can be fetched again from the server. There were a couple of reasons for this choice:

* It keeps me flexible to model changes, without the overhead of migration.
* I could store user-created entities such as favourites, draft issues and draft comments in files NSCoding, which in turn allowed me to easily adopt CloudKit.

When a model change happens, I delete the store at the URL I gave and recreate a new one in its place.

The problem above occurred for me because Core Data creates journaling files alongside the file I specify. When I delete the store, I don't touch these files, mainly because there's not really a way to know about them – they have the same filename prefix with `-wal` or `/-shm` or whatever appended, so I could delete all the files with the same filename prefix.

An easier solution I saw was to create a directory at the URL and make the actual store inside that directory. This way, when I need to delete the store, I can remove the folder safely knowing that all the journaling files will be removed as well.
