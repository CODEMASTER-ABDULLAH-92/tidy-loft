'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiPlus, FiX, FiSave, FiArrowLeft, FiImage, FiLink, FiTag, 
  FiPackage, FiDollarSign, FiInfo, FiCheck, FiBox, FiTruck,
  FiStar, FiEye, FiShoppingBag, FiGrid, FiFileText, FiSearch
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    description: '',
    category: 'home-decor',
    subCategory: '',
    
    // Pricing
    price: '',
    originalPrice: '',
    
    // Media
    images: [''],
    affiliateLink: '',
    
    // Product Details
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
    
    // Ratings & Stock
    rating: '4.5',
    reviewCount: '0',
    stockQuantity: '10',
    inStock: true,
    featured: false,
    isNewProduct: false,
    isBestSeller: false,
    
    // SEO & Tags
    tags: [''],
    keywords: [''],
    seoTitle: '',
    seoDescription: '',
  });

  const categories = [
    { 
      value: 'kitchen-decor', 
      label: 'Kitchen Decor', 
      icon: '🍳',
      description: 'Decorative items for kitchen'
    },
    { 
      value: 'home-decor', 
      label: 'Home Decor', 
      icon: '🏠',
      description: 'General home decoration'
    },
    { 
      value: 'laundry-room', 
      label: 'Laundry Room', 
      icon: '🧺',
      description: 'Laundry room organization'
    },
    { 
      value: 'storage', 
      label: 'Storage', 
      icon: '📦',
      description: 'Storage solutions'
    },
    { 
      value: 'kitchen-organization', 
      label: 'Kitchen Organization', 
      icon: '🗂️',
      description: 'Kitchen organizing tools'
    },
    { 
      value: 'bathroom-organization', 
      label: 'Bathroom Organization', 
      icon: '🛁',
      description: 'Bathroom organizing solutions'
    },
  ];

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
    const errors = [];
    
    if (!formData.title.trim()) {
      errors.push('Product title is required');
    } else if (formData.title.length > 200) {
      errors.push('Title must be less than 200 characters');
    }
    
    if (!formData.description.trim()) {
      errors.push('Product description is required');
    } else if (formData.description.length > 2000) {
      errors.push('Description must be less than 2000 characters');
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      errors.push('Valid price is required');
    }
    
    if (formData.originalPrice && parseFloat(formData.originalPrice) < parseFloat(formData.price)) {
      errors.push('Original price must be higher than selling price');
    }
    
    const validImages = formData.images.filter(img => img.trim() !== '');
    if (validImages.length === 0) {
      errors.push('At least one image URL is required');
    }
    
    if (!formData.affiliateLink.trim()) {
      errors.push('Affiliate link is required');
    }
    
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return false;
    }
    
    return true;
  };

 const handleSubmit = async (e) => {
  console.log("========== SUBMIT START ==========");

  e.preventDefault();
  console.log("1. preventDefault() executed");

  try {
    console.log("2. Current formData:", formData);

    const valid = validateForm();
    console.log("3. validateForm() returned:", valid);

    if (!valid) {
      console.log("4. Validation FAILED");
      return;
    }

    console.log("5. Validation PASSED");

    setIsSubmitting(true);
    console.log("6. isSubmitting = true");

    const productData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice
        ? parseFloat(formData.originalPrice)
        : undefined,
      category: formData.category,
      subCategory: formData.subCategory.trim() || undefined,
      images: formData.images.filter(img => img.trim() !== ""),
      affiliateLink: formData.affiliateLink.trim(),
      brand: formData.brand.trim() || undefined,
      size: formData.size.trim() || undefined,
      color: formData.color.trim() || undefined,
      material: formData.material.trim() || undefined,
      dimensions: {
        length: formData.dimensions.length
          ? parseFloat(formData.dimensions.length)
          : undefined,
        width: formData.dimensions.width
          ? parseFloat(formData.dimensions.width)
          : undefined,
        height: formData.dimensions.height
          ? parseFloat(formData.dimensions.height)
          : undefined,
        unit: formData.dimensions.unit,
      },
      weight: {
        value: formData.weight.value
          ? parseFloat(formData.weight.value)
          : undefined,
        unit: formData.weight.unit,
      },
      rating: parseFloat(formData.rating),
      reviewCount: parseInt(formData.reviewCount),
      stockQuantity: parseInt(formData.stockQuantity),
      inStock: formData.inStock,
      featured: formData.featured,
      isNewProduct: formData.isNewProduct,
      isBestSeller: formData.isBestSeller,
      tags: formData.tags.filter(tag => tag.trim() !== ""),
      keywords: formData.keywords.filter(kw => kw.trim() !== ""),
      seoTitle: formData.seoTitle.trim() || undefined,
      seoDescription: formData.seoDescription.trim() || undefined,
    };

    console.log("7. productData:", productData);

    Object.keys(productData).forEach(key => {
      if (productData[key] === undefined) {
        delete productData[key];
      }
    });

    console.log("8. Cleaned productData:", productData);
    console.log("9. Calling API...");

    const response = await fetch("/api/dashboard/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    console.log("10. Response received");
    console.log("Status:", response.status);
    console.log("OK:", response.ok);

    const data = await response.json();

    console.log("11. Response data:", data);

    if (data.success) {
      console.log("12. Product saved successfully");

      toast.success("Product added successfully! 🎉");

      setTimeout(() => {
        console.log("13. Redirecting...");
        router.push("/Dashboard");
      }, 1500);
    } else {
      console.log("14. API returned error");
      toast.error(data.error || "Error adding product");
    }
  } catch (err) {
    console.error("15. CATCH BLOCK");
    console.error(err);
  } finally {
    console.log("16. FINALLY");
    setIsSubmitting(false);
    console.log("========== SUBMIT END ==========");
  }
};

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FiInfo },
    { id: 'media', label: 'Media & Links', icon: FiImage },
    { id: 'details', label: 'Product Details', icon: FiPackage },
    { id: 'pricing', label: 'Pricing & Stock', icon: FiDollarSign },
    { id: 'seo', label: 'SEO & Tags', icon: FiSearch },
  ];

  const getProgressPercentage = () => {
    let filled = 0;
    const fields = [
      formData.title,
      formData.description,
      formData.price,
      formData.images.filter(i => i.trim()).length > 0,
      formData.affiliateLink,
    ];
    fields.forEach(f => { if (f) filled++; });
    return Math.round((filled / fields.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#F5F2ED]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-[#7C9082] hover:text-[#5A6D60] mb-4 group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
                <p className="text-gray-500 mt-2">Create a new product listing for your affiliate store</p>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full sm:w-64">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Completion</span>
                  <span className="font-semibold text-[#7C9082]">{getProgressPercentage()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-[#7C9082] to-[#6B7E71] h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-x-auto">
          <div className="flex border-b border-gray-200 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-all whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? 'text-[#7C9082] border-[#7C9082] bg-[#F5F2ED]'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Tab 1: Basic Info */}
          {activeTab === 'basic' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <FiFileText className="text-[#7C9082]" size={24} />
                  <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                </div>
                
                <div className="space-y-5">
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
                      maxLength={200}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                      placeholder="Enter product title (max 200 characters)"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      {formData.title.length}/200 characters
                    </p>
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
                      maxLength={2000}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all resize-none"
                      placeholder="Enter detailed product description (max 2000 characters)"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      {formData.description.length}/2000 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            formData.category === cat.value
                              ? 'border-[#7C9082] bg-[#F5F2ED] shadow-md scale-105'
                              : 'border-gray-200 hover:border-[#B8A99A] hover:shadow-sm'
                          }`}
                        >
                          <span className="text-2xl">{cat.icon}</span>
                          <p className="text-sm font-semibold text-gray-700 mt-2">{cat.label}</p>
                          <p className="text-xs text-gray-400 mt-1">{cat.description}</p>
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                      placeholder="e.g., Pantry Organization, Countertop Storage"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Media & Links */}
          {activeTab === 'media' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <FiImage className="text-[#7C9082]" size={24} />
                    <h2 className="text-xl font-semibold text-gray-900">Product Images</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayItem('images')}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#7C9082] text-white rounded-lg hover:bg-[#6B7E71] transition-all"
                  >
                    <FiPlus size={16} />
                    <span>Add Image</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {formData.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 items-start"
                    >
                      <div className="flex-1">
                        <div className="relative">
                          <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="url"
                            value={image}
                            onChange={(e) => handleArrayChange(index, e.target.value, 'images')}
                            placeholder={`Image URL ${index + 1}`}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                          />
                        </div>
                        {image && (
                          <div className="mt-3 relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = '/api/placeholder/96/96';
                                e.target.alt = 'Invalid image URL';
                              }}
                            />
                            {index === 0 && (
                              <span className="absolute bottom-0 left-0 right-0 bg-[#7C9082] text-white text-xs text-center py-0.5">
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
                          title="Remove image"
                        >
                          <FiX size={20} />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
                {formData.images.filter(i => i.trim()).length === 0 && (
                  <p className="text-sm text-red-500 mt-3">At least one image URL is required</p>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <FiLink className="text-[#7C9082]" size={24} />
                  <h2 className="text-xl font-semibold text-gray-900">Affiliate Link</h2>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Amazon Affiliate Link <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="url"
                      name="affiliateLink"
                      value={formData.affiliateLink}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                      placeholder="https://amazon.com/dp/PRODUCT_ID?tag=youraffiliateid"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Enter your full Amazon affiliate link with your tracking ID
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 3: Product Details */}
          {activeTab === 'details' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <FiPackage className="text-[#7C9082]" size={24} />
                  <h2 className="text-xl font-semibold text-gray-900">Product Specifications</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                      placeholder="e.g., Simple Houseware, mDesign"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
                    <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                      placeholder="e.g., White, Natural Bamboo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Material</label>
                    <input
                      type="text"
                      name="material"
                      value={formData.material}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                      placeholder="e.g., Bamboo, Plastic, Metal"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <FiBox className="text-[#7C9082]" size={24} />
                  <h2 className="text-xl font-semibold text-gray-900">Dimensions & Weight</h2>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Dimensions</label>
                    <div className="grid grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Length</label>
                        <input
                          type="number"
                          value={formData.dimensions.length}
                          onChange={(e) => handleNestedChange('dimensions', 'length', e.target.value)}
                          step="0.01"
                          min="0"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Width</label>
                        <input
                          type="number"
                          value={formData.dimensions.width}
                          onChange={(e) => handleNestedChange('dimensions', 'width', e.target.value)}
                          step="0.01"
                          min="0"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Height</label>
                        <input
                          type="number"
                          value={formData.dimensions.height}
                          onChange={(e) => handleNestedChange('dimensions', 'height', e.target.value)}
                          step="0.01"
                          min="0"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Unit</label>
                        <select
                          value={formData.dimensions.unit}
                          onChange={(e) => handleNestedChange('dimensions', 'unit', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                        >
                          <option value="inches">Inches</option>
                          <option value="cm">Centimeters</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Weight</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Value</label>
                        <input
                          type="number"
                          value={formData.weight.value}
                          onChange={(e) => handleNestedChange('weight', 'value', e.target.value)}
                          step="0.01"
                          min="0"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Unit</label>
                        <select
                          value={formData.weight.unit}
                          onChange={(e) => handleNestedChange('weight', 'unit', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                        >
                          <option value="lbs">Pounds (lbs)</option>
                          <option value="kg">Kilograms (kg)</option>
                          <option value="oz">Ounces (oz)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 4: Pricing & Stock */}
          {activeTab === 'pricing' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <FiDollarSign className="text-[#7C9082]" size={24} />
                  <h2 className="text-xl font-semibold text-gray-900">Pricing</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Selling Price ($) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">$</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        step="0.01"
                        min="0"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Original Price ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">$</span>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                        placeholder="0.00"
                      />
                    </div>
                    {formData.price && formData.originalPrice && 
                     parseFloat(formData.originalPrice) > parseFloat(formData.price) && (
                      <div className="mt-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                        Save ${(parseFloat(formData.originalPrice) - parseFloat(formData.price)).toFixed(2)} 
                        ({Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.price)) / parseFloat(formData.originalPrice)) * 100)}% OFF)
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <FiTruck className="text-[#7C9082]" size={24} />
                  <h2 className="text-xl font-semibold text-gray-900">Stock & Rating</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity</label>
                    <input
                      type="number"
                      name="stockQuantity"
                      value={formData.stockQuantity}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                    <select
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ 5.0</option>
                      <option value="4.5">⭐⭐⭐⭐ 4.5</option>
                      <option value="4">⭐⭐⭐⭐ 4.0</option>
                      <option value="3.5">⭐⭐⭐ 3.5</option>
                      <option value="3">⭐⭐⭐ 3.0</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Review Count</label>
                    <input
                      type="number"
                      name="reviewCount"
                      value={formData.reviewCount}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <FiGrid className="text-[#7C9082]" size={24} />
                  <h2 className="text-xl font-semibold text-gray-900">Product Status</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <label className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-[#7C9082] transition-all">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleChange}
                      className="w-5 h-5 rounded text-[#7C9082] focus:ring-[#7C9082]"
                    />
                    <div>
                      <span className="text-sm font-semibold text-gray-700">In Stock</span>
                      <p className="text-xs text-gray-400">Available now</p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-[#7C9082] transition-all">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="w-5 h-5 rounded text-[#7C9082] focus:ring-[#7C9082]"
                    />
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Featured</span>
                      <p className="text-xs text-gray-400">Show on homepage</p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-[#7C9082] transition-all">
                    <input
                      type="checkbox"
                      name="isNewProduct"
                      checked={formData.isNewProduct}
                      onChange={handleChange}
                      className="w-5 h-5 rounded text-[#7C9082] focus:ring-[#7C9082]"
                    />
                    <div>
                      <span className="text-sm font-semibold text-gray-700">New Arrival</span>
                      <p className="text-xs text-gray-400">Recently added</p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-[#7C9082] transition-all">
                    <input
                      type="checkbox"
                      name="isBestSeller"
                      checked={formData.isBestSeller}
                      onChange={handleChange}
                      className="w-5 h-5 rounded text-[#7C9082] focus:ring-[#7C9082]"
                    />
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Best Seller</span>
                      <p className="text-xs text-gray-400">Popular choice</p>
                    </div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 5: SEO & Tags */}
          {activeTab === 'seo' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <FiSearch className="text-[#7C9082]" size={24} />
                  <h2 className="text-xl font-semibold text-gray-900">SEO Settings</h2>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">SEO Title</label>
                    <input
                      type="text"
                      name="seoTitle"
                      value={formData.seoTitle}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
                      placeholder="SEO optimized title (uses product title if empty)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">SEO Description</label>
                    <textarea
                      name="seoDescription"
                      value={formData.seoDescription}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all resize-none"
                      placeholder="Meta description for search engines (150-160 characters recommended)"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      {formData.seoDescription.length}/160 characters recommended
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <FiTag className="text-[#7C9082]" size={24} />
                    <h2 className="text-xl font-semibold text-gray-900">Tags</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayItem('tags')}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#7C9082] text-white rounded-lg hover:bg-[#6B7E71] transition-all"
                  >
                    <FiPlus size={16} />
                    <span>Add Tag</span>
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
                          placeholder={`Tag ${index + 1} (e.g., organization, kitchen)`}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
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
                        className="bg-[#F5F2ED] text-[#7C9082] px-3 py-1.5 rounded-full text-sm font-medium border border-[#E8EDE9]"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <FiSearch className="text-[#7C9082]" size={24} />
                    <h2 className="text-xl font-semibold text-gray-900">Keywords</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayItem('keywords')}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#7C9082] text-white rounded-lg hover:bg-[#6B7E71] transition-all"
                  >
                    <FiPlus size={16} />
                    <span>Add Keyword</span>
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
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C9082] focus:ring-2 focus:ring-[#E8EDE9] transition-all"
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

          {/* Navigation & Submit Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={() => {
                const currentIndex = tabs.findIndex(t => t.id === activeTab);
                if (currentIndex > 0) {
                  setActiveTab(tabs[currentIndex - 1].id);
                }
              }}
              disabled={activeTab === tabs[0].id}
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center space-x-2
                ${activeTab === tabs[0].id 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
            >
              <FiArrowLeft size={18} />
              <span>Previous</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </Link>
              
              {activeTab === tabs[tabs.length - 1].id ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-[#7C9082] to-[#6B7E71] text-white rounded-xl 
                           hover:from-[#6B7E71] hover:to-[#5A6D60] transition-all font-medium
                           flex items-center space-x-2 disabled:opacity-50 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving Product...</span>
                    </>
                  ) : (
                    <>
                      <FiSave size={20} />
                      <span>Save Product</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = tabs.findIndex(t => t.id === activeTab);
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1].id);
                    }
                  }}
                  className="px-8 py-3 bg-[#7C9082] text-white rounded-xl hover:bg-[#6B7E71] 
                           transition-all font-medium flex items-center space-x-2 shadow-lg"
                >
                  <span>Next</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}