const STORAGE_KEY = 'checklist-office-chats'
const OFFICE_CHAT_UPDATED_EVENT = 'office-chat-updated'

export function getOfficeChats() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : {}
    } catch {
        return {}
    }
}

export function getOfficeChatMessages(itemId) {
    const chats = getOfficeChats()
    return chats[String(itemId)] || []
}

function notifyOfficeChatsUpdated() {
    window.dispatchEvent(new Event(OFFICE_CHAT_UPDATED_EVENT))
}

export function saveOfficeChats(chats) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats))
    notifyOfficeChatsUpdated()
}

export function saveOfficeChatMessages(itemId, messages) {
    const chats = getOfficeChats()

    const nextChats = {
        ...chats,
        [String(itemId)]: messages,
    }

    saveOfficeChats(nextChats)
}

export function addOfficeChatMessage(itemId, message) {
    const currentMessages = getOfficeChatMessages(itemId)

    const nextMessage = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...message,
    }

    const nextMessages = [...currentMessages, nextMessage]

    saveOfficeChatMessages(itemId, nextMessages)

    return nextMessages
}

function buildUserMessage(item, index) {
    const questionTemplates = [
        `Please confirm whether item ${item.code} requires additional documents.`,
        `Could you clarify the compliance expectations for "${item.title}"?`,
        `Please advise whether the current evidence is enough for ${item.code}.`,
    ]

    return {
        id: crypto.randomUUID(),
        author: 'user',
        text: questionTemplates[index % questionTemplates.length],
        createdAt: new Date(Date.now() - (index + 2) * 60 * 60 * 1000).toISOString(),
    }
}

function buildOfficeMessage(index) {
    const replyTemplates = [
        'Please attach the latest signed paperwork and keep the item in progress.',
        'The provided evidence looks acceptable for now. We will confirm after review.',
        'Confirmed. The item may proceed, but please keep monitoring updates from office.',
    ]

    return {
        id: crypto.randomUUID(),
        author: 'office',
        text: replyTemplates[index % replyTemplates.length],
        createdAt: new Date(Date.now() - (index + 1) * 60 * 60 * 1000).toISOString(),
    }
}

function buildSeedMessages(item, index, seedType) {
    const userMessage = buildUserMessage(item, index)
    const officeMessage = buildOfficeMessage(index)

    if (seedType === 'waiting') {
        return [userMessage]
    }

    if (seedType === 'answered') {
        return [userMessage, officeMessage]
    }

    return []
}

export function seedOfficeChatsIfNeeded(items) {
    const existingChats = getOfficeChats()

    const hasAnyMessages = Object.values(existingChats).some(
        (messages) => Array.isArray(messages) && messages.length > 0
    )

    if (hasAnyMessages) {
        return
    }

    const seededChats = {}

    items.forEach((item) => {
        const patternIndex = (item.id - 1) % 3

        if (patternIndex === 0) {
            seededChats[String(item.id)] = buildSeedMessages(item, item.id, 'waiting')
        } else if (patternIndex === 1) {
            seededChats[String(item.id)] = buildSeedMessages(item, item.id, 'answered')
        }
    })

    saveOfficeChats(seededChats)
}

export {STORAGE_KEY, OFFICE_CHAT_UPDATED_EVENT}