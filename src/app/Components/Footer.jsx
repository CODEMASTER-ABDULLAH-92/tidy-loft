'use client'
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiArrowUp, FiHeart } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    { name: 'Kitchen Decor', path: '/all_products' },
    { name: 'Home Decor', path: '/all_products' },
    { name: 'Laundry Room', path: '/all_products' },
    { name: 'Storage', path: '/all_products' },
    { name: 'Kitchen Organization', path: '/all_products' },
    { name: 'Bathroom Organization', path: '/all_products' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#7C9082] rounded-full flex items-center justify-center">
                <span className="text-white font-serif text-xl">T</span>
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold">The Tidy Loft</h2>
                <p className="text-xs text-gray-400 -mt-1">Home Organization</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transform your living spaces with elegant organization solutions. 
              We curate the best products to help you create a beautiful, 
              clutter-free home you'll love.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    href={category.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-[#7C9082] mr-0 group-hover:mr-2 transition-all duration-300" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} The Tidy Loft. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center">
              Made with <FiHeart className="mx-1 text-red-400" size={14} /> by The Tidy Loft Team
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-[#7C9082] text-white w-12 h-12 rounded-full 
                 shadow-lg hover:bg-[#6B7E71] transition-all duration-300 z-50 
                 flex items-center justify-center hover:scale-110"
      >
        <FiArrowUp size={20} />
      </motion.button>
    </footer>
  );
}