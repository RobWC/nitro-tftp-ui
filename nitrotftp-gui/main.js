var app = require('app') // Module to control application life.
var BrowserWindow = require('browser-window') // Module to create native browser window.

var assert = require('assert')
var fs = require('fs')
var child_process = require('child_process')
var ipc = require('ipc')

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is GCed.
var mainWindow = null;

var SpawnServer = function() {

}

SpawnServer.prototype.start = function() {
	var self = this;
	self.child = child_process.spawn('./bin/nitro-tftp_linux_amd64', ['-config', './etc/nitrotftp.json']);

	self.child.stdout.on('data', function(data) {
		console.log('stdout: ' + data);
	});


	self.child.stderr.on('data', function(data) {
		console.log('stderr: ' + data);
	});

	self.child.on('close', function(code) {
		console.log('child process exited with code ' + code);
	});
}

SpawnServer.prototype.stop = function(argument) {
	var self = this;
	// body...
	self.child.kill('SIGHUP');
}

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform != 'darwin') {
		app.quit();
	}
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	});

	ipc.on('asynchronous-message', function(event, arg) {
		console.log(arg); // prints "ping"
		event.sender.send('asynchronous-reply', 'pong');
	});

	ipc.on('synchronous-message', function(event, arg) {
		console.log(arg); // prints "ping"
		event.returnValue = 'pong';
	});

	// and load the index.html of the app.
	mainWindow.loadUrl('file://' + __dirname + '/index.html');

	var ss = new SpawnServer();
	ss.start();

	// Open the devtools.
	mainWindow.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		ss.stop();
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
});
