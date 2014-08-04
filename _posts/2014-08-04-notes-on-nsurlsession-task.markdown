---
layout: post
title: Notes on NSURLSession Task
---

In an app I'm currently working on, I use NSURLSession download tasks to retrieve data from the network. I use the delegate methods so I can get notified of progress and fill in the details of an NSProgress object.

The first thing to note is that while the following method appears to be about errors, it actually gets called on the completion of a task. If the task is successful, the error is nil. This actually went unnoticed far too long, leading to duplicate parsing of the data.

```
- (void)URLSession:(NSURLSession *)session
              task:(NSURLSessionTask *)task
didCompleteWithError:(NSError *)error 
```

Another issue I've come across recently is that, due to the former bug, I wanted a single place to handle completion of the task. So, I ended up storing the location of the downloaded data from the following delegate method call and using it in the above method to retrieve the data.

```
- (void)URLSession:(NSURLSession *)session
      downloadTask:(NSURLSessionDownloadTask *)downloadTask
didFinishDownloadingToURL:(NSURL *)location
```

This worked on iOS 7, where sometime *after* `didCompleteWithError:` the file would disappear.

On iOS 8, the file clear up happens after `didFinishDownloadingToURL:` and *before* `didCompleteWithError:` leading me to have completed requests with no error and no data.
