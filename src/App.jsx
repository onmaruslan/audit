import {useMemo, useState} from 'react'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {BrowserRouter} from 'react-router'
import AppLayout from './layout/AppLayout'
import AppRouter from './app/router'
import {getTheme} from './app/theme'

const basename = import.meta.env.PROD ? '/audit' : '/'

export default function App() {
    const [mode, setMode] = useState('light')

    const theme = useMemo(() => getTheme(mode), [mode])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter basename={basename}>
                <AppLayout mode={mode} setMode={setMode}>
                    <AppRouter/>
                </AppLayout>
            </BrowserRouter>
        </ThemeProvider>
    )
}