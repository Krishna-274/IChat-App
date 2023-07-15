//node server which will handle our connections
  const express = require("express");
  const app= express();
  const users = {}
  const cors=require("cors")
  app.use(cors(
  ))
  const io = require("socket.io")(3000,{//importing socket.io//socket will listen incoming events
    cors:{
      origin:"*"
    }})//create server on port 3000
      
  io.on('connection', socket => {//io.on is one socket.io instance which listens so many socket connections
     //if any new user joins let other users connected to the server know!
     socket.on('new-user', name => {
     users[socket.id] = name//socket.on handles what to do with some particular connection,,it sets name with socketid if it receives user-joined event
     socket.broadcast.emit('user-joined', name)//leaving  the person who joined,it sends mssge to remmaining everyone that this person is joined
    })
    //if someone sends a messge ,broadcast it to everyone
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    //if someone leaves the chat let others know
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
    })
    })
