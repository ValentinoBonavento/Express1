import express from 'express'
import { __dirnname } from './utils.js'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirnname + '/public'))

app.engine('handlebars', handlebars.engine())
 app.set('views', __dirnname + '/views')
 app.set('view engine', 'handlebars')

app.get('/socket', (req, res) => {
    res.render('websockets')
})

const httpServer = app.listen(8080,() =>{
console.log('Server listening on port 8080');
} )

const socketServer = new Server(httpServer)

const products = []

socketServer.on('connection', (socket) => {
    console.log(`usuario conmecntado: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('usuario desconectado');
    })

    socket.emit('saludoDesdeBack', 'bienvenido a websocket')

    socket.on('respuestaDesdeFront', (mensaje) => {
        console.log(mensaje);
    })

    socket.on('newProduct', (obj) => {
        products.push(obj)
        socketServer.emit('arrayProducts', products)
    })
})