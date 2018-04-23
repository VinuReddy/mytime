myApp.controller('aboutCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $scope.loadAllLocations = function () {
        $state.go('locations');
    }
}]);