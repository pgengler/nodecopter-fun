var arDrone = require('ar-drone');
var client  = arDrone.createClient();

client.takeoff(function() {
	this.clockwise(0.5);
	this.after(3500, function() {
		this.stop();
		this.front(0.25);
		this.after(2000, function() {
			this.stop();
			this.clockwise(0.5);
			this.after(3500, function() {
				this.stop();
				this.front(0.25);
				this.after(2000, function() {
					this.stop();
					this.land();
				});
			});
		});
	});
});
