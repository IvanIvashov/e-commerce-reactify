import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material'
import { useMemo } from 'react'

import type { Product } from '../types/productTypes'

interface ProductCardProps {
    product: Product
    oldPrice?: number // для отображения скидки
}

export default function ProductCard({ product, oldPrice }: ProductCardProps) {
    const discountPercent = useMemo(() => {
        return Math.round(100 - (product.price * 100) / (oldPrice ?? product.price))
    }, [product.price, oldPrice])

    return (
        <Card
            elevation={0}
            sx={{
                width: 280,
                borderRadius: 3,
                position: 'relative',
                border: '1px solid #F5F5F5',
                // boxShadow: 3, // if hover
            }}
        >
            {oldPrice && (
                <Chip
                    label={`${discountPercent}% OFF`}
                    color="primary"
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        fontWeight: 600,
                    }}
                />
            )}

            <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: 'contain', p: 2, height: 200, backgroundColor: '#F5F5F5' }}
            />

            <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {product.title}
                </Typography>

                <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h6" fontWeight="600" color="text.primary">
                        ₹{product.price}
                    </Typography>

                    {oldPrice && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textDecoration: 'line-through' }}
                        >
                            ₹{oldPrice}
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    )
}
