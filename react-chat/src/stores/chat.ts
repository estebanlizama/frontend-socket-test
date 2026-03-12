import { create } from 'zustand';
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

interface ChatStore extends ChatState {
  initialize: () => void;
  sendMessage: (text: string) => void;
  destroy: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: loadMessages(),
  isConnected: false,
  
  initialize: () => {
    socketService.connect();
    
    socketService.on('connect', () => {
      set({ isConnected: true });
    });

    socketService.on('disconnect', () => {
      set({ isConnected: false });
    });

    socketService.on('message', (msg: Message) => {
      const messages = get().messages;
      const newMessages = [...messages, msg];
      set({ messages: newMessages });
      saveMessages(newMessages);
    });
  },

  sendMessage: (text: string) => {
    socketService.emit('message', { 
      user: 'React User',
      text 
    });
  },

  destroy: () => {
    socketService.off('connect');
    socketService.off('disconnect');
    socketService.off('message');
    socketService.disconnect();
  }
}));
