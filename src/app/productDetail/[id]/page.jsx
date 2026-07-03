'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShare2, FiShoppingBag, FiStar, FiChevronLeft, FiChevronRight, FiTruck, FiShield, FiRotateCcw } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import Layout from '../../Components/Layout';
import LoadingSpinner from '../../Components/Layout';

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setProduct(data.product);
        // fetchRelatedProducts(data.product.category, data.product._id);
      } else {
        toast.error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Error loading product');
    } finally {
      setLoading(false);
    }
  };

  // const fetchRelatedProducts = async (category, currentId) => {
  //   try {
  //     const response = await fetch(`/api/products?category=${category}&limit=4`);
  //     const data = await response.json();
      
  //     if (data.success) {
  //       const filtered = data.products.filter(p => p._id !== currentId).slice(0, 4);
  //       setRelatedProducts(filtered);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching related products:', error);
  //   }
  // };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleAffiliateClick = async () => {
    try {
      await fetch(`/api/products/${id}/click`, { method: 'POST' });
      window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error tracking click:', error);
      window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-primary-900 mb-4">
              Product Not Found
            </h2>
            <p className="text-primary-500 mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Layout>
      <div className="bg-primary-50 min-h-screen">
        {/* Breadcrumb */}


        {/* Product Detail */}
        <div className="container-custom py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg aspect-square">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={product.images[selectedImage] || '/api/placeholder/600/600'}
                    alt={product.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Image Navigation */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all"
                    >
                      <FiChevronLeft size={24} />
                    </button>
                    <button
                      onClick={() => setSelectedImage(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all"
                    >
                      <FiChevronRight size={24} />
                    </button>
                  </>
                )}
                
                {/* Discount Badge */}
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-accent-terracotta text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    -{discount}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative rounded-xl overflow-hidden aspect-square ${
                        selectedImage === index 
                          ? 'ring-2 ring-primary-500 ring-offset-2' 
                          : 'hover:opacity-75'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right - Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Title & Brand */}
              <div>
                {product.brand && (
                  <p className="text-sm text-primary-500 uppercase tracking-wider mb-2">
                    {product.brand}
                  </p>
                )}
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-900 leading-tight">
                  {product.title}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-primary-500">
                  {product.rating} ({product.reviewCount || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-bold text-primary-900">
                    ${product.price?.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-primary-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-green-600 font-semibold">
                        Save ${(product.originalPrice - product.price).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Description</h3>
                <p className="text-primary-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Product Details */}
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
                <h3 className="text-lg font-semibold text-primary-900 mb-4">Product Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.brand && (
                    <div>
                      <span className="text-sm text-primary-400">Brand</span>
                      <p className="text-primary-800 font-medium">{product.brand}</p>
                    </div>
                  )}
                  {product.size && (
                    <div>
                      <span className="text-sm text-primary-400">Size</span>
                      <p className="text-primary-800 font-medium">{product.size}</p>
                    </div>
                  )}
                  {product.color && (
                    <div>
                      <span className="text-sm text-primary-400">Color</span>
                      <p className="text-primary-800 font-medium">{product.color}</p>
                    </div>
                  )}
                  {product.material && (
                    <div>
                      <span className="text-sm text-primary-400">Material</span>
                      <p className="text-primary-800 font-medium">{product.material}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-primary-400">Category</span>
                    <p className="text-primary-800 font-medium">
                      {product.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-primary-400">Availability</span>
                    <p className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAffiliateClick}
                  className="flex-1 bg-primary-500 text-white py-4 rounded-full font-semibold text-lg
                           hover:bg-primary-600 transition-all duration-300 transform hover:scale-105
                           shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <FiShoppingBag size={24} />
                  <span>Buy on Amazon</span>
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-4 rounded-full border-2 transition-all duration-300 ${
                    isLiked 
                      ? 'border-accent-rose bg-accent-rose text-white' 
                      : 'border-primary-300 text-primary-500 hover:border-accent-rose hover:text-accent-rose'
                  }`}
                >
                  <FiHeart size={24} className={isLiked ? 'fill-current' : ''} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-4 rounded-full border-2 border-primary-300 text-primary-500
                           hover:border-primary-500 hover:text-primary-700 transition-all duration-300"
                >
                  <FiShare2 size={24} />
                </button>
              </div>

              {/* Shipping Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 bg-white rounded-xl p-4 shadow-sm">
                  <FiTruck className="text-primary-500" size={24} />
                  <div>
                    <p className="text-sm font-semibold text-primary-800">Free Shipping</p>
                    <p className="text-xs text-primary-400">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white rounded-xl p-4 shadow-sm">
                  <FiShield className="text-primary-500" size={24} />
                  <div>
                    <p className="text-sm font-semibold text-primary-800">Secure Payment</p>
                    <p className="text-xs text-primary-400">100% protected</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white rounded-xl p-4 shadow-sm">
                  <FiRotateCcw className="text-primary-500" size={24} />
                  <div>
                    <p className="text-sm font-semibold text-primary-800">Easy Returns</p>
                    <p className="text-xs text-primary-400">30-day return policy</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container-custom">
              <h2 className="section-title text-center mb-12">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <ProductCard key={relatedProduct._id} product={relatedProduct} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}