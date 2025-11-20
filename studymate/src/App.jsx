import React, { useState, useEffect,useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
//import './App.css'; 

// Import Components
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import StudyPlan from './pages/StudyPlan';
import LandingPage from './pages/LandingPage'; 

const API_KEY = ""; 

// Placeholder Components
const Settings = () => <div className="flex items-center justify-center h-full text-gray-400 bg-gray-900 text-xl w-full">Settings Page Coming Soon</div>;
const PastPapers = () => <div className="flex items-center justify-center h-full text-gray-400 bg-gray-900 text-xl w-full">Past Papers Page Coming Soon</div>;

// Wrapper component to handle routing inside the sliding panel
const AppContent = ({ sidebarOpen, setSidebarOpen, chatHistory, currentChatId, createNewChat, switchChat, deleteChat, isLoading, handleSend, input, setInput, isListening, toggleListening, messages }) => {
  return (
    <div className="flex h-full w-full bg-gray-900 font-sans overflow-hidden text-white">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen}
          chatHistory={chatHistory}
          currentChatId={currentChatId}
          createNewChat={createNewChat}
          switchChat={switchChat}
          deleteChat={deleteChat}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full relative bg-gray-900 min-w-0 w-full">
          {/* Mobile Header */}
          <div className="md:hidden p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900 shrink-0">
            <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white bg-transparent border-none">
              <Menu />
            </button>
            <span className="font-bold text-white">StudyMate</span>
            <div className="w-6" />
          </div>

          {/* Routes Container */}
          <main className="flex-1 overflow-hidden bg-gray-900 w-full relative h-full">
            <Routes>
              <Route path="/Home" element={
                <Home 
                  messages={messages} 
                  isLoading={isLoading}
                  handleSend={handleSend}
                  input={input}
                  setInput={setInput}
                  isListening={isListening}
                  toggleListening={toggleListening}
                />
              } />
              <Route path="/StudyPlan" element={<StudyPlan apiKey={API_KEY} />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="/PastPapers" element={<PastPapers />} />
              <Route path="/LandingPage" element={<LandingPage />} />
            </Routes>
          </main>
        </div>
      </div>
  );
}


export default function App() {
  const [isAppOpen, setIsAppOpen] = useState(false); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Chat Logic State
  const [chatHistory, setChatHistory] = useState([{ id: 1, title: "Physics - Newton", messages: [] }]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const currentChat = chatHistory.find(c => c.id === currentChatId) || { messages: [] };

  // --- ACTIONS ---
  const toggleApp = () => setIsAppOpen(!isAppOpen);
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-ZA';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? prev + " " + transcript : transcript));
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice recognition is not supported in this browser. Try Chrome.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };
  const createNewChat = () => {
    const newId = Date.now();
    setChatHistory([{ id: newId, title: "New Session", messages: [] }, ...chatHistory]);
    setCurrentChatId(newId);
  };

  const updateCurrentChatMessages = (newMessages) => {
    setChatHistory(prev => prev.map(chat => 
      chat.id === currentChatId ? { ...chat, messages: newMessages } : chat
    ));
  };

  const callOpenAI = async (messages) => {
    if (!API_KEY) return "⚠️ Please insert your OpenAI API Key in App.jsx to chat.";
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are Matric Mate, a helpful South African tutor." },
            ...messages
          ]
        })
      });
      const data = await response.json();
      return data.choices?.[0]?.message?.content || "Error getting response.";
    } catch (error) {
      console.log(error)
      return "Error connecting to the server.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    const updatedMessages = [...currentChat.messages, userMsg];
    updateCurrentChatMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    if (currentChat.messages.length === 0) {
      setChatHistory(prev => prev.map(c => c.id === currentChatId ? { ...c, title: input.substring(0, 20) + "..." } : c));
    }

    const aiText = await callOpenAI(updatedMessages);
    const aiMsg = { role: 'assistant', content: aiText };
    updateCurrentChatMessages([...updatedMessages, aiMsg]);
    setIsLoading(false);
  };

  const deleteChat = (id) => {
    const newHistory = chatHistory.filter(c => c.id !== id);
    setChatHistory(newHistory);
    if (currentChatId === id && newHistory.length > 0) setCurrentChatId(newHistory[0].id);
    else if (newHistory.length === 0) createNewChat();
  };


  // --- RENDER ---
  return (
    <Router>
      <div className=" w-screen h-screen overflow-y-auto bg-gray-900">
        
        
        <LandingPage onOpenApp={toggleApp} />

        
        <div 
            className={`fixed inset-y-0 right-0 w-full h-full bg-gray-900 shadow-2xl transform transition-transform duration-500 ease-in-out z-50 flex flex-row ${
            isAppOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            {/* Close Button for the Slide-in Panel */}
            {isAppOpen && (
                <div className="absolute top-4 left-4 z-60 md:hidden">
                    <button 
                        onClick={toggleApp}
                        className="p-2 bg-gray-800 text-white rounded-full border border-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>
            )}
            
            
             {isAppOpen && (
                <button 
                    onClick={toggleApp}
                    className="hidden md:flex absolute top-1/2 -left-12 transform -translate-y-1/2 p-3 bg-gray-800 text-white rounded-l-xl border-l border-y border-gray-700 hover:bg-gray-700 transition-all z-60 shadow-xl"
                    title="Close App"
                >
                    <X size={24} />
                </button>
            )}

            {/* The Actual App Content */}
            <div className="w-full h-full">
                <AppContent 
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    chatHistory={chatHistory}
                    currentChatId={currentChatId}
                    createNewChat={createNewChat}
                    switchChat={setCurrentChatId}
                    deleteChat={deleteChat}
                    isLoading={isLoading}
                    handleSend={handleSend}
                    input={input}
                    setInput={setInput}
                    isListening={isListening}
                    toggleListening={toggleListening}
                    messages={currentChat.messages}
                />
            </div>
        </div>

        {/* Backdrop (Optional: dims landing page) */}
        {isAppOpen && (
            <div 
                className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-500"
                onClick={toggleApp}
            />
        )}
      </div>
    </Router>
  );
}