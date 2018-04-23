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