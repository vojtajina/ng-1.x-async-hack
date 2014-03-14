(function(){

  var originalAngularModule = angular.module;
  var appModule, firstModule;

  // Patch angular.module to use the stored $provide.
  angular.module = function() {

    var module = originalAngularModule.apply(window, arguments);
    if (arguments.length === 2) {
      if (!firstModule) {
        firstModule = true;
        module.config(function($controllerProvider, $compileProvider, $filterProvider, $provide) {
          // This is the hack,
          // we store refs to $provide, so that we can add more stuff to it durind run-time.
          appModule = {
            controller : $controllerProvider.register,
            directive  : $compileProvider.directive,
            filter     : $filterProvider.register,
            factory    : $provide.factory,
            service    : $provide.service,
            value      : $provide.value
          };
        });
      }
      angular.extend(module, {
        controller : function(name, constructor) {
          appModule.controller(name, constructor);
          return this;
        },
        directive : function(name, constructor) {
          appModule.directive(name, constructor);
          return this;
        },
        filter : function(name, constructor) {
          appModule.filter(name, constructor);
          return this;
        },
        factory : function(name, constructor) {
          appModule.factory(name, constructor);
          return this;
        },
        service : function(name, constructor) {
          appModule.service(name, constructor);
          return this;
        },
        value : function(name, constructor) {
          appModule.value(name, constructor);
          return this;
        }
      });
    }
    return module;
  };

  var __alreadyLoading = {};
  // override at your will
  angular.lazyLoad = function(path) {
    return function($q) {
      if (!__alreadyLoading[path]) {
        var d = $q.defer();
        var s = document.createElement('script');

        s.src = path;
        s.onload = function() {
          d.resolve();
        };
        s.onerror = function() {
          d.reject();
        };
        document.body.appendChild(s);

        __alreadyLoading[path] = d.promise;
      }

      return __alreadyLoading[path];
    };
  };
})();
