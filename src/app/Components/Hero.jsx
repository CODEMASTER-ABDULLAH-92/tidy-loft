'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiPlay, FiStar } from 'react-icons/fi';
import Image from 'next/image';
import img1 from '../../../public/img1.avif'
import img2 from '../../../public/img2.avif'
import img3 from '../../../public/im3.avif'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Transform Your Space",
      subtitle: "With The Tidy Loft",
      description: "Discover elegant organization solutions that bring style and serenity to every room in your home.",
      image: img1,
      cta: "Shop Collection",
      badge: "New Arrivals",
      stats: [
        { label: "Happy Customers", value: "10K+" },
        { label: "Products", value: "500+" },
        { label: "Rating", value: "4.9" }
      ]
    },
    {
      title: "Kitchen Organization",
      subtitle: "Made Beautiful",
      description: "From pantry storage to countertop solutions, create a kitchen that inspires culinary creativity.",
      image: img2,
      cta: "Explore Kitchen",
      badge: "Best Seller",
      stats: [
        { label: "Kitchen Items", value: "200+" },
        { label: "Styles", value: "50+" },
        { label: "Satisfaction", value: "99%" }
      ]
    },
    {
      title: "Declutter & Design",
      subtitle: "Storage Solutions",
      description: "Smart storage solutions that maximize space while maintaining the aesthetic of your home.",
      image: img3,
      cta: "View Storage",
      badge: "Trending Now",
      stats: [
        { label: "Storage Ideas", value: "300+" },
        { label: "Space Saved", value: "40%" },
        { label: "Organized", value: "95%" }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          color: 'var(--tw-gradient-from, #7c6a58)'
        }}
      />

      {/* Ambient blur orbs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] bg-primary-500 rounded-full filter blur-3xl animate-float" />
        <div className="absolute -bottom-32 -right-16 w-[28rem] h-[28rem] bg-accent-rose rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-accent-gold rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative container-custom pt-24 pb-28 lg:pt-32 lg:pb-36">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-9"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-primary-200/60 rounded-full pl-3 pr-4 py-1.5 shadow-sm"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold/15">
                  <FiStar className="text-accent-gold" size={13} />
                </span>
                <span className="text-xs font-semibold tracking-wide uppercase text-primary-800">
                  {slides[currentSlide].badge} &middot; #1 Home Organization Store
                </span>
              </motion.div>

              {/* Heading */}
              <div className="space-y-5">
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-5xl lg:text-7xl font-serif font-bold text-primary-900 leading-[1.05] tracking-tight"
                >
                  {slides[currentSlide].title}
                  <br />
                  <span className="gradient-text">{slides[currentSlide].subtitle}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="text-lg lg:text-xl text-primary-500 leading-relaxed max-w-xl"
                >
                  {slides[currentSlide].description}
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/all_products"
                  className="btn-primary group inline-flex items-center shadow-lg shadow-primary-900/10 hover:shadow-xl hover:shadow-primary-900/15 transition-shadow"
                >
                  {slides[currentSlide].cta}
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex flex-wrap gap-x-10 gap-y-4 pt-8 border-t border-primary-200/70"
              >
                {slides[currentSlide].stats.map((stat, index) => (
                  <div key={index} className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary-900 font-serif">{stat.value}</span>
                    <span className="text-sm text-primary-400">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Right Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none">
              {/* Decorative frame behind image */}
              <div className="absolute -inset-3 bg-gradient-to-br from-primary-500/15 via-accent-rose/10 to-accent-gold/15 rounded-[2rem] rotate-3" />
              <div className="absolute -inset-px rounded-[1.75rem] border border-white/60" />

              <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden shadow-2xl shadow-primary-900/20 transform-gpu">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`image-${currentSlide}`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slides[currentSlide].image}
                      alt={`${slides[currentSlide].title} ${slides[currentSlide].subtitle}`}
                      fill
                      priority={currentSlide === 0}
                      quality={95}
                      sizes="(max-width: 1024px) 90vw, 45vw"
                      placeholder="blur"
                      className="object-cover"
                      style={{ backfaceVisibility: 'hidden' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/25 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -right-5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-primary-900/10 p-4 border border-white"
              >
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <span className="text-sm font-semibold text-primary-800">In Stock</span>
                </div>
                <p className="text-xs text-primary-400 mt-1">Ready to Ship</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-primary-900/10 p-4 border border-white"
              >
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-accent-gold fill-current" size={15} />
                  ))}
                </div>
                <p className="text-xs text-primary-400 mt-1">1,000+ Reviews</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center items-center space-x-2.5 mt-16">
          {slides.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
              className="relative h-2 rounded-full bg-primary-200 overflow-hidden transition-all duration-300"
              style={{ width: currentSlide === index ? '2.5rem' : '0.5rem' }}
            >
              {currentSlide === index && (
                <motion.span
                  key={currentSlide}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="absolute inset-y-0 left-0 bg-accent-gold rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 leading-[0]">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 60C1200 45 1320 15 1380 0L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="white"/>
        </svg>
      </div>
    </div>
  );
}