angular.module('app', ['ngRoute', 'const']).config(function($routeProvider) {
  $routeProvider
    .when('/list', {templateUrl: './views/list.html', resolve: {x: angular.lazyLoad('./js/lazy-list.js')}, controller: 'List'})
    .when('/detail', {templateUrl: './views/detail.html'});
});
