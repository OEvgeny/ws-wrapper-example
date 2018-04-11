
const WebSocketServer = require("ws").Server
const WebSocket = require('ws');
const WebSocketWrapper = require("ws-wrapper")
const wss = new WebSocketServer({port: 3000})

wss.on("connection", (rawSocket) => {
  const socket = new WebSocketWrapper(rawSocket)
  // This line is the reason of error
  socket.name = `Socket${Math.random()}`
  socket.on('echo', (data) => {
    console.log('Echo', data, socket.name)
    // Server fails even it hasn't emit anything!
    // socket.emit('echo', data)
  })
});

/* // This works as expected:
const ws = new WebSocketWrapper(new WebSocket('ws://localhost:3000'))
ws.on('echo', data => console.log(data))
setInterval(() => ws.emit('echo', { msg: 'data' }), 200)
*/