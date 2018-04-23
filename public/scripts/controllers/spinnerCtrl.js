myApp.controller('locationsCtrl', ['$scope', function($scope){
	$scope.showSpinner = false;
	$scope.add = function() {
		$scope.showSpinner = true;
	}

	$scope.remove = function() {
		$scope.showSpinner = false;
	}
}]);