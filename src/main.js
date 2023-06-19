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

