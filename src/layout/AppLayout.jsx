import {Box} from '@mui/material'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

export default function AppLayout({children}) {
    return (
        <Box
            sx={{
                height: '100dvh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Header/>

            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    display: 'flex',
                }}
            >
                <Sidebar/>

                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        minHeight: 0,
                        px: 3,
                        overflow: 'hidden',

                    }}
                >
                    {children}
                </Box>
            </Box>

            <Footer/>
        </Box>
    )
}