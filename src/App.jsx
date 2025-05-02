import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
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
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
     
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App