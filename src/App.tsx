import { useEffect, useState } from 'react'

interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
}

function App() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }
                const data: Product[] = await response.json()
                setProducts(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchProducts()
    }, [])

    return <></>
}

export default App
