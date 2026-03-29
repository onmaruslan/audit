import {useEffect, useMemo, useState} from 'react'
import {
    Badge,
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material'
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'
import {NavLink} from 'react-router'
import {mockItems} from '../features/checklist/data/mockItems'
import {seedOfficeChatsIfNeeded, OFFICE_CHAT_UPDATED_EVENT} from '../features/office-chat/utils/officeChatStorage'
import {getWaitingOfficeChatsCount} from '../features/office-chat/utils/officeChatConversations'

export default function Sidebar() {
    const [waitingChatsCount, setWaitingChatsCount] = useState(0)

    useEffect(() => {
        seedOfficeChatsIfNeeded(mockItems)

        const updateWaitingChatsCount = () => {
            setWaitingChatsCount(getWaitingOfficeChatsCount(mockItems))
        }

        updateWaitingChatsCount()

        window.addEventListener(OFFICE_CHAT_UPDATED_EVENT, updateWaitingChatsCount)

        return () => {
            window.removeEventListener(OFFICE_CHAT_UPDATED_EVENT, updateWaitingChatsCount)
        }
    }, [])

    const navItems = useMemo(() => {
        return [
            {
                label: 'Checklist',
                path: '/checklist',
                icon: <FactCheckOutlinedIcon/>,
            },
            {
                label: 'Checklist 2',
                path: '/checklist-2',
                icon: <FactCheckOutlinedIcon/>,
            },
            {
                label: 'Office Chat',
                path: '/office-chat',
                icon: <ForumOutlinedIcon/>,
                badgeCount: waitingChatsCount,
            },
            {
                label: 'Dashboards',
                path: '/dashboards',
                icon: <SpaceDashboardOutlinedIcon/>,
            }
        ]
    }, [waitingChatsCount])

    return (
        <Box
            sx={{
                width: 260,
                bgcolor: 'background.paper',
                borderRight: '1px solid',
                borderColor: 'divider',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography
                variant="overline"
                sx={{color: 'text.secondary', px: 1, mb: 1}}
            >
                Navigation
            </Typography>

            <List sx={{p: 0}}>
                {navItems.map((item) => (
                    <ListItemButton
                        key={item.path}
                        component={NavLink}
                        to={item.path}
                        sx={{
                            mb: 0.5,
                            borderRadius: 2,
                            color: 'text.primary',
                            '&.active': {
                                bgcolor: 'primary.main',
                                color: '#fff',
                            },
                            '&.active .MuiListItemIcon-root': {
                                color: '#fff',
                            },
                        }}
                    >
                        <ListItemIcon sx={{minWidth: 40, color: 'inherit'}}>
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText primary={item.label}/>

                        {item.badgeCount > 0 && (
                            <Badge
                                color="error"
                                badgeContent={item.badgeCount}
                                sx={{
                                    '& .MuiBadge-badge': {
                                        right: 10,
                                    },
                                }}
                            />
                        )}
                    </ListItemButton>
                ))}
            </List>
        </Box>
    )
}