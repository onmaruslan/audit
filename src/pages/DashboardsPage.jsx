import {
    Box,
    Chip,
    LinearProgress,
    Paper,
    Stack,
    Typography,
} from '@mui/material'
import {mockItems} from '../features/checklist/data/mockItems'
import {getDepartmentProgress} from '../features/dashboard/utils/dashboardMetrics'

function DashboardCard({title, data}) {
    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
            }}
        >
            <Stack spacing={2}>
                <Box>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{mt: 0.5}}>
                        {data.completed} of {data.total} completed
                    </Typography>
                </Box>

                <Box>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{mb: 1}}
                    >
                        <Typography variant="body2" color="text.secondary">
                            Progress
                        </Typography>
                        <Typography variant="subtitle2">
                            {data.progressPercent}%
                        </Typography>
                    </Stack>

                    <LinearProgress
                        variant="determinate"
                        value={data.progressPercent}
                        sx={{
                            height: 10,
                            borderRadius: 999,
                        }}
                    />
                </Box>

                <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                    <Chip label={`Completed: ${data.completed}`} color="success" size="small"/>
                    <Chip label={`In progress: ${data.inProgress}`} color="warning" size="small"/>
                    <Chip label={`Needs attention: ${data.needsAttention}`} color="error" size="small"/>
                    <Chip label={`Not started: ${data.notStarted}`} size="small"/>
                </Stack>
            </Stack>
        </Paper>
    )
}

export default function DashboardsPage() {
    const deckProgress = getDepartmentProgress(mockItems, 'deck')
    const engineProgress = getDepartmentProgress(mockItems, 'engine')

    const sixMonthsProgress = {
        total: 49,
        completed: 12,
        inProgress: 18,
        notStarted: 11,
        needsAttention: 8,
        progressPercent: 24,
    }

    const threeMonthsProgress = {
        total: 78,
        completed: 21,
        inProgress: 25,
        notStarted: 20,
        needsAttention: 12,
        progressPercent: 27,
    }

    const lastVoyageProgress = {
        total: 45,
        completed: 10,
        inProgress: 14,
        notStarted: 13,
        needsAttention: 8,
        progressPercent: 22,
    }

    return (
        <Stack spacing={3} sx={{py: 3}}>
            <Box>
                <Typography variant="h4">Dashboards</Typography>
                <Typography variant="body2" color="text.secondary" sx={{mt: 0.5}}>
                    Overview of checklist progress by department and evidence interval
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        lg: 'repeat(2, minmax(0, 1fr))',
                    },
                    gap: 3,
                    alignItems: 'start',
                }}
            >
                <DashboardCard
                    title="Deck progress"
                    data={deckProgress}
                />

                <DashboardCard
                    title="Engine progress"
                    data={engineProgress}
                />
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        md: 'repeat(3, minmax(0, 1fr))',
                    },
                    gap: 1,
                    alignItems: 'start',
                }}
            >
                <DashboardCard
                    title="6 months progress"
                    data={sixMonthsProgress}
                />

                <DashboardCard
                    title="3 months progress"
                    data={threeMonthsProgress}
                />

                <DashboardCard
                    title="Last voyage progress"
                    data={lastVoyageProgress}
                />
            </Box>
        </Stack>
    )
}