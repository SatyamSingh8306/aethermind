import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="navbar-logo">
        Aether<span>Mind</span>
      </Link>

      <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <Link to="/contact" className="navbar-cta">Get Started</Link>
      
      <button 
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>
    </nav>
  )
}

export default Navbar;