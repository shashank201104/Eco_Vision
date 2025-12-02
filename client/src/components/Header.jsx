// Author - Pratham Khare
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import DefaultAvatar from "../assets/defaultProfileAvatar.png";

const Header = () => {
  const navigate = useNavigate();

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
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/ecoVisionLogo.png"
              alt="Ecovision Logo"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-black">Ecovision</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/nearby"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Nearby recycling centres
            </Link>
            <Link
              to="/about"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About Us
            </Link>

            <Link
              to="/drives"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Drives
            </Link>

            {/* Logged Out → Show Login/Register */}
            {!authUser ? (
              <Button
                variant="outline"
                onClick={onAuthClick}
                className="ml-4 cursor-pointer"
              >
                Login / Register
              </Button>
            ) : (
              /* Logged In → Show Avatar + Name + Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <img
                    src={authUser.photo || DefaultAvatar}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium">{authUser.firstName}</span>
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-40 p-2">
                    <button
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/about"
                className="text-foreground hover:text-primary transition-colors font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>

              <Link
                to="/drives"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Drives
              </Link>

              {/* Logged Out */}
              {!authUser ? (
                <Button
                  className="mx-2 cursor-pointer"
                  variant="outline"
                  onClick={() => {
                    onAuthClick();
                    setIsMenuOpen(false);
                  }}
                >
                  Login / Register
                </Button>
              ) : (
                <>
                  {/* User Info */}
                  <div className="flex items-center space-x-3 px-2">
                    <img
                      src={authUser.photo || DefaultAvatar}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">{authUser.firstName}</span>
                  </div>

                  {/* Logout button */}
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="px-2 py-2 text-red-600 font-medium text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
