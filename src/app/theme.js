import {createTheme} from '@mui/material/styles'

export const getTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: '#1565c0',
            },
            background: {
                default: mode === 'light' ? '#f5f7fb' : '#121212',
                paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
            },
        },
        shape: {
            borderRadius: 10,
        },
        typography: {
            fontFamily: 'Inter, Roboto, Arial, sans-serif',
            h6: {
                fontWeight: 600,
            },
            button: {
                textTransform: 'none',
                fontWeight: 500,
            },
        },
    })