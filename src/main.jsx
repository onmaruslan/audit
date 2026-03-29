import React from 'react'
import ReactDOM from 'react-dom/client'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {BrowserRouter} from 'react-router'
import App from './App'
import theme from './app/theme'

const basename = import.meta.env.PROD ? '/audit' : '/'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter basename={basename}>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
)