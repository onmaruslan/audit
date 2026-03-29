import {AppBar, Box, Toolbar, Typography, Chip} from '@mui/material'

export default function Header() {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                bgcolor: 'background.paper',
                color: 'text.primary',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Toolbar sx={{minHeight: '64px !important'}}>
                <Typography variant="h6" sx={{fontWeight: 700}}>
                    Audit for White Sea Navigation
                </Typography>

                <Box sx={{flexGrow: 1}}/>

                <Chip label="Vessel: Demo Ship" variant="outlined" sx={{mr: 1}}/>
                <Chip label="Inspection: In Progress" color="primary"/>
            </Toolbar>
        </AppBar>
    )
}