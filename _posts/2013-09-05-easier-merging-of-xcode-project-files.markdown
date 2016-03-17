---
layout: post
title: Easier merging of Xcode project files
---

A while back, I discovered a script called [sort-Xcode-project-file](https://github.com/WebKit/webkit/blob/master/Tools/Scripts/sort-Xcode-project-file) in the WebKit project, which sorts the Xcode project by running the following command:

    perl sort-Xcode-project-file [Project].xcodeproj/project.pbxproj

I started using it to make files easier to find in my projects and just nicer to look at. After a while, I discovered that it helps a lot with merging the Xcode project file. If both sides of the merge are sorted, there are fewer differences when merging, and makes almost all merges either automatic or extremely easy to tackle.

This script has helped me manage project changes with multiple collaborators, so I suggest if you're coming across merge issues with the Xcode project, or if you've got some amount of OCD, you try it out. I put the script in the repository, with a bash script to make it easier to run.

Words of Warning
----------------

This script uses regex, so it's potentially fragile and for this reason I *don't* run it as a pre-commit hook. I commit my changes and then run the script and commit the sorting changes separately, just in case it destroys my project.

An annoying issue I've found is that when using static library sub-projects, I sometimes see a diff (as shown below) which swaps the order of a Products group containing the library's targets. I'm not 100% sure why, I suppose that Xcode likes to sort them one way, but the script sorts another way.

This diff can come up if you don't run the script, which I assume is Xcode modifying it to its liking, and running the sort script will remove those changes.

    @@ -1154,10 +1154,10 @@
                    24D1F5C316BC464B001263D9 /* Products */ = {
                            isa = PBXGroup;
                            children = (
    -                               24D1F5C916BC464B001263D9 /* libDCTAuth.a */,
    -                               24D1F5CB16BC464B001263D9 /* DCTAuthTests.xctest */,
                                    24D1F5CD16BC464B001263D9 /* DCTAuth.app */,
                                    24DAF6D7177876D300D7B93F /* DCTAuth.bundle */,
    +                               24D1F5CB16BC464B001263D9 /* DCTAuthTests.xctest */,
    +                               24D1F5C916BC464B001263D9 /* libDCTAuth.a */,
                            );
                            name = Products;
                            sourceTree = "<group>";

What's even weirder is that these groups don't seem to be part of the main project file, but are contained in the library sub-projects. Those projects are untouched by the script, but I can't seem to locate what else this section of the project XML might represent in the Xcode UI.
