---
layout: post
title: Odd occurrence in Finder
---

I found an oddity with the Finder in Mac OS X the other day, which my housemate [Steff broke to the world](http://www.steffanwilliams.co.uk/blog/mac-apps/finder-renaming-issues) before I did. Basically if you click a file in Finder whilst in icon view (a view which I don't use often, I admit; I'm a column user) like so:

<div class="img">
<a href="http://www.flickr.com/photos/18319588@N00/381234085/" title="Finder Normally"><img src="http://farm1.static.flickr.com/116/381234085_690eba9f6b_o.png" width="502" height="415" alt="Finder normally." /></a>

</div>
Then scroll so the file is out of sight, yet still within the screen, then hit return. Now in column view I expect it to jump to the file I had highlighted and then bring up the edit box for it. In icon view however it does this:

<div class="img">
<a href="http://www.flickr.com/photos/18319588@N00/381234089/" title="Photo Sharing"><img src="http://farm1.static.flickr.com/89/381234089_30c153d243_o.png" width="535" height="297" alt="Picture 3" /></a>

</div>
and this:

<div class="img">
<a href="http://www.flickr.com/photos/18319588@N00/381234091/" title="Photo Sharing"><img src="http://farm1.static.flickr.com/146/381234091_42eeeb03b6_o.png" width="480" height="288" alt="Picture 4" /></a>

</div>
A little bit of a bug I feel. It actually made me run out of the room I was working in and round to the room where Steff was to let him see it, just in case it wouldn't happen again, but it would seem you can replicate this at any time on a PowerPC or Intel Mac.

With some knowledge of Mac programming in me, I can't work out why it would do this. The edit box appears where you'd expect it to, if it was still in the finder window, so perhaps it is because of the way the Finder handles the scrolling window. I've not seen this before, as I said I'm more into column view, but could this be a bug introduced in a recent update?
