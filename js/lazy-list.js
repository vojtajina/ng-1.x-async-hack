// This is lazy loaded, when navigating to /list route.

var list = angular.module('call me whatever', []);

list.service('foo', function() {
  this.name = 'foo';
});

list.controller('List', function($scope, foo) {
  $scope.alert = function() {
    alert(foo.name);
  };
});
