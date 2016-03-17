---
layout: post
title: Building for iOS 3 devices using Xcode 4.2
---

Today I helped my friend Pete Callway run a test app to show blocks can live in an app destined to run on an iOS 3 device, as long as the block code is never called on those devices.

In Xcode 4.2, Apple removed the option to select the armv6 architecture which means your app won't run on the device, throwing no warnings, errors, or crashes. To add support back in, you simply need to go to the build settings and select "Other" in Architectures. In the list that appears add "armv6" to the list, by typing it in.

You'll also need to remove the armv7 requirement from the "UIRequiredDeviceCapabilities" in the app's info.plist. And voila, you'll have an app capable of running on iOS 3 devices using Xcode 4.2!
