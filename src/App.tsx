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

function isProducts(data: unknown): data is Product[] {
    return (
        Array.isArray(data) &&
        data.every(
            (item) =>
                typeof item === 'object' &&
                item !== null &&
                'id' in item &&
                'title' in item &&
                'price' in item &&
                'description' in item &&
                'category' in item &&
                'image' in item
        )
    )
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
                if (!isProducts(data)) {
                    throw new Error('Error API Response')
                }
                setProducts({ status: 'success', products: data })
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
