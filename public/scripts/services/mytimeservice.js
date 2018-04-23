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