---
layout: post
title: DTGridView
---

For some reason I never posted about this when I released it, and I fully intended to, but such is life. [DTGridView](http://bitbucket.org/danielctull/dtgridview/src/tip/DTGridView/) is an iPhone UIKit component for implementing large (or small) gridded views in a memory efficient way. It occurred to me earlier in the year that it may be useful to have a two-dimensional table view, and since it's conception I have been able to make grids and horizontal scrolling elements as fast as I could make a nice looking table view.

It uses the same technique as UITableView, by having cells have a reuse identifier and using this to reuse cells that happen to move offscreen. The algorithm for working out off-screen cells went through about three re-writes before I found one that was efficient enough to give smooth scrolling, but accurate checks.

The grid view itself is a proper UIScrollView, so you get all the benefits (scroll bars, deceleration, bouncing) plus the automatic layout and memory handling that grid view adds.

It follows the same methodology as UITableView by having you provide a dataSource and gridDelegate (as it itself is a delegate of the superclass, I needed a new name for the delegate) to gather data and let you know about important events, the protocols of which are shown in the [grid view's header](http://bitbucket.org/danielctull/dtgridview/src/tip/DTGridView/DTGridView.h). In all seriousness, I looked at UITableView, took it's API and modified it only slightly to give me what I needed.

### The future of DTGridView

There are still loads of things I want to add. In fact some of them I added view subclasses, such as [DTInfiniteGridView](http://bitbucket.org/danielctull/dtkit/src/tip/DTInfiniteGridView/) to allow infinite scrolling, but I really want to round up these extensions and bolt-ons to the main grid view class. I'd love to add pinch zooming to zoom into views, which I've just not had time to look into yet. I've seen examples and I'm sure it's completely doable with some thought.

Also, I was recently asked whether it could be used to layout a grid for a timeline, where data can be inserted when it comes. I realised then that grid view isn't really very good at loading specific pieces of data like this, however (and here's the confession), this is the exact thing that inspired DTGridView in the first place!

I worked on a project that involved laying out a grid of information, and realised that it would be nicer if I had something to lay out the views on the scroll view automatically. So I definitely want to tackle this, I'm sure being a timeline, there'd be a certain amount of infiniteness about it too.

Hopefully, I get a chance to work on some of these things soon, and as I tidy up the current implementation, I'll try to add better documentation to what's happening, if only so I know how the hell it works.

##### Sunday, 05 September 2010

I have changed some links in the article to reflect the latest version of DTGridView, which can be found at its own repository at <http://bitbucket.org/danielctull/dtgridview>.
