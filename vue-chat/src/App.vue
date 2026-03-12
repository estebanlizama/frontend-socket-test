<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useChatStore } from './stores/chat';
import Button from './components/ui/Button.vue';
import Input from './components/ui/Input.vue';
import Badge from './components/ui/Badge.vue';
import Card from './components/ui/Card.vue';
import { Send, MessageSquare, User, Clock, Hash } from 'lucide-vue-next';

const chatStore = useChatStore();
const inputText = ref('');
const messagesContainer = ref<HTMLElement | null>(null);

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

watch(() => chatStore.messages, () => {
  scrollToBottom();
}, { deep: true });

const handleSend = () => {
  if (inputText.value.trim()) {
    chatStore.sendMessage(inputText.value);
    inputText.value = '';
  }
};

onMounted(() => {
  chatStore.initialize();
  scrollToBottom();
});

onUnmounted(() => {
  chatStore.destroy();
});
</script>

<template>
  <div class="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4 selection:bg-blue-100 font-sans">
    <Transition
      appear
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="transform translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
    >
      <div class="w-full max-w-2xl">
        <Card class="h-[650px] flex flex-col gap-0 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-slate-200/60 p-0">
          <!-- Header -->
          <div class="p-5 border-b bg-white/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
            <div class="flex items-center gap-4">
              <div class="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/30">
                <Hash class="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 class="font-bold text-slate-900 text-lg leading-none">Global Chat Room</h1>
                <div class="flex items-center gap-2 mt-1.5">
                  <Badge :variant="chatStore.isConnected ? 'success' : 'error'">
                    {{ chatStore.isConnected ? 'En línea' : 'Desconectado' }}
                  </Badge>
                  <span class="text-[11px] text-slate-400 font-medium">Socket.io Engine v4</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Chat Messages -->
          <div ref="messagesContainer" class="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white/30 to-slate-50/50">
            <template v-if="chatStore.messages.length === 0">
              <div class="h-full flex flex-col items-center justify-center text-slate-400 gap-4 opacity-50">
                <div class="bg-slate-100 p-6 rounded-full">
                  <MessageSquare class="w-10 h-10 stroke-[1.5px]" />
                </div>
                <p class="text-sm font-medium tracking-tight">No hay mensajes en este canal todavía...</p>
              </div>
            </template>
            <template v-else>
              <TransitionGroup
                name="list"
                tag="div"
                class="space-y-6"
              >
                <div v-for="msg in chatStore.messages" :key="msg.id" class="flex flex-col gap-1.5 max-w-[85%]">
                  <div class="flex items-center gap-2 px-1">
                    <div class="w-6 h-6 rounded-lg bg-slate-200 flex items-center justify-center">
                      <User class="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    <span class="text-xs font-bold text-slate-600">{{ msg.user }}</span>
                    <span class="text-[10px] text-slate-400 flex items-center gap-1 ml-1">
                      <Clock class="w-2.5 h-2.5" />
                      {{ msg.timestamp }}
                    </span>
                  </div>
                  <div class="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm hover:shadow-md transition-shadow">
                    <p class="text-[14px] text-slate-700 leading-relaxed font-medium">{{ msg.text }}</p>
                  </div>
                </div>
              </TransitionGroup>
            </template>
          </div>

          <!-- Input Area -->
          <div class="p-5 bg-white border-t border-slate-100 flex flex-col gap-2">
            <div class="flex gap-3">
              <Input
                v-model="inputText"
                @keydown.enter="handleSend"
                placeholder="Escribe un mensaje aquí..."
                :disabled="!chatStore.isConnected"
                class="bg-slate-50/80 border-slate-200 h-12 text-base px-4 rounded-xl focus:bg-white"
              />
              <Button 
                @click="handleSend" 
                :disabled="!chatStore.isConnected || !inputText.trim()"
                class="h-12 w-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20 shrink-0"
              >
                <Send class="w-5 h-5" />
              </Button>
            </div>
            <p class="text-[10px] text-center text-slate-400 font-medium">
              Al enviar un mensaje, se emitirá via <code>socket.emit('message')</code>
            </p>
          </div>
        </Card>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
