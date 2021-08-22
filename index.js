const app = require('express')()
const http = require('http').createServer(app)
const ioOptions = {
  perMessageDeflate: {
    threshold: 32768
  },
  transports: ['websocket']
}
const io = require('socket.io')(http, ioOptions)

// now the messages
io.on('connection', function (socket) {
  console.log('Started')

  // this handles the JOIN message
  socket.on('join', function (data) {
    // let's record each user by their email
    console.log({ data })
    socket.join(data.email)
  })

  // this handle the MOUSE OVER message, from the V&D
  socket.on('mouseover', function (data) {
    const connectedUser = io.sockets.in(data.email)
    if (connectedUser != null)
      console.log({ data })
      socket.broadcast.emit('newhighlight', data)
  })
})

http.listen(3006)
