---
layout: post
title: Asynchronous Unit Testing in Xcode 6
---

With Xcode 6, Apple have finally given us a sanctioned way to perform asynchronous unit tests. For more information about this you can watch the WWDC 2014 session [Testing in Xcode 6](https://developer.apple.com/videos/wwdc/2014/#414-video) or read the new [Testing with Xcode](https://developer.apple.com/library/prerelease/ios/documentation/DeveloperTools/Conceptual/testing_with_xcode/testing_3_writing_test_classes/testing_3_writing_test_classes.html#//apple_ref/doc/uid/TP40014132-CH4-SW6) document.

Both of these show you how to adopt the new methods in Xcode 6, however some of us still need to build with Xcode 5.1 in the hope that we'll ship before Xcode 6 is released, but may still want to test asynchronous methods now.

Previously, I've used techniques similar to Mike Ash's [NSRunLoop-based example](https://www.mikeash.com/pyblog/friday-qa-2011-07-22-writing-unit-tests.html) to cause the test to wait for my async code to finish running, which has worked well. Using this approach, I have recreated the basics of Apple's asynchronous XCTest methods in a project called [DCTAsynchronousTesting](https://github.com/danielctull/DCTAsynchronousTesting).

The following shows how you would use this code, it might look extremely similar to examples from Apple's documentation.

```
@import XCTest;
#import <AsynchronousTesting/AsynchronousTesting.h>
#import "XCTestCase+DCTAsynchronousTesting.h"

@interface AsynchronousTestingTests : XCTestCase
@end

@implementation AsynchronousTestingTests

- (void)testExample {

	XCTestExpectation *expectation = [self expectationWithDescription:NSStringFromSelector(_cmd)];
	[AsynchronousTesting performAsynchronousOperationWithCompletion:^(BOOL success) {
		XCTAssertTrue(success, @"Operation should have succeeded.");
		[expectation fulfill];
	}];

	[self waitForExpectationsWithTimeout:2 handler:nil];
}

@end

```

Hopefully this will help you write Xcode 6 compatible asynchronous tests until the "fall" comes.