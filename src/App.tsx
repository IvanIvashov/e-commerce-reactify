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

function App() {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                const response = await fetch('https://fakestoreapi.com/products')
                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.status}`)
                }
                const data: Product[] = await response.json()
                setProducts(data)
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'An unknown error occurred while loading the products'
                setErrors(errorMessage)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProducts()
    }, [])

    if (errors) return <p>Ошибка: {errors}</p>
    if (isLoading) return <p>Загрузка...</p>

    return (
        <>
            <Header />
            {products.map(({ id, title, price, category, description, image }) => (
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
}

export default App
