const socket = io()

let name;
const textarea = document.querySelector('#textarea');
const messageArea = document.querySelector('#message_area');
const notification = document.querySelector('#notification');
const leave = document.querySelector('#leave');

do {
  name = prompt('Please enter your name')
  // socket.emit('addUser', name);
} while (!name);


textarea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    sendMessage(e.target.value)
  }
})

function sendMessage(message) {
  let msg = {
    user: name,
    message: message
  }

  appendMessage(msg, 'outgoing')

  //send to server
  socket.emit('message', msg)
  textarea.value = ''
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement('div')
  let className = type
  mainDiv.classList.add(className, 'message')
  const msgTime = new Date().toUTCString()
  let markup = `
        <strong>${msg.user}</strong>
        <p>${msg.message}</p>
        <small>${msgTime}</small>
    `
  mainDiv.innerHTML = markup
  messageArea.appendChild(mainDiv)
}


leave.addEventListener('click', () => {
  location.reload()
})

socket.on('connect', () => {
  socket.emit('userJoined', name);
  leave.style.display = 'block'
});

socket.on('disconnect', () => {
  socket.emit('userLeft', name);
});


// 
socket.on('newclientconnect', (data) => {
  if (id) {
    clearTimeout(id)
  }
  let notificationMsg = document.createElement('p')
  notificationMsg.classList.add('notificationMsg');
  notificationMsg.innerText = data.description;
  notification.appendChild(notificationMsg)
  var id = setTimeout(() => {
    notification.removeChild(notification.lastElementChild)
  }, 5000)
})



//receive message
socket.on('message', (msg) => {
  appendMessage(msg, 'incoming')
})