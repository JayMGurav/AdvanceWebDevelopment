const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 5000


app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  // res.send('hello')
  res.sendFile(__dirname + '/index.html')
})

//Socket

io.on('connection', (socket) => {
  // console.log('connected in server')
  socket.on('userJoined', function (name) {
    socket.emit('newclientconnect', { description: `Hey ${name} 👋` });
    socket.broadcast.emit('newclientconnect', { description: `${name} joined the meeting` })
    socket.once('disconnect', function () {
      socket.broadcast.emit('newclientconnect', { description: `${name} left the meeting` })
    })
  })
});

// })



http.listen(PORT, () => {
  console.log(`we are listening on ${PORT}`)
})