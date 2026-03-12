import { defineStore } from 'pinia';
import { socketService } from '../services/socket.service';
import type { Message, ChatState } from '../types/chat';

const STORAGE_KEY = 'chat_messages';

const loadMessages = (): Message[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.warn('Error parsing localStorage messages', e);
      return [];
    }
  }
  return [];
};

const saveMessages = (messages: Message[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
};

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    messages: loadMessages(),
    isConnected: false,
  }),
  actions: {
    initialize() {
      socketService.connect();
      
      socketService.on('connect', () => {
        this.isConnected = true;
      });

      socketService.on('disconnect', () => {
        this.isConnected = false;
      });

      socketService.on('message', (msg: Message) => {
        this.messages.push(msg);
        saveMessages(this.messages); // Guardar al recibir
      });
    },
    sendMessage(text: string) {
      socketService.emit('message', {
        user: 'Vue User',
        text
      });
    },
    destroy() {
      socketService.off('connect');
      socketService.off('disconnect');
      socketService.off('message');
      socketService.disconnect();
    }
  },
});
