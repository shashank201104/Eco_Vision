//Author - Pratham Khare
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button.jsx"
import { Menu, X } from "lucide-react"

const Header = ({ onAuthClick }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className='fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-border z-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/*Logo*/}
          <Link to="/" className='flex items-center space-x-3 hover:opacity-80 transitiion-opacity'>
            <img src = "/ecoVisionLogo.png" alt="Ecovision Logo" className='h-10 w-auto' />
            <span className='text-xl font-bold text-black bg-clip-text '>Ecovision</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            <Link to="/about" className='text-foreground hover:text-primary transition-colors font-medium'>About Us</Link>
            <Button variant="outline" onClick={onAuthClick} className="ml-4">Login/Register</Button>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='md:hidden p-2 rounded-lg hover: bg-accent transition-colors'>
            {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>

        {/* Mobile Menu Navigation*/}
        {isMenuOpen && (
          <div className='md:hidden py-4 border-t border-border'>
            <nav className='flex flex-col space-y-4'>
              <Link to="/about" className='text-foreground hover:text-primary transition-colors font-medium px-2' onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Button variant="outline" onClick={() => { onAuthClick(); setIsMenuOpen(false) }} className="mx-2">
                Login / Register
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header