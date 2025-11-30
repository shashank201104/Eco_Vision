// Author - Pratham Khare
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import DefaultAvatar from "../assets/defaultProfileAvatar.png";

const Header = () => {
  const navigate = useNavigate();

  // State to track whether mobile menu is open (true) or closed (false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const { authUser, logout } = useAuthStore();

  const onAuthClick = () => {
    navigate("/auth");
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className='fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-border z-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>

          {/*Logo*/}
          <Link to="/" className='flex items-center space-x-3 hover:opacity-80 transitiion-opacity'>
            <img src = "/ecoVisionLogo.png" alt="Ecovision Logo" className='h-10 w-auto' />
            <span className='text-xl font-bold text-black bg-clip-text '>Ecovision</span>
          </Link>

          {/* Desktop Navigation (visible on medium screens & larger)*/}
          <nav className='hidden md:flex items-center space-x-8'>
            <Link to="/about" className='text-foreground hover:text-primary transition-colors font-medium'>About Us</Link>
            <Link to="/drives" className='text-foreground hover:text-primary transition-colors font-medium'>Drives</Link>
            <Button variant="outline" onClick={onAuthClick} className="ml-4">Login/Register</Button>
          </nav>

          {/* Mobile Menu Toggle Button (only visible on smaller screens) */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='md:hidden p-2 rounded-lg hover: bg-accent transition-colors'>
            {/* Toggle between Menu and Close icon */}
            {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>

        {/*  Mobile Navigation Menu (shown only when `isMenuOpen` is true) */}
        {isMenuOpen && (
          <div className='md:hidden py-4 border-t border-border'>
            <nav className='flex flex-col space-y-4'>
              <Link to="/about" className='text-foreground hover:text-primary transition-colors font-medium px-2' onClick={() => setIsMenuOpen(false)}>About Us</Link>

              {/* Opens Login/Register and closes menu */}
              <Button variant="outline" onClick={() => { onAuthClick(); setIsMenuOpen(false) }} className="mx-2">
                Login / Register
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
