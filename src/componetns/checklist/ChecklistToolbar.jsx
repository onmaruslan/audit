import {
    Box,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export const ChecklistToolbar = ({
                                     title,
                                     itemsCount,
                                     search,
                                     setSearch,
                                     selectedRole,
                                     setSelectedRole,
                                     selectedStatus,
                                     setSelectedStatus,
                                     roles,
                                     evidenceOptions,
                                     selectedEvidence,
                                     setSelectedEvidence,
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
                        <Typography variant="h5">{title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{mt: 0.5}}>
                            {itemsCount} items
                        </Typography>
                    </Box>

                    <TextField
                        size="small"
                        placeholder="Search item"
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

                <Stack direction={{xs: 'column', md: 'row'}} spacing={2} flexWrap="wrap">
                    <FormControl size="small" sx={{minWidth: 220}}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={selectedRole}
                            label="Role"
                            onChange={(event) => setSelectedRole(event.target.value)}
                        >
                            <MenuItem value="all">All roles</MenuItem>
                            {roles.map((role) => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{minWidth: 220}}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={selectedStatus}
                            label="Status"
                            onChange={(event) => setSelectedStatus(event.target.value)}
                        >
                            <MenuItem value="all">All statuses</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                            <MenuItem value="in_progress">In progress</MenuItem>
                            <MenuItem value="not_started">Not started</MenuItem>
                            <MenuItem value="needs_attention">Needs attention</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{minWidth: 280}}>
                        <InputLabel>Evidence</InputLabel>
                        <Select
                            multiple
                            value={selectedEvidence}
                            onChange={(event) => setSelectedEvidence([...event.target.value])}
                            input={<OutlinedInput label="Evidence"/>}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {evidenceOptions.map((evidence) => (
                                <MenuItem key={evidence} value={evidence}>
                                    <Checkbox checked={selectedEvidence.includes(evidence)}/>
                                    <ListItemText primary={evidence}/>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>
        </Paper>
    )
}