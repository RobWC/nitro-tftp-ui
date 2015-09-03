var ipc = require('ipc');
var Config = require('./config.js').Config;

var startServer = function() {
	ipc.send('synchronous-message', 'start');
}

var stopServer = function() {
	ipc.send('synchronous-message', 'stop');
}

ipc.on('asynchronous-reply', function(arg) {
	console.log(arg); // prints "pong"
});

ipc.on('synchronous-reply', function(arg) {
	console.log(arg); // prints "pong"
});

var myApp = angular.module("app", ["chart.js", "ngMaterial"]);
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

myApp.controller('StatsCall', function($scope,$http) {
	$scope.data = {
		totalbytessent: 1,
		totalbytesrecv: 1
	}
	$scope.statsClick = function() {
		$http.get("http://127.0.0.1:16969/api/v1/stats/all").then(function(resp) {
			console.log(resp.data);
			$scope.data.totalbytessent = resp.data.totalbytessent;
			$scope.data.totalbytesrecv = resp.data.totalbytessent;
		});
	}
});

myApp.controller('SwitchDemoCtrl', function($scope) {
	$scope.data = {
		stateoff: "Off",
		stateon: "On",
	};
	$scope.onChange = function(cbState) {
		if (cbState === $scope.data.stateon) {
			ipc.send('synchronous-message', 'start');
		} else if (cbState === $scope.data.stateoff) {
			ipc.send('synchronous-message', 'stop');
		}
	};
});
