export function getDepartmentProgress(items, department) {
    const departmentItems = items.filter((item) => item.department === department)

    const total = departmentItems.length
    const completed = departmentItems.filter((item) => item.status === 'Completed').length
    const inProgress = departmentItems.filter((item) => item.status === 'In progress').length
    const notStarted = departmentItems.filter((item) => item.status === 'Not started').length
    const needsAttention = departmentItems.filter((item) => item.status === 'Needs attention').length

    const progressPercent = total ? Math.round((completed / total) * 100) : 0

    return {
        department,
        total,
        completed,
        inProgress,
        notStarted,
        needsAttention,
        progressPercent,
    }
}