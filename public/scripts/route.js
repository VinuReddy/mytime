
var myApp = angular.module('myApp');

myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('about', {
            url: '/about',
            templateUrl: '../views/about.html',
            controller: 'aboutCtrl',
        })
        .state('locations', {
            url: '/locations',
            templateUrl: '../views/locations.html',
            controller: 'locationsCtrl',
        })
        .state('deals', {
            url: '/deals',
            templateUrl: '../views/deals.html',
            controller: 'dealsCtrl',
            params: {
                'locId': '0',
            }
        });

}]);