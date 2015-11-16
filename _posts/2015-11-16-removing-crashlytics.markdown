---
layout: post
title: Removing Crashlytics
---

When Issues 1.1.2 was in beta, one of the releases caused one of my testers to tweet:

<blockquote class="twitter-tweet" lang="en"><p lang="und" dir="ltr"><a href="https://twitter.com/danielctull">@danielctull</a> #238 yes!</p>&mdash; Lee Armstrong (@lesmond) <a href="https://twitter.com/lesmond/status/662897418724339712">November 7, 2015</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

On the 20th October, I added the following issue to Issues' tracker: **#238: Remove Crashlytics**. I'm sure Lee has his own reasons, but I received a couple of enquires as to why I had chosen to remove it and thought I'd provide a little detail here about it.



It must be said that Crashlytics still has a superior way of viewing crashes than Xcode. For some reason Xcode wants you to select a version to fetch the crashes for that release of the app. When beta releases can be once every day or two, you end up with a lot of builds that *could* contain crashes.

<img class=" aligncenter" src="/images/2015-11-16-removing-crashlytics/1.png" alt="Many different builds in Xcode's build list" width="144" height="330" />

Seriously, it'd be great if Xcode just had a list of crashes that you could then select and see what version it was, as it stands it's quite easy to miss crashes. On the other hand, if a tester reports that build 2348 crashes then it's easy to find.
