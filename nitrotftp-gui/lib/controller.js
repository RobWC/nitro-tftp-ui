var myApp = angular.module("app", ["chart.js","ngMaterial"]);
	// Optional configuration
myApp.config(['ChartJsProvider', function(ChartJsProvider) {
	// Configure all charts
	ChartJsProvider.setOptions({
		colours: ['#FF5252', '#FF8A80'],
		responsive: false
	});
	// Configure all line charts
	ChartJsProvider.setOptions('Line', {
		datasetFill: false
	});
}])
myApp.controller("LineCtrl", ['$scope', '$timeout', function($scope, $timeout) {

	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.series = ['Series A', 'Series B'];
	$scope.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];
	$scope.onClick = function(points, evt) {
		console.log(points, evt);
	};

	// Simulate async data update
	$timeout(function() {
		$scope.data = [
			[28, 48, 40, 19, 86, 27, 90],
			[65, 59, 80, 81, 56, 55, 40]
		];
	}, 3000);
}]);

myApp.controller('AppCtrl', function($scope) {
  $scope.title1 = 'Button';
  $scope.title4 = 'Warn';
  $scope.isDisabled = true;
  $scope.googleUrl = 'http://google.com';
});
