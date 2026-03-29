import {useMemo, useState} from 'react'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {HashRouter} from 'react-router'
import AppLayout from './layout/AppLayout'
import AppRouter from './app/router'
import {getTheme} from './app/theme'

export default function App() {
    const [mode, setMode] = useState('light')

    const theme = useMemo(() => getTheme(mode), [mode])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <HashRouter>
                <AppLayout mode={mode} setMode={setMode}>
                    <AppRouter/>
                </AppLayout>
            </HashRouter>
        </ThemeProvider>
    )
}