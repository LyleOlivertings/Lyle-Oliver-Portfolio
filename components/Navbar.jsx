// src/components/Navbar.jsx
'use client';
import { useState, useEffect } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('#mobile-menu') && !event.target.closest('#menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-blue-600">Lyle Oliver</a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-600 hover:text-blue-600 transition">Home</a>
            <a href="/projects" className="text-gray-600 hover:text-blue-600 transition">Projects</a>
            <a href="/contact" className="text-gray-600 hover:text-blue-600 transition">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="menu-button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="/"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              >
                Home
              </a>
              <a
                href="/projects"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              >
                Projects
              </a>
              <a
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;