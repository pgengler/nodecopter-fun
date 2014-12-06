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
client.on('navdata', console.log);

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
    client.takeoff();
  });
  socket.on('land', function() {
    client.land();
  });
});

http.listen(3500);
