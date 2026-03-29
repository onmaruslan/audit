import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Chip,
} from '@mui/material'
import {ToggleButton, ToggleButtonGroup} from '@mui/material'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

export default function Header({mode, setMode}) {
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
            <Toolbar sx={{minHeight: '64px !important', position: 'relative'}}>
                <Typography variant="h6" sx={{fontWeight: 700}}>
                    Audit for White Sea Navigation
                </Typography>


                <Box
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <Chip label="Vessel: Demo Ship" variant="outlined" sx={{mr: 1}}/>
                    <Chip label="Inspection: In Progress" color="primary"/>
                </Box>
                <Box sx={{flexGrow: 1}}/>
                <ToggleButtonGroup
                    value={mode}
                    exclusive
                    onChange={(e, newMode) => {
                        if (newMode) setMode(newMode)
                    }}
                    size="small"
                >
                    <ToggleButton value="light">
                        <LightModeIcon fontSize="small"/>
                    </ToggleButton>
                    <ToggleButton value="dark">
                        <DarkModeIcon fontSize="small"/>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Toolbar>
        </AppBar>
    )
}