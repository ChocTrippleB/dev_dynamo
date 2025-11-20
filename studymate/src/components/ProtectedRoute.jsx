import { Navigate } from 'react-router-dom'
import { storage } from '../utils/storage'

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = storage.isAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
