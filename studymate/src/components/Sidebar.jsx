import React from 'react';
import { useNavigate, useLocation, } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  Settings as SettingsIcon, 
  GraduationCap, 
  Plus, 
  MessageSquare, 
  Trash2, 
  X,
  FileText,
  LogOut 
} from 'lucide-react';

const NavItem = ({ icon: IconComponent, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
      active ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`}
  >
    {IconComponent ? <IconComponent size={20} /> : null}
    <span>{label}</span>
  </button>
);

const Sidebar = ({ 
  isOpen, 
  setIsOpen, 
  chatHistory, 
  currentChatId, 
  createNewChat, 
  switchChat, 
  deleteChat 
 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close mobile menu
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 flex flex-col h-full border-r border-gray-800 shadow-xl`}>
        
        {/* Logo Area */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center h-16 shrink-0">
          <div className="flex items-center space-x-2 font-bold text-xl">
            <GraduationCap className="text-indigo-400" />
            <span>StudyMate</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-white bg-transparent border-none">
            <X size={24} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button 
            onClick={() => { createNewChat(); handleNavigation('/Home'); }}
            className="w-full flex items-center justify-start space-x-3 px-4 py-3 !bg-indigo-600 hover:!bg-indigo-700 rounded-xl transition-all shadow-lg shadow-indigo-900/20 border border-indigo-500 text-white"
          >
            <Plus size={20} />
            <span className="font-semibold">New Session</span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="px-2 py-2 space-y-1 flex-1">
          <NavItem 
            icon={BookOpen} 
            label="AI Tutor" 
            active={location.pathname === '/Home'} 
            onClick={() => handleNavigation('/Home')} 
          />
          <NavItem 
            icon={Calendar} 
            label="Study Plan" 
            active={location.pathname === '/StudyPlan'} 
            onClick={() => handleNavigation('/StudyPlan')} 
          />
          <NavItem 
            icon={FileText} 
            label="Past Papers" 
            active={location.pathname === '/PastPapers'} 
            onClick={() => handleNavigation('/PastPapers')} 
          />
          <NavItem 
            icon={SettingsIcon} 
            label="Settings" 
            active={location.pathname === '/Settings'} 
            onClick={() => handleNavigation('/Settings')} 
          />
        </nav>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto px-2 py-4 border-t border-gray-800">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Recent History</div>
          <div className="space-y-1">
            {chatHistory.map((chat) => (
              <div 
                key={chat.id}
                onClick={() => { switchChat(chat.id); handleNavigation('/'); }}
                className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors ${
                  currentChatId === chat.id && location.pathname === '/Home' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <MessageSquare size={16} />
                  <span className="truncate max-w-[120px]">{chat.title}</span>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }}
                  className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 bg-transparent border-none"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer User Profile */}
        <div className="p-4 border-t border-gray-800 bg-gray-900">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white">
              SA
            </div>
            <div>
              <p className="text-sm font-medium text-white">Matric Student</p>
            </div>
          </div>
            {/* Back to Landing / Logout Button */}
            <button 
                onClick={() => window.location.href = '/LandingPage.jsx'} // Or use navigate('/landing') if you add that route back
                className="text-gray-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
                title="Back to Landing Page"
            >
                <LogOut size={20} />
            </button>
        </div>
      </div>
    </>
  );
};
export default Sidebar;