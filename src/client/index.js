import WebSocketWrapper from 'ws-wrapper'

function createElement(tag, content) {
    const el = document.createElement(tag)
    el.innerHTML = content
    return el
}

function start() {
    const btn = createElement('button', 'Echo')
    btn.addEventListener('click', () => echo())
    document.body.appendChild(btn)
}

let socket
function echo(msg = '123') {
    if (!socket) {
        socket = new WebSocketWrapper(new WebSocket('ws://localhost:3000'))
    }
    const listener = data => {
        document.body.appendChild(createElement('div', data))
        console.log('Recieved response', data)
        socket.removeListener(listener)
    }
    socket.once('echo', listener)
    socket.emit('echo', msg)
    console.log('Emited echo', msg)
}

document.addEventListener('DOMContentLoaded', start)