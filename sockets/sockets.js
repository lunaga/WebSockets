function sockets(server) {

    const io = require('socket.io')(server)

    inputForm = true
    const messages = []

    io.on('connection', socket => {
        // Registro conexiones
        console.log("Usuario Conectado'")

        //? FORMULARIO ===========================================================

        // EMITO
        socket.emit('input-res', inputForm)
        // RECIBO
        socket.on('input-req', data => {
            inputForm = data
        })

        //? LISTA DE PRODUCTOS ===================================================

        // Emitir lista de productos
        socket.on('quest', confirm => {
            if (confirm === 'ok') {
                io.sockets.emit('productos', 'reload')
            }
        })

        //? CHAT =================================================================

        socket.emit('messages', messages)

        socket.on('new-message', data => {
            messages.push(data)
            io.sockets.emit('messages', messages)
        })
    })
}

module.exports = sockets