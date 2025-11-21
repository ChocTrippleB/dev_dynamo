import React, { useState, useEffect } from 'react';
import { Loader, CheckCircle, Trash2 } from 'lucide-react';
import { generateStudyPlan } from '../utils/api';

export default function StudyPlan() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState([]);
    const [formData, setFormData] = useState({ subject: "", date: "", weakTopics: "" });

    // Load saved plan from localStorage on mount
    useEffect(() => {
      const savedPlan = localStorage.getItem('studyPlan');
      if (savedPlan) {
        try {
          const parsed = JSON.parse(savedPlan);
          setPlan(parsed);
          if (parsed.length > 0) {
            setStep(2);
          }
        } catch (e) {
          console.error('Error loading saved plan:', e);
        }
      }
    }, []);

    // Save plan to localStorage whenever it changes
    useEffect(() => {
      if (plan.length > 0) {
        localStorage.setItem('studyPlan', JSON.stringify(plan));
      }
    }, [plan]);

    const generatePlan = async () => {
      setLoading(true);

      // Call centralized API
      const result = await generateStudyPlan(formData);

      if (result.success && result.data.plan) {
        // Backend returns { plan: [{day, content, completed}, ...] }
        setPlan(result.data.plan);
        setStep(2);
      } else {
        // Fallback to mock data if API fails (for development/testing)
        console.warn('API call failed, using mock data:', result.error);
        const mockPlan = generateMockPlan(formData);
        setPlan(mockPlan);
        setStep(2);
      }

      setLoading(false);
    };

    // Mock function to generate sample plan (remove when backend is ready)
    const generateMockPlan = (formData) => {
      const { subject, weakTopics } = formData;
      const topics = weakTopics.split(',').map(t => t.trim()).filter(t => t);

      const plans = {
        'Mathematics': [
          { day: 1, content: 'Functions – revise key formulas + do 5 past questions (Q1 style)', completed: false },
          { day: 2, content: 'Trigonometry – revise identities + 3 exam-style questions', completed: false },
          { day: 3, content: 'Calculus – practice differentiation rules + 10 questions', completed: false },
          { day: 4, content: 'Euclidean Geometry – revise theorems + 4 rider questions', completed: false },
          { day: 5, content: 'Analytical Geometry – coordinate geometry problems + 6 questions', completed: false },
          { day: 6, content: 'Statistics – data handling + probability (5 questions)', completed: false },
          { day: 7, content: 'Full past paper – timed practice (3 hours)', completed: false },
        ],
        'Physical Sciences': [
          { day: 1, content: 'Mechanics – Newton\'s Laws + 5 calculation problems', completed: false },
          { day: 2, content: 'Electricity – Ohm\'s Law & circuits + 4 past questions', completed: false },
          { day: 3, content: 'Stoichiometry – mole calculations + 6 problems', completed: false },
          { day: 4, content: 'Chemical reactions – balancing equations + 5 questions', completed: false },
          { day: 5, content: 'Organic Chemistry – functional groups + 4 structure questions', completed: false },
          { day: 6, content: 'Waves & Optics – revise formulas + 5 problems', completed: false },
          { day: 7, content: 'Paper 1 (Physics) – full past paper timed practice', completed: false },
          { day: 8, content: 'Paper 2 (Chemistry) – full past paper timed practice', completed: false },
        ],
        'Life Sciences': [
          { day: 1, content: 'Cell Biology – cell structure & functions + diagrams', completed: false },
          { day: 2, content: 'Genetics – Mendel\'s Laws + Punnett square problems', completed: false },
          { day: 3, content: 'Human Evolution – timeline + fossil evidence', completed: false },
          { day: 4, content: 'Plant Biology – photosynthesis & respiration + 4 questions', completed: false },
          { day: 5, content: 'Human Systems – nervous & endocrine + 5 questions', completed: false },
          { day: 6, content: 'Ecology – food chains & environmental issues', completed: false },
          { day: 7, content: 'Full Paper 1 – timed practice', completed: false },
          { day: 8, content: 'Full Paper 2 – timed practice', completed: false },
        ],
      };

      // Return subject-specific plan or default
      return plans[subject] || [
        { day: 1, content: `${subject} – Review key concepts from term 1`, completed: false },
        { day: 2, content: `${subject} – Practice questions from chapters 1-3`, completed: false },
        { day: 3, content: `${subject} – Review difficult topics + 5 questions`, completed: false },
        { day: 4, content: `${subject} – Mid-year exam paper revision`, completed: false },
        { day: 5, content: `${subject} – Focus on weak areas: ${topics.join(', ') || 'general revision'}`, completed: false },
        { day: 6, content: `${subject} – Complete 1 full past paper`, completed: false },
        { day: 7, content: `${subject} – Final revision + memorize key formulas`, completed: false },
      ];
    };

    const toggleDay = (dayIndex) => {
      setPlan(prevPlan =>
        prevPlan.map((item, index) =>
          index === dayIndex ? { ...item, completed: !item.completed } : item
        )
      );
    };

    const deletePlan = () => {
      if (confirm('Are you sure you want to delete this study plan?')) {
        setPlan([]);
        localStorage.removeItem('studyPlan');
        setStep(1);
        setFormData({ subject: "", date: "", weakTopics: "" });
      }
    };

    const createNewPlan = () => {
      if (confirm('This will replace your current plan. Continue?')) {
        setPlan([]);
        localStorage.removeItem('studyPlan');
        setStep(1);
        setFormData({ subject: "", date: "", weakTopics: "" });
      }
    };

    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Study Planner Generator</h1>
          <p className="text-gray-400">Tell me your exam date and weak topics, and I'll build a schedule that works.</p>
        </div>

        {step === 1 && (
          <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8 space-y-6 w-full">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Subject</label>
              <select
                  className="w-full p-4 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-700 text-white cursor-pointer"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                >
                  <option value="" disabled>Select your subject...</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physical Sciences">Physical Sciences</option>
                  <option value="Life Sciences">Life Sciences</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Business Studies">Business Studies</option>
                  <option value="Geography">Geography</option>
                </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">When is your exam?</label>
              <input
                type="date"
                className="w-full p-4 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-700 text-white"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Topics you're weak at (optional)</label>
              <input
                type="text"
                className="w-full p-4 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-700 text-white placeholder-gray-400"
                placeholder="e.g., Functions, Trigonometry, Stoichiometry"
                value={formData.weakTopics}
                onChange={(e) => setFormData({...formData, weakTopics: e.target.value})}
              />
              <p className="text-xs text-gray-500">Separate multiple topics with commas</p>
            </div>

            <button
              onClick={generatePlan}
              disabled={loading || !formData.subject || !formData.date}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center
                ${loading || !formData.subject || !formData.date
                  ? 'bg-indigo-600/50 text-white/50 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2" size={20} />
                  Generating your plan...
                </>
              ) : (
                'Generate My Schedule'
              )}
            </button>
          </div>
        )}

        {step === 2 && plan.length > 0 && (
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-emerald-500 h-7 w-7" />
                  <h3 className="text-2xl font-bold text-emerald-400">Your Study Plan</h3>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={createNewPlan}
                    className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    New Plan
                  </button>
                  <button
                    onClick={deletePlan}
                    className="px-4 py-2 text-sm bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {plan.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 p-4 rounded-xl border transition-all cursor-pointer hover:bg-gray-700/50 ${
                      item.completed
                        ? 'bg-gray-900/50 border-gray-700'
                        : 'bg-gray-800 border-gray-600'
                    }`}
                    onClick={() => toggleDay(index)}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleDay(index)}
                        className="w-5 h-5 rounded border-gray-600 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-semibold text-indigo-400">Day {item.day}</span>
                      </div>
                      <p className={`text-base leading-relaxed ${
                        item.completed ? 'text-gray-500 line-through' : 'text-gray-200'
                      }`}>
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    Progress: {plan.filter(d => d.completed).length} / {plan.length} days completed
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 transition-all duration-300"
                        style={{ width: `${(plan.filter(d => d.completed).length / plan.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-indigo-400 font-medium">
                      {Math.round((plan.filter(d => d.completed).length / plan.length) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}
