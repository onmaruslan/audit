import {Paper, Stack, Box, Typography, Chip} from '@mui/material'

export const ChecklistItemCard = ({
                                      item,
                                      selected,
                                      onSelect,
                                      statusColorMap,
                                  }) => {
    return (
        <Paper
            onClick={() => onSelect(item.id)}
            sx={{
                p: 2,
                borderRadius: 3,
                border: '1px solid',
                borderColor: selected ? 'primary.main' : 'divider',
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: 2,
                },
            }}
        >
            <Stack
                direction={{xs: 'column', md: 'row'}}
                spacing={2}
                justifyContent="space-between"
                alignItems={{xs: 'flex-start', md: 'center'}}
            >
                <Box sx={{minWidth: 0}}>
                    <Typography variant="subtitle1" sx={{fontWeight: 600}}>
                        {item.code} — {item.title}
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{mt: 1, flexWrap: 'wrap'}}>
                        <Chip size="small" label={item.role} variant="outlined"/>
                        <Chip
                            size="small"
                            label={item.status}
                            color={statusColorMap[item.status]}
                        />
                    </Stack>
                </Box>

                <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                    {item.evidence.map((tag) => (
                        <Chip key={tag} size="small" label={tag}/>
                    ))}
                </Stack>
            </Stack>
        </Paper>
    )
}