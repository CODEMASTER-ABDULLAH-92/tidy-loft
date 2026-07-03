'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { 
      name: 'Kitchen Decor', 
      path: '/all_products',
    },
    { 
      name: 'Home Decor', 
      path: '/all_products',
    },
    { 
      name: 'Laundry Room', 
      path: '/all_products',
    },
    { 
      name: 'Storage', 
      path: '/all_products',
    },
    { 
      name: 'Kitchen Organization', 
      path: '/all_products',
    },
    { 
      name: 'Bathroom Organization', 
      path: '/all_products',
    },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-white'
    }`}>
      {/* Top Bar */}
      <div className="bg-[#7C9082] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-2 text-sm">
            <p>✨ Free shipping on orders over $50 | Transform your space today</p>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-[#7C9082] rounded-full flex items-center justify-center"
            >
              <span className="text-white font-serif text-xl">T</span>
            </motion.div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-800 group-hover:text-[#7C9082] transition-colors">
                The Tidy Loft
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Home Organization</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="nav-link">Home</Link>
            
            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('categories')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="nav-link flex items-center">
                Categories
                <FiChevronDown className={`ml-1 transition-transform duration-300 ${
                  activeDropdown === 'categories' ? 'rotate-180' : ''
                }`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'categories' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl 
                             border border-gray-100 overflow-hidden"
                  >
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.path}
                        className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 
                                 transition-colors"
                      >
                        <span className="font-medium text-gray-700">{category.name}</span>
                        <span className="text-gray-400">→</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/about" className="nav-link">About</Link>
          </div>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-2">
              <Link href="/" className="block py-3 text-gray-700 hover:text-[#7C9082] font-medium">
                Home
              </Link>
              
              <div className="py-2">
                <p className="text-sm font-semibold text-gray-400 uppercase mb-2">Categories</p>
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.path}
                    className="block py-2 text-gray-600 hover:text-[#7C9082]"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              
              <Link href="/about" className="block py-3 text-gray-700 hover:text-[#7C9082] font-medium">
                About
              </Link>
              <Link href="/contact" className="block py-3 text-gray-700 hover:text-[#7C9082] font-medium">
                Contact
              </Link>
              <Link 
                href="/dashboard" 
                className="block py-3 text-[#7C9082] hover:text-[#6B7E71] font-semibold"
              >
                Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .nav-link {
          position: relative;
          padding: 0.5rem 0;
          color: #4a4a4a;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: #7C9082;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #7C9082;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
}