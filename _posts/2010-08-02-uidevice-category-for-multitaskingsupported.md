---
layout: post
title: UIDevice category for multitaskingSupported
---

<p>This is only a small hint, but I just got burned by it with an update to my app using one of the multitasking notifications that didn&#8217;t exist prior to 4.0, which I forgot to do a check for before using. Luckily, UIDevice in 4.0 provides a new property (multitaskingSupported) to check whether the device is capable of multitasking. However, of course, this also doesn&#8217;t exist in previous versions of the OS.</p>
<p>To get around this, we can wrap it up with a category on UIDevice, using the method which Apple recommends in the <a href="http://developer.apple.com/iphone/library/documentation/iphone/conceptual/iphoneosprogrammingguide/BackgroundExecution/BackgroundExecution.html">iOS Programming Guide</a>. This makes it much more convenient to call, especially if we&#8217;re calling it from a few different places.</p>
<pre>@implementation UIDevice (DTFeatureCheck)

- (BOOL)dt_multitaskingSupported {

	if (![self respondsToSelector:@selector(isMultitaskingSupported)]) return NO;

	return self.multitaskingSupported;
}

@end</pre>
<p>Now we can happily call <code>[[UIDevice currentDevice] dt_multitaskingSupported]</code> safe in the knowledge that it exists everywhere and is handling the checking of the real property.</p>