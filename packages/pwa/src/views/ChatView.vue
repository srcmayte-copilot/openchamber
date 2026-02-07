<script setup lang="ts">
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'
import MessageList from '@/components/chat/MessageList.vue'
import ChatInput from '@/components/chat/ChatInput.vue'

const chatStore = useChatStore()
const inputMessage = ref('')

function sendMessage() {
  if (!inputMessage.value.trim()) return
  
  chatStore.addMessage({
    role: 'user',
    content: inputMessage.value
  })
  
  // Simulate assistant response
  setTimeout(() => {
    chatStore.addMessage({
      role: 'assistant',
      content: `You said: "${inputMessage.value}"`
    })
  }, 500)
  
  inputMessage.value = ''
}
</script>

<template>
  <div class="chat-view">
    <header class="chat-header">
      <h1>OpenChamber</h1>
    </header>
    
    <MessageList :messages="chatStore.messages" />
    
    <ChatInput
      v-model="inputMessage"
      @send="sendMessage"
      :disabled="chatStore.isLoading"
    />
  </div>
</template>

<style scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

.chat-header {
  padding: 1rem;
  border-bottom: 1px solid #333;
  background: #1a1a1a;
}

.chat-header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #f1ecec;
}
</style>
