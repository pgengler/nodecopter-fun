$('button.takeoff').click(function() {
	socket.emit('takeoff');
	return false;
});
$('button.land').click(function() {
	socket.emit('land');
	return false;
});

$('button.run').click(function() {
	var commands = $('textarea.commands').val().split(/\n/);
	runCommands(commands);
});

socket.on('frame', function(data) {
	$('img.frame').prop('src', 'data:image/png;base64,' + data);
});

function runCommands(commands)
{
	if (commands.length == 0) return;
	var command = commands.shift();

	var matches = command.match(/^sleep\s+(.+)/);
	if (matches) {
		var delay = matches[1];
		setTimeout(function() {
			runCommands(commands);
		}, delay);
	} else {
		runCommand(command);
		if (command == "takeoff") {
			socket.on('takeoff:complete', function() {
				runCommands(commands);
			});
			runCommand(command);
		} else {
			runCommand(command);
			runCommands(commands);
		}
	}
}

function runCommand(command)
{
	if (command.match(/\s/)) {
		var parts = command.split(/\s+/);
		socket.emit(parts[0], parts[1]);
	} else {
		socket.emit(command);
	}
}
