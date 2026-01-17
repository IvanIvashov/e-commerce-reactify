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
    | { state: 'loading' }
    | { state: 'success'; products: Product[] }
    | { state: 'error'; message: string }

function isProduct(data: unknown): data is Product[] {
    return (
        Array.isArray(data) &&
        data.every((item) => {
            typeof item === 'object' &&
                item !== null &&
                'id' in item &&
                'title' in item &&
                'price' in item &&
                'description' in item &&
                'category' in item &&
                'image' in item
        })
    )
}

function App() {
    const [products, setProducts] = useState<ProductState>({ state: 'loading' })

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.status}`)
                }
                const data: unknown = await response.json()
                if (!isProduct(data)) {
                    throw new Error('Error API Response')
                }
                setProducts({ state: 'success', products: data })
            } catch (error) {
                setProducts({
                    state: 'error',
                    message:
                        error instanceof Error
                            ? error.message
                            : 'An unknown error occurred while loading the products',
                })
            }
        }
        fetchProducts()
    }, [])

    switch (products.state) {
        case 'loading':
            return <p>Загрузка...</p>
        case 'error':
            return <p>Ошибка: {products.message}</p>
        case 'success':
            return (
                <>
                    <Header />
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

        default:
            return null
    }
}

export default App
