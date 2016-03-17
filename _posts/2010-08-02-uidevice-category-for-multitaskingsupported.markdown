---
layout: post
title: UIDevice category for multitaskingSupported
---

This is only a small hint, but I just got burned by it with an update to my app using one of the multitasking notifications that didn't exist prior to 4.0, which I forgot to do a check for before using. Luckily, UIDevice in 4.0 provides a new property (multitaskingSupported) to check whether the device is capable of multitasking. However, of course, this also doesn't exist in previous versions of the OS.

To get around this, we can wrap it up with a category on UIDevice, using the method which Apple recommends in the [iOS Programming Guide](http://developer.apple.com/iphone/library/documentation/iphone/conceptual/iphoneosprogrammingguide/BackgroundExecution/BackgroundExecution.html). This makes it much more convenient to call, especially if we're calling it from a few different places.

    @implementation UIDevice (DTFeatureCheck)

    - (BOOL)dt_multitaskingSupported {

        if (![self respondsToSelector:@selector(isMultitaskingSupported)]) return NO;

        return self.multitaskingSupported;
    }

    @end

Now we can happily call <code>\[\[UIDevice currentDevice\] dt\_multitaskingSupported\]</code> safe in the knowledge that it exists everywhere and is handling the checking of the real property.

##### Sunday, 05 September 2010

I have created a [gist for this category](http://gist.github.com/565853), plus another to easily get testable system version values for the OS that is running.

##### Friday, 08 October 2010

<script src="http://gist.github.com/565853.js">
</script>
