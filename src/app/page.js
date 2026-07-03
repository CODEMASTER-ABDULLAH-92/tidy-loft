// import FeaturedProducts from "./Components/FeatureProducts";
// import Footer from "./Components/Footer";
// import Hero from "./Components/Hero";
// import Navbar from "./Components/Navbar";

// export default function Home() {
//   return (
// <>
// <Navbar/>
// <Hero/>
// <FeaturedProducts products={[]}/>
// <Footer/>
// </>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import FeaturedProducts from "./Components/FeatureProducts";
import Footer from "./Components/Footer";
import LoadingSpinner from "./Components/LoadingSpinner";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Fetch all products
      const response = await fetch('/api/dashboard/product');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products);
        
        // Filter featured products
        const featured = data.products.filter(product => product.featured === true);
        setFeaturedProducts(featured.length > 0 ? featured : data.products.slice(0, 4));
      } else {
        setError('Failed to load products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error loading products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Hero />
      
      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button 
              onClick={fetchProducts}
              className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <FeaturedProducts products={featuredProducts} />
      )}
      
      <Footer />
    </>
  );
}