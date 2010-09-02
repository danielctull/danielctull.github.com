---
layout: post
title: New entitlements.plist for app submission
---

<p>I&#8217;ve been having issues uploading the update to my iPhone application, Weather Maps, this morning. Every time I submitted I received an email with this message about the issue:</p>
<blockquote><p><strong>Invalid application-identifier Entitlement</strong> &#8211; This error can occur if the bundle identifier (that is, the value assigned to the CFBundleIdentifier key in Info.plist) does not match the pattern allowed by the provisioning profile you obtained from the iPhone Developer Portal. Make sure you have signed your app with the correct profile, and make sure you do a clean build (&#8221;Clean All&#8221; in Xcode) in order to regenerate the entitlements that are signed into your bundle.</p></blockquote>
<p>While the message suggests the issue is with the Info.plist, it turns out that the issue was with my entitlements.plist file; Apple are requiring some new keys in the entitlements.plist file which I didn&#8217;t have from my last submission. My new entitlements.plist now contains the following:</p>
<pre>&lt;dict&gt;
    &lt;key&gt;application-identifier&lt;/key&gt;
    &lt;string&gt;$(AppIdentifierPrefix)$(CFBundleIdentifier)&lt;/string&gt;
    &lt;key&gt;keychain-access-groups&lt;/key&gt;
    &lt;array&gt;
        &lt;string&gt;$(AppIdentifierPrefix)$(CFBundleIdentifier)&lt;/string&gt;
    &lt;/array&gt;
&lt;dict&gt;</pre>
<p>I&#8217;m not sure when this was changed, so I could be massively behind the times, but hopefully this will save some people the hour I spent trying to work out the problem.</p>