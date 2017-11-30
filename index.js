
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const band = {
  receiver: '',
  gain: '',
  freq: ''
}
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  socket.on('receiverConnect', data => {
    band.receiver = socket.id
    console.log(band)
  });

  socket.on('gainConnect', data => {
    band.gain = socket.id
    console.log(band)
  })

  socket.on('freqConnect', data => {
    band.freq = socket.id
    console.log(band)
  })

  socket.on('gainChange', data => {
    io.to(band.receiver).emit('gainChange', data)
  })

  socket.on('freqChange', data => {
    io.to(band.receiver).emit('freqChange', data)
  })
});

http.listen(5000, function(){
  console.log('listening on *:3000');
});
