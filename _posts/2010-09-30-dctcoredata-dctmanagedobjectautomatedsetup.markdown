---
layout: post
title: "DCTCoreData: DCTManagedObjectAutomatedSetup"
---

This is the first of post about [DCTCoreData](http://github.com/danielctull/DCTCoreData), my additions to Apple's Core Data framework.

When dealing with web services, I am usually putting returned data into a Core Data model for offline caching. This involves running the data through a parser which gives me a dictionary or an array of dictionaries. Then looping through each dictionary's keys, possibly converting the values and storing them in the appropriate managed object.

A lot of this is really tedious <code>-objectForKey:</code> stuff, so I looked at the best way to implement a reusable method of running through this tediousness. The DCTAutomatedSetup category on NSManagedObject is my solution.

If the keys in the dictionary returned from the server match the attribute or relationships names of the managed object, and the types match, then this category will simply transfer set the values for the key names.

Property Mapping and Conversion
-------------------------------

Of course, this is hardly ever going to happen; I find myself having properties which are named slightly different or needing to convert values returned into the proper Cocoa types (more times than not this is an NSDate). DCTAutomatedSetup handles these cases by asking the managed object subclass for a mapping of remote names to local names or by asking the subclass to convert the value in the dictionary. In the example in the project, I have implemented these methods in the following category for DCTCDGroup:

<script src="http://gist.github.com/616011.js">
</script>
Here we see that the dictionary will have the keys "id" and "description", both of which cannot be used in a managed object anyway, so we set up the dictionary with the remote name acts as a key for the local names "groupID" and "groupDescription". We can also see a conversion of the date attribute, which is actually the seconds since 1970, the returned NSDate object is used by DCTAutomatedSetup to store.

Entity Names
------------

By default, DCTAutomatedSetup uses the class name as the entity name. If for some reason this is not the case, the method <code>+dct\_entityName</code> is provided to give the entity name the class represents. If this is implemented DCTAutomatedSetup will use this value and not the classname.

Duplicate objects
-----------------

When pulling down this data, some of it might represent objects we already have stored. To resolve this, DCTAutomatedSetup calls <code>+dct\_uniqueKey</code> for a unique key (or <code>+dct\_uniqueKeys</code> for an array of keys) and uses the returned value to create a predicate to fetch from the managed object context. If the object exists, it will call <code>-dct\_setupFromDictionary:</code> on that object to assign any changed values before returning that fetched object. Below is an example from the project DCTCDItem and how it gives its key "theID" to use as the unique key. (Note: currently this key must be the local form of the key.)

<script src="http://gist.github.com/616038.js">
</script>
The predicate will have the entity gained either through the optional class method or the class name, and the predicate with format: <code>key  'value'&lt;/code&gt; (or ANDed equal checks for multiple keys). For the example above, if the value was "1234" the predicate would have the format &lt;code&gt;theID  '1234'</code>.

Relationships
-------------

DCTAutomatedSetup has the knowledge of your Core Data model, so if a key for the object is a relationship and the key in the dictionary is a dictionary, it will call <code>+dct\_objectForDictionary:managedObjectContext:</code> on the related class with the dictionary. What this means is that you could give a whole object graph in a dictionary and all the objects will get hooked up in Core Data, especially useful for APIs which give back objects which contains other nested objects. For example you might get back an array of tweets, each having a reference to a twitter user that you would represent as its own object.

Manual handling
---------------

For some reason, you may just want to handle the dictionary yourself, for this reason <code>+dct\_handleObjectForDictionary:</code> and <code>-dct\_handleKey:value:</code> exist to get the object for the dictionary or set the property with the key/value from the dictionary. I've not needed to use these in my code yet, but the option is there if you need it.

Hopefully this explains the DCTAutomatedSetup category. I have a few changes in mind that are listed in the project's [Issues](http://github.com/danielctull/DCTCoreData/issues). If you have any ideas for it please post on there as an issue.
