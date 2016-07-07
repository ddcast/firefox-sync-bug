# firefox-sync-bug

Aka Bugzilla@Mozilla [Bug 1279007](https://bugzilla.mozilla.org/show_bug.cgi?id=1279007)

This project reproduces a bug that occurs in FireFox when attempting to perform synchronous requests with `XMLHttpRequest` for JavaScript sources (appended to documents using JavaScript DOM manipulation) that depend on allocated memory of other sources. Developers experience inconsistent Type Errors as a symptom of the bug. Although normally key value pairs residing after the request call would be allocated into memory immediately, due to the bug key value pairs are allocated after the request receives a response. Further, the queue continues processing messages of subsequent sources through the duration of the request (see [Concurrency model and Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)) and, without the allocation of memory from preceding parsed messages, developers can expect Type Errors because key value pairs may not yet exist.

## Demo

https://githubstatic.s3.amazonaws.com/firefox-sync-bug/bug.html

# Run

Use a simple http server that targets this project's root directoy. Then, open `bug.html` in Firefox.

```
npm install http-server
./node_modules/http-server/bin/http-server ./
```

# Will this be fixed?

Likely unlikely when browsing specification docs. Although, this potentially breaks sites which implement a certain way of loading resources for FF users.

"Synchronous `XMLHttpRequest` outside of workers is in the process of being removed from the web platform as it has detrimental effects to the end user's experience. (This is a long process that takes many years.) Developers must not pass false for the async argument when entry settings object's global object is a `Window` object. User agents are strongly encouraged to warn about such usage in developer tools and may experiment with throwing an InvalidAccessError exception when it occurs."

- [https://xhr.spec.whatwg.org/#sync-warning](https://xhr.spec.whatwg.org/#sync-warning)

# Work-around

Please avoid performing synchronous requests. Alternatively, if synchronous requests are unavoidable, consider implementing events to handle the code after the request is complete. Also, you may choose to remove the lexical dependencies on allocated memory across sources. For example, move the source with the request call and the succeeding sources into one source. (This is not recommended.)
