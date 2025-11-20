import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, ArrowRight, BookOpen, Calendar, CheckCircle, Zap } from 'lucide-react';
import { storage } from '../utils/storage';

export default function LandingPage() {
  const navigate = useNavigate();
  const isAuthenticated = storage.isAuthenticated();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/home');
    } else {
      navigate('/register');
    }
  };

  const handleLaunchApp = () => {
    if (isAuthenticated) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };
  return (
    <div className="min-h-screen  bg-gray-900 text-white font-sans flex flex-col relative overflow-hidden">
      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 h-24 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">StudyMate</span>
        </div>
        <button
            onClick={handleLaunchApp}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          Launch App
        </button>
      </nav>

      {/* Hero Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 z-10 relative pb-20">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-900/30 border border-indigo-500/30 mb-8 animate-in slide-in-from-bottom-4 fade-in duration-700">
            <span className="text-indigo-300 text-sm font-medium">New: 2024 Past Papers Added 📚</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight max-w-4xl">
          Your Personal <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            AI Tutor for Matric
          </span>
        </h1>
        
        <p className="max-w-2xl text-xl text-gray-400 mb-10 leading-relaxed">
          Stop stressing about exams. Get instant help with Maths, Physics, and Life Sciences. 
          Create study schedules and practice with past papers in seconds.
        </p>
        
        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4">
            <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2 transform hover:scale-105"
            >
            Start Learning Now <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold text-lg transition-all border border-gray-700">
                View Features
            </button>
        </div>

        {/* Feature Grid Preview */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 opacity-50 hover:opacity-100 transition-opacity duration-500">
             <div className="p-6 rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <BookOpen className="w-8 h-8 text-indigo-500 mb-4" />
                <h3 className="font-bold text-lg mb-2"> instant Answers</h3>
                <p className="text-sm text-gray-400">Get explanations in plain English (or Zulu/Xhosa).</p>
             </div>
             <div className="p-6 rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <Calendar className="w-8 h-8 text-indigo-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">Study Planner</h3>
                <p className="text-sm text-gray-400">Auto-generate a schedule based on your exam dates.</p>
             </div>
             <div className="p-6 rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CheckCircle className="w-8 h-8 text-indigo-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">Past Papers</h3>
                <p className="text-sm text-gray-400">Practice with real exam questions from previous years.</p>
             </div>
        </div>
      </main>


      <button
        onClick={handleLaunchApp}
        className="fixed bottom-8 right-8 p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl transition-transform hover:scale-110 z-50 flex items-center justify-center group"
        aria-label="Open Chat"
      >
        <MessageCircle size={28} className="group-hover:animate-pulse" />
      </button>

       {/* Background decoration */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
       </div>
    </div>
  );
}