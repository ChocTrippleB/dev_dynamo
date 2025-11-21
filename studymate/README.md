# StudyMate

> Your Personal AI Tutor for Matric

StudyMate is an AI-powered learning companion designed specifically for South African Matric students (Grades 10-12). Get instant help with your studies, create personalized study schedules, and practice with past papers - all in one place.

## 🎯 The Problem We're Solving

South African Matric students face significant challenges when preparing for their final exams:

- **💰 Limited access to quality tutoring** - Private tutors are expensive and not accessible to all students
- **🗣️ Language barriers** - Many students are more comfortable learning in their home language
- **📅 Lack of personalized study plans** - Generic study guides don't account for individual weaknesses and exam dates
- **🔍 Scattered resources** - Past papers and study materials are spread across multiple websites
- **⏰ Last-minute cramming** - Without proper planning, students often leave studying until it's too late

**StudyMate addresses these challenges by providing:**

- ✅ 24/7 AI tutoring in English, Zulu, and other South African languages
- ✅ Voice input support for students who prefer speaking to typing
- ✅ Automatic study schedule generation based on exam dates and weak topics
- ✅ Centralized access to past papers and study guides
- ✅ Personalized learning experiences that adapt to different learning styles

## ✨ Features

### 💬 AI Chat Tutor

- 🤝 Real-time question answering for Maths, Physical Sciences, Life Sciences, and more
- 🇿🇦 South African context and examples (e.g., "Explain Newton's Laws using a taxi example")
- 🎤 Voice input support using Web Speech API (en-ZA)
- 🌍 Multi-language support (English, Zulu, Xhosa)
- 📝 Conversation history for review

### 📅 Study Planner Generator

- 🤖 AI-powered 7-day study schedule creation
- ⚙️ Customizable based on:
  - 📚 Subject focus (Mathematics, Physical Sciences, Life Sciences, etc.)
  - 📆 Exam start dates
  - 🎯 Personal weak spots/struggling topics
- 📊 Generated plans in easy-to-read table format

### 📄 Past Papers Library

- 📚 Curated collection of NSC past papers
- 🔍 Filter by subject and year
- 📖 Direct PDF access
- 💡 "Ask Tutor" integration for questions about specific papers

### 👤 Profile & Progress Tracking

- ⏰ Track exam dates and countdown
- 📈 Subject-specific progress monitoring
- 🔥 Study streak tracking
- 📊 Performance insights

### ⚙️ Settings & Personalization

- 🎨 Learning style preferences (Visual, Auditory, Reading/Writing, Kinesthetic)
- 🗣️ Language preferences (text and voice)
- 🎤 Voice input enable/disable
- 💾 Save Q&A history toggle

## Tech Stack

### ⚛️ Frontend

- **⚛️ React 19.2.0** - Modern UI library with latest features
- **⚡ Vite 7.2.4** - Fast build tool and dev server
- **🛣️ React Router DOM 7.9.6** - Client-side routing
- **🎨 Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **🎭 Lucide React** - Beautiful, consistent icon library

### 🤖 AI & APIs

- **🧠 OpenAI API (GPT-3.5 Turbo)** - Natural language processing for chat and study plan generation
- **🎤 Web Speech API** - Browser-based voice recognition for South African English (en-ZA)

### 💾 State Management & Storage

- **🪝 React Hooks** - useState, useEffect, useRef for local state
- **💿 localStorage** - Persistent storage for user data, authentication, and preferences

### 🛠️ Development Tools

- **✅ ESLint** - Code quality and consistency
- **🔥 Vite HMR** - Hot Module Replacement for fast development

## 📁 Project Structure

