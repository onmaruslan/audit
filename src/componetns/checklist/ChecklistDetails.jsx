import {useEffect, useMemo, useState} from 'react'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Badge,
    Box,
    Button,
    Chip,
    Dialog,
    DialogContent,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import {ChecklistOfficeChatDialog} from './ChecklistOfficeChatDialog'
import {getOfficeChatMessages} from '../../features/office-chat/utils/officeChatStorage'

const statusOptions = [
    'Not started',
    'In progress',
    'Completed',
    'Needs attention',
]

function DetailsAccordionSection({title, value, defaultExpanded = false, children}) {
    if (!value && !children) {
        return null
    }

    return (
        <Accordion
            defaultExpanded={defaultExpanded}
            disableGutters
            elevation={0}
            sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                overflow: 'hidden',
                '&:before': {
                    display: 'none',
                },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                sx={{
                    minHeight: 48,
                    px: 2,
                    '& .MuiAccordionSummary-content': {
                        my: 1,
                    },
                }}
            >
                <Typography variant="subtitle2">{title}</Typography>
            </AccordionSummary>

            <AccordionDetails
                sx={{
                    px: 2,
                    pt: 0,
                    pb: 2,
                }}
            >
                {value && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{whiteSpace: 'pre-wrap'}}
                    >
                        {value}
                    </Typography>
                )}

                {children}
            </AccordionDetails>
        </Accordion>
    )
}

export const ChecklistDetails = ({selectedItem, statusColorMap, onStatusChange, dataGrid}) => {
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [messagesCount, setMessagesCount] = useState(0)
    const [selectedImage, setSelectedImage] = useState(null)

    console.log('selectedItem =>', selectedItem)
    useEffect(() => {
        if (!selectedItem) {
            setMessagesCount(0)
            return
        }

        const messages = getOfficeChatMessages(String(selectedItem.id))
        setMessagesCount(messages.length)
    }, [selectedItem])

    const communicationStatus = useMemo(() => {
        if (!selectedItem) {
            return ''
        }

        const messages = getOfficeChatMessages(String(selectedItem.id))

        if (!messages.length) {
            return 'No messages yet'
        }

        const lastMessage = messages[messages.length - 1]

        if (lastMessage.author === 'user') {
            return 'Waiting for office reply'
        }

        return 'Answered'
    }, [selectedItem, messagesCount])

    const handleMessagesChange = (_, nextMessages) => {
        setMessagesCount(nextMessages.length)
    }

    const proposedSolutionImages = [
        `${import.meta.env.BASE_URL}images/1.png`,
        `${import.meta.env.BASE_URL}images/2.png`,
    ]

    return (
        <>
            <Paper
                sx={{
                    p: 2,
                    borderRadius: 3,
                    alignSelf: 'start',
                    position: 'sticky',
                    top: 0,
                    maxHeight: dataGrid ? undefined : 'calc(100vh - 160px)',
                    // maxHeight: '100%',
                    overflow: 'auto',
                    height: dataGrid ? '100%' : undefined,


                }}
            >
                {selectedItem ? (
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="overline" color="text.secondary">
                                Details
                            </Typography>
                            <Typography variant="h6">
                                {selectedItem.code} — {selectedItem.title}
                            </Typography>
                        </Box>

                        <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                            <Chip size="small" label={selectedItem.role} variant="outlined"/>
                            <Chip
                                size="small"
                                label={selectedItem.status}
                                color={statusColorMap[selectedItem.status]}
                            />
                        </Stack>

                        <FormControl size="small" fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={selectedItem.status}
                                label="Status"
                                onChange={(event) => onStatusChange(selectedItem.id, event.target.value)}
                            >
                                {statusOptions.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Evidence
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                                {selectedItem.evidence.map((tag) => (
                                    <Chip key={tag} size="small" label={tag}/>
                                ))}
                            </Stack>
                        </Box>

                        <Divider/>

                        <DetailsAccordionSection
                            title="Description"
                            value={selectedItem.description}
                            defaultExpanded
                        />

                        <DetailsAccordionSection
                            title="Issue"
                            value={selectedItem.issue}
                        />

                        <DetailsAccordionSection
                            title="Proposed solution"
                            value={selectedItem.solution}
                        >
                            <Box sx={{mt: 2}}>
                                <Typography variant="subtitle2" sx={{mb: 1}}>
                                    Reference images
                                </Typography>

                                <Grid container spacing={1.5}>
                                    {proposedSolutionImages.map((imageSrc) => (
                                        <Grid key={imageSrc} size={{xs: 6}}>
                                            <Box
                                                component="img"
                                                src={imageSrc}
                                                alt="Proposed solution reference"
                                                onClick={() => setSelectedImage(imageSrc)}
                                                sx={{
                                                    width: '100%',
                                                    height: 120,
                                                    objectFit: 'cover',
                                                    borderRadius: 2,
                                                    cursor: 'pointer',
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    transition: '0.2s',
                                                    '&:hover': {
                                                        boxShadow: 2,
                                                        transform: 'scale(1.01)',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </DetailsAccordionSection>

                        <Divider/>

                        <Box
                            sx={{
                                p: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                spacing={2}
                            >
                                <Box>
                                    <Typography variant="subtitle2">
                                        Office communication
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{mt: 0.5}}>
                                        {communicationStatus}
                                    </Typography>
                                </Box>

                                <Badge
                                    color="error"
                                    badgeContent={messagesCount}
                                    invisible={messagesCount === 0}
                                >
                                    <Button
                                        variant="outlined"
                                        startIcon={<ChatBubbleOutlineIcon/>}
                                        onClick={() => setIsChatOpen(true)}
                                    >
                                        Open chat
                                    </Button>
                                </Badge>
                            </Stack>
                        </Box>
                    </Stack>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        Select an item to see details
                    </Typography>
                )}
            </Paper>

            <ChecklistOfficeChatDialog
                open={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                item={selectedItem}
                onMessagesChange={handleMessagesChange}
            />

            <Dialog
                open={Boolean(selectedImage)}
                onClose={() => setSelectedImage(null)}
                maxWidth="lg"
                fullWidth
            >
                <DialogContent sx={{p: 1}}>
                    {selectedImage && (
                        <Box
                            component="img"
                            src={selectedImage}
                            alt="Proposed solution preview"
                            sx={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                borderRadius: 1,
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}