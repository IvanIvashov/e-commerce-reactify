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

export function Header() {
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
                        >
                            Sign Up/Sign In
                        </Button>

                        {/* Корзина */}
                        <IconButton sx={{ color: 'white' }}>
                            <Badge badgeContent={3} color="error">
                                <ShoppingCart />
                            </Badge>
                            <Typography sx={{ ml: 1, fontSize: '16px' }}>Cart</Typography>
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
