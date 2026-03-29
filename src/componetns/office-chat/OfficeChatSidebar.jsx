import {Chip, List, ListItemButton, ListItemText, Paper, Stack, Typography} from '@mui/material'

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

export const OfficeChatSidebar = ({
                                      conversations,
                                      selectedConversationId,
                                      setSelectedConversationId,
                                  }) => {
    return (
        <Paper
            sx={{
                p: 2,
                borderRadius: 3,
                alignSelf: 'start',
            }}
        >
            <List sx={{p: 0}}>
                {conversations.map((conversation) => (
                    <ListItemButton
                        key={conversation.itemId}
                        selected={selectedConversationId === conversation.itemId}
                        onClick={() => setSelectedConversationId(conversation.itemId)}
                        sx={{
                            mb: 1,
                            borderRadius: 2,
                            alignItems: 'flex-start',
                        }}
                    >
                        <ListItemText
                            primary={`${conversation.code} — ${conversation.title}`}
                            secondary={
                                <Stack spacing={1} sx={{mt: 1}}>
                                    <Typography variant="body2" color="text.secondary">
                                        Section {conversation.section}
                                    </Typography>

                                    <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                                        <Chip
                                            size="small"
                                            label={
                                                communicationStatusLabelMap[
                                                    conversation.communicationStatus
                                                    ]
                                            }
                                            color={
                                                communicationStatusColorMap[
                                                    conversation.communicationStatus
                                                    ]
                                            }
                                        />
                                        <Chip
                                            size="small"
                                            label={`${conversation.messagesCount} messages`}
                                            variant="outlined"
                                        />
                                    </Stack>

                                    {conversation.lastMessage && (
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {conversation.lastMessage.author === 'user'
                                                ? 'You: '
                                                : 'Office: '}
                                            {conversation.lastMessage.text}
                                        </Typography>
                                    )}
                                </Stack>
                            }
                            secondaryTypographyProps={{component: 'div'}}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Paper>
    )
}