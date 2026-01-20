import { Box, Typography, Button } from '@mui/material'
import ProductCard from './ProductCard'
import type { Product } from '../types/productTypes'
import { ArrowForwardIos } from '@mui/icons-material'

interface ProductWithDiscount extends Product {
    oldPrice?: number
    discountPercent?: number
}

interface ProductCarouselProps {
    title: string
    products: ProductWithDiscount[]
}

export default function ProductCarousel({ title, products }: ProductCarouselProps) {
    return (
        <Box sx={{ width: '100%', padding: '20px 50px' }}>
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    borderBottom: '2px solid #EDEDED',
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight={600}
                    color="#666666"
                    // borderBottom="2px solid #008ECC"
                >
                    Grab the best deal on <span style={{ color: '#008ECC' }}>{title}</span>
                </Typography>

                <Button
                    variant="text"
                    style={{ color: '#222222' }}
                    endIcon={<ArrowForwardIos fontSize="small" sx={{ color: '#008ECC' }} />}
                >
                    View All
                </Button>
            </Box>

            {/* Cards */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    overflowX: 'auto',
                    flexWrap: 'wrap',
                    pb: 2,
                    '&::-webkit-scrollbar': { height: 6 },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#ccc',
                        borderRadius: 4,
                    },
                }}
            >
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} oldPrice={product.oldPrice} />
                ))}
            </Box>
        </Box>
    )
}
