---
layout: post
title: An error was encountered while running (Domain = LaunchServicesError, Code = 0)
---

Along with a lot of the rest of the iOS community, I was playing around with WatchKit yesterday, adding initial support to my app [Coordination](https://itunes.apple.com/gb/app/coordination-location-utility/id625226776).

I have previously implemented extensions and had an issue where the app fails to launch in the simulator and on the device, with the somewhat cryptic error message “An error was encountered while running (Domain = LaunchServicesError, Code = 0).”

While I discovered the problem before, I just fixed it and carried on. This, it seems, was a mistake. 

The issue is that a framework had the same bundle identifier as the app and that is not allowed as [each distinct app or bundle on the system must have a unique bundle ID](https://developer.apple.com/library/mac/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/20001431-102070).

In the case yesterday I had logic that I wanted to use in the WatchKit app contained in my main application bundle. So I created a framework to put the shared logic into, which the iPhone and Watch apps would both link to and make use of. 

I added a shared framework target called “Coordination Framework” but wanted the product to just be called “Coordination” so that I could import it with `@import Coordination`. This would contain the core logic for the app, but keep the view and interface controllers in their respective apps.

By default the info.plist gives the bundle identifier as `uk.co.danieltull.$(PRODUCT_NAME:rfc1034identifier)`, so because of my renaming the framework product, changed the identifier to `uk.co.danieltull.Coordination` and you can guess what the bundle identifier of my app is!

The solution I have is simple to add `-Framework` to the end of the bundle identifier in my info.plist file.

I have now [filed a radar](http://openradar.appspot.com/19045130) to suggest that Xcode should give an error if there are two bundles in the app with the same identifier, along with [a test app demonstrating the issue](https://github.com/danielctull-tests/Duplicate-Bundle-Identifier-Issue).