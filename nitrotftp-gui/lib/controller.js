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

myApp.controller('BytesTotalCtrl', function($scope,$http) {
	$scope.labels = ["Bytes Sent","Bytes Received"];
    $scope.data = [1, 1];
	$scope.statsClick = function() {
		$http.get("http://127.0.0.1:16969/api/v1/stats/all").then(function(resp) {
			console.log(resp.data);
			$scope.data[0] = resp.data.totalbytessent;
			$scope.data[1] = resp.data.totalbytesrecv;
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
