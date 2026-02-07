<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'send'): void
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    emit('send')
  }
}
</script>

<template>
  <div class="chat-input">
    <textarea
      :value="modelValue"
      @input="handleInput"
      @keydown="handleKeydown"
      :disabled="disabled"
      placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
      rows="3"
    />
    <button @click="emit('send')" :disabled="disabled || !modelValue.trim()">
      Send
    </button>
  </div>
</template>

<style scoped>
.chat-input {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #333;
  background: #1a1a1a;
}

textarea {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #333;
  border-radius: 0.375rem;
  background: #100f0f;
  color: #f1ecec;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: #205ea6;
}

textarea:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  background: #205ea6;
  color: #f1ecec;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover:not(:disabled) {
  background: #2870c0;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
