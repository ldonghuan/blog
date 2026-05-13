import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Zap, Menu, X, TerminalSquare } from 'lucide-react'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const location = useLocation()

  const navLinks = [
    { name: '首页 / Home', path: '/' },
    { name: 'AI & 智能演进', path: '/ai' },
    { name: '数字货币 & Web3', path: '/crypto' },
    { name: '科技交汇点', path: '/convergence' },
  ]

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <header className="navbar-container glass-panel">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <img src="/images/logo.png" alt="Logo" className="navbar-logo" />
          <span className="brand-text glow-text">六六的科技站</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-link ${isActive(link.path)}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="mobile-nav glass-panel">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-link ${isActive(link.path)}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Navbar
