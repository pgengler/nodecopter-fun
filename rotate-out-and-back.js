var arDrone = require('ar-drone');
var client  = arDrone.createClient();

client.takeoff(function() {
	client.clockwise(0.5);
	client.after(3500, function() {
		client.stop();
		client.front(0.25);
	});
	client.after(4000, function() {
		client.stop();
		client.clockwise(0.5);
	});
	client.after(3500, function() {
		client.stop();
		client.front(0.5);
	});
	client.after(2000, function() {
		client.stop();
		client.land();
	});
});
