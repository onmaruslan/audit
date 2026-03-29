import {getOfficeChatMessages} from './officeChatStorage'

export function getCommunicationStatus(messages) {
    if (!messages.length) {
        return 'no_messages'
    }

    const lastMessage = messages[messages.length - 1]

    if (lastMessage.author === 'user') {
        return 'waiting'
    }

    return 'answered'
}

export function buildOfficeChatConversations(items) {
    return items.map((item) => {
        const messages = getOfficeChatMessages(item.id)
        const lastMessage = messages[messages.length - 1] || null
        const communicationStatus = getCommunicationStatus(messages)

        return {
            itemId: String(item.id),
            code: item.code,
            title: item.title,
            section: item.section,
            role: item.role,
            itemStatus: item.status,
            evidence: item.evidence,
            messages,
            messagesCount: messages.length,
            lastMessage,
            communicationStatus,
        }
    })
}

export function getWaitingOfficeChatsCount(items) {
    return buildOfficeChatConversations(items).filter(
        (conversation) => conversation.communicationStatus === 'waiting'
    ).length
}