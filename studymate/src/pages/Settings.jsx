import { useState, useEffect } from 'react'
import { Volume2, VolumeX, Save } from 'lucide-react'
import { storage } from '../utils/storage'

const Settings = () => {
  const [settings, setSettings] = useState({
    language: 'english',
    difficulty: 'medium',
    voiceEnabled: false,
    learningStyles: []
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSettings(storage.getSettings())
  }, [])

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
    setSaved(false)
  }

  const handleLearningStyleToggle = (style) => {
    setSettings(prev => {
      const current = prev.learningStyles || []
      const updated = current.includes(style)
        ? current.filter(s => s !== style)
        : [...current, style]
      return { ...prev, learningStyles: updated }
    })
    setSaved(false)
  }

  const handleSave = () => {
    storage.saveSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Customize your learning experience</p>
      </div>

      <div className="space-y-6">
        {/* Language Settings */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">Language</h2>
              <p className="text-gray-400 text-sm">Choose your preferred language for responses</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSettingChange('language', 'english')}
              className={`p-4 rounded-lg border-2 transition-all ${
                settings.language === 'english'
                  ? 'border-gray-700 bg-gray-800 text-white'
                  : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-700'
              }`}
            >
              <div className="font-medium">English</div>
              <div className="text-xs mt-1 opacity-75">Text and voice available</div>
            </button>
            <button
              onClick={() => handleSettingChange('language', 'zulu')}
              className={`p-4 rounded-lg border-2 transition-all ${
                settings.language === 'zulu'
                  ? 'border-gray-700 bg-gray-800 text-white'
                  : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-700'
              }`}
            >
              <div className="font-medium">Zulu</div>
              <div className="text-xs mt-1 opacity-75">Text only</div>
            </button>
          </div>
        </div>

        {/* Difficulty Settings */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">Difficulty Level</h2>
              <p className="text-gray-400 text-sm">Adjust the complexity of explanations and questions</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleSettingChange('difficulty', 'basic')}
              className={`p-4 rounded-lg border-2 transition-all ${
                settings.difficulty === 'basic'
                  ? 'border-gray-700 bg-gray-800 text-white'
                  : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-700'
              }`}
            >
              <div className="font-medium">Basic</div>
              <div className="text-xs mt-1 opacity-75">Simple explanations</div>
            </button>
            <button
              onClick={() => handleSettingChange('difficulty', 'medium')}
              className={`p-4 rounded-lg border-2 transition-all ${
                settings.difficulty === 'medium'
                  ? 'border-gray-700 bg-gray-800 text-white'
                  : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-700'
              }`}
            >
              <div className="font-medium">Medium</div>
              <div className="text-xs mt-1 opacity-75">Balanced depth</div>
            </button>
            <button
              onClick={() => handleSettingChange('difficulty', 'advanced')}
              className={`p-4 rounded-lg border-2 transition-all ${
                settings.difficulty === 'advanced'
                  ? 'border-gray-700 bg-gray-800 text-white'
                  : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-700'
              }`}
            >
              <div className="font-medium">Advanced</div>
              <div className="text-xs mt-1 opacity-75">Detailed content</div>
            </button>
          </div>
        </div>

        {/* Voice Settings */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">Voice Responses</h2>
              <p className="text-gray-400 text-sm">Enable or disable audio responses from the AI</p>
            </div>

            <button
              onClick={() => handleSettingChange('voiceEnabled', !settings.voiceEnabled)}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg border-2 transition-all ${
                settings.voiceEnabled
                  ? 'border-gray-700 bg-gray-800 text-white'
                  : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-700'
              }`}
            >
              {settings.voiceEnabled ? (
                <>
                  <Volume2 size={20} />
                  <span className="font-medium">On</span>
                </>
              ) : (
                <>
                  <VolumeX size={20} />
                  <span className="font-medium">Off</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Learning Styles */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">Learning Styles</h2>
              <p className="text-gray-400 text-sm">Choose how you prefer to learn (select all that apply)</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleLearningStyleToggle('step-by-step')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                settings.learningStyles?.includes('step-by-step')
                  ? 'border-gray-700 bg-gray-800 text-white'
                  : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-700'
              }`}
            >
              <div className="font-medium">Step-by-step</div>
              <div className="text-xs mt-1 opacity-75">Detailed explanations</div>
            </button>
            <button
              onClick={() => handleLearningStyleToggle('short-summary')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                settings.learningStyles?.includes('short-summary')
                  ? 'border-gray-700 bg-gray-800 text-white'
                  : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-700'
              }`}
            >
              <div className="font-medium">Short Summary</div>
              <div className="text-xs mt-1 opacity-75">Quick key points</div>
            </button>
            <button
              onClick={() => handleLearningStyleToggle('voice')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                settings.learningStyles?.includes('voice')
                  ? 'border-gray-700 bg-gray-800 text-white'
                  : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-700'
              }`}
            >
              <div className="font-medium">Voice</div>
              <div className="text-xs mt-1 opacity-75">Audio explanations</div>
            </button>
            <button
              onClick={() => handleLearningStyleToggle('visual')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                settings.learningStyles?.includes('visual')
                  ? 'border-gray-700 bg-gray-800 text-white'
                  : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-700'
              }`}
            >
              <div className="font-medium">Visual</div>
              <div className="text-xs mt-1 opacity-75">Diagrams and charts</div>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              saved
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-white hover:bg-gray-700'
            }`}
          >
            <Save size={20} />
            {saved ? 'Settings Saved!' : 'Save Settings'}
          </button>
        </div>

        {/* Info Panel */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-white font-medium mb-2">Current Settings</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Language:</span>
              <span className="text-white capitalize">{settings.language}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Difficulty:</span>
              <span className="text-white capitalize">{settings.difficulty}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Voice:</span>
              <span className="text-white">{settings.voiceEnabled ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Learning Styles:</span>
              <span className="text-white">
                {settings.learningStyles?.length > 0
                  ? settings.learningStyles.map(s => s.replace('-', ' ')).join(', ')
                  : 'None selected'}
              </span>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4">
            These settings are stored locally on your device and will be used for all AI responses.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Settings