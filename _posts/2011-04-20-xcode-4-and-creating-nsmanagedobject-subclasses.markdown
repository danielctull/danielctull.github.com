---
layout: post
title: Xcode 4 and Creating NSManagedObject Subclasses
---

Recently my [DCTManagedObjectAutomatedSetup](https://github.com/danielctull/DCTCoreData/blob/master/Automated%20Setup/NSManagedObject%2BDCTAutomatedSetup.h) extension seemingly stopped working, and ever since I've been fairly miffed. It was at a frantic hack day a few weeks back when I first tried to use it and it failed to create a data structure from some JSON. I blamed the panic that I only had a day to write an app and I was on hour two of trying to import the data (I was extremely confident it'd be done in half hour).

Today, I found out why. A small exercise with a new small project, where I would import some retrieved data into a Core Data model. Again I found this wasn't working. Unlike last time, I wasn't panicked trying to make something, so I actually put decent effort into working it out.

My first step took me to noticing that the check of my managed object conforming to the DCTManagedObjectAutomatedSetup protocol was failing. This conformance, with the associated methods, I usually put in a category. On the off chance, I wondered if putting the conformance into the subclass proper would change things. Of course, it did not.

It was only while logging out the managed objects that I noticed something I thought was odd: &lt;NSManagedObject: 0x6847b20&gt;. Shouldn't that be my subclass?!

Eventually I got around to looking at the Core Data utility pane, where it gave the class of the entities as NSManagedObject. In Xcode 4, it seems when you create a NSManagedObject subclass, you no longer have the option to set the class of the entity to the subclass you are creating.

You should check to make sure you really are using the class you've written by looking in the Core Data utility pane while an entity is selected. There you will find the text field to change the class from NSManagedObject as shown below.

<img class=" aligncenter" src="/images/2011-04-20-xcode-4-and-creating-nsmanagedobject-subclasses/1.png" alt="Apropriately named class in the Core Data utility pane" width="279" height="168" />

Update: As I consider this a bug with Xcode 4, I've filed a bug, rdar://9313900.
