import {Box, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export const OfficeChatToolbar = ({
                                      search,
                                      setSearch,
                                      selectedCommunicationStatus,
                                      setSelectedCommunicationStatus,
                                      itemsCount,
                                  }) => {
    return (
        <Paper
            sx={{
                p: 2,
                borderRadius: 3,
                mb: 2,
            }}
        >
            <Stack spacing={2}>
                <Stack
                    direction={{xs: 'column', md: 'row'}}
                    spacing={2}
                    alignItems={{xs: 'stretch', md: 'center'}}
                    justifyContent="space-between"
                >
                    <Box>
                        <Typography variant="h5">Office Chat</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{mt: 0.5}}>
                            {itemsCount} conversations
                        </Typography>
                    </Box>

                    <TextField
                        size="small"
                        placeholder="Search conversation"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        InputProps={{
                            startAdornment: (
                                <SearchIcon fontSize="small" style={{marginRight: 8, opacity: 0.6}}/>
                            ),
                        }}
                        sx={{minWidth: 260}}
                    />
                </Stack>

                <Stack direction={{xs: 'column', md: 'row'}} spacing={2}>
                    <FormControl size="small" sx={{minWidth: 240}}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={selectedCommunicationStatus}
                            label="Status"
                            onChange={(event) => setSelectedCommunicationStatus(event.target.value)}
                        >
                            <MenuItem value="all">All conversations</MenuItem>
                            <MenuItem value="waiting">Waiting for office reply</MenuItem>
                            <MenuItem value="answered">Answered</MenuItem>
                            <MenuItem value="no_messages">No messages yet</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>
        </Paper>
    )
}