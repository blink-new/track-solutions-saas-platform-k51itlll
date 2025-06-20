import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import DashboardLayout from './components/DashboardLayout'
import Dashboard from './pages/Dashboard'
import DeliveryManagement from './pages/DeliveryManagement'
import RouteManagement from './pages/RouteManagement'
import DriverManagement from './pages/DriverManagement'
import CompanyManagement from './pages/CompanyManagement'
import Settings from './pages/Settings'
import Help from './pages/Help'
import AuthProvider from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import ImportSpreadsheet from './pages/ImportSpreadsheet'
import CheckoutPage from './pages/CheckoutPage'
import DemoPage from './pages/DemoPage'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            {/* Protected Routes with DashboardLayout */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="entregas" element={<DeliveryManagement />} />
              <Route path="rotas" element={<RouteManagement />} />
              <Route path="entregadores" element={<DriverManagement />} />
              <Route path="transportadoras" element={<CompanyManagement />} />
              <Route path="configuracoes" element={<Settings />} />
              <Route path="ajuda" element={<Help />} />
              <Route path="importar-planilha" element={<ImportSpreadsheet />} />
            </Route>
          </Routes>
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App