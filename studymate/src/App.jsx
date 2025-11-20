
import './App.css'
import { ArrowBigDown } from 'lucide'
import Settings from './pages/settings.jsx'

function App() {


  return (
    <div className="max-w-6xl mx-auto">
      {/* <Routes>
          {/* Auth Routes - Only pages accessible without authentication */}
          {/* <Route path="/auth/register" element={<Register/>} /> */}
          {/* <Route path="/auth/login" element={<Login/>} /> */}
      {/* </Routes> */} 
      <Settings />  
    </div>
  )
}

export default App
