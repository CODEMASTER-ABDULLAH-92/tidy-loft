'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHeart, FiEye, FiShoppingBag, FiStar } from 'react-icons/fi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function ProductCard({ product, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const categoryName = product.category
    ? product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';

  const placeholderImage = '/api/placeholder/400/400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <Link href={`/product/${product._id}`}>
        <div className="bg-white rounded-sm overflow-hidden border border-gray-100 hover:border-gray-300 transition-all duration-500">
          {/* Image Container - LV style with monogram pattern feel */}
          <div className="relative overflow-hidden aspect-square bg-[#f8f4f0]">
            <LazyLoadImage
              src={imageError ? placeholderImage : (product.images?.[0] || placeholderImage)}
              alt={product.title}
              effect="blur"
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-all duration-1000 ${
                isHovered ? 'scale-105' : 'scale-100'
              }`}
            />
            
            {/* LV Style Overlay - Subtle gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/10 to-transparent transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`} />
            
            {/* LV Style Badges - Minimal and elegant */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.featured && (
                <span className="bg-black text-white text-[10px] px-4 py-1.5 tracking-[0.15em] uppercase font-light">
                  Exclusive
                </span>
              )}
              {discount > 0 && (
                <span className="bg-[#c8a87c] text-white text-[10px] px-4 py-1.5 tracking-[0.15em] uppercase font-light">
                  -{discount}%
                </span>
              )}
              {(product.isNew || product.isNewProduct) && (
                <span className="bg-black text-white text-[10px] px-4 py-1.5 tracking-[0.15em] uppercase font-light">
                  New Arrival
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-[#c8a87c] text-white text-[10px] px-4 py-1.5 tracking-[0.15em] uppercase font-light">
                  Iconic
                </span>
              )}
            </div>

            {/* LV Style Quick Actions - Gold accents */}
            <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-500 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}>

              <Link
                href={`/productDetail/${product._id}`}
                onClick={(e) => e.stopPropagation()}
                className="p-2.5 bg-white/95 rounded-full shadow-lg text-gray-700 hover:bg-[#c8a87c] hover:text-white transition-all duration-300"
              >
                <FiEye size={15} />
              </Link>
            </div>

            {/* LV Style Quick View - Clean and minimal */}
            <div className={`absolute bottom-6 left-6 right-6 transition-all duration-500 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <Link
                href={`/productDetail/${product._id}`}
                onClick={(e) => e.stopPropagation()}
                className="w-full bg-black/90 backdrop-blur-sm text-white py-3.5 px-6 
                         text-[11px] tracking-[0.2em] uppercase font-light
                         hover:bg-[#c8a87c] transition-all duration-300
                         flex items-center justify-center space-x-3"
              >
                <FiShoppingBag size={16} />
                <span>View Details</span>
              </Link>
            </div>

            {/* Out of Stock - LV style */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
                <span className="bg-white text-black px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-light">
                  Épuisé
                </span>
              </div>
            )}
          </div>

          {/* LV Style Content - Minimal luxury */}
          <div className="p-5 space-y-3">
            {/* Category - LV style */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-light text-[#c8a87c] uppercase tracking-[0.2em]">
                {categoryName || 'Collection'}
              </span>
              {product.brand && (
                <span className="text-[10px] text-gray-400 uppercase tracking-[0.1em] font-light">
                  {product.brand}
                </span>
              )}
            </div>

            {/* Title - Elegant typography */}
            <h3 className="text-sm font-light text-gray-900 line-clamp-2 leading-relaxed tracking-wide">
              {product.title}
            </h3>

            {/* Rating - Minimal */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={12}
                    className={`${
                      i < Math.floor(product.rating || 0)
                        ? 'text-[#c8a87c] fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-gray-400 tracking-wide">
                ({product.reviewCount || product.reviews || 0})
              </span>
            </div>

            {/* LV Style Price - Clean */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-baseline space-x-3">
                <span className="text-lg font-light text-gray-900 tracking-wide">
                  ${(product.price || 0).toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through font-light">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* LV Style View Deal */}
              <Link
                href={`/productDetail/${product._id}`}
                className="text-[10px] text-[#c8a87c] tracking-[0.15em] uppercase font-light 
                         hover:text-black transition-colors duration-300 flex items-center"
              >
                Explore
                <motion.svg 
                  animate={{ x: isHovered ? 4 : 0 }}
                  className="w-3 h-3 ml-1.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </motion.svg>
              </Link>
            </div>

            {/* LV Style Tags - Refined */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {product.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="text-[9px] text-gray-500 uppercase tracking-[0.1em] font-light px-2.5 py-1 border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
                {product.tags.length > 2 && (
                  <span className="text-[9px] text-gray-400 uppercase tracking-[0.1em] font-light px-2.5 py-1 border border-gray-200">
                    +{product.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}