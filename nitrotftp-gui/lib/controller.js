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
			if (resp.status === 200) {
				$scope.data[0] = resp.data.totalbytessent;
				$scope.data[1] = resp.data.totalbytesrecv;
			};
		});
	};

	var timer = setInterval(function(){$scope.statsClick()},5000);

});

myApp.controller('CurConnsCtrl',function($scope){
	$scope.data = {
		conns: 0
	};
});

myApp.controller('SwitchDemoCtrl', function($scope) {
	$scope.data = {
		stateoff: "Off",
		stateon: "On",
		state: "Off"
	};

	//check state
	var msg = ipc.sendSync('synchronous-message','status');
	if (msg){
		$scope.data.state = $scope.data.stateon;
	};
	$scope.onChange = function(cbState) {
		if (cbState === $scope.data.stateon) {
			ipc.sendSync('synchronous-message', 'start');
		} else if (cbState === $scope.data.stateoff) {
			ipc.sendSync('synchronous-message', 'stop');
		}
	};
});
