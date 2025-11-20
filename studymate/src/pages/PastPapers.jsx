import { useState } from 'react'
import { Download, MessageSquare, FileText, BookOpen } from 'lucide-react'
import { RESOURCES } from '../data/resources'

const PastPapers = () => {
  const [selectedSubject, setSelectedSubject] = useState('All')

  // Get unique subjects
  const subjects = ['All', ...new Set(RESOURCES.map(r => r.subject))]

  // Filter resources
  const filteredResources = selectedSubject === 'All'
    ? RESOURCES
    : RESOURCES.filter(r => r.subject === selectedSubject)

  const handleOpenPDF = (url) => {
    window.open(url, '_blank')
  }

  const handleAskTutor = (resource) => {
    // For now, just alert - can be connected to AI chat later
    alert(`Ask the tutor about: ${resource.label}\n\nThis will open the AI chat with pre-filled context about this ${resource.type === 'pastPaper' ? 'past paper' : 'study guide'}.`)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Past Papers & Study Guides</h1>
        <p className="text-gray-400">Download resources and get help from your AI tutor</p>
      </div>

      {/* Subject Filter */}
      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm text-gray-400 mb-2">
          Filter by Subject
        </label>
        <select
          id="subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-gray-700 focus:outline-none transition-colors"
        >
          {subjects.map(subject => (
            <option key={subject} value={subject} className="bg-gray-800">
              {subject}
            </option>
          ))}
        </select>
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredResources.map(resource => (
          <div
            key={resource.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-700 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              {resource.type === 'pastPaper' ? (
                <FileText size={24} className="text-blue-400 flex-shrink-0 mt-1" />
              ) : (
                <BookOpen size={24} className="text-green-400 flex-shrink-0 mt-1" />
              )}
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">{resource.label}</h3>
                <p className="text-gray-400 text-sm mb-2">{resource.description}</p>
                <div className="flex gap-2 text-xs">
                  <span className={`px-2 py-1 rounded ${
                    resource.type === 'pastPaper'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {resource.type === 'pastPaper' ? 'Past Paper' : 'Study Guide'}
                  </span>
                  {resource.year && (
                    <span className="px-2 py-1 rounded bg-[#333] text-gray-300">
                      {resource.year}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleOpenPDF(resource.url)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#333] hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <Download size={18} />
                <span>Open PDF</span>
              </button>
              <button
                onClick={() => handleAskTutor(resource)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <MessageSquare size={18} />
                <span>Ask Tutor</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <FileText size={48} className="mx-auto mb-3 text-gray-600" />
          <p className="text-gray-400">No resources found for this subject</p>
        </div>
      )}
    </div>
  )
}

export default PastPapers