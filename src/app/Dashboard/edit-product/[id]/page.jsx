'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiPlus, FiX, FiSave, FiArrowLeft, FiImage, FiLink, FiTag, FiPackage, FiDollarSign, FiInfo, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../../../Components/LoadingSpinner';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'home-decor',
    subCategory: '',
    images: [''],
    affiliateLink: '',
    brand: '',
    size: '',
    color: '',
    material: '',
    dimensions: {
      length: '',
      width: '',
      height: '',
      unit: 'inches'
    },
    weight: {
      value: '',
      unit: 'lbs'
    },
    rating: '4.5',
    reviewCount: '0',
    stockQuantity: '10',
    inStock: true,
    featured: false,
    isNew: false,
    isBestSeller: false,
    tags: [''],
    keywords: [''],
    seoTitle: '',
    seoDescription: '',
  });

  const categories = [
    { value: 'kitchen-decor', label: 'Kitchen Decor', icon: '🍳' },
    { value: 'home-decor', label: 'Home Decor', icon: '🏠' },
    { value: 'laundry-room', label: 'Laundry Room', icon: '🧺' },
    { value: 'storage', label: 'Storage', icon: '📦' },
    { value: 'kitchen-organization', label: 'Kitchen Organization', icon: '🗂️' },
    { value: 'bathroom-organization', label: 'Bathroom Organization', icon: '🛁' },
  ];

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
        const product = data.product;
        setFormData({
          title: product.title || '',
          description: product.description || '',
          price: product.price || '',
          originalPrice: product.originalPrice || '',
          category: product.category || 'home-decor',
          subCategory: product.subCategory || '',
          images: product.images?.length > 0 ? product.images : [''],
          affiliateLink: product.affiliateLink || '',
          brand: product.brand || '',
          size: product.size || '',
          color: product.color || '',
          material: product.material || '',
          dimensions: {
            length: product.dimensions?.length || '',
            width: product.dimensions?.width || '',
            height: product.dimensions?.height || '',
            unit: product.dimensions?.unit || 'inches'
          },
          weight: {
            value: product.weight?.value || '',
            unit: product.weight?.unit || 'lbs'
          },
          rating: product.rating || '4.5',
          reviewCount: product.reviewCount || '0',
          stockQuantity: product.stockQuantity || '10',
          inStock: product.inStock ?? true,
          featured: product.featured ?? false,
          isNew: product.isNew || product.isNewProduct || false,
          isBestSeller: product.isBestSeller ?? false,
          tags: product.tags?.length > 0 ? product.tags : [''],
          keywords: product.keywords?.length > 0 ? product.keywords : [''],
          seoTitle: product.seoTitle || '',
          seoDescription: product.seoDescription || '',
        });
      } else {
        toast.error('Product not found');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Error loading product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (index, value, field) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayItem = (index, field) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Product title is required');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Product description is required');
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error('Valid price is required');
      return false;
    }
    if (formData.images.filter(img => img.trim() !== '').length === 0) {
      toast.error('At least one image URL is required');
      return false;
    }
    if (!formData.affiliateLink.trim()) {
      toast.error('Affiliate link is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const productData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      category: formData.category,
      subCategory: formData.subCategory.trim() || undefined,
      images: formData.images.filter(img => img.trim() !== ''),
      affiliateLink: formData.affiliateLink.trim(),
      brand: formData.brand.trim() || undefined,
      size: formData.size.trim() || undefined,
      color: formData.color.trim() || undefined,
      material: formData.material.trim() || undefined,
      dimensions: {
        length: formData.dimensions.length ? parseFloat(formData.dimensions.length) : undefined,
        width: formData.dimensions.width ? parseFloat(formData.dimensions.width) : undefined,
        height: formData.dimensions.height ? parseFloat(formData.dimensions.height) : undefined,
        unit: formData.dimensions.unit,
      },
      weight: {
        value: formData.weight.value ? parseFloat(formData.weight.value) : undefined,
        unit: formData.weight.unit,
      },
      rating: parseFloat(formData.rating),
      reviewCount: parseInt(formData.reviewCount),
      stockQuantity: parseInt(formData.stockQuantity),
      inStock: formData.inStock,
      featured: formData.featured,
      isNew: formData.isNew,
      isNewProduct: formData.isNew, // Map to both for compatibility
      isBestSeller: formData.isBestSeller,
      tags: formData.tags.filter(tag => tag.trim() !== ''),
      keywords: formData.keywords.filter(kw => kw.trim() !== ''),
      seoTitle: formData.seoTitle.trim() || formData.title.trim(),
      seoDescription: formData.seoDescription.trim() || formData.description.trim().substring(0, 160),
    };

    try {
      const response = await fetch(`/api/dashboard/product?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Product updated successfully! 🎉');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        toast.error(data.error || 'Error updating product');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/dashboard/product?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Product deleted successfully!');
        router.push('/Dashboard');
      } else {
        toast.error(data.error || 'Error deleting product');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FiInfo },
    { id: 'media', label: 'Media & Links', icon: FiImage },
    { id: 'details', label: 'Details', icon: FiPackage },
    { id: 'pricing', label: 'Pricing & Stock', icon: FiDollarSign },
    { id: 'seo', label: 'SEO & Tags', icon: FiTag },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-primary-500 hover:text-primary-700 mb-4 group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Edit Product</h1>
              <p className="text-gray-500 mt-2">Update your product listing</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium"
              >
                <FiTrash2 size={18} />
                <span>Delete Product</span>
              </button>
              <div className="hidden sm:block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-rose rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <FiPackage className="text-white" size={28} />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-primary-500 border-b-2 border-primary-500 bg-primary-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6 space-y-6"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                  placeholder="Enter product title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all resize-none"
                  placeholder="Enter detailed product description"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {formData.description.length}/2000 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        formData.category === cat.value
                          ? 'border-primary-500 bg-primary-50 shadow-md'
                          : 'border-gray-200 hover:border-primary-300 hover:shadow-sm'
                      }`}
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <p className="text-sm font-medium text-gray-700 mt-2">{cat.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sub Category (Optional)
                </label>
                <input
                  type="text"
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                  placeholder="e.g., Pantry Organization"
                />
              </div>
            </motion.div>
          )}

          {/* Media & Links Tab */}
          {activeTab === 'media' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6 space-y-6"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Product Images <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('images')}
                    className="text-primary-500 hover:text-primary-700 text-sm flex items-center"
                  >
                    <FiPlus className="mr-1" /> Add Image
                  </button>
                </div>
                
                <div className="space-y-3">
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="flex-1">
                        <div className="relative">
                          <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="url"
                            value={image}
                            onChange={(e) => handleArrayChange(index, e.target.value, 'images')}
                            placeholder={`Image URL ${index + 1}`}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                          />
                        </div>
                        {image && (
                          <div className="mt-2 relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = '/api/placeholder/80/80';
                              }}
                            />
                            {index === 0 && (
                              <span className="absolute bottom-0 left-0 right-0 bg-primary-500 text-white text-xs text-center py-0.5">
                                Main
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      {formData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem(index, 'images')}
                          className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                        >
                          <FiX size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amazon Affiliate Link <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="url"
                    name="affiliateLink"
                    value={formData.affiliateLink}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                    placeholder="https://amazon.com/dp/..."
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Enter your Amazon affiliate link with your tracking ID
                </p>
              </div>
            </motion.div>
          )}

          {/* Details Tab */}
          {activeTab === 'details' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                    placeholder="e.g., Simple Houseware"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                    placeholder="e.g., Large, 12x12 inches"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                    placeholder="e.g., White, Bamboo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Material</label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                    placeholder="e.g., Bamboo, Plastic, Metal"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dimensions</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Length</label>
                    <input
                      type="number"
                      value={formData.dimensions.length}
                      onChange={(e) => handleNestedChange('dimensions', 'length', e.target.value)}
                      step="0.01"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Width</label>
                    <input
                      type="number"
                      value={formData.dimensions.width}
                      onChange={(e) => handleNestedChange('dimensions', 'width', e.target.value)}
                      step="0.01"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Height</label>
                    <input
                      type="number"
                      value={formData.dimensions.height}
                      onChange={(e) => handleNestedChange('dimensions', 'height', e.target.value)}
                      step="0.01"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Unit</label>
                    <select
                      value={formData.dimensions.unit}
                      onChange={(e) => handleNestedChange('dimensions', 'unit', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                    >
                      <option value="inches">Inches</option>
                      <option value="cm">Centimeters</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Weight Value</label>
                    <input
                      type="number"
                      value={formData.weight.value}
                      onChange={(e) => handleNestedChange('weight', 'value', e.target.value)}
                      step="0.01"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Unit</label>
                    <select
                      value={formData.weight.unit}
                      onChange={(e) => handleNestedChange('weight', 'unit', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                    >
                      <option value="lbs">Pounds (lbs)</option>
                      <option value="kg">Kilograms (kg)</option>
                      <option value="oz">Ounces (oz)</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Pricing & Stock Tab */}
          {activeTab === 'pricing' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      step="0.01"
                      min="0"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Original Price ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                      placeholder="0.00"
                    />
                  </div>
                  {formData.price && formData.originalPrice && parseFloat(formData.originalPrice) > parseFloat(formData.price) && (
                    <p className="text-green-600 text-sm mt-2">
                      You save ${(parseFloat(formData.originalPrice) - parseFloat(formData.price)).toFixed(2)} (
                      {Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.price)) / parseFloat(formData.originalPrice)) * 100)}% off)
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity</label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ 5.0</option>
                    <option value="4.5">⭐⭐⭐⭐ 4.5</option>
                    <option value="4">⭐⭐⭐⭐ 4.0</option>
                    <option value="3.5">⭐⭐⭐ 3.5</option>
                    <option value="3">⭐⭐⭐ 3.0</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Status</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <label className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 transition-all">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleChange}
                      className="w-5 h-5 rounded text-primary-500 focus:ring-primary-500"
                    />
                    <div>
                      <span className="text-sm font-semibold text-gray-700">In Stock</span>
                      <p className="text-xs text-gray-400">Available for purchase</p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 transition-all">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="w-5 h-5 rounded text-primary-500 focus:ring-primary-500"
                    />
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Featured</span>
                      <p className="text-xs text-gray-400">Show on homepage</p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 transition-all">
                    <input
                      type="checkbox"
                      name="isNew"
                      checked={formData.isNew}
                      onChange={handleChange}
                      className="w-5 h-5 rounded text-primary-500 focus:ring-primary-500"
                    />
                    <div>
                      <span className="text-sm font-semibold text-gray-700">New Arrival</span>
                      <p className="text-xs text-gray-400">Mark as new</p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 transition-all">
                    <input
                      type="checkbox"
                      name="isBestSeller"
                      checked={formData.isBestSeller}
                      onChange={handleChange}
                      className="w-5 h-5 rounded text-primary-500 focus:ring-primary-500"
                    />
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Best Seller</span>
                      <p className="text-xs text-gray-400">Popular product</p>
                    </div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* SEO & Tags Tab */}
          {activeTab === 'seo' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6 space-y-6"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">SEO Title</label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                  placeholder="SEO optimized title (defaults to product title)"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">SEO Description</label>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all resize-none"
                  placeholder="Meta description for search engines (150-160 characters)"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {formData.seoDescription.length}/160 characters
                </p>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-semibold text-gray-700">Tags</label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('tags')}
                    className="text-primary-500 hover:text-primary-700 text-sm flex items-center"
                  >
                    <FiPlus className="mr-1" /> Add Tag
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-1 relative">
                        <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) => handleArrayChange(index, e.target.value, 'tags')}
                          placeholder={`Tag ${index + 1}`}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                        />
                      </div>
                      {formData.tags.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem(index, 'tags')}
                          className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                        >
                          <FiX size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {formData.tags.filter(t => t.trim()).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.tags.filter(t => t.trim()).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-semibold text-gray-700">Keywords</label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('keywords')}
                    className="text-primary-500 hover:text-primary-700 text-sm flex items-center"
                  >
                    <FiPlus className="mr-1" /> Add Keyword
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.keywords.map((keyword, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={keyword}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'keywords')}
                        placeholder={`Keyword ${index + 1}`}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                      />
                      {formData.keywords.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem(index, 'keywords')}
                          className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                        >
                          <FiX size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <div>
              {activeTab !== 'basic' && (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = tabs.findIndex(t => t.id === activeTab);
                    setActiveTab(tabs[currentIndex - 1].id);
                  }}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all font-medium"
                >
                  ← Previous
                </button>
              )}
            </div>
            <div className="flex space-x-4">
              <Link
                href="/dashboard"
                className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </Link>
              {activeTab === 'seo' ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl 
                           hover:from-primary-600 hover:to-primary-700 transition-all font-medium
                           flex items-center space-x-2 disabled:opacity-50 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <FiSave size={20} />
                      <span>Update Product</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = tabs.findIndex(t => t.id === activeTab);
                    setActiveTab(tabs[currentIndex + 1].id);
                  }}
                  className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all font-medium"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}