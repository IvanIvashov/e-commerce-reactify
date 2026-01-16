import { Header } from './components/Header'
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material'

function App() {
    return (
        <>
            <Header />
            <Button variant="contained">Contained</Button>
            <Button variant="contained" disabled>
                Disabled
            </Button>
            <Button variant="contained" href="#contained-buttons">
                Link
            </Button>
        </>
    )
}

export default App
