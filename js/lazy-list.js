// This is lazy loaded, when navigating to /list route.

var list = angular.module('call me whatever', []);

list.service('foo', function () {
    this.name = 'foo';
});

list.controller('List', function ($scope, foo, lazyService) {
    $scope.alert = function () {
        alert(foo.name);
        alert(lazyService.first);
    };
});

list.directive('lazyList', function () {
    return {
        replace: true,
        restrict: 'EA',
        template: '<div>Lazy loaded directive</div>'
    }
});

list.factory('lazyService', function () {
    return {
        first: 'First Value',
        second: 'Second Value'
    }
});
