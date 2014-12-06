$('button.takeoff').click(function() {
	socket.emit('takeoff');
	return false;
});
$('button.land').click(function() {
	socket.emit('land');
	return false;
});

socket.on('frame', function(data) {
	$('img.frame').prop('src', 'data:image/png;base64,' + data);
});
