var app = angular.module('app', ['ngRoute']);

var __alreadyLoading = {};
// TODO(vojta): probably use RequireJS for this.
function lazyLoad(path) {
  return function($q) {
    if (!__alreadyLoading[path]) {
      var d = $q.defer();
      var s = document.createElement('script');

      s.src = path;
      s.onload = function() {
        d.resolve();
      };

      document.body.appendChild(s);

      __alreadyLoading[path] = d.promise;
    }

    return __alreadyLoading[path];
  };
}


// This is the hack,
// we store refs to $provide, so that we can add more stuff to it durind run-time.
var __$provide;
var __$controllerProvider;

app.config(function($routeProvider, $provide, $controllerProvider) {
  __$provide = $provide;
  __$controllerProvider = $controllerProvider;

  $routeProvider
    .when('/list', {templateUrl: './views/list.html', resolve: {whatever: lazyLoad('./js/lazy-list.js')}, controller: 'List'})
    .when('/detail', {templateUrl: './views/detail.html'})
});


// After all the initial-code has been loaded,
// patch angular.module to use the stored $provide.
// We could avoid patching angular.module and use some other API,
// such as angular.lazyModule(), but this makes it easier to load any module lazily.
angular.module = function() {
  return {
    service: function(name, constructor) {
      __$provide.service(name, constructor);
      return this;
    },

    controller: function(name, constructor) {
      __$controllerProvider.register(name, constructor);
      return this;
    }

    // TODO(vojta): implement other APIs
    // - factory
    // - value
    // - directive
    // - filter
  };
};
