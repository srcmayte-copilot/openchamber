import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useChatStore } from '../chat'

describe('Chat Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with empty messages', () => {
    const store = useChatStore()
    expect(store.messages).toEqual([])
    expect(store.isLoading).toBe(false)
  })

  it('adds messages correctly', () => {
    const store = useChatStore()
    
    store.addMessage({
      role: 'user',
      content: 'Hello'
    })
    
    expect(store.messages).toHaveLength(1)
    expect(store.messages[0].role).toBe('user')
    expect(store.messages[0].content).toBe('Hello')
    expect(store.messages[0].id).toBeDefined()
    expect(store.messages[0].timestamp).toBeInstanceOf(Date)
  })

  it('clears messages', () => {
    const store = useChatStore()
    
    store.addMessage({ role: 'user', content: 'Test 1' })
    store.addMessage({ role: 'assistant', content: 'Test 2' })
    expect(store.messages).toHaveLength(2)
    
    store.clearMessages()
    expect(store.messages).toEqual([])
  })

  it('generates unique IDs for messages', () => {
    const store = useChatStore()
    
    store.addMessage({ role: 'user', content: 'Message 1' })
    store.addMessage({ role: 'user', content: 'Message 2' })
    
    const ids = store.messages.map(m => m.id)
    expect(new Set(ids).size).toBe(2)
  })
})
