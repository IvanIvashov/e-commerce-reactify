import { Header } from './components/Header'

import { useEffect, useState } from 'react'

import ProductCard from './components/ProductCard'
import type { Product } from './types/productTypes'
import { parseProducts } from './utils/productParser'
import AuthModal from './components/AuthModal'

type ProductState =
    | { status: 'loading' }
    | { status: 'success'; products: Product[] }
    | { status: 'error'; message: string }

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

    const [isOpen, setIsOpen] = useState(false)

    const onSubmit = () => {
        console.log('Submitted')
        setIsOpen(false)
    } // заглушка
    const onClose = () => setIsOpen((prevState) => !prevState) // заглушка

    return (
        <>
            <Header onClose={onClose} />
            {content}
            <AuthModal open={isOpen} onClose={onClose} onSubmit={onSubmit} />
        </>
    )
}

export default App
