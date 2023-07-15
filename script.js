
//its client and it is connected to server through socketio
const socket = io('http://localhost:3000')
//get DOM elements in respective js variables
const messageContainer = document.querySelector(".container")
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
//audio that will play  on receiving mssges
var audio=new Audio('ting.mp3')
//ask new user for his/her name and let the server know
const name = prompt("Enter your name to join")
appendMessage('You joined')
socket.emit('new-user', name)
//if server sends message ,receive it
  socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`,)
  })
    //if a new user joins,receive his/her name from the server
  socket.on('user-joined', name => {
    appendMessage(`${name} joined the chat`,'right')
  })
 //if a user leaves the chat append the info to the container
  socket.on('user-disconnected', name => {
    appendMessage(`${name} left the chat`,'left')
  })
//if the form gets submitted send server the message
  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`,'right')
    socket.emit('send-chat-message', message)
    messageInput.value = ''//in mssge input container ,when we finished typing we want that mssge to be vanished from there,so we put null value
  })
//function which will append event info to the container
  function appendMessage(message,position) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
      audio.play();
    }
  }