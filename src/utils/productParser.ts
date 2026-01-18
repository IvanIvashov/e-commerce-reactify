import type { Product } from '../types/productTypes'

export function parseProduct(data: unknown): Product {
    if (typeof data !== 'object' || data === null) {
        throw new Error('Product is not an object')
    }

    const obj = data as Record<string, unknown>

    if (typeof obj.id !== 'number') {
        throw new Error('Invalid product.id')
    }
    if (typeof obj.title !== 'string') {
        throw new Error('Invalid product.title')
    }
    if (typeof obj.price !== 'number') {
        throw new Error('Invalid product.price')
    }
    if (typeof obj.description !== 'string') {
        throw new Error('Invalid product.description')
    }
    if (typeof obj.category !== 'string') {
        throw new Error('Invalid product.category')
    }
    if (typeof obj.image !== 'string') {
        throw new Error('Invalid product.image')
    }

    return {
        id: obj.id,
        title: obj.title,
        price: obj.price,
        description: obj.description,
        category: obj.category,
        image: obj.image,
    }
}

export function parseProducts(data: unknown): Product[] {
    if (!Array.isArray(data)) {
        throw new Error('Products is not an array')
    }
    return data.map(parseProduct)
}
