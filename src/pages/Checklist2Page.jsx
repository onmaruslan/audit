import {useMemo, useState} from 'react'
import {
    Box,
    Chip,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
    Drawer,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {DataGrid} from '@mui/x-data-grid'

import {checklistSections} from '../features/checklist/data/sections'
import {mockItems} from '../features/checklist/data/mockItems'
import {ChecklistDetails} from '../componetns/checklist/ChecklistDetails.jsx'

const ALL_SECTIONS_ID = 'all'

const statusColorMap = {
    'Not started': 'default',
    'In progress': 'warning',
    Completed: 'success',
    'Needs attention': 'error',
}

export default function Checklist2Page() {
    const [selectedSection, setSelectedSection] = useState(ALL_SECTIONS_ID)
    const [search, setSearch] = useState('')
    const [items, setItems] = useState(mockItems)

    const [statusFilter, setStatusFilter] = useState('')
    const [roleFilter, setRoleFilter] = useState('')
    const [evidenceFilter, setEvidenceFilter] = useState('')

    const [selectedItem, setSelectedItem] = useState(null)

    const sectionsWithAll = [
        {id: ALL_SECTIONS_ID, label: 'All sections'},
        ...checklistSections,
    ]

    console.log('selectedItemselectedItem', selectedItem)

    const rows = useMemo(() => {
        return items
            .filter((item) => {
                const matchesSection =
                    selectedSection === ALL_SECTIONS_ID ||
                    item.section === selectedSection

                const matchesSearch =
                    item.code.toLowerCase().includes(search.toLowerCase()) ||
                    item.title.toLowerCase().includes(search.toLowerCase())

                const matchesStatus =
                    !statusFilter || item.status === statusFilter

                const matchesRole =
                    !roleFilter || item.role === roleFilter

                const matchesEvidence =
                    !evidenceFilter || item.evidence.includes(evidenceFilter)

                return (
                    matchesSection &&
                    matchesSearch &&
                    matchesStatus &&
                    matchesRole &&
                    matchesEvidence
                )
            })
            .map((item) => ({
                ...item,
                id: item.id,
            }))
    }, [items, selectedSection, search, statusFilter, roleFilter, evidenceFilter])

    const columns = [
        {
            field: 'code',
            headerName: 'Code',
            width: 90,
        },
        {
            field: 'title',
            headerName: 'Item',
            flex: 1,
            minWidth: 300,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 160,
            renderCell: (params) => (
                <Chip size="small" label={params.value} variant="outlined"/>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 160,
            renderCell: (params) => (
                <Chip
                    size="small"
                    label={params.value}
                    color={statusColorMap[params.value]}
                />
            ),
        },
        {
            field: 'evidence',
            headerName: 'Evidence',
            flex: 1,
            minWidth: 220,
            renderCell: (params) => (
                <Stack direction="row" spacing={0.5} sx={{flexWrap: 'wrap', height: '100%', alignItems: 'center'}}>
                    {params.value.map((tag) => (
                        <Chip key={tag} size="small" label={tag}/>
                    ))}
                </Stack>
            ),
        },
    ]

    const handleStatusChange = (itemId, nextStatus) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === itemId ? {...item, status: nextStatus} : item
            )
        )
    }

    return (
        <Box sx={{display: 'flex', gap: 3, height: '100%', py: 3, pr: 3, overflow: 'auto', maxWidth: '100%'}}>
            {/* Sections */}
            <Paper
                sx={{
                    width: 260,
                    p: 1.5,
                    borderRadius: 3,
                    flexShrink: 0,
                }}
            >
                <Typography variant="subtitle2" sx={{px: 1, pb: 1}}>
                    Sections
                </Typography>

                {sectionsWithAll.map((section) => (
                    <Box
                        key={section.id}
                        onClick={() => setSelectedSection(section.id)}
                        sx={{
                            px: 1,
                            py: 1,
                            borderRadius: 2,
                            cursor: 'pointer',
                            mb: 0.5,
                            bgcolor:
                                selectedSection === section.id
                                    ? 'primary.main'
                                    : 'transparent',
                            color:
                                selectedSection === section.id ? '#fff' : 'text.primary',
                        }}
                    >
                        {section.id === ALL_SECTIONS_ID
                            ? section.label
                            : `${section.id}. ${section.label}`}
                    </Box>
                ))}
            </Paper>

            {/* Content */}
            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', gap: 2}}>
                {/* Toolbar */}
                <Paper sx={{p: 2, borderRadius: 3}}>
                    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                        <Typography variant="h6">
                            Checklist ({rows.length})
                        </Typography>

                        <TextField
                            size="small"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <SearchIcon fontSize="small" style={{marginRight: 8}}/>
                                ),
                            }}
                        />

                        <Select
                            size="small"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="">All status</MenuItem>
                            <MenuItem value="Not started">Not started</MenuItem>
                            <MenuItem value="In progress">In progress</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Needs attention">Needs attention</MenuItem>
                        </Select>

                        <Select
                            size="small"
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="">All roles</MenuItem>
                            <MenuItem value="Captain">Captain</MenuItem>
                            <MenuItem value="Chief Officer">Chief Officer</MenuItem>
                            <MenuItem value="Chief Engineer">Chief Engineer</MenuItem>
                            <MenuItem value="Second Officer">Second Officer</MenuItem>
                            <MenuItem value="Second Engineer">Second Engineer</MenuItem>
                        </Select>

                        <Select
                            size="small"
                            value={evidenceFilter}
                            onChange={(e) => setEvidenceFilter(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="">All evidence</MenuItem>
                            <MenuItem value="Policy">Policy</MenuItem>
                            <MenuItem value="Training">Training</MenuItem>
                            <MenuItem value="Paperwork">Paperwork</MenuItem>
                            <MenuItem value="Company">Company</MenuItem>
                            <MenuItem value="Last records">Last records</MenuItem>
                            <MenuItem value="Checklists">Checklists</MenuItem>
                            <MenuItem value="Recent evidence">Recent evidence</MenuItem>
                        </Select>
                    </Stack>
                </Paper>

                {/* DataGrid */}
                <Paper sx={{flex: 1, borderRadius: 3}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        disableRowSelectionOnClick
                        onRowClick={(params) => {
                            setSelectedItem(params.row)
                        }}
                        sx={{
                            '& .MuiDataGrid-row': {
                                cursor: 'pointer',
                            },
                        }}
                    />
                </Paper>
            </Box>

            {/* Drawer */}
            <Drawer
                anchor="right"
                // open
                open={Boolean(selectedItem)}
                onClose={() => setSelectedItem(null)}
                PaperProps={{
                    sx: {
                        width: 420,
                        p: 2,
                    },
                }}
            >
                {selectedItem && (
                    <ChecklistDetails
                        selectedItem={selectedItem}
                        statusColorMap={statusColorMap}
                        dataGrid
                        onStatusChange={handleStatusChange}
                    />
                )}
            </Drawer>
        </Box>
    )
}