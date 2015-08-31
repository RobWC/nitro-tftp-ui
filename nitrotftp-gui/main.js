var app = require('app') // Module to control application life.
var BrowserWindow = require('browser-window') // Module to create native browser window.
var crashReporter = require('crash-reporter');

var ipc = require('ipc')

var SpawnServer = require('./spawnserver.js').SpawnServer;

// Report crashes to our server.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is GCed.
var mainWindow = null;

crashReporter.start({
  productName: 'NitroTFTP-UI',
  companyName: 'Rob Cameron',
  submitUrl: 'http://localhost:3000/',
  autoSubmit: true
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform != 'darwin') {
        ss.stop();
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

	//create a new spawn server to manage the child process
	var ss = new SpawnServer();

	ipc.on('asynchronous-message', function(event, arg) {
		console.log(arg); // prints "ping"
		event.sender.send('asynchronous-reply', 'pong');
	});

	ipc.on('synchronous-message', function(event, arg) {
		if (arg === "start") {
			ss.start();
			event.returnValue = 'Started';
		} else if (arg === "stop") {
			ss.stop();
			event.returnValue = 'Stopped';
		}
		console.log(arg); // prints "ping"
	});

	// and load the index.html of the app.
	mainWindow.loadUrl('file://' + __dirname + '/index.html');

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
