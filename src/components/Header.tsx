import {
    AppBar,
    Toolbar,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Badge,
    Button,
    Box,
    Container,
} from '@mui/material'
import { Search, ShoppingCart, Person } from '@mui/icons-material'

interface HeaderProps {
    onClose: () => void
}

export function Header({ onClose }: HeaderProps) {
    return (
        <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
            <Container maxWidth="xl">
                <Toolbar
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                    {/* Логотип */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            mr: 3,
                        }}
                    >
                        E-commerce
                    </Typography>

                    {/* Поиск */}
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search essentials, groceries and more..."
                        sx={{
                            width: '500px',
                            bgcolor: 'white',
                            borderRadius: 1,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'transparent',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'transparent',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'transparent',
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: 'gray' }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Правая часть */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {/* Кнопка Sign Up/Sign In */}
                        <Button
                            variant="text"
                            startIcon={<Person />}
                            sx={{
                                color: 'white',
                                textTransform: 'none',
                                fontSize: '16px',
                            }}
                            onClick={onClose}
                        >
                            Sign Up/Sign In
                        </Button>

                        {/* Корзина */}
                        <IconButton
                            sx={{
                                color: 'white',
                                padding: '15px',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                                // Настройка ripple только при нажатии
                                '& .MuiTouchRipple-root': {
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    // Можно настроить скорость анимации
                                    animationDuration: '0.8s',
                                },
                            }}
                        >
                            <Badge
                                badgeContent={3}
                                color="error"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        fontSize: '10px', // Размер текста
                                        height: '16px', // Высота бейджа
                                        minWidth: '16px', // Минимальная ширина
                                        padding: '0 4px', // Внутренние отступы
                                    },
                                }}
                            >
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
