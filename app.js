const express = require("express");
var compression = require('compression')
const path = require('path');
const app = express();
const port = 3000;

app.use(compression())

app.use(express.static(path.join(__dirname, 'BaseGameAltWebGL')));

app.get('/', (req, res) => {
  res.header('Content-Encoding', 'gzip');
  res.sendFile(path.join(__dirname, + '/BaseGameAltWebGL/index.html'));
})

const server = require('http').Server(app);

const io = require("socket.io")(server, {
	cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
	console.log("Got connection!");
	
	socket.on('testEvent', (data) => {
		console.log("Received test Event " + data);
	});
	
	soc = socket;
	socket.emit("testEvent", "Sending");
});

server.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});

/* WebGL incompatible
const express = require('express')
const app = express();
const http = require('http').createServer(app);

http.listen(3000, () => {
  console.log('Server listening on port 3000');
});

const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (data) => {
        
      //Client have sent some message please do something about it.  
        console.log('Message from client', data);
        //sending response to client side
        socket.emit('message', {date: new Date().getTime(), data: data});
      });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

});

*/