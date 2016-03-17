---
layout: post
title: The issues with Weather Maps
---

Weather Maps ([iTunes link](http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=309229631&mt=8)) is an application that displays downloaded maps detailing the UK weather. It was my first iPhone application and although it did what I wanted it to do and little more, it was a fairly unpolished application. It loaded maps synchronously, meaning when it was loading a new map it would block all interactions from the user. However, as with these things time became an issue, and the 1.0 of Weather Maps was this old slow loading version that I had written in July 2008.

<p style="text-align: center;">
<img class=" aligncenter" src="http://www.danieltull.co.uk/blog/wp-content/uploads/2009/08/IMG_0134.PNG" alt="Weather Maps" width="320" height="460" />

</p>
<p style="text-align: center;">
</p>
As soon as I launched that version, I knew I had to do an update to make it better; download the images faster, let the user move freely in the app without downloads blocking their way. And so the ill-fated release of 1.1, one that has led me down a dark road for nearly two months, was born.

The reason it was bug ridden was a fairly simple one; my original version had little to contend with, you pressed a button, it downloaded the map, and displayed it when it had done so. There was nothing really to go wrong. In 1.1, each tab would download all its images asynchronously when it was displayed and the buttons would navigate through these images without needing to wait.

A lot of testing went into this download mechanism, the storage and traversal of the maps and animating between the images. I had however, overlooked one problem: My code was getting the time from an NSDateFormatter to fetch the images. I wanted the hour in a 24 format, however even when setting the date formatter to give back "HH" I still got a 12-hour format when the user's iPhone was in that mode.

This didn't give a crash, it just meant the app would only download images for the morning, as all the times I was getting were the 12-hour ones. Looking back, I honestly don't think too many people noticed.

At any rate I hurriedly tried to fix it. Unfortunately, I continued to try to use NSDateFormatter and so I coded in asking for a 12-hour version, checking whether it was AM or PM and adding 12 hours if it was in the PM (there's a few other things to juggle like when it is midday). This now fixed it for an iPhone set to 12-hour mode and worked for my 24-hour mode iPhone. I promptly and confidently submitted.

Then after the release of 1.1.1, I had a lot of negative reviews. In fact, loads. It was a much greater number than the ones I got with 1.1. It now it wasn't working for people running in 24-hour mode. I stressed for much of the following week, I couldn't replicate the bug myself. Then on Thursday, I took my iPod touch and reset it, installed Weather Maps and instantly saw the problem. Though it was now downloading the right images, they weren't getting named properly. All the times were in a 12-hour format. Now both 9am and 9pm read "09:00".

A quick solution I found for users was to toggle the 24-hour mode switch in the system settings. I now figure that getting the AM or PM symbol in NSDateFormatter, when the device has never been in 12-hour mode yields a duff response; though I admit, I haven't thoroughly checked this out.

It's worth noting here that if you are honest with your users, they will try their best to help. I set up a [GetSatisfation page](http://www.getsatisfaction.com/weathermaps) as soon as the issue came up and updated the description of the app in iTunes almost daily to inform the users of the status. Yes, many people were frustrated that this app was broken for them, but reviews after that turned from 1 star "OMG you've ruined it. How could you!" reviews to 3-4 star "This version is broken, it was great. Am hoping the developer releases a fix soon" reviews.

So to cut this expanding post short, NSDateFormatter is an awful way of getting the figures as strings to use for anything other than displaying to the user; after all that is what it is for. So In the 1.1.2 fix, I looked away from NSDateFormatter. I created two categories which will give you the ability to create strings with the components of a date, prefixing these values if required with zeros, which makes sure you have a two figure hours for example. I have included these categories as part of DTKit and can be found at [bitbucket.org/danielctull/dtkit](http://bitbucket.org/danielctull/dtkit/).

    NSString *hourString = [[NSString stringWithFormat:@"%i", [aDate hour]]
                                           stringByPrefixingWithString:@"0" resultingInLength:2];

The NSDate category adds methods for retrieving the components (hour, minute, second, year, etc) as integer values using the NSDateComponents and NSCalendar classes. To add prefixing zeros, I've made an NSString category which adds stringByPrefixingWithString:resultingInLength: which prefixes the receiver with the  the given string  enough times such that it meets the length requirement. In the example above if the hour was 4, we would have the string "04" and if it were 16 would would get back "16".

Never rely on formatters in Cocoa to gain information, they can and will give different results depending on the user's settings. However, you should always use them for user-facing data so that the format is in their preferred style.

Lastly, if you have an app on the app store, you must manage your personal relations; be honest with users, explain to them mistakes and that you're working flat out to solve them. Hopefully they'll still be there when the fix is released.
