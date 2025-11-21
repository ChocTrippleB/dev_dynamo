import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import StudyPlan from './pages/StudyPlan.jsx'
import PastPapers from './pages/PastPapers.jsx'
import Register from './pages/auth/Register.jsx'
import Login from './pages/auth/Login.jsx'
import Settings from './pages/Settings.jsx'
import Profile from './pages/Profile.jsx'
import Home from './pages/Home.jsx'
import LandingPage from './pages/LandingPage.jsx'
import { storage } from './utils/storage'

function App() {
  const isAuthenticated = storage.isAuthenticated()

  return (
    <Routes>
      {/* Landing Page - Public */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth routes - no layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Root route - redirect based on auth status */}
      <Route path="/" element={
        isAuthenticated ? (
          <Navigate to="/chat" replace />
        ) : (
          <Navigate to="/landing" replace />
        )
      } />

      {/* Main app routes - with layout and auth protection */}
      <Route path="/chat" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
      <Route path="/study-plan" element={<ProtectedRoute><Layout><StudyPlan /></Layout></ProtectedRoute>} />
      <Route path="/past-papers" element={<ProtectedRoute><Layout><PastPapers /></Layout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />
    </Routes>
  )
}

export default App