```
studymate/
├── src/
│   ├── assets/          # 🖼️ Static assets (images, fonts)
│   ├── components/      # 🧩 Reusable React components
│   │   ├── Layout.jsx           # Main app layout with sidebar
│   │   ├── ProtectedRoute.jsx  # Authentication guard
│   │   └── Sidebar.jsx          # Navigation sidebar
│   ├── data/            # 📦 Static data and constants
│   │   └── resources.js         # Past papers and study guides
│   ├── pages/           # 📄 Page components
│   │   ├── auth/
│   │   │   ├── Login.jsx        # User login
│   │   │   └── Register.jsx     # Multi-step registration
│   │   ├── Home.jsx             # AI chat interface
│   │   ├── StudyPlan.jsx        # Study planner generator
│   │   ├── PastPapers.jsx       # Resource library
│   │   ├── Profile.jsx          # User profile & progress
│   │   ├── Settings.jsx         # User preferences
│   │   └── LandingPage.jsx      # Public landing page
│   ├── utils/           # 🔧 Utility functions
│   │   └── storage.js           # localStorage management
│   ├── App.jsx          # Main app component with routing
│   ├── App.css          # Component-specific styles
│   ├── index.css        # Global styles
│   └── main.jsx         # App entry point
├── public/              # 🌐 Public assets
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## 🚀 Installation

### 📋 Prerequisites

- 🟢 Node.js 18+ and npm
- 🔑 OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### 🔧 Setup

1. **📥 Clone the repository**

   ```bash
   git clone <repository-url>
   cd studymate
   ```
2. **📦 Install dependencies**

   ```bash
   npm install
   ```
3. **🔑 Configure API Keys**

   Add your OpenAI API key in the following files:

   - `src/pages/Home.jsx` (line 11):

     ```javascript
     const API_KEY = "your-openai-api-key-here"
     ```
   - `src/pages/StudyPlan.jsx` (line 4):

     ```javascript
     const API_KEY = "your-openai-api-key-here"
     ```
4. **▶️ Start the development server**

   ```bash
   npm run dev
   ```
5. **🌐 Open in browser**

   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📖 Usage

### 🎯 First Time Setup

1. **🏠 Landing Page** - Visit the landing page to learn about StudyMate
2. **📝 Register** - Click "Start Learning Now" to create an account
   - Enter basic information (name, email, password)
   - Select text and voice language preferences
   - Choose your learning styles
   - Configure Q&A saving and voice input preferences
3. **🔐 Login** - Sign in with your credentials

### 💬 Using the AI Tutor

1. Navigate to **🏠 Home** from the sidebar
2. Type your question or click the 🎤 microphone to speak
3. Use suggested prompts or ask custom questions
4. Review conversation history as you study

### 📅 Creating a Study Plan

1. Navigate to **📅 Study Plan** from the sidebar
2. Select your main subject focus
3. Enter your exam start date
4. Optionally, list topics you're struggling with
5. Click "Generate My Schedule" to get your AI-powered 7-day plan
6. Review and follow your personalized schedule

### 📄 Accessing Past Papers

1. Navigate to **📄 Past Papers** from the sidebar
2. Filter by subject using the dropdown
3. Click "Open PDF" to view papers
4. Click "Ask Tutor" to get help with specific questions

### 👤 Managing Your Profile

1. Navigate to **👤 Profile** from the sidebar
2. Add exam dates to track countdown
3. Monitor your study progress and streaks
4. Update your goals and targets

### ⚙️ Adjusting Settings

1. Navigate to **⚙️ Settings** from the sidebar
2. Change language preferences
3. Update learning styles
4. Toggle voice input on/off
5. Configure Q&A history saving

## ⚙️ Configuration

### 🔑 API Keys

The application requires an OpenAI API key to function. For production deployment, consider:

- 📂 Using environment variables (`.env` file)
- 🔒 Implementing a backend proxy to secure API keys
- ⏱️ Rate limiting and usage monitoring

### 🎤 Voice Recognition

Voice input uses the Web Speech API with South African English (`en-ZA`). This feature:

- ✅ Works best in Chrome browser
- 🎙️ Requires microphone permissions
- ⚙️ Can be disabled in Settings

## 🌐 Browser Support

- **🟢 Chrome** (Recommended) - Full support including voice recognition
- **🟠 Firefox** - Full support except voice input
- **🔵 Safari** - Full support except voice input
- **🔷 Edge** - Full support including voice recognition

## 👨‍💻 Development

### 📜 Available Scripts

- `npm run dev` - ▶️ Start development server
- `npm run build` - 📦 Build for production
- `npm run preview` - 👀 Preview production build
- `npm run lint` - ✅ Run ESLint

### 🎨 Code Style

- ⚛️ Follow React best practices and hooks guidelines
- 🎨 Use Tailwind CSS utility classes for styling
- 🧩 Keep components modular and reusable
- 📝 Use meaningful variable and function names

## 🚀 Future Enhancements

- [ ] 🔐 Backend API for secure OpenAI key management
- [ ] 👥 Real-time collaboration features
- [X] 📱 Mobile app (React Native)
- [ ] 📴 Offline mode with cached responses
- [ ] 🎮 Gamification (badges, achievements, leaderboards)
- [ ] 👨‍👩‍👧‍👦 Group study sessions
- [X] 📅 Integration with school timetables
- [X] 📲 SMS reminders for study sessions
- [ ] 📚 More subjects and grade levels
- [ ] 👨‍🏫 Teacher dashboard for monitoring student progress

## 🤝 Contributing

This is a hackathon project by Team **dev_dynamo**. Contributions, issues, and feature requests are welcome!

## 📄 License

[Add your license here]

## 🙏 Acknowledgments

- 🇿🇦 Built for South African Matric students
- 🧠 Powered by OpenAI GPT-3.5 Turbo
- 📚 Past papers sourced from Department of Basic Education
- 🎭 Icons by Lucide

---

**Built with dedication for South African students** 🇿🇦📚
