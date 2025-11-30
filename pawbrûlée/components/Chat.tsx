import React, { useState, useEffect, useRef } from 'react';
import { MOCK_CHATS, CURRENT_USER } from '../constants';
import { ChatSession, Message } from '../types';
import { Search, MoreVertical, Send, Mic, ChevronLeft, Bot, Smile, Plus } from 'lucide-react';
import { getVetAdvice } from '../services/geminiService';

const Chat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (selectedChat) {
      setMessages([
        { id: 'm1', senderId: selectedChat.otherUser.id, text: selectedChat.isAiBot ? "Hello! I'm your virtual vet assistant. Ask me anything about your pet's health or behavior." : selectedChat.lastMessage, timestamp: new Date() }
      ]);
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || !selectedChat) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      senderId: CURRENT_USER.id,
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    if (selectedChat.isAiBot) {
      setIsTyping(true);
      const aiResponseText = await getVetAdvice(userMsg.text);
      setIsTyping(false);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        senderId: 'bot',
        text: aiResponseText,
        timestamp: new Date(),
        isAi: true
      };
      setMessages(prev => [...prev, aiMsg]);
    }
  };

  if (!selectedChat) {
    return (
      <div className="pt-4 px-4 h-full flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Messages</h2>
        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="Search chats..." 
            className="w-full bg-white border border-stone-200 p-3.5 pl-11 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-paw-200 transition-all shadow-sm" 
          />
          <Search className="absolute left-4 top-3.5 text-stone-400" size={20} />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {MOCK_CHATS.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setSelectedChat(chat)}
              className="flex items-center gap-3 p-3.5 hover:bg-white rounded-2xl cursor-pointer transition-colors border border-transparent hover:border-stone-100 hover:shadow-sm"
            >
              <div className="relative">
                 <img src={chat.otherUser.avatar} className="w-14 h-14 rounded-full object-cover" alt="User" />
                 {chat.isAiBot && <div className="absolute -bottom-0.5 -right-0.5 bg-paw-600 text-white p-1 rounded-full ring-2 ring-stone-50"><Bot size={12} /></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-stone-900 truncate text-base">{chat.otherUser.fullName}</h4>
                  <span className="text-[10px] text-stone-400 font-medium">{chat.timestamp}</span>
                </div>
                <p className={`text-xs truncate ${chat.unreadCount > 0 ? 'text-stone-900 font-bold' : 'text-stone-500'}`}>
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unreadCount > 0 && (
                <div className="min-w-[20px] h-5 bg-paw-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold px-1.5">
                  {chat.unreadCount}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-stone-50 md:rounded-2xl overflow-hidden border-l border-stone-200">
      <div className="bg-white p-4 flex items-center gap-3 shadow-sm z-10 border-b border-stone-100">
        <button onClick={() => setSelectedChat(null)} className="md:hidden text-stone-500 p-1 hover:bg-stone-100 rounded-full">
           <ChevronLeft />
        </button>
        <img src={selectedChat.otherUser.avatar} className="w-10 h-10 rounded-full object-cover" alt="User" />
        <div className="flex-1">
           <h3 className="font-bold text-sm">{selectedChat.otherUser.fullName}</h3>
           <p className="text-xs text-green-600 font-medium flex items-center gap-1">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Online
           </p>
        </div>
        <MoreVertical className="text-stone-400" size={20} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
        {messages.map((msg) => {
          const isMe = msg.senderId === CURRENT_USER.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] p-3.5 rounded-2xl text-sm shadow-sm ${
                isMe ? 'bg-paw-600 text-white rounded-br-none' : 'bg-white text-stone-800 rounded-bl-none'
              }`}>
                {msg.text}
                <div className={`text-[9px] mt-1 text-right ${isMe ? 'text-paw-100' : 'text-stone-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
               <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></span>
               <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-75"></span>
               <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-150"></span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-stone-100">
        <div className="flex items-end gap-2">
           <button className="p-3 text-stone-400 hover:bg-stone-100 rounded-full transition-colors"><Plus size={24} /></button>
           <div className="flex-1 bg-stone-100 rounded-[24px] flex items-center p-1 border border-transparent focus-within:border-paw-300 focus-within:bg-white focus-within:shadow-sm transition-all">
              <input 
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                 type="text" 
                 placeholder="Message..." 
                 className="flex-1 bg-transparent outline-none text-sm px-4 py-2 min-h-[44px]"
               />
              <button className="p-2 text-stone-400 hover:text-stone-600"><Smile size={20} /></button>
           </div>
           {inputText.trim() ? (
              <button 
                onClick={handleSend}
                className="p-3 bg-paw-600 text-white rounded-full shadow-lg hover:bg-paw-700 hover:scale-105 transition-all"
              >
                <Send size={20} fill="currentColor" />
              </button>
           ) : (
              <button className="p-3 bg-stone-100 text-stone-500 rounded-full hover:bg-stone-200 transition-colors">
                 <Mic size={22} />
              </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default Chat;