import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { storage } from '../../utils/storage'

const Register = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState('')
  const totalSteps = 5

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    grade: '',
    subjects: [],
    examFocus: '',
    textLanguage: 'english',
    voiceLanguage: 'english',
    learningStyles: [],
    saveQA: false,
    voiceInput: false
  })

  const steps = [
    'Basic Information',
    'Academic Info',
    'Language',
    'Learning Style',
    'Permissions'
  ]

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleCheckbox = (field, value) => {
    setFormData(prev => {
      const current = prev[field] || []
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value]
      return { ...prev, [field]: updated }
    })
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields')
      setCurrentStep(1)
      return
    }

    if (!formData.grade) {
      setError('Please select your grade')
      setCurrentStep(2)
      return
    }

    if (formData.subjects.length === 0) {
      setError('Please select at least one subject')
      setCurrentStep(2)
      return
    }

    // Register user
    const result = storage.register(formData)

    if (result.success) {
      // Auto login after registration
      storage.login(formData.email, formData.password)
      navigate('/')
    } else {
      setError(result.error || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400">Sign up to get started with StudyMate - Your AI-powered study companion</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={index} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        index + 1 === currentStep
                          ? 'bg-gray-700 text-white'
                          : index + 1 < currentStep
                          ? 'bg-[#444] text-white'
                          : 'bg-gray-800 text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className={`text-xs mt-2 text-center ${
                      index + 1 === currentStep ? 'text-white' : 'text-gray-500'
                    }`}>
                      {step}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 flex-1 mx-2 ${
                      index + 1 < currentStep ? 'bg-[#444]' : 'bg-gray-800'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={currentStep === totalSteps ? handleSubmit : handleNext} className="space-y-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Basic Information</h2>

                <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm text-gray-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gray-700 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gray-700 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm text-gray-400 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      placeholder="Create a password"
                      className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gray-700 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">About Your Account</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    We need your basic details to create your personalized learning profile. Your email will be used for login and important updates about your progress.
                  </p>
                </div>
              </div>
            </div>
            )}

            {/* Step 2: Academic Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Academic Information</h2>

                <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="grade" className="block text-sm text-gray-400 mb-1">
                      Grade
                    </label>
                    <select
                      id="grade"
                      value={formData.grade}
                      onChange={(e) => handleChange('grade', e.target.value)}
                      className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-gray-700 focus:outline-none transition-colors"
                    >
                      <option value="" className="bg-gray-800">Select your grade</option>
                      <option value="10" className="bg-gray-800">Grade 10</option>
                      <option value="11" className="bg-gray-800">Grade 11</option>
                      <option value="12" className="bg-gray-800">Grade 12</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-400 mb-2">
                      Subjects
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center space-x-3 text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.subjects.includes('Mathematics')}
                          onChange={() => handleCheckbox('subjects', 'Mathematics')}
                          className="w-4 h-4 rounded border-gray-700 bg-transparent"
                        />
                        <span>Mathematics</span>
                      </label>
                      <label className="flex items-center space-x-3 text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.subjects.includes('Life Sciences')}
                          onChange={() => handleCheckbox('subjects', 'Life Sciences')}
                          className="w-4 h-4 rounded border-gray-700 bg-transparent"
                        />
                        <span>Life Sciences</span>
                      </label>
                      <label className="flex items-center space-x-3 text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.subjects.includes('Physical Sciences')}
                          onChange={() => handleCheckbox('subjects', 'Physical Sciences')}
                          className="w-4 h-4 rounded border-gray-700 bg-transparent"
                        />
                        <span>Physical Sciences</span>
                      </label>
                      <label className="flex items-center space-x-3 text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.subjects.includes('EGD')}
                          onChange={() => handleCheckbox('subjects', 'EGD')}
                          className="w-4 h-4 rounded border-gray-700 bg-transparent"
                        />
                        <span>EGD</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="examFocus" className="block text-sm text-gray-400 mb-1">
                      Exam Focus Subjects <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="examFocus"
                      value={formData.examFocus}
                      onChange={(e) => handleChange('examFocus', e.target.value)}
                      placeholder="e.g., Mathematics, Physical Sciences"
                      className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gray-700 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Why We Need This</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Your grade and subjects help us provide relevant study materials and exam preparation content tailored to your curriculum.
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    <strong className="text-white">Exam Focus:</strong> Tell us which subjects you want to prioritize so we can customize your study plan.
                  </p>
                </div>
              </div>
            </div>
            )}

            {/* Step 3: Language Preferences */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Language Preferences</h2>

                <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-400 mb-2">
                      Text Response Language
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2 text-white cursor-pointer">
                        <input
                          type="radio"
                          name="textLanguage"
                          value="english"
                          checked={formData.textLanguage === 'english'}
                          onChange={(e) => handleChange('textLanguage', e.target.value)}
                          className="w-4 h-4"
                        />
                        <span>English</span>
                      </label>
                      <label className="flex items-center space-x-2 text-white cursor-pointer">
                        <input
                          type="radio"
                          name="textLanguage"
                          value="zulu"
                          checked={formData.textLanguage === 'zulu'}
                          onChange={(e) => handleChange('textLanguage', e.target.value)}
                          className="w-4 h-4"
                        />
                        <span>Zulu</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-400 mb-2">
                      Voice Response Language
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2 text-white cursor-pointer">
                        <input
                          type="radio"
                          name="voiceLanguage"
                          value="english"
                          checked={formData.voiceLanguage === 'english'}
                          onChange={(e) => handleChange('voiceLanguage', e.target.value)}
                          className="w-4 h-4"
                        />
                        <span>English</span>
                      </label>
                      <span className="text-gray-500 text-sm">(Other languages not supported yet)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Language Support</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Choose your preferred language for text responses. We currently support English and Zulu to help you learn in the language you're most comfortable with.
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Voice responses are currently available in English only, with more languages coming soon.
                  </p>
                </div>
              </div>
            </div>
            )}

            {/* Step 4: Learning Style */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Learning Style</h2>

                <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm text-gray-400 mb-2">
                    Select all that apply
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center space-x-3 text-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.learningStyles.includes('step-by-step')}
                        onChange={() => handleCheckbox('learningStyles', 'step-by-step')}
                        className="w-4 h-4 rounded border-gray-700 bg-transparent"
                      />
                      <span>Step-by-step</span>
                    </label>
                    <label className="flex items-center space-x-3 text-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.learningStyles.includes('short-summary')}
                        onChange={() => handleCheckbox('learningStyles', 'short-summary')}
                        className="w-4 h-4 rounded border-gray-700 bg-transparent"
                      />
                      <span>Short Summary</span>
                    </label>
                    <label className="flex items-center space-x-3 text-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.learningStyles.includes('voice')}
                        onChange={() => handleCheckbox('learningStyles', 'voice')}
                        className="w-4 h-4 rounded border-gray-700 bg-transparent"
                      />
                      <span>Voice</span>
                    </label>
                    <label className="flex items-center space-x-3 text-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.learningStyles.includes('visual')}
                        onChange={() => handleCheckbox('learningStyles', 'visual')}
                        className="w-4 h-4 rounded border-gray-700 bg-transparent"
                      />
                      <span>Visual</span>
                    </label>
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Personalized Learning</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-2">
                    Everyone learns differently. Select your preferred learning styles:
                  </p>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• <strong className="text-white">Step-by-step:</strong> Detailed explanations</li>
                    <li>• <strong className="text-white">Short Summary:</strong> Quick key points</li>
                    <li>• <strong className="text-white">Voice:</strong> Audio explanations</li>
                    <li>• <strong className="text-white">Visual:</strong> Diagrams and charts</li>
                  </ul>
                </div>
              </div>
            </div>
            )}

            {/* Step 5: Permissions */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Permissions</h2>

                <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="flex items-center justify-between text-white cursor-pointer p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <span>Allow saving Q&A for improvement</span>
                    <input
                      type="checkbox"
                      checked={formData.saveQA}
                      onChange={(e) => handleChange('saveQA', e.target.checked)}
                      className="w-4 h-4 rounded border-gray-700 bg-transparent"
                    />
                  </label>
                  <label className="flex items-center justify-between text-white cursor-pointer p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <span>Allow voice input</span>
                    <input
                      type="checkbox"
                      checked={formData.voiceInput}
                      onChange={(e) => handleChange('voiceInput', e.target.checked)}
                      className="w-4 h-4 rounded border-gray-700 bg-transparent"
                    />
                  </label>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Privacy & Features</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    <strong className="text-white">Save Q&A:</strong> Help us improve by storing your questions and answers anonymously to enhance our AI responses.
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    <strong className="text-white">Voice Input:</strong> Enable microphone access to ask questions using your voice for a hands-free learning experience.
                  </p>
                </div>
              </div>
            </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-700">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    : 'bg-[#333] text-white hover:bg-gray-700'
                }`}
              >
                <ChevronLeft size={20} />
                Back
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-gray-700 text-white hover:bg-gray-700 transition-colors"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg font-medium bg-gray-700 text-white hover:bg-gray-700 transition-colors"
                >
                  Sign Up
                </button>
              )}
            </div>
          </form>

          <p className="text-center text-gray-400 mt-6 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register