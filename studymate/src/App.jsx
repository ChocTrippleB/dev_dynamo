import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import StudyPlan from './pages/studyplan.jsx'
import PastPapers from './pages/pastpapers.jsx'
import Register from './pages/auth/Register.jsx'
import Login from './pages/auth/Login.jsx'
import Settings from './pages/settings.jsx'
import Home from './pages/home.jsx'

function App() {
  return (
    <Routes>
      {/* Auth routes - no layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Main app routes - with layout */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/study-plan" element={<Layout><StudyPlan /></Layout>} />
      <Route path="/past-papers" element={<Layout><PastPapers /></Layout>} />
      <Route path="/settings" element={<Layout><Settings /></Layout>} />
    </Routes>
  )
}

export default App
