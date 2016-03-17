---
layout: post
title: Picasa Web Albums
---

Last time I checked out [Picasa Web Albums](http://picasaweb.google.com/) was nearly a year ago, and I have just recently noticed a few of the new features there. There is now a free iPhoto Exporter that Google provides to enable you to upload pictures straight from iPhoto. It works like most of the other iPhoto exporter plugins do, there's one for Facebook and Flickr (although the Flickr one is now charging, last time I checked it out, it was free).

The only doubt I have with using Picasa Web Albums as a photo manager is that I have to start paying if I go over their 1GB limit. I have more storage on my paid for server space, and wouldn't want to pay more money without using the space I currently have.

However, the ability to work with the APIs to get the images on my site is a huge plus. I came across some javascript by [Haochi Chen](http://www.googlified.com/2007embedding-picasa-web-albums-on-your-site/) that allows you to embed the images. After some tweaking, the result can be found at the <a href="/photos/">new look photos page</a>.

After playing around with more javascript, I created the smaller version as seen on the right. This was a little trickier and has multiple calls to the Picasa javascript. I'm still debating with myself if the result is worth the extra loading time. If you want to include it on your site, it can be found <a href="/picasa/pwa-small.js">here</a>. To use it you need to enter the following on your site, where you want it to show:

<blockquote class="code">
&lt;script type=”text/javascript”&gt;username = 'your.username'; photosize='48'; noalbums='3'; nophotos='2';&lt;/script&gt;<br />
&lt;script type=”text/javascript” src=”http://www.danieltull.co.uk/pwa-small.js”&gt;&lt;/script&gt;

</blockquote>
Where noalbums is the number of albums you want to show, and nophotos is the number of photos you want to show from each of the albums.

Caused by the new photo pages is a big change involving using images in the hierarchical menu system to create the arrow effect. I have always suggested that images are not needed to create a decent looking site, the reason this page may look a little blander than most out there. However, I think those arrows look a lot better than the alternative non-image way of achieving this, by using right chevrons (&gt;) to indicate hierarchy. My mind is now open to using images for styling in the future, although I'm pretty sure I'll question it every time it comes up.

In conclusion, Picasa Web Albums are now looking like a serious competitor to Flickr, which has really been the only serious option of storing and sharing photos online. However, I personally prefer the style of the PWA pages, and the way it deals with photos; keeping them in albums rather than just a long stream of pictures.
