---
layout: post
title: Loading images in +load
---

In my current app I have some UIButton subclasses which set up their own appearance, so that I can put these UIButton subclasses in a storyboard and have styled buttons.

To do this I was putting my code in the +load method so that it would get loaded without me needing to call it from anywhere else, as shown below.

    @implementation DBSGreyButton

    + (void)load {
        UIImage *buttonImage = [UIImage imageNamed:@"DBSGreyButton"];
        UIEdgeInsets edgeInsets = UIEdgeInsetsMake(0.0f, 13.0f, 0.0f, 13.0f);
        buttonImage = [buttonImage resizableImageWithCapInsets:edgeInsets];
        id appearance = [self appearance];
        [appearance setBackgroundImage:buttonImage
                              forState:UIControlStateNormal];
        [appearance setTitleColor:[UIColor darkTextColor]
                         forState:UIControlStateNormal];
    }

    @end

Unfortunately, I discovered that the images that get loaded have the scale of 1. My solution is to have a +loadAppearance method that gets called from the AppDelegate.

Thanks to Chris Parker for confirming that "[+load fires before UIApplication init so scale isn't set up yet...](https://twitter.com/ctp/status/334215372611940352")

Edit: Thanks to Vadim Shpakovski for pointing out that +initialize does work for this, saying it's "[One more reason to not use + (void)load and prefer + (void)initialize to reduce launch time in some cases.](https://twitter.com/vadimshpakovski/status/334229369876791296")
