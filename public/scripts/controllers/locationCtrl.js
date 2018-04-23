myApp.controller('locationsCtrl', ['$scope', '$http', '$state', 'mytimeService', function ($scope, $http, $state, mytimeService) {
    $scope.Locations = [];
    $scope.isError = false;
    $scope.ErrorMessage = "";
    $scope.showSpinner = false;
    $scope.getLocations = function () {
        $scope.showSpinner = true;
        mytimeService.getAllLocations('40426')
            .then(function (response) {
                $scope.showSpinner = false;
                if (response != null && response.locations != null && response.locations.length > 0) {
                    $scope.Locations = response.locations;
                }
                else {
                    $scope.isError = true;
                    $scope.ErrorMessage = "No locations found.";
                }
            },
            function (error) {
                $scope.showSpinner = false;
                console.log("Error while getting the locations");
            });
    }

    $scope.getDealsByLocation = function (locId) {
        $state.go('deals', { 'locId': locId });
    }

    $scope.getLocations();

}]);