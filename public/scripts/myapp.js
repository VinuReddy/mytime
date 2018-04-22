
// Create angular module
var myApp = angular.module('myApp', ['ui.router']);

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

    //$urlRouterProvider.otherwise('home');
}]);


myApp.factory('mytimeService', function ($http, $q) {

    var factory = {};

    factory.getAllLocations = function (companyId) {
        var def = $q.defer();
        $http({
            method: 'GET',
            url: 'https://www.mytime.com/api/mkp/v1/companies/' + companyId + '/locations',
        }).then(function successCallback(response) {
            def.resolve(response.data);
        }, function errorCallback(response) {
            def.reject("Failed to get locations");
        });

        return def.promise;
    };


    factory.getDealsByLocation = function (companyId, locationId) {
        var def = $q.defer();
        $http({
            method: 'GET',
            url: 'https://www.mytime.com/api/mkp/v1/companies/' + companyId + '/deals?location_ids=' + locationId,
        }).then(function successCallback(response) {
            def.resolve(response.data);
        }, function errorCallback(response) {
            def.reject("Failed to get deals");
        });

        return def.promise;
    };

    return factory;
});



myApp.controller('homeCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $state.go('about');
}]);


myApp.controller('aboutCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $scope.loadAllLocations = function () {
        $state.go('locations');
    }
}]);

myApp.controller('locationsCtrl', ['$scope', '$http', '$state', 'mytimeService', function ($scope, $http, $state, mytimeService) {
    $scope.Locations = [];
    $scope.isError = false;
    $scope.ErrorMessage = "";

    $scope.getLocations = function () {

        mytimeService.getAllLocations('40426')
            .then(function (response) {
                if (response != null && response.locations != null && response.locations.length > 0) {
                    $scope.Locations = response.locations;
                }
                else {
                    $scope.isError = true;
                    $scope.ErrorMessage = "No locations found.";
                }
            },
            function (error) {
                console.log("Error while getting the locations");
            });
    }

    $scope.getDealsByLocation = function (locId) {
        $state.go('deals', { 'locId': locId });
    }

    $scope.getLocations();

}]);

myApp.controller('dealsCtrl', ['$scope', '$http', '$stateParams', 'mytimeService', '$state', function ($scope, $http, $stateParams, mytimeService, $state) {
    $scope.Deals = [];
    $scope.isError = false;
    $scope.ErrorMessage = "";
    $scope.locId = $stateParams.locId;

    $scope.goHome = function () {
        $state.go('about');
    }

    $scope.getDealsByLocation = function (locId) {
        mytimeService.getDealsByLocation('40426', locId)
            .then(function (response) {
                if (response != null && response.deals != null && response.deals.length > 0) {
                    $scope.Deals = response.deals;                    
                }
                else {
                    $scope.isError = true;
                    $scope.ErrorMessage = "No deals found.";
                }
            },
            function (error) {
                console.log("Error while getting the locations");
            });
    }

    $scope.getDealsByLocation($scope.locId);

}]);




