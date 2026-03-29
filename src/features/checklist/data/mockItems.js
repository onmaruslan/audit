import {checklistRoles} from './roles'

const sections = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '17'
]

const statuses = [
    'Not started',
    'In progress',
    'Completed',
    'Needs attention'
]

export const evidencePool = [
    'Policy',
    'Training',
    'Paperwork',
    'Company',
    'Last records',
    'Checklists',
    'Recent evidence'
]

function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function randomEvidence() {
    const count = 1 + Math.floor(Math.random() * 3)
    const shuffled = [...evidencePool].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
}

function generateItems() {
    let id = 1
    const items = []

    sections.forEach((section) => {
        const itemsPerSection = 12

        for (let i = 1; i <= itemsPerSection; i++) {
            const role = randomFrom(checklistRoles)

            items.push({
                id: id++,
                code: `${section}.${i}`,
                title: `Lorem ipsum item ${section}.${i}`,
                section,
                status: randomFrom(statuses),
                roleId: role.id,
                role: role.label,
                department: role.department,
                evidence: randomEvidence(),
                description:
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
                issue:
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
                solution:
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
                officeQuestion: 'Lorem ipsum question.',
                officeReply: 'Lorem ipsum reply.',
            })
        }
    })

    return items
}

export const mockItems = generateItems()