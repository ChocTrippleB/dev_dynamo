import React, { useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  Loader,
} from 'lucide-react';

export default function Home({ 
  messages, 
  isLoading, 
  handleSend, 
  input, 
  setInput, 
  isListening, 
  toggleListening 
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full bg-gray-900 text-white relative">
      {/* Chat Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center shadow-sm shrink-0 h-16 z-10">
        <div>
          <h2 className="font-bold text-white text-lg">AI Tutor Session</h2>
          <p className="text-xs text-gray-400">Asking about: <span className="text-indigo-400 font-medium">General / All Subjects</span></p>
        </div>
        <div className="flex space-x-2">
          <select className="text-sm border-gray-600 border rounded-md px-2 py-1 bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm cursor-pointer">
            <option className="bg-gray-700 text-white">English</option>
            <option className="bg-gray-700 text-white">Zulu</option>
          </select>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 bg-gray-900 space-y-6 w-full pb-32">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4 mt-[-50px]">
            <div className="p-6 bg-gray-800 rounded-full shadow-sm border border-gray-700">
              <BookOpen size={48} className="text-indigo-400" />
            </div>
            <p className="text-lg font-medium text-gray-300">How can I help you pass today?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md">
              <button 
                onClick={() => setInput("Explain Newton's Laws using a taxi example")} 
                className="p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-indigo-500 rounded-xl text-sm text-left shadow-sm transition-all text-gray-200 flex items-center group cursor-pointer"
              >
                <span className="mr-3 text-xl group-hover:scale-110 transition-transform">🚕</span> 
                <span className="font-medium">Explain Newton's Laws</span>
              </button>
              <button 
                onClick={() => setInput("Give me a quiz on Macbeth characters")} 
                className="p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-indigo-500 rounded-xl text-sm text-left shadow-sm transition-all text-gray-200 flex items-center group cursor-pointer"
              >
                <span className="mr-3 text-xl group-hover:scale-110 transition-transform">🎭</span> 
                <span className="font-medium">Macbeth Quiz</span>
              </button>
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mx-2 shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 border border-gray-600 text-emerald-400'}`}>
                {msg.role === 'user' ? 'Me' : 'AI'}
              </div>
              
              <div className={`p-4 rounded-2xl shadow-sm relative text-sm md:text-base leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-gray-800 border border-gray-700 text-gray-200 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-wrap">{msg.content}</div>
                {msg.role === 'assistant' && (
                  <button className="absolute -bottom-6 left-0 text-gray-500 hover:text-indigo-400 transition opacity-0 group-hover:opacity-100 p-1 bg-transparent border-none cursor-pointer">
                    <Volume2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start ml-12">
            <div className="bg-gray-800 p-3 rounded-xl border border-gray-700 shadow-sm">
              <Loader size={20} className="animate-spin text-indigo-400" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <div className="max-w-4xl mx-auto flex items-end space-x-2 bg-gray-700 p-2 rounded-3xl border border-gray-600 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-gray-800 transition-all shadow-inner">
          <button 
            onClick={toggleListening}
            className={`p-3 rounded-full transition-all flex-shrink-0 border-none shadow-none cursor-pointer ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-transparent text-gray-400 hover:text-white hover:bg-gray-600/50'}`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Ask about Maths, Physics, or Life Sciences..."
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 py-3 text-white placeholder-gray-400 outline-none w-full"
            rows={1}
          />

          <button 
            onClick={handleSend} 
            disabled={!input.trim() && !isLoading}
            className={`p-3 rounded-full transition-all flex-shrink-0 border-none shadow-none cursor-pointer ${input.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 shadow-sm' : 'bg-transparent text-gray-500 cursor-not-allowed'}`}
          >
            <Send size={20} />
          </button>
        </div>
        <div className="text-center mt-2 text-xs text-gray-500">AI can make mistakes. Check with your textbook.</div>
      </div>
    </div>
  );
}