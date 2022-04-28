// Config de Express
const express = require('express')
const app = express()

// Config de Socket.io
const httpserver = require('http').Server(app)


// Config de Carpeta Publica
app.use(express.static('public'))

// Codificación
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(api = require('./routes/api')) //? Router

const motortemplates = require('./templates/motortemplates')(app) 

const socket = require('./sockets/sockets')(httpserver)


PORT = process.env.PORT || 8080

const server = httpserver.listen(PORT, () => {
    console.log(`Escuchando servidor desde el puerto ${server.address().port} - http://localhost:${PORT}`)
})
httpserver.on('error', error => console.log('error hubo', error))