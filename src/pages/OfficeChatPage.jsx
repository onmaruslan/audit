import {useEffect, useMemo, useState} from 'react'
import {Box} from '@mui/material'
import {mockItems} from '../features/checklist/data/mockItems'
import {seedOfficeChatsIfNeeded, OFFICE_CHAT_UPDATED_EVENT} from '../features/office-chat/utils/officeChatStorage'
import {buildOfficeChatConversations} from '../features/office-chat/utils/officeChatConversations'
import {OfficeChatToolbar} from '../componetns/office-chat/OfficeChatToolbar.jsx'
import {OfficeChatSidebar} from '../componetns/office-chat/OfficeChatSidebar.jsx'
import {OfficeChatThread} from '../componetns/office-chat/OfficeChatThread.jsx'

export default function OfficeChatPage() {
    const [selectedConversationId, setSelectedConversationId] = useState(null)
    const [refreshKey, setRefreshKey] = useState(0)
    const [search, setSearch] = useState('')
    const [selectedCommunicationStatus, setSelectedCommunicationStatus] = useState('all')

    useEffect(() => {
        seedOfficeChatsIfNeeded(mockItems)

        const handleOfficeChatUpdated = () => {
            setRefreshKey((prev) => prev + 1)
        }

        window.addEventListener(OFFICE_CHAT_UPDATED_EVENT, handleOfficeChatUpdated)

        return () => {
            window.removeEventListener(OFFICE_CHAT_UPDATED_EVENT, handleOfficeChatUpdated)
        }
    }, [])

    const conversations = useMemo(() => {
        return buildOfficeChatConversations(mockItems)
    }, [refreshKey])

    const filteredConversations = useMemo(() => {
        return conversations.filter((conversation) => {
            const matchesSearch =
                conversation.code.toLowerCase().includes(search.toLowerCase()) ||
                conversation.title.toLowerCase().includes(search.toLowerCase())

            const matchesStatus =
                selectedCommunicationStatus === 'all' ||
                conversation.communicationStatus === selectedCommunicationStatus

            return matchesSearch && matchesStatus
        })
    }, [conversations, search, selectedCommunicationStatus])

    useEffect(() => {
        if (!filteredConversations.length) {
            setSelectedConversationId(null)
            return
        }

        const selectedExists = filteredConversations.some(
            (conversation) => conversation.itemId === selectedConversationId
        )

        if (!selectedExists) {
            setSelectedConversationId(filteredConversations[0].itemId)
        }
    }, [filteredConversations, selectedConversationId])

    const selectedConversation =
        filteredConversations.find(
            (conversation) => conversation.itemId === selectedConversationId
        ) || null

    const handleMessagesUpdated = () => {
        setRefreshKey((prev) => prev + 1)
    }

    return (
        <Box sx={{py: 3, overflow: 'auto', height: '100%', position: 'relative'}}>
            <OfficeChatToolbar
                search={search}
                setSearch={setSearch}
                selectedCommunicationStatus={selectedCommunicationStatus}
                setSelectedCommunicationStatus={setSelectedCommunicationStatus}
                itemsCount={filteredConversations.length}
            />

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '360px minmax(0, 1fr)',
                gap: 3,
                alignItems: 'start',
            }}>
                <OfficeChatSidebar
                    conversations={filteredConversations}
                    selectedConversationId={selectedConversationId}
                    setSelectedConversationId={setSelectedConversationId}
                />

                <OfficeChatThread
                    selectedConversation={selectedConversation}
                    onMessagesUpdated={handleMessagesUpdated}
                />
            </Box>
        </Box>
    )
}