myApp.controller('dealsCtrl', ['$scope', '$http', '$stateParams', 'mytimeService', '$state', function ($scope, $http, $stateParams, mytimeService, $state) {
    $scope.deals = [];
    $scope.isError = false;
    $scope.errorMessage = "";
    $scope.locId = $stateParams.locId;
    $scope.showSpinner = false;
    $scope.goHome = function () {
        $state.go('about');
    }

    $scope.getDealsByLocation = function (locId) {
        $scope.showSpinner = true;
        mytimeService.getDealsByLocation('40426', locId)
            .then(function (response) {
                $scope.showSpinner = false;
                if (response != null && response.deals != null && response.deals.length > 0) {
                    $scope.deals = response.deals;                    
                }
                else {
                    $scope.isError = true;
                    $scope.errorMessage = "No deals found.";
                }
            },
            function (error) {
                $scope.showSpinner = false;
                console.log("Error while getting the locations");
            });
    }

    $scope.getDealsByLocation($scope.locId);

}]);