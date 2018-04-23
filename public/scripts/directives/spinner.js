myApp.directive('spinner', function() {
	return {
		restrict: 'EA',
		transclude: true,
		scope : {
			show: '='
		},
		template: '<div class="loader" ng-show="show"></div>'
	}
})