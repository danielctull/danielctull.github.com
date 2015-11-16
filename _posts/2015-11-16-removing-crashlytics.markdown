---
layout: post
title: Removing Crashlytics
---

When Issues 1.1.2 was in beta, one of the releases caused one of my testers to tweet:

<blockquote class="twitter-tweet" lang="en"><p lang="und" dir="ltr"><a href="https://twitter.com/danielctull">@danielctull</a> #238 yes!</p>&mdash; Lee Armstrong (<a href="https://twitter.com/lesmond">@lesmond</a>) <a href="https://twitter.com/lesmond/status/662897418724339712">7 November 2015</a></blockquote>

On the 20th October, I added the following issue to Issues' tracker: **#238: Remove Crashlytics**. I'm sure Lee has his own reasons, but I received a couple of enquires as to why I had chosen to remove it and thought I'd provide a little detail here about it.

## Trust

Issues has the potential to store very private and very secret information; from amazing new features for products, damning security bugs to just embarressing mess ups. These are generally the same reasons many companies choose to host their source code and bug trackers in house, and I have taken the decision that Issues will communicate with only the servers my users trust.

I would like to just point out now that I have never *ever* provided either Google Analytics (which was removed in version 1.2) or Crashlytics with any data from a connected bug tracker. I used both to track things like sales and which screens were being hit and the latter for crash reporting.

However, how can I expect my users to trust me on that? Trust is hard enough to win face-to-face, let alone when you're only reading their words or perhaps have no contact at all.

If someone at a highly secure company is considering Issues, I want to make sure the only network connections from my app are to their servers.

Lets face it, both Google Analytics and Crashlytics are black boxes. Can a sole developer like myself really trust and *know* that they aren't doing something that I wouldn't approve of?

## Crashes from iTunes Connect & Xcode 

Recently, I've had a couple of reports from beta testers of crashes and Xcode has picked them up. Frankly, if Xcode can do the job of Crashlytics.

It must be said that Crashlytics still has a superior way of viewing crashes than Xcode. For some reason Xcode wants you to select a version to fetch the crashes for that release of the app. When beta releases can be once every day or two, you end up with a lot of builds that *could* contain crashes.

<img class="aligncenter" src="/images/2015-11-16-removing-crashlytics/1.png" alt="Many different builds in Xcode's build list" width="144" height="330" />

Seriously, it'd be great if Xcode just had a list of crashes that you could then select and see what version it was, as it stands it's quite easy to miss crashes. On the other hand, if a tester reports that build 2348 crashes then it's easy to find.
