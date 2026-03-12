export interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

export interface ChatState {
  messages: Message[];
  isConnected: boolean;
}
