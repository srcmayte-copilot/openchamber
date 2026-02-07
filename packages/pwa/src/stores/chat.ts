import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([])
  const isLoading = ref(false)

  function addMessage(message: Omit<Message, 'id' | 'timestamp'>) {
    messages.value.push({
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date()
    })
  }

  function clearMessages() {
    messages.value = []
  }

  return {
    messages,
    isLoading,
    addMessage,
    clearMessages
  }
})
