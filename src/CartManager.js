import fs from 'fs/promises'

export class CartManager {
    #cart
    #ruta

    constructor(ruta) {
        this.#ruta = ruta
        this.#cart = []
    }
    async #leer() {
        const json = await fs.readFile(this.#ruta, 'utf-8')
        this.#cart = JSON.parse(json)
    }

    async #escribir() {
        const nuevoJson = JSON.stringify(this.#cart, null, 2)
        await fs.writeFile(this.#ruta, nuevoJson)
    }
    async guardarCart(cart) {
        await this.#leer()
        this.#cart.push(cart)
        await this.#escribir()
        return cart
    }

    async buscarCart() {
        await this.#leer()
        return this.#cart
    }

    async buscarCartSegunId(id) {
        await this.#leer()
        const buscada = this.#cart.find(c => c.id === id)
        if (!buscada) {
            throw new Error('id no encontrado')
        }
        return buscada
    }

    async reemplazarCart(id, nuevoCart) {
        await this.#leer()
        const indiceBuscado = this.#cart.findIndex(c => c.id === id)
        if (indiceBuscado === -1) {
            throw new Error('id no encontrado')
        }
        this.#cart[indiceBuscado] = nuevoCart
        await this.#escribir()
        return nuevoCart
    }

    async borrarCartSegunId(id) {
        await this.#leer()
        const indiceBuscado = this.#cart.findIndex(c => c.id === id)
        if (indiceBuscado === -1) {
            throw new Error('id no encontrado')
        }
        const [borrado] = this.#cart.splice(indiceBuscado, 1)
        await this.#escribir()
        return borrado
    }
    

    async reset() {
        this.#cart = []
        await this.#escribir()
    }
}