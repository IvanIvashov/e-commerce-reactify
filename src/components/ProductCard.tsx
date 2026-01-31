// components/ProductCard.tsx
import { Card, CardContent, CardMedia, Typography, Box, Chip, Skeleton } from '@mui/material'
import { useMemo, useState } from 'react'
import { keyframes } from '@mui/system'

import type { Product } from '../types/productTypes'

interface ProductCardProps {
    product?: Product
    oldPrice?: number
    isLoading?: boolean
}

// Кастомная анимация для скелетона
const pulseAnimation = keyframes`
  0% { transform: perspective(400px) rotateY(0); }
  50% { transform: perspective(400px) rotateY(180deg); }
  100% { transform: perspective(400px) rotateY(360deg); }
`
export default function ProductCard({ product, oldPrice, isLoading = false }: ProductCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)

    const discountPercent = useMemo(() => {
        if (!product || !oldPrice) return 0
        return Math.round(100 - (product.price * 100) / oldPrice)
    }, [product?.price, oldPrice])

    // Если загружается и нет данных
    if (isLoading || !product) {
        return (
            <Card
                elevation={0}
                sx={{
                    width: 280,
                    borderRadius: 3,
                    position: 'relative',
                    border: '1px solid #F5F5F5',
                    bgcolor: '#FFFFFF',
                }}
            >
                {/* Скелетон для бейджа скидки */}
                {oldPrice && (
                    <Skeleton
                        variant="rounded"
                        width={70}
                        height={28}
                        sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            borderRadius: 12,
                            zIndex: 1,
                            bgcolor: 'primary.light',
                            animation: `${pulseAnimation} 1.5s ease-in-out infinite`,
                        }}
                    />
                )}

                {/* Скелетон для изображения */}
                <Box
                    sx={{
                        p: 2,
                        bgcolor: '#F5F5F5',
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Skeleton
                        variant="rounded"
                        width="100%"
                        height="100%"
                        sx={{
                            borderRadius: 2,
                            animation: `${pulseAnimation} 1.5s ease-in-out 0.5s infinite`,
                            bgcolor: 'grey.300',
                        }}
                    />
                </Box>

                <CardContent sx={{ bgcolor: '#FFFFFF' }}>
                    {/* Скелетон для заголовка */}
                    <Skeleton
                        variant="text"
                        width="100%"
                        height={24}
                        sx={{
                            mb: 1,
                            animation: `${pulseAnimation} 1.5s ease-in-out 1s infinite`,
                            bgcolor: 'grey.200',
                        }}
                    />
                    <Skeleton
                        variant="text"
                        width="80%"
                        height={24}
                        sx={{
                            mb: 2,
                            animation: `${pulseAnimation} 1.5s ease-in-out 1.2s infinite`,
                            bgcolor: 'grey.200',
                        }}
                    />

                    {/* Скелетон для цены */}
                    <Box display="flex" alignItems="center" gap={1}>
                        <Skeleton
                            variant="text"
                            width={90}
                            height={32}
                            sx={{
                                animation: `${pulseAnimation} 1.5s ease-in-out 1.4s infinite`,
                                bgcolor: 'grey.300',
                            }}
                        />
                        {oldPrice && (
                            <Skeleton
                                variant="text"
                                width={70}
                                height={24}
                                sx={{
                                    animation: `${pulseAnimation} 1.5s ease-in-out 1.6s infinite`,
                                    bgcolor: 'grey.200',
                                }}
                            />
                        )}
                    </Box>
                </CardContent>
            </Card>
        )
    }

    // Реальный контент
    return (
        <Card
            elevation={0}
            sx={{
                width: 280,
                borderRadius: 3,
                position: 'relative',
                border: '1px solid #F5F5F5',
                transition: 'transform 0.2s',
                bgcolor: '#FFFFFF',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
            }}
        >
            {oldPrice && discountPercent > 0 && (
                <Chip
                    label={`${discountPercent}% OFF`}
                    color="primary"
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        fontWeight: 600,
                        zIndex: 1,
                    }}
                />
            )}

            {/* Контейнер для изображения со скелетоном */}
            <Box
                sx={{
                    position: 'relative',
                    p: 2,
                    bgcolor: '#F5F5F5',
                    height: 200,
                }}
            >
                {/* Скелетон пока изображение грузится */}
                {!imageLoaded && !imageError && (
                    <Skeleton
                        variant="rounded"
                        width="100%"
                        height="100%"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: 2,
                            animation: `${pulseAnimation} 3.0s ease-in-out infinite`,
                            bgcolor: '#cccccc91',
                        }}
                    />
                )}

                <CardMedia
                    component="img"
                    image={imageError ? '/placeholder-image.png' : product.image}
                    alt={product.title}
                    sx={{
                        objectFit: 'contain',
                        width: '100%',
                        height: '100%',
                        opacity: imageLoaded && !imageError ? 1 : 0,
                        transition: 'opacity 0.3s',
                    }}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                        setImageError(true)
                        setImageLoaded(true)
                    }}
                />
            </Box>

            <CardContent sx={{ bgcolor: '#FFFFFF' }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    gutterBottom
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOriental: 'vertical',
                        overflow: 'hidden',
                        height: '3em',
                        lineHeight: '1.5em',
                        color: 'text.primary',
                    }}
                >
                    {product.title}
                </Typography>

                <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h6" fontWeight="600" color="text.primary">
                        ₹{product.price}
                    </Typography>

                    {oldPrice && oldPrice > product.price && (
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
