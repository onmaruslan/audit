import {useEffect, useMemo, useState} from 'react'
import {Box, Paper, Stack, Typography} from '@mui/material'
import {checklistSections} from '../features/checklist/data/sections'
import {checklistRoles} from '../features/checklist/data/roles'
import {mockItems, evidencePool} from '../features/checklist/data/mockItems'
import {ChecklistToolbar} from '../componetns/checklist/ChecklistToolbar'
import {ChecklistSections} from '../componetns/checklist/ChecklistSections'
import {ChecklistItemCard} from '../componetns/checklist/ChecklistItemCard'
import {ChecklistDetails} from '../componetns/checklist/ChecklistDetails'
import {seedOfficeChatsIfNeeded} from '../features/office-chat/utils/officeChatStorage'

const ALL_SECTIONS_ID = 'all'

const statusColorMap = {
    'Not started': 'default',
    'In progress': 'warning',
    Completed: 'success',
    'Needs attention': 'error',
}

const statusValueMap = {
    completed: 'Completed',
    in_progress: 'In progress',
    not_started: 'Not started',
    needs_attention: 'Needs attention',
}

export default function ChecklistPage() {
    const [items, setItems] = useState(mockItems)
    const [selectedSection, setSelectedSection] = useState(ALL_SECTIONS_ID)
    const [search, setSearch] = useState('')
    const [selectedItemId, setSelectedItemId] = useState(null)
    const [selectedRole, setSelectedRole] = useState('all')
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [selectedEvidence, setSelectedEvidence] = useState([])

    const sectionsWithAll = useMemo(() => {
        return [{id: ALL_SECTIONS_ID, label: 'All sections'}, ...checklistSections]
    }, [])

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const matchesSection =
                selectedSection === ALL_SECTIONS_ID || item.section === selectedSection

            const matchesSearch =
                item.code.toLowerCase().includes(search.toLowerCase()) ||
                item.title.toLowerCase().includes(search.toLowerCase())

            const matchesRole =
                selectedRole === 'all' || item.roleId === selectedRole

            const matchesStatus =
                selectedStatus === 'all' || item.status === statusValueMap[selectedStatus]

            const matchesEvidence =
                selectedEvidence.length === 0 ||
                selectedEvidence.some((evidence) => item.evidence.includes(evidence))

            return (
                matchesSection &&
                matchesSearch &&
                matchesRole &&
                matchesStatus &&
                matchesEvidence
            )
        })
    }, [
        items,
        selectedSection,
        search,
        selectedRole,
        selectedStatus,
        selectedEvidence,
    ])

    useEffect(() => {
        if (!filteredItems.length) {
            setSelectedItemId(null)
            return
        }

        const selectedExists = filteredItems.some((item) => item.id === selectedItemId)

        if (!selectedExists) {
            setSelectedItemId(filteredItems[0].id)
        }
    }, [filteredItems, selectedItemId])

    const selectedSectionLabel =
        sectionsWithAll.find((section) => section.id === selectedSection)?.label || ''

    const selectedItem =
        filteredItems.find((item) => item.id === selectedItemId) || null

    const handleStatusChange = (itemId, nextStatus) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? {...item, status: nextStatus} : item
            )
        )
    }

    useEffect(() => {
        seedOfficeChatsIfNeeded(mockItems)
    }, [])

    return (
        <Box sx={{display: 'flex', gap: 3, height: '100%', position: 'relative', overflow: 'hidden'}}>
            <Box sx={{
                // maxHeight: '100%',
                overflow: 'hidden',
                py: 3,
                height: '100%',
                flexShrink: 0,
                top: 0,
                position: 'sticky'
            }}>
                <ChecklistSections
                    sections={sectionsWithAll}
                    selectedSection={selectedSection}
                    onSelectSection={setSelectedSection}
                    allSectionsId={ALL_SECTIONS_ID}
                />
            </Box>

            <Box sx={{flex: 1, minWidth: 0, minHeight: 0, height: '100%', overflow: 'auto', py: 3}}>
                <ChecklistToolbar
                    title={selectedSectionLabel}
                    itemsCount={filteredItems.length}
                    search={search}
                    setSearch={setSearch}
                    selectedRole={selectedRole}
                    setSelectedRole={setSelectedRole}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    roles={checklistRoles}
                    evidenceOptions={evidencePool}
                    selectedEvidence={selectedEvidence}
                    setSelectedEvidence={setSelectedEvidence}
                />

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) 360px',
                    gap: 2,
                    alignItems: 'start',
                }}>
                    <Stack spacing={2}>
                        {filteredItems.map((item) => (
                            <ChecklistItemCard
                                key={item.id}
                                item={item}
                                selected={selectedItemId === item.id}
                                onSelect={setSelectedItemId}
                                statusColorMap={statusColorMap}
                            />
                        ))}

                        {filteredItems.length === 0 && (
                            <Paper sx={{p: 4, borderRadius: 3, textAlign: 'center'}}>
                                <Typography variant="body1">No items found</Typography>
                            </Paper>
                        )}
                    </Stack>

                    <ChecklistDetails
                        selectedItem={selectedItem}
                        statusColorMap={statusColorMap}
                        onStatusChange={handleStatusChange}
                    />
                </Box>
            </Box>
        </Box>
    )
}