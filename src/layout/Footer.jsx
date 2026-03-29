import {Box, Typography} from '@mui/material'

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                height: 56,
                display: 'flex',
                alignItems: 'center',
                px: 3,
                borderTop: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
            }}
        >
            <Typography variant="body2" color="text.secondary">
                Audit App • Maritime Compliance System
            </Typography>
        </Box>
    )
}