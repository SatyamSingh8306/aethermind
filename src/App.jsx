import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import BlogPage from './pages/BlogPage'
import DocumentationPage from './pages/DocumentationPage'
import FAQPage from './pages/FAQPage'
import SupportPage from './pages/SupportPage'
import { AuthProvider } from './context/AuthContext'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'
import { CartProvider } from './context/CartContext'
import Cart from './pages/Cart'
import Chatbot from './components/Chatbot/Chatbot'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <h2>AetherMind</h2>
        <p>Loading intelligent solutions...</p>
      </div>
    )
  }

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/documentation" element={<DocumentationPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Chatbot />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App