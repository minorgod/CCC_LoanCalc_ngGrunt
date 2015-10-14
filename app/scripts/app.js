'use strict';

/**
 * @ngdoc overview
 * @name cccLoanCalcNgGruntApp
 * @description
 * # cccLoanCalcNgGruntApp
 *
 * Main module of the application.
 */
angular
  .module('cccLoanCalcNgGruntApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).directive('isActiveLink', ['$location', function (location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        //var clazz = attrs.activeLink;
        var clazz = "active";
        var path = attrs.ngHref;
        path = path.substring(1); //hack because path does not return including hashbang
        scope.location = location;
        scope.$watch('location.path()', function (newPath) {
          if (path === newPath) {
            element.parent().addClass(clazz);
          } else {
            element.parent().removeClass(clazz);
          }
        });
      }
    };
  }]);

