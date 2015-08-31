exports.Config = function (incomingdir, outgoingdir, listenip, port, protocol, stats) {
	this.incomingdir = ((incomingdir !== "" && incomingdir !== undefined) ? incomingdir : "");
	this,outgoingdir = ((outgoingdir !== "" && outgoingdir !== undefined) ? outgoingdir : "");
	this.listenip = ((listenip !== "" && listenip !== undefined) ? listenip : "");
	this.port = ((port !== "" && port !== undefined) ? port : "");
	this.protocol = ((protocol !== "" && protocol !== undefined) ? protocol : "");
	this.stats = ((stats !== "" && stats !== undefined) ? stats : "");
};

exports.Config.prototype.string = function () {
	return JSON.stringify(this);
}
