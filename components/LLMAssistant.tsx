
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplaneIcon, ChatBubbleOvalLeftEllipsisIcon, XMarkIcon } from './icons';
import { llmMockResponses } from '../constants/mockData';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, x: isUser ? 20 : -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`flex items-start gap-2.5 my-2 ${isUser ? 'justify-end' : ''}`}
        >
            {!isUser && <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-accent to-brand-accent-dark flex-shrink-0" />}
            <div className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 dark:border-transparent rounded-2xl ${isUser ? 'bg-brand-accent-dark text-white rounded-br-none' : 'bg-gray-100 dark:bg-dark-bg rounded-bl-none'}`}>
                <p className="text-sm font-normal dark:text-dark-text-primary">{message.text}</p>
            </div>
        </motion.div>
    );
};


export const LLMAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: llmMockResponses.default },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  const handleSend = () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = { sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const keywords = inputValue.toLowerCase().match(/\b(\w+)\b/g) || [];
      let response = llmMockResponses.default;
      for (const keyword of keywords) {
        if (llmMockResponses[keyword]) {
          response = llmMockResponses[keyword];
          break;
        }
      }
      
      const aiMessage: Message = { sender: 'ai', text: response };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };
  
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-brand-accent to-brand-accent-dark text-white p-4 rounded-full shadow-lg z-[60]"
      >
        <AnimatePresence mode="wait">
            {isOpen ? 
                <motion.div key="close" initial={{ rotate: -180, opacity: 0}} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 180, opacity: 0 }}><XMarkIcon className="h-8 w-8" /></motion.div> : 
                <motion.div key="open" initial={{ rotate: 180, opacity: 0}} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -180, opacity: 0 }}><ChatBubbleOvalLeftEllipsisIcon className="h-8 w-8" /></motion.div>}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-full max-w-sm h-[600px] bg-white dark:bg-dark-surface rounded-2xl shadow-2xl z-[60] flex flex-col overflow-hidden border border-gray-200 dark:border-dark-border"
          >
            <div className="p-4 border-b border-gray-200 dark:border-dark-border">
              <h3 className="text-lg font-bold text-gray-800 dark:text-dark-text-primary">Travel Assistant</h3>
              <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Powered by Demo AI</p>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
              {messages.map((msg, i) => <ChatBubble key={i} message={msg} />)}
              {isTyping && (
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex items-center gap-2.5 my-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-accent to-brand-accent-dark flex-shrink-0" />
                      <div className="flex items-center space-x-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0s]"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                      </div>
                  </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-dark-border flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about destinations..."
                className="flex-grow bg-gray-100 dark:bg-dark-bg rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-accent text-gray-800 dark:text-dark-text-primary"
              />
              <motion.button 
                onClick={handleSend}
                whileTap={{ scale: 0.9 }}
                className="bg-brand-accent text-gray-900 rounded-full p-2"
              >
                <PaperAirplaneIcon className="h-6 w-6" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};