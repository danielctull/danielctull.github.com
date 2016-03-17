---
layout: post
title: Introducing DTNibHook
---

The idea behind [DTNibHook](http://bitbucket.org/danielctull/dtnibhook) is to be able to create a custom view in a nib and being able to change certain views in code later on when presented with just that view. A good example of when we'd like to do this is with UITableViewCells, we hand the cell over to the table view and when we want to reuse it, all we have is the cell itself.

The way many people solve this is by using the tags for each subview you want to alter. However, I believe a more concrete approach is possible with nib hooks, which takes the art of attaching a number to a view and puts it into an algorithm we can trust!

First you need to subclass DTNibHook ([source at bitbucket](http://bitbucket.org/danielctull/dtnibhook/src/tip/DTNibHook/DTNibHook.m)) and add properties for the subviews you wish to access later on. This subclass then becomes the File Owner in the nib file for your view/table cell, where you can attach the outlet properties to the subviews and the view property to your view/table cell.

The following example uses a cell from a nib named DTTestCell with a sole property label. With the new runtime, our nib hook subclass looks like this:

    @interface DTTestNibHook : DTNibHook {}
    @property (nonatomic, retain) IBOutlet UILabel *label;
    @end

    @implementation DTTestNibHook
    @synthesize label;
    @end

Upon loading a nib file, a nib hook dynamically sets the tag property for each of the connected subviews, using a number based on the property's alphabetised order. This enables another instance to bind itself to the main view and set up the properties later on using the same method of ordering the property names. In either case, you can access the properties of the nib hook to manipulate the subviews.

    - (UITableViewCell *)tableView:(UITableView *)tv cellForRowAtIndexPath:(NSIndexPath *)ip {

        UITableViewCell *cell = [tv dequeueReusableCellWithIdentifier:@"TestCell"];
        DTTestNibHook *nibHook;

        if (cell) {
            nibHook = [[DTTestNibHook alloc] initWithView:cell];
        } else {
            nibHook = [[DTTestNibHook alloc] initWithNibName:@"DTTestCell" bundle:nil];
            cell = [[(UITableViewCell *)nibHook.view retain] autorelease];
        }

        nibHook.label.text = [NSString stringWithFormat:@"Cell number %i", ip.row];

        [nibHook release];

        return cell;
    }

I prefer this code to say <code>\[cell viewWithTag:20\]</code>, where the tag could be changed accidentally without notice by someone changing it in the nib. It's also worth noting that you can use one subclass for more than one nib, assuming they share their set of properties.
