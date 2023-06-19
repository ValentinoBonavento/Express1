import fs from 'fs/promises'
import { Product } from './Product.js'


export class ProductManager {
    #products
    #ruta

    constructor(ruta) {
        this.#ruta = ruta
        this.#products = []
        this.nextId = 1
    }

    async #leer() {
        const products = await fs.readFile(this.#ruta, 'utf-8')
        this.#products = JSON.parse(products)
    }

    async #escribir() {
        const nuevoJson = JSON.stringify(this.#products, null, 2)
        await fs.writeFile(this.#ruta, nuevoJson)
    }

    async crearProducto({ title, description, price, thumbnail, code, stock }) {
        await this.#leer()

        const existe = this.#products.find(u => u.title === title)
        if (existe) {
            throw new Error('el producto ya existe')
        }

        const product = new Product({ title, description, price, thumbnail, code, stock })
        product.id = this.nextId++;
        this.#products.push(product)

        await this.#escribir()

        return product
    }

    async buscarProductoId(id) {

        await this.#leer()

        const existe = this.#products.find(u => u.id === id)
        if (existe) {
            console.log(existe);
        } else { console.log('no existe'); }
    }

    async actualizarProductoId({ title, description, price, thumbnail, code, stock, id }) {

        await this.#leer()

        const index = this.#products.findIndex(p => p.id === id)
        if (index !== -1) {
            this.#products[index] = { title, description, price, thumbnail, code, stock, id }
            console.log(this.#products[index]);
        } else {
            console.log('No existe');
        }

        await this.#escribir()

    }

    async eliminarProductId(id) {

        await this.#leer()

        const index = this.#products.findIndex(p => p.id === id)
        if (index !== -1) {
            this.#products.splice(index, 1)
            console.log('Eliminado');
        } else {
            console.log('No existe');
        }

        await this.#escribir()
    }

    async reset() {
        this.#products = []
        await this.#escribir()
    }
}