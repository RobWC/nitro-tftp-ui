var child_process = require('child_process')

exports.SpawnServer = function() {
	this.running = false;
}

exports.SpawnServer.prototype.start = function() {
	var self = this;
	if (!self.running) {
		self.child = child_process.spawn('./bin/nitro-tftp_linux_amd64', ['-config', './etc/nitrotftp.json']);
		self.running = true;
		self.child.stdout.on('data', function(data) {
			console.log('stdout: ' + data);
		});


		self.child.stderr.on('data', function(data) {
			console.log('stderr: ' + data);
		});

		self.child.on('close', function(code) {
			self.running = false;
			console.log('child process exited with code ' + code);
		});
	} else {
		console.log("Server already running")
	}
}

exports.SpawnServer.prototype.stop = function(argument) {
	var self = this;
	// body...
	self.child.kill('SIGTERM');
}
