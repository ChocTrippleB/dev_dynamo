import { useState, useEffect } from 'react'
import { Calendar, BookOpen, TrendingUp, Edit2, Plus, X } from 'lucide-react'
import { storage } from '../utils/storage'

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Student Name',
    grade: '12',
    subjects: []
  })
  const [exams, setExams] = useState([])
  const [stats, setStats] = useState({})
  const [showAddExam, setShowAddExam] = useState(false)
  const [newExam, setNewExam] = useState({ subject: '', date: '', topics: '' })

  useEffect(() => {
    const savedProfile = storage.getProfile()
    if (savedProfile) {
      setProfile(savedProfile)
    } else {
      setProfile({
        name: 'Student Name',
        grade: '12',
        subjects: ['Mathematics', 'Physical Sciences', 'Life Sciences']
      })
    }
    setExams(storage.getExams())
    setStats(storage.getStats())
  }, [])

  const handleAddExam = () => {
    if (newExam.subject && newExam.date) {
      storage.addExam(newExam)
      setExams(storage.getExams())
      setNewExam({ subject: '', date: '', topics: '' })
      setShowAddExam(false)
    }
  }

  const handleRemoveExam = (id) => {
    storage.removeExam(id)
    setExams(storage.getExams())
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDaysUntil = (dateString) => {
    const examDate = new Date(dateString)
    const today = new Date()
    const diffTime = examDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
        <p className="text-gray-400">Track your academic journey and progress</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info & Subjects */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Student Info</h2>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Edit2 size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm">Name</p>
                <p className="text-white font-medium">{profile.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Grade</p>
                <p className="text-white font-medium">Grade {profile.grade}</p>
              </div>
            </div>
          </div>

          {/* Subjects Card */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={20} className="text-white" />
              <h2 className="text-xl font-semibold text-white">My Subjects</h2>
            </div>
            <div className="space-y-2">
              {profile.subjects.map((subject, index) => (
                <div
                  key={index}
                  className="px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white"
                >
                  {subject}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-xs mb-1">Questions Asked</p>
              <p className="text-2xl font-bold text-white">{stats.questionsAsked || 0}</p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-xs mb-1">Study Hours</p>
              <p className="text-2xl font-bold text-white">{stats.studyHours || 0}</p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-xs mb-1">Topics Done</p>
              <p className="text-2xl font-bold text-white">{stats.topicsCompleted || 0}</p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-xs mb-1">Avg Score</p>
              <p className="text-2xl font-bold text-white">{stats.averageScore || 0}%</p>
            </div>
          </div>
        </div>

        {/* Right Column - Exam Dates & Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Dates Card */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-white" />
                <h2 className="text-xl font-semibold text-white">Upcoming Exams</h2>
              </div>
              <button
                onClick={() => setShowAddExam(!showAddExam)}
                className="flex items-center gap-2 px-4 py-2 bg-[#333] hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <Plus size={18} />
                Add Exam
              </button>
            </div>

            {/* Add Exam Form */}
            {showAddExam && (
              <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-white font-medium mb-4">Add New Exam</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Subject</label>
                    <input
                      type="text"
                      value={newExam.subject}
                      onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                      placeholder="e.g., Mathematics"
                      className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-gray-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Date</label>
                    <input
                      type="date"
                      value={newExam.date}
                      onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                      className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-gray-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Topics (Optional)</label>
                    <input
                      type="text"
                      value={newExam.topics}
                      onChange={(e) => setNewExam({ ...newExam, topics: e.target.value })}
                      placeholder="e.g., Algebra, Calculus"
                      className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-gray-700 focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddExam}
                      className="flex-1 bg-gray-700 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowAddExam(false)}
                      className="px-4 bg-[#333] hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Exam List */}
            <div className="space-y-3">
              {exams.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Calendar size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No upcoming exams scheduled</p>
                  <p className="text-sm mt-1">Click "Add Exam" to get started</p>
                </div>
              ) : (
                exams.map((exam) => {
                  const daysUntil = getDaysUntil(exam.date)
                  return (
                    <div
                      key={exam.id}
                      className="flex items-start justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-700 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white font-medium">{exam.subject}</h3>
                          <span className={`text-xs px-2 py-1 rounded ${
                            daysUntil < 7
                              ? 'bg-red-500/20 text-red-400'
                              : daysUntil < 14
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {daysUntil > 0 ? `${daysUntil} days` : 'Today'}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-1">
                          {formatDate(exam.date)}
                        </p>
                        {exam.topics && (
                          <p className="text-gray-500 text-xs">Topics: {exam.topics}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveExam(exam.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors ml-4"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Study Progress */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={20} className="text-white" />
              <h2 className="text-xl font-semibold text-white">Study Progress</h2>
            </div>

            <div className="space-y-4">
              {profile.subjects.map((subject, index) => {
                const progress = [65, 80, 45][index] || 50 // Mock progress data
                return (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white">{subject}</span>
                      <span className="text-gray-400">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
