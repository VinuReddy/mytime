myApp.controller('homeCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $state.go('about');
}]);