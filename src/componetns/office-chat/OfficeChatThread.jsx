import {useEffect, useState} from 'react'
import {Box, Button, Chip, Paper, Stack, TextField, Typography} from '@mui/material'
import {addOfficeChatMessage} from '../../features/office-chat/utils/officeChatStorage'

const communicationStatusLabelMap = {
    no_messages: 'No messages yet',
    waiting: 'Waiting for office reply',
    answered: 'Answered',
}

const communicationStatusColorMap = {
    no_messages: 'default',
    waiting: 'warning',
    answered: 'success',
}

export const OfficeChatThread = ({
                                     selectedConversation,
                                     onMessagesUpdated,
                                 }) => {
    const [draft, setDraft] = useState('')

    useEffect(() => {
        setDraft('')
    }, [selectedConversation?.itemId])

    const handleSend = () => {
        if (!selectedConversation || !draft.trim()) {
            return
        }

        addOfficeChatMessage(selectedConversation.itemId, {
            author: 'user',
            text: draft.trim(),
        })

        setDraft('')
        onMessagesUpdated()
    }

    if (!selectedConversation) {
        return (
            <Paper
                sx={{
                    p: 2,
                    borderRadius: 3,
                    minHeight: 500,
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    Select a conversation
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper
            sx={{
                p: 2,
                borderRadius: 3,
                minHeight: 500,
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'start',
            }}
        >
            <Stack spacing={2} sx={{height: '100%'}}>
                <Box>
                    <Typography variant="overline" color="text.secondary">
                        Conversation
                    </Typography>
                    <Typography variant="h6">
                        {selectedConversation.code} — {selectedConversation.title}
                    </Typography>
                </Box>

                <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                    <Chip
                        size="small"
                        label={`Section ${selectedConversation.section}`}
                        variant="outlined"
                    />
                    <Chip
                        size="small"
                        label={selectedConversation.role}
                        variant="outlined"
                    />
                    <Chip
                        size="small"
                        label={
                            communicationStatusLabelMap[selectedConversation.communicationStatus]
                        }
                        color={
                            communicationStatusColorMap[selectedConversation.communicationStatus]
                        }
                    />
                </Stack>

                <Stack
                    spacing={2}
                    sx={{
                        flex: 1,
                        minHeight: 280,
                        maxHeight: 520,
                        overflowY: 'auto',
                        pr: 1,
                    }}
                >
                    {selectedConversation.messages.length > 0 ? (
                        selectedConversation.messages.map((message) => (
                            <Box
                                key={message.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent:
                                        message.author === 'user' ? 'flex-end' : 'flex-start',
                                }}
                            >
                                <Paper
                                    sx={{
                                        p: 1.5,
                                        maxWidth: '75%',
                                        borderRadius: 2,
                                    }}
                                >
                                    <Typography variant="caption" color="text.secondary">
                                        {message.author === 'user' ? 'You' : 'Office'}
                                    </Typography>

                                    <Typography sx={{mt: 0.5, whiteSpace: 'pre-wrap'}}>
                                        {message.text}
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{display: 'block', mt: 1}}
                                    >
                                        {new Date(message.createdAt).toLocaleString()}
                                    </Typography>
                                </Paper>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No messages yet
                        </Typography>
                    )}
                </Stack>

                <Stack spacing={1}>
                    <TextField
                        multiline
                        minRows={4}
                        placeholder="Write your message to office..."
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                    />

                    <Stack direction="row" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            onClick={handleSend}
                            disabled={!draft.trim()}
                        >
                            Send
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    )
}