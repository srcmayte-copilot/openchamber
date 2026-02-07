import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MessageList from '../MessageList.vue'
import type { Message } from '@/stores/chat'

describe('MessageList', () => {
  it('renders empty state when no messages', () => {
    const wrapper = mount(MessageList, {
      props: {
        messages: []
      }
    })
    
    expect(wrapper.text()).toContain('No messages yet')
  })

  it('renders messages correctly', () => {
    const messages: Message[] = [
      {
        id: '1',
        role: 'user',
        content: 'Hello',
        timestamp: new Date()
      },
      {
        id: '2',
        role: 'assistant',
        content: 'Hi there!',
        timestamp: new Date()
      }
    ]
    
    const wrapper = mount(MessageList, {
      props: { messages }
    })
    
    expect(wrapper.text()).toContain('Hello')
    expect(wrapper.text()).toContain('Hi there!')
    expect(wrapper.findAll('.message')).toHaveLength(2)
  })

  it('applies correct role classes', () => {
    const messages: Message[] = [
      {
        id: '1',
        role: 'user',
        content: 'Test',
        timestamp: new Date()
      }
    ]
    
    const wrapper = mount(MessageList, {
      props: { messages }
    })
    
    expect(wrapper.find('.message.user').exists()).toBe(true)
  })
})
