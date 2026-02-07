<script setup lang="ts">
import type { Message } from '@/stores/chat'

defineProps<{
  messages: Message[]
}>()
</script>

<template>
  <div class="message-list">
    <div v-if="messages.length === 0" class="empty-state">
      <p>No messages yet. Start a conversation!</p>
    </div>
    <div v-for="message in messages" :key="message.id" :class="['message', message.role]">
      <div class="message-role">{{ message.role }}</div>
      <div class="message-content">{{ message.content }}</div>
    </div>
  </div>
</template>

<style scoped>
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #100f0f;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #888;
}

.message {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background: #1a1a1a;
}

.message.user {
  background: #205ea6;
}

.message.assistant {
  background: #1a1a1a;
}

.message-role {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #888;
  text-transform: capitalize;
}

.message-content {
  color: #f1ecec;
  white-space: pre-wrap;
}
</style>
