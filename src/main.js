import { ProductManager } from './ProductManager.js'
import express from 'express'
import fs from 'fs'


const manager = new ProductManager('../database/products.json')
await manager.reset()

try {

    await manager.crearProducto({
        title: 'Pan',
        description: 'Salvado e integral',
        price: '900$',
        thumbnail: '',
        code: '0',
        stock: '20',
    })
    await manager.crearProducto({
        title: 'Sal',
        description: 'Gruesa',
        price: '500$',
        thumbnail: '',
        code: '1',
        stock: '15',
    })

    await manager.buscarProductoId(1)

    await manager.actualizarProductoId({
        title: 'Sal',
        description: 'Parrillera',
        price: '300$',
        thumbnail: '',
        code: '1',
        stock: '3',
        id: 2,
    })

    await manager.eliminarProductId(2)



} catch (error) {
    console.log(error.message)
}

const app = express()

app.get('/products', (req, res) => {
    const limit = req.query.limit
     fs.readFile('./database/products.json', 'utf-8', (err, info) => {
        if (err) throw err
    let products = JSON.parse(info)
    if(limit){
        products = products.slice(0, limit)
    }
    res.json(products)
})
})

app.get('/products/:id', (req, res) => {
    const id = req.params.id
     fs.readFile('./database/products.json', 'utf-8', (err, info) => {
        if (err) throw err
        let products = JSON.parse(info)
        const product = products.find(p => p.id.toString() === id.toString())
        if (product){
            res.json(product)
        } else {
            res.status(404).send('No existe el producto con el ID solicitado')
        }
    })
})

const server = app.listen(8080)