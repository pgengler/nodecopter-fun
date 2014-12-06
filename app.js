var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var arDrone = require('ar-drone');

var client  = arDrone.createClient();
var pngStream = client.getPngStream();
pngStream.on('data', function(data) {
  var str = data.toString('base64');
  io.emit('frame', str);
});
var firstTime = true;
client.on('navdata', function(navdata) {
  if (firstTime) {
    console.log(navdata);
    firstTime = false;
  }
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/jquery.js', function(req, res) {
	res.sendFile(__dirname + '/jquery.js');
});
app.get('/main.js', function(req, res){
	res.sendFile(__dirname + '/main.js');
});

io.on('connection', function(socket) {
  socket.on('takeoff', function() {
    client.takeoff(function() {
      socket.emit('takeoff:complete');
    });
  });
  socket.on('land', function() {
    client.land();
  });
  socket.on('stop', function() {
    client.stop();
  });
  socket.on('front', function(speed) {
    client.front(speed);
  });
  socket.on('back', function(speed) {
    client.back(speed);
  });
  socket.on('clockwise', function(speed) {
    client.clockwise(speed);
  });
  socket.on('counterClockwise', function(speed) {
    client.counterClockwise(speed);
  });
  socket.on('up', function(speed) {
    client.up(speed);
  });
  socket.on('down', function(speed) {
    client.down(speed);
  });
  socket.on('left', function(speed) {
    client.left(speed);
  });
  socket.on('right', function(speed) {
    client.right(speed);
  });
});

http.listen(3500);
