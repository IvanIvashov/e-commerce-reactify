import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface AuthModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (email: string, password: string) => void
}

export default function AuthModal({ open, onClose, onSubmit }: AuthModalProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        onSubmit(email, password)
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight={600}>
                    Sign in
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Box component="form" onSubmit={handleSubmit} mt={1}>
                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        margin="normal"
                    />

                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                    />

                    <DialogActions sx={{ px: 0, mt: 2 }}>
                        <Button type="submit" variant="contained" fullWidth size="large">
                            Sign in
                        </Button>
                    </DialogActions>
                </Box>

                <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
                    Don’t have an account? <b>Sign up</b>
                </Typography>
            </DialogContent>
        </Dialog>
    )
}
