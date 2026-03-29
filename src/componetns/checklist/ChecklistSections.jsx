import {List, ListItemButton, ListItemText, Paper, Typography} from '@mui/material'

export const ChecklistSections = ({
                                      sections,
                                      selectedSection,
                                      onSelectSection,
                                      allSectionsId,
                                  }) => {
    return (
        <Paper
            sx={{
                width: 260,
                borderRadius: 3,
                height: 'fit-content',
                flexShrink: 0,
                maxHeight: '100%',
                // height: '100%',

                p: 1.5,
                overflow: 'auto',
            }}
        >
            <Typography variant="subtitle2" sx={{px: 1, pb: 1, color: 'text.secondary'}}>
                Sections
            </Typography>

            <List sx={{p: 0}}>
                {sections.map((section) => (
                    <ListItemButton
                        key={section.id}
                        selected={selectedSection === section.id}
                        onClick={() => onSelectSection(section.id)}
                        sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            alignItems: 'flex-start',
                        }}
                    >
                        <ListItemText
                            primary={
                                section.id === allSectionsId
                                    ? section.label
                                    : `${section.id}. ${section.label}`
                            }
                            primaryTypographyProps={{
                                fontSize: 14,
                                fontWeight: selectedSection === section.id ? 600 : 400,
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Paper>
    )
}