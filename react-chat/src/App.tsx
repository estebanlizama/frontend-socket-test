import { useState, useRef, useEffect } from 'react';
import { useChatStore } from './stores/chat';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Badge } from './components/ui/Badge';
import { Card } from './components/ui/Card';
import { Send, MessageSquare, User, Clock, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const messages = useChatStore((state) => state.messages);
  const isConnected = useChatStore((state) => state.isConnected);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const initialize = useChatStore((state) => state.initialize);
  const destroy = useChatStore((state) => state.destroy);

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initialize();
    return () => {
      destroy();
    };
  }, [initialize, destroy]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4 selection:bg-blue-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="h-[650px] flex flex-col gap-0 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-slate-200/60 p-0">
          {/* Header */}
          <div className="p-5 border-b bg-white/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/30">
                <Hash className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900 text-lg leading-none">Global Chat Room</h1>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant={isConnected ? 'success' : 'error'}>
                    {isConnected ? 'En línea' : 'Desconectado'}
                  </Badge>
                  <span className="text-[11px] text-slate-400 font-medium">Socket.io Engine v4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white/30 to-slate-50/50">
            <AnimatePresence initial={false}>
              {messages.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 opacity-50"
                >
                  <div className="bg-slate-100 p-6 rounded-full">
                    <MessageSquare className="w-10 h-10 stroke-[1.5px]" />
                  </div>
                  <p className="text-sm font-medium tracking-tight">No hay mensajes en este canal todavía...</p>
                </motion.div>
              ) : (
                messages.map((msg, index) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex flex-col gap-1.5 max-w-[85%]"
                  >
                    <div className="flex items-center gap-2 px-1">
                      <div className="w-6 h-6 rounded-lg bg-slate-200 flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                      <span className="text-xs font-bold text-slate-600">{msg.user}</span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 ml-1">
                        <Clock className="w-2.5 h-2.5" />
                        {msg.timestamp}
                      </span>
                    </div>
                    <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-[14px] text-slate-700 leading-relaxed font-medium">{msg.text}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-5 bg-white border-t border-slate-100 flex flex-col gap-2">
            <div className="flex gap-3">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe un mensaje aquí..."
                disabled={!isConnected}
                className="bg-slate-50/80 border-slate-200 h-12 text-base px-4 rounded-xl focus:bg-white"
              />
              <Button 
                onClick={handleSend} 
                disabled={!isConnected || !inputText.trim()}
                className="h-12 w-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20 shrink-0"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-[10px] text-center text-slate-400 font-medium">
              Al enviar un mensaje, se emitirá via <code>socket.emit('message')</code>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default App;
