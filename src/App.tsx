import { Header } from './components/Header'

import { useEffect, useState } from 'react'

import ProductCard from './components/ProductCard'

export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
}

type ProductState =
    | { status: 'loading' }
    | { status: 'success'; products: Product[] }
    | { status: 'error'; message: string }

function parseProduct(data: unknown): Product {
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

function parseProducts(data: unknown): Product[] {
    if (!Array.isArray(data)) {
        throw new Error('Products is not an array')
    }
    return data.map(parseProduct)
}

function App() {
    const [products, setProducts] = useState<ProductState>({ status: 'loading' })

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.status}`)
                }
                const data: unknown = await response.json()
                const products = parseProducts(data)
                setProducts({ status: 'success', products })
            } catch (error) {
                setProducts({
                    status: 'error',
                    message:
                        error instanceof Error
                            ? error.message
                            : 'An unknown error occurred while loading the products',
                })
            }
        }
        fetchProducts()
    }, [])

    let content

    switch (products.status) {
        case 'loading':
            content = <p>Загрузка...</p>
            break
        case 'error':
            content = <p>Ошибка: {products.message}</p>
            break
        case 'success':
            content = (
                <>
                    {products.products.map(({ id, title, price, category, description, image }) => (
                        <ProductCard
                            key={id}
                            product={{
                                id,
                                title,
                                price,
                                description,
                                category,
                                image,
                            }}
                            oldPrice={129.99}
                        />
                    ))}
                </>
            )
            break
    }

    return (
        <>
            <Header />
            {content}
        </>
    )
}

export default App
