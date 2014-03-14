This is an example of hacking Angular v1.x to lazy load code that a bunch of people have asked me for.

Simply include `lazyLoad.js`, use `angular.lazyLoad` in route `resolve` and it will magically work.

The [`main.js`](https://github.com/vojtajina/ng-1.x-async-hack/blob/master/js/main.js) is loaded at the beginning. Later, when navigating to `/list` route, additional module [`lazy-list.js`](https://github.com/vojtajina/ng-1.x-async-hack/blob/master/js/lazy-list.js) is loaded. It should be fairly simple to make this work with [RequireJS](http://requirejs.org).

In Angular v2, integration with a module loader (such as RequireJS) and lazy loading will be simple.
