---
layout: post
title: Finding explicit .png references in xibs
---

I have come onto a project where I have been asked to move all images into asset libraries to more easily manage them. An issue is that the project's many xib files reference the images as _image.png_ rather than just the image name _image_.

I started to go through the ~20 xib files to remove the .png at the end of the image names. But after the first xib, I got bored. So I quickly came up with the following script, which finds all the .png references in all .xib files recursively inside the current directory.

```grep -r -i --include=*.xib ".png" .```

This will list the files along with the line in the xib file it found, which can guide you as to where to look if it's not obvious, as well as making sure you've converted all cases.

However, I had a **lot** of _.png_ references to change, and given that I had just automated finding them, surely I can automate the task of removing them?

I found [a solution](http://www.praj.com.au/post/23691181208/grep-replace-text-string-in-files) which compromised of piping the result of my grep through `sort` and `uniq`(ue) to a perl script which replaces the first instance of _.png_ that occurs on a line.

```grep -r -i -l --include=*.xib ".png" . | sort | uniq | xargs perl -e "s/.png//" -pi```

Some xib entries had two images per line, but it was simple and quick enough to just run this script again to get the second occurance of the _.png_.
