---
layout: post
title: Removing Crashlytics and Google Analytics
---

One of the beta releases of [Issues](http://danieltull.co.uk/issues) caused one of my testers to tweet:

<blockquote class="twitter-tweet" lang="en"><p lang="und" dir="ltr"><a href="https://twitter.com/danielctull">@danielctull</a> #238 yes!</p>&mdash; Lee Armstrong (<a href="https://twitter.com/lesmond">@lesmond</a>) <a href="https://twitter.com/lesmond/status/662897418724339712">7 November 2015</a></blockquote>

This was in reference to a ticket I added to Issues' tracker: **#238: Remove Crashlytics**. Today version 1.1.2 was released without Crashlytics and after removing Google Analytics in version 1.1, I can now say Issues contains no tracking libraries. On Twitter this evening I received a couple of enquires as to why I had chosen to do this, so I thought I'd provide a little detail about it here.

## Trust

Issues has the potential to store very private and very secret information; from amazing new features for products, damning security bugs to just embarressing mess ups. These are generally the same reasons many companies choose to host their source code and bug trackers in house, and I have taken the decision that Issues will communicate with only the servers my users trust.

I would like to just point out now that I have never *ever* provided either Google Analytics or Crashlytics with any data from a connected bug tracker. I used the former to track sales and which screens were being hit and the latter for crash reporting.

However, how can I expect my users to trust me on that? Trust is hard enough to win face-to-face, let alone when you're only reading their words or perhaps have no contact at all.

If someone at a highly secure company is considering Issues, I want to make sure the only network connections from my app are to their servers.

Lets face it, both Google Analytics and Crashlytics are black boxes. Can a sole developer like myself really trust and *know* that they aren't doing something that I wouldn't approve of?

(Note that I'm not suggesting anything they may do is *bad* just something I might not approve of, in this particular case.)

This has honestly weighed on my mind since I released Issues.

## Analytics

The reason I chose to include Google Analytics in the first place was a fear that I wouldn't get some important data that would inform me about which decisions I should make.

It turns out users have just emailed me about what they want. Almost every request has mentioned one omission, which was cut from previous versions because of time constraints and will make it into the upcoming version 1.2 of the app.

I've already got a long list of features I would love to make and a vague order of their importance.

The way I had Google Analytics showed no useful data. If I spent some time to research what to track it might help me, but just tracking pages revealed nothing but [vanity metrics](http://www.startuplessonslearned.com/2009/12/why-vanity-metrics-are-dangerous.html).

At any rate, Issues isn't an app I'm trying to encourage "engagement" in. The whole point is that you spend as little time as possible using it.

## Crashes from iTunes Connect & Xcode 

Recently, I've had a couple of reports from beta testers of crashes and Xcode has picked them up. This was the point I realised that I really just didn't need Crashlytics.

It must be said that Crashlytics still has a superior way of viewing crashes than Xcode. For some reason Xcode wants you to select a version to fetch the crashes for that release of the app. When beta releases can be once every day or two, you end up with a lot of builds that *could* contain crashes.

<img class="aligncenter" src="/images/2015-11-16-removing-crashlytics/1.png" alt="Many different builds in Xcode's build list" width="144" height="330" />

Seriously, it'd be great if Xcode just had a list of crashes that you could then select and see what version it was, as it stands it's quite easy to miss crashes. On the other hand, if a tester reports that build 2348 crashes then it's easy to find. I've filled [rdar://23559628](rdar://23559628) ([Open Radar](http://openradar.appspot.com/23559628)) with Apple.
	