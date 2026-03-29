import {useEffect, useState} from 'react'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import {
    addOfficeChatMessage,
    getOfficeChatMessages,
} from '../../features/office-chat/utils/officeChatStorage'

export const ChecklistOfficeChatDialog = ({open, onClose, item, onMessagesChange}) => {
    const [messages, setMessages] = useState([])
    const [draft, setDraft] = useState('')

    useEffect(() => {
        if (!open || !item) {
            return
        }

        const nextMessages = getOfficeChatMessages(String(item.id))
        setMessages(nextMessages)
    }, [open, item])

    const handleSend = () => {
        const text = draft.trim()

        if (!text || !item) {
            return
        }

        const nextMessages = addOfficeChatMessage(String(item.id), {
            author: 'user',
            text,
        })

        setMessages(nextMessages)
        setDraft('')
        onMessagesChange?.(String(item.id), nextMessages)
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                {item ? `Office chat — ${item.code} — ${item.title}` : 'Office chat'}
            </DialogTitle>

            <DialogContent dividers>
                <Stack spacing={2}>
                    {messages.length > 0 ? (
                        messages.map((message) => (
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

                    <TextField
                        multiline
                        minRows={4}
                        placeholder="Write your message to office..."
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Close</Button>
                <Button variant="contained" onClick={handleSend} disabled={!draft.trim()}>
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    )
}