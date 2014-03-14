// This is lazy loaded, when navigating to /list route.

angular.module('list', ['const'])
.controller('List', function($scope, PIDay, name) {
  $scope.alert = function() {
    alert("It's " + PIDay + "!");
  };
  $scope.name = name;
})
.directive('hello', function(greeter, name) {
  return function(scope, element) {
    element.text(greeter.greet(name));
  };
})
.filter('greet', function(greet) {
  return function(value) {
    return greet(value);
  };
})
.factory('greet', function() {
  return function (name) {
    return "Hello " + name;
  };
})
.service('greeter', function(greet) {
  this.greet = greet;
})
.value('name', 'Matt');