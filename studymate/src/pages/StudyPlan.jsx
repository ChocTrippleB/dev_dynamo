import React, { useState } from 'react';
import { Loader, CheckCircle } from 'lucide-react';

const API_KEY = "" // Add your OpenAI API key here

export default function StudyPlan() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState(null);
    const [formData, setFormData] = useState({ subjects: "", date: "", weakSpots: "" });

    const generatePlan = async () => {
      if (!API_KEY) {
        alert("Please add your API Key at the top of StudyPlan.jsx first!");
        return;
      }

      setLoading(true);
      
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
              { 
                role: "system", 
                content: "You are a helpful student assistant. Generate a 7-day study schedule in a Markdown table format based on the user's inputs." 
              },
              { 
                role: "user", 
                content: `I am writing ${formData.subjects}. My exams start on ${formData.date}. I struggle with ${formData.weakSpots}. Create a study plan table.` 
              }
            ]
          })
        });
        
        const data = await response.json();
        if (data.choices && data.choices[0]) {
          setPlan(data.choices[0].message.content);
          setStep(2);
        } else {
          alert("Error generating plan. Please try again.");
        }
      } catch (error) {
        console.error("API Error:", error);
        alert("Failed to connect to AI.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Study Planner Generator</h1>
          <p className="text-gray-400">Tell me your exam dates, and I'll build a schedule that works.</p>
        </div>

        {step === 1 && (
          <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8 space-y-8 animate-in slide-in-from-bottom-4 fade-in w-full">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Which subjects are you writing?</label>
              <select
                  className="w-full p-4 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-700 text-white cursor-pointer text-lg"
                  value={formData.subjects}
                  onChange={(e) => setFormData({...formData, subjects: e.target.value})}
                >
                  <option value="" disabled className="text-gray-400">Select your main subject focus...</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Mathematical Literacy">Mathematical Literacy</option>
                  <option value="Physical Sciences">Physical Sciences</option>
                  <option value="Life Sciences">Life Sciences</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Business Studies">Business Studies</option>
                  <option value="Economics">Economics</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="English HL">English HL</option>
                  <option value="IsiZulu HL">IsiZulu HL</option>
                  <option value="Afrikaans FAL">Afrikaans FAL</option>
                </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">When do exams start?</label>
                <input 
                  type="date" 
                  className="w-full p-4 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-700 text-white text-lg"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Any struggling topics?</label>
                <input 
                  type="text" 
                  className="w-full p-4 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-700 text-white placeholder-gray-400 text-lg"
                  placeholder="e.g., Euclidean Geometry"
                  value={formData.weakSpots}
                  onChange={(e) => setFormData({...formData, weakSpots: e.target.value})}
                />
              </div>
            </div>

            <button 
              onClick={generatePlan}
              disabled={loading || !formData.subjects || !formData.date}
              className={`w-full py-5 rounded-xl font-bold text-xl transition-all shadow-lg flex items-center justify-center
                ${loading || !formData.subjects || !formData.date 
                  ? 'bg-indigo-600/50 text-white/50 cursor-not-allowed' 
                  : '!bg-indigo-600 hover:!bg-indigo-700 text-white hover:shadow-indigo-500/30'}`}
            >
              {loading ? <Loader className="animate-spin mr-2" /> : 'Generate My Schedule 🚀'}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in zoom-in-95 duration-300 w-full">
            <div className="bg-gray-800 border border-emerald-900/50 rounded-2xl p-8 mb-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-700">
                <CheckCircle className="text-emerald-500 h-8 w-8" />
                <h3 className="text-2xl font-bold text-emerald-400">Your Plan is Ready!</h3>
              </div>
              <div className="prose prose-invert max-w-none bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-inner text-lg leading-relaxed">
                  <pre className="whitespace-pre-wrap font-sans text-gray-300">{plan}</pre>
              </div>
            </div>
            <button onClick={() => setStep(1)} className="text-indigo-400 font-medium hover:underline hover:text-indigo-300 bg-transparent border-none cursor-pointer text-lg">← Create Another Plan</button>
          </div>
        )}
      </div>
    );
}