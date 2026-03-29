import {createTheme} from '@mui/material/styles'

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1565c0',
        },
        background: {
            default: '#f5f7fb',
            paper: '#ffffff',
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

export default theme