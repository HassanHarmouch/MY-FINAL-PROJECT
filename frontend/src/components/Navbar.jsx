import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from './button.jsx';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsLoggedIn(!!localStorage.getItem('token')); // Check login status
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const navItems = [
    { name: 'Find Centers', path: '/recycling-centers' },
    { name: 'Recycle Request', path: '/create-request' },
    { name: 'About', path: '/about' },
    { name: 'Profile', path: '/profile' },
  ];

  const NavItem = ({ name, path }) => (
    <NavLink
      to={path}
      className={({ isActive }) => `
        relative px-3 py-2 text-sm font-medium transition-colors
        after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
        after:bg-primary-500 dark:after:bg-primary-400 after:transition-all after:duration-300
        hover:text-primary-600 dark:hover:text-primary-400 hover:after:w-full
        ${isActive 
          ? 'text-primary-600 dark:text-primary-400 after:w-full' 
          : 'text-gray-700 dark:text-gray-300'
        }
      `}
    >
      {name}
    </NavLink>
  );

  return (
    <header
  className={`
     top-0 left-0 right-0 z-50 w-full h-20
    flex items-center
    backdrop-blur-sm bg-white/80 dark:bg-gray-900/80
    border-b border-gray-200 dark:border-gray-700
  `}
>
      <div className="container mt-10 px-4 flex items-center justify-between mb-24 p-10">
        <NavLink 
           
          className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
        >
          <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700">
            <div className="absolute inset-0.5 rounded-full bg-white dark:bg-gray-900"></div>
            <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 animate-pulse-soft"></div>
          </div>
          <span className="text-xl font-semibold text-gray-800 dark:text-white">
          ♻️EcoCycle♻️
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-12">
          {navItems.map((item) => (
            <NavItem key={item.name} name={item.name} path={item.path} />
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-12">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login">
                <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  Log in
                </Button>
              </NavLink>
              <NavLink to="/register">
                <Button variant="primary" size="sm">
                  Sign up
                </Button>
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          fixed inset-0 top-16 z-40 
          backdrop-blur-sm bg-white/95 dark:bg-gray-900/95
          transition-all duration-300 overflow-hidden
          ${isMenuOpen 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-full pointer-events-none'
          }
          md:hidden
        `}
      >
        <nav className="flex flex-col items-center justify-center space-y-8 p-8 mt-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                w-full text-center py-3 px-4 rounded-lg text-base font-medium transition-colors
                ${isActive
                  ? 'bg-primary-100/50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
            >
              {item.name}
            </NavLink>
          ))}
          <div className="flex flex-col w-full space-y-6 pt-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/login" className="w-full">
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </NavLink>
                <NavLink to="/register" className="w-full">
                  <Button variant="primary" className="w-full">
                    Sign up
                  </Button>
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
