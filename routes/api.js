const express = require('express')

// DB 
const Contenedor = require('../db/clase-Contenedor')
const path = './public/docs/productos.txt'
const productos = new Contenedor(path)

//? API Router (Handlebars) =====================================================================

const api = express.Router()
module.exports = api

//? API Middleware (for PUT) ====================================================================

api.use(function (req, res, next) {
    if (req.originalUrl === '/api/productos/:id') {
        if (req.method === 'POST') { req.method = 'PUT' }
    }
    next()
})

//? API Route ====================================================================================
// Index
api.get('/', (_, res) => {
    let title = 'Websockets'
    productos.getAll().then((result) => {
        res.render('index', { title, inputForm, result } || { error: 'Nadache' })
    })
})

api.get('/api/productos', (_, res) => {
    productos.getAll().then((result) => {
        let title = 'Guitarras'
        res.render('productos', { title, result } || { error: "producto no encontrado" })
    })
})

api.get('/api/productos/:id', (req, res) => {
    const { id } = req.params
    productos.getById(Number(id))
        .then((result) => { res.send(result || { error: "producto no encontrado" }) })
})
// Nuevo
api.post('/api/productos', (req, res) => {
    const nuevoProd = req.body
    productos.save(nuevoProd)
    res.redirect('/')
})
// Modificar
api.put('/api/productos/:id', (req, res) => {
    productos.modifyById(req.body.params.id)
    res.redirect('/')
})

api.delete('/api/productos/:id', (req, res) => {
    const { id } = req.params
    productos.deleteById(Number(id))
    res.send('' || { error: 'producto no encontrado' })
})
