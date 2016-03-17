---
layout: post
title: New entitlements.plist for app submission
---

I've been having issues uploading the update to my iPhone application, Weather Maps, this morning. Every time I submitted I received an email with this message about the issue:

> **Invalid application-identifier Entitlement** - This error can occur if the bundle identifier (that is, the value assigned to the CFBundleIdentifier key in Info.plist) does not match the pattern allowed by the provisioning profile you obtained from the iPhone Developer Portal. Make sure you have signed your app with the correct profile, and make sure you do a clean build ("Clean All" in Xcode) in order to regenerate the entitlements that are signed into your bundle.

While the message suggests the issue is with the Info.plist, it turns out that the issue was with my entitlements.plist file; Apple are requiring some new keys in the entitlements.plist file which I didn't have from my last submission. My new entitlements.plist now contains the following:

        application-identifier;
        $(AppIdentifierPrefix)$(CFBundleIdentifier)
        keychain-access-groups
        
            $(AppIdentifierPrefix)$(CFBundleIdentifier)
        

I'm not sure when this was changed, so I could be massively behind the times, but hopefully this will save some people the hour I spent trying to work out the problem.
