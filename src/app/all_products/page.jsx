'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ProductCard from '../Components/Card';
import LoadingSpinner from '../Components/LoadingSpinner';

const categories = [
  { value: 'all', label: 'All Categories', icon: '📦' },
  { value: 'kitchen-decor', label: 'Kitchen Decor', icon: '🍳', count: 0 },
  { value: 'home-decor', label: 'Home Decor', icon: '🏠', count: 0 },
  { value: 'laundry-room', label: 'Laundry Room', icon: '🧺', count: 0 },
  { value: 'storage', label: 'Storage', icon: '📦', count: 0 },
  { value: 'kitchen-organization', label: 'Kitchen Organization', icon: '🗂️', count: 0 },
  { value: 'bathroom-organization', label: 'Bathroom Organization', icon: '🛁', count: 0 },
];

const sortOptions = [
  { value: 'createdAt', label: 'Newest First' },
  { value: '-createdAt', label: 'Oldest First' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating: Low to High' },
  { value: '-rating', label: 'Rating: High to Low' },
  { value: 'title', label: 'Name: A to Z' },
  { value: '-title', label: 'Name: Z to A' },
];

// ---- Shared design tokens (kept local so this file stays self-contained) ----
const INK = '#2B322C';
const INK_SOFT = '#6B7268';
const BG = '#F7F4EE';
const LINE = '#E4DFD5';
const SAGE = '#7C9082';
const SAGE_DARK = '#5F7565';
const CLAY = '#B97A56';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('-createdAt');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [inStockOnly, setInStockOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [viewMode, setViewMode] = useState('grid');

  const productsPerPage = 20;

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy, currentPage, priceRange, inStockOnly, featuredOnly]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `/api/products?page=${currentPage}&limit=${productsPerPage}&sort=${sortBy}`;

      if (selectedCategory !== 'all') {
        url += `&category=${selectedCategory}`;
      }

      if (priceRange.min) {
        url += `&minPrice=${priceRange.min}`;
      }

      if (priceRange.max) {
        url += `&maxPrice=${priceRange.max}`;
      }

      if (inStockOnly) {
        url += `&inStock=true`;
      }

      if (featuredOnly) {
        url += `&featured=true`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
        setTotalPages(data.pagination.pages);
        setTotalProducts(data.pagination.total);

        // Fetch category counts
        fetchCategoryCounts();
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryCounts = async () => {
    try {
      const response = await fetch('/api/products/categories');
      const data = await response.json();
      if (data.success) {
        setCategoryCounts(data.categories);
      }
    } catch (error) {
      console.error('Error fetching category counts:', error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setMobileFilterOpen(false);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handlePriceFilter = () => {
    setCurrentPage(1);
    fetchProducts();
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSortBy('-createdAt');
    setPriceRange({ min: '', max: '' });
    setInStockOnly(false);
    setFeaturedOnly(false);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        end = 4;
      }

      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const hasActiveFilters =
    selectedCategory !== 'all' || priceRange.min || priceRange.max || inStockOnly || featuredOnly;

  return (
    <>
      <Navbar />

      <div style={{ backgroundColor: BG }} className="min-h-screen">
        {/* Header */}
        <div className="bg-white border-b" style={{ borderColor: LINE }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
              <div>
                <span
                  className="text-xs font-semibold tracking-[0.2em] uppercase"
                  style={{ color: SAGE }}
                >
                  Shop the Collection
                </span>
                <h1
                  className="text-4xl sm:text-[2.75rem] font-serif font-bold mt-2 leading-tight"
                  style={{ color: INK }}
                >
                  All Products
                </h1>
                <div className="h-[3px] w-10 rounded-full mt-4 mb-4" style={{ backgroundColor: SAGE }} />
                <p className="text-sm" style={{ color: INK_SOFT }}>
                  {totalProducts} {totalProducts === 1 ? 'product' : 'products'} available
                  {selectedCategory !== 'all' && (
                    <span className="font-medium" style={{ color: SAGE_DARK }}>
                      {' '}
                      in {categories.find((c) => c.value === selectedCategory)?.label}
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">


                {/* Sort Dropdown */}
                <div className="relative flex-1 sm:flex-initial">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="appearance-none w-full sm:w-auto pl-4 pr-10 py-2.5 bg-white border rounded-full text-sm font-medium focus:outline-none focus:ring-2 transition-shadow cursor-pointer"
                    style={{ borderColor: LINE, color: INK, '--tw-ring-color': SAGE }}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown
                    size={14}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                    style={{ color: INK_SOFT }}
                  />
                </div>

                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="sm:hidden flex items-center gap-2 px-4 py-2.5 text-white rounded-full text-sm font-medium shadow-sm"
                  style={{ backgroundColor: SAGE }}
                >
                  <FiFilter size={16} />
                  Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex gap-10">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 space-y-5">
                {/* Categories */}
                <div className="bg-white rounded-2xl border p-6" style={{ borderColor: LINE }}>
                  <h3
                    className="text-xs font-semibold tracking-[0.14em] uppercase mb-4"
                    style={{ color: INK_SOFT }}
                  >
                    Categories
                  </h3>
                  <div className="space-y-1.5">
                    {categories.map((category) => {
                      const isActive = selectedCategory === category.value;
                      return (
                        <button
                          key={category.value}
                          onClick={() => handleCategoryChange(category.value)}
                          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-left"
                          style={
                            isActive
                              ? { backgroundColor: SAGE, color: '#fff' }
                              : { color: INK }
                          }
                          onMouseEnter={(e) => {
                            if (!isActive) e.currentTarget.style.backgroundColor = '#F1EDE4';
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-base leading-none">{category.icon}</span>
                            <span className="font-medium text-sm">{category.label}</span>
                          </div>
                          {categoryCounts[category.value] > 0 && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={
                                isActive
                                  ? { backgroundColor: 'rgba(255,255,255,0.22)', color: '#fff' }
                                  : { backgroundColor: '#F1EDE4', color: INK_SOFT }
                              }
                            >
                              {categoryCounts[category.value]}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div className="bg-white rounded-2xl border p-6" style={{ borderColor: LINE }}>
                  <h3
                    className="text-xs font-semibold tracking-[0.14em] uppercase mb-4"
                    style={{ color: INK_SOFT }}
                  >
                    Price Range
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                        className="w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-shadow"
                        style={{ borderColor: LINE, color: INK, '--tw-ring-color': SAGE }}
                      />
                      <span className="text-sm" style={{ color: INK_SOFT }}>
                        –
                      </span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                        className="w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-shadow"
                        style={{ borderColor: LINE, color: INK, '--tw-ring-color': SAGE }}
                      />
                    </div>
                    <button
                      onClick={handlePriceFilter}
                      className="w-full py-2.5 rounded-xl text-sm font-medium transition-colors"
                      style={{ backgroundColor: '#F1EDE4', color: INK }}
                    >
                      Apply Price
                    </button>
                  </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl border p-6" style={{ borderColor: LINE }}>
                  <h3
                    className="text-xs font-semibold tracking-[0.14em] uppercase mb-4"
                    style={{ color: INK_SOFT }}
                  >
                    Availability
                  </h3>
                  <div className="space-y-3.5">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => {
                          setInStockOnly(e.target.checked);
                          setCurrentPage(1);
                        }}
                        className="w-4 h-4 rounded accent-[#7C9082] cursor-pointer"
                      />
                      <span className="text-sm" style={{ color: INK }}>
                        In Stock Only
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={featuredOnly}
                        onChange={(e) => {
                          setFeaturedOnly(e.target.checked);
                          setCurrentPage(1);
                        }}
                        className="w-4 h-4 rounded accent-[#7C9082] cursor-pointer"
                      />
                      <span className="text-sm" style={{ color: INK }}>
                        Featured Products
                      </span>
                    </label>
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="w-full py-3 border rounded-xl transition-colors font-medium text-sm"
                  style={{ borderColor: LINE, color: INK_SOFT }}
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mb-7">
                  {selectedCategory !== 'all' && (
                    <span
                      className="inline-flex items-center gap-2 pl-3.5 pr-2.5 py-1.5 text-white rounded-full text-sm font-medium"
                      style={{ backgroundColor: SAGE }}
                    >
                      {categories.find((c) => c.value === selectedCategory)?.label}
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className="hover:opacity-70 transition-opacity"
                        aria-label="Remove category filter"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  )}
                  {(priceRange.min || priceRange.max) && (
                    <span
                      className="inline-flex items-center gap-2 pl-3.5 pr-2.5 py-1.5 rounded-full text-sm font-medium"
                      style={{ backgroundColor: '#F1EDE4', color: INK }}
                    >
                      ${priceRange.min || '0'} – ${priceRange.max || 'Any'}
                      <button
                        onClick={() => {
                          setPriceRange({ min: '', max: '' });
                          setCurrentPage(1);
                        }}
                        className="hover:opacity-60 transition-opacity"
                        aria-label="Remove price filter"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  )}
                  {inStockOnly && (
                    <span
                      className="inline-flex items-center gap-2 pl-3.5 pr-2.5 py-1.5 rounded-full text-sm font-medium"
                      style={{ backgroundColor: '#F1EDE4', color: INK }}
                    >
                      In Stock
                      <button
                        onClick={() => {
                          setInStockOnly(false);
                          setCurrentPage(1);
                        }}
                        className="hover:opacity-60 transition-opacity"
                        aria-label="Remove in-stock filter"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  )}
                  {featuredOnly && (
                    <span
                      className="inline-flex items-center gap-2 pl-3.5 pr-2.5 py-1.5 rounded-full text-sm font-medium"
                      style={{ backgroundColor: '#F1EDE4', color: INK }}
                    >
                      Featured
                      <button
                        onClick={() => {
                          setFeaturedOnly(false);
                          setCurrentPage(1);
                        }}
                        className="hover:opacity-60 transition-opacity"
                        aria-label="Remove featured filter"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-sm font-medium px-2 hover:underline"
                    style={{ color: CLAY }}
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Products Grid */}
              {loading ? (
                <LoadingSpinner />
              ) : products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border" style={{ borderColor: LINE }}>
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: '#F1EDE4' }}
                  >
                    <FiFilter style={{ color: INK_SOFT }} size={32} />
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-2" style={{ color: INK }}>
                    No Products Found
                  </h3>
                  <p className="text-sm mb-7" style={{ color: INK_SOFT }}>
                    Try adjusting your filters or search criteria
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 text-white rounded-full font-medium text-sm transition-colors"
                    style={{ backgroundColor: SAGE }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  <div
                    className={`grid gap-x-6 gap-y-10 ${
                      viewMode === 'grid'
                        ? 'grid-cols-1 sm:grid-cols-2'
                        : 'grid-cols-1'
                    }`}
                  >
                    {products.map((product, index) => (
                      <ProductCard key={product._id} product={product} index={index} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-16">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2.5 border rounded-full text-sm font-medium
                                 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        style={{ borderColor: LINE, color: INK }}
                      >
                        Previous
                      </button>

                      {getPageNumbers().map((page, index) => (
                        <button
                          key={index}
                          onClick={() => typeof page === 'number' && setCurrentPage(page)}
                          disabled={page === '...'}
                          className="w-10 h-10 rounded-full text-sm font-medium transition-all"
                          style={
                            currentPage === page
                              ? { backgroundColor: SAGE, color: '#fff' }
                              : page === '...'
                              ? { color: INK_SOFT, cursor: 'default' }
                              : { border: `1px solid ${LINE}`, color: INK }
                          }
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2.5 border rounded-full text-sm font-medium
                                 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        style={{ borderColor: LINE, color: INK }}
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {/* Results Info */}
                  <div className="text-center mt-6 text-sm" style={{ color: INK_SOFT }}>
                    Showing page {currentPage} of {totalPages} ({totalProducts} total products)
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white z-50 overflow-y-auto lg:hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-7">
                  <h2 className="text-xl font-serif font-bold" style={{ color: INK }}>
                    Filters
                  </h2>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#F1EDE4' }}
                    aria-label="Close filters"
                  >
                    <FiX size={18} style={{ color: INK }} />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-7">
                  <h3
                    className="text-xs font-semibold tracking-[0.14em] uppercase mb-3"
                    style={{ color: INK_SOFT }}
                  >
                    Categories
                  </h3>
                  <div className="space-y-1.5">
                    {categories.map((category) => {
                      const isActive = selectedCategory === category.value;
                      return (
                        <button
                          key={category.value}
                          onClick={() => handleCategoryChange(category.value)}
                          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-left"
                          style={isActive ? { backgroundColor: SAGE, color: '#fff' } : { color: INK }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-base leading-none">{category.icon}</span>
                            <span className="font-medium text-sm">{category.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-7">
                  <h3
                    className="text-xs font-semibold tracking-[0.14em] uppercase mb-3"
                    style={{ color: INK_SOFT }}
                  >
                    Price Range
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                      className="w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: LINE, color: INK, '--tw-ring-color': SAGE }}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                      className="w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: LINE, color: INK, '--tw-ring-color': SAGE }}
                    />
                  </div>
                  <button
                    onClick={handlePriceFilter}
                    className="w-full mt-2.5 py-2.5 rounded-xl text-sm font-medium"
                    style={{ backgroundColor: '#F1EDE4', color: INK }}
                  >
                    Apply
                  </button>
                </div>

                {/* Filters */}
                <div className="mb-7">
                  <h3
                    className="text-xs font-semibold tracking-[0.14em] uppercase mb-3"
                    style={{ color: INK_SOFT }}
                  >
                    Availability
                  </h3>
                  <label className="flex items-center gap-3 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#7C9082]"
                    />
                    <span className="text-sm" style={{ color: INK }}>
                      In Stock Only
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featuredOnly}
                      onChange={(e) => setFeaturedOnly(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#7C9082]"
                    />
                    <span className="text-sm" style={{ color: INK }}>
                      Featured Products
                    </span>
                  </label>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full py-3 border rounded-xl font-medium text-sm"
                  style={{ borderColor: LINE, color: INK_SOFT }}
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}