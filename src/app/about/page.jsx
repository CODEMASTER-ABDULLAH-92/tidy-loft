// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion, useAnimation, useInView } from 'framer-motion';
// import { useRef } from 'react';
// import { 
//   FiAward, 
//   FiGlobe, 
//   FiHeart, 
//   FiShield, 
//   FiTruck, 
//   FiClock,
//   FiMapPin,
//   FiMail,
//   FiPhone,
//   FiUsers,
//   FiStar,
//   FiArrowRight,
//   FiChevronRight,
//   FiPackage,
//   FiRefreshCw,
//   FiCreditCard,
//   FiHeadphones
// } from 'react-icons/fi';
// import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0 }
// };

// const fadeIn = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 }
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15
//     }
//   }
// };

// const scaleOnHover = {
//   rest: { scale: 1 },
//   hover: { scale: 1.05 }
// };

// export default function AboutPage() {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const controls = useAnimation();
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });

//   useEffect(() => {
//     setIsLoaded(true);
//     if (isInView) {
//       controls.start('visible');
//     }
//   }, [isInView, controls]);

//   // Stats data
//   const stats = [
//     { 
//       icon: FiUsers, 
//       value: '50K+', 
//       label: 'Happy Customers',
//       description: 'Trusted by fashion enthusiasts worldwide'
//     },
//     { 
//       icon: FiGlobe, 
//       value: '120+', 
//       label: 'Countries',
//       description: 'Global shipping to your doorstep'
//     },
//     { 
//       icon: FiPackage, 
//       value: '10K+', 
//       label: 'Products',
//       description: 'Curated luxury collection'
//     },
//     { 
//       icon: FiStar, 
//       value: '4.9', 
//       label: 'Average Rating',
//       description: 'Based on 15K+ reviews'
//     }
//   ];

//   // Features data
//   const features = [
//     {
//       icon: FiTruck,
//       title: 'Free Express Shipping',
//       description: 'Complimentary worldwide shipping on all orders over $500',
//       color: 'from-blue-500 to-indigo-600'
//     },
//     {
//       icon: FiShield,
//       title: 'Authenticity Guaranteed',
//       description: 'Every product is verified by our team of experts',
//       color: 'from-emerald-500 to-teal-600'
//     },
//     {
//       icon: FiRefreshCw,
//       title: 'Easy Returns',
//       description: '30-day hassle-free returns with full refund',
//       color: 'from-purple-500 to-pink-600'
//     },
//     {
//       icon: FiHeadphones,
//       title: '24/7 VIP Support',
//       description: 'Dedicated personal shopper assistance anytime',
//       color: 'from-orange-500 to-red-600'
//     }
//   ];

//   // Team members data
//   const teamMembers = [
//     {
//       name: 'Victoria Chen',
//       role: 'Creative Director',
//       image: '/api/placeholder/400/500',
//       bio: '20+ years in luxury fashion, former head designer at Gucci'
//     },
//     {
//       name: 'Marcus Rivera',
//       role: 'Head of Curation',
//       image: '/api/placeholder/400/500',
//       bio: 'Expert in vintage and contemporary luxury pieces'
//     },
//     {
//       name: 'Sophie Laurent',
//       role: 'Customer Experience',
//       image: '/api/placeholder/400/500',
//       bio: 'Passionate about creating memorable shopping journeys'
//     },
//     {
//       name: 'David Kim',
//       role: 'Operations Director',
//       image: '/api/placeholder/400/500',
//       bio: 'Global logistics and supply chain expert'
//     }
//   ];

//   // Brand values
//   const values = [
//     {
//       icon: FiHeart,
//       title: 'Passion for Luxury',
//       description: 'We curate only the finest pieces from the world\'s most prestigious brands'
//     },
//     {
//       icon: FiAward,
//       title: 'Uncompromising Quality',
//       description: 'Every product meets our rigorous standards of excellence'
//     },
//     {
//       icon: FiGlobe,
//       title: 'Global Community',
//       description: 'Building a worldwide network of discerning fashion enthusiasts'
//     },
//     {
//       icon: FiClock,
//       title: 'Timeless Style',
//       description: 'Celebrating pieces that transcend seasonal trends'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section - LV Style */}
//       <section className="relative overflow-hidden bg-[#f8f4f0]">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0 bg-gradient-to-br from-[#c8a87c] to-transparent" />
//           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/20 to-transparent" />
//         </div>
        
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-3xl"
//           >
//             <span className="inline-block text-[#c8a87c] text-[11px] tracking-[0.2em] uppercase font-light mb-6 border-b border-[#c8a87c]/30 pb-3">
//               About Us
//             </span>
//             <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 leading-[1.1] tracking-tight mb-6">
//               The Art of
//               <span className="block text-[#c8a87c] font-medium mt-1">Luxury Curation</span>
//             </h1>
//             <p className="text-lg font-light text-gray-600 leading-relaxed tracking-wide max-w-2xl mb-10">
//               At LV Style, we believe that true luxury lies in the details. 
//               Since 2015, we've been curating exceptional pieces that embody 
//               timeless elegance, exceptional craftsmanship, and enduring value.
//             </p>
//             <div className="flex flex-wrap gap-4">
//               <Link
//                 href="/shop"
//                 className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-light hover:bg-[#c8a87c] transition-all duration-300"
//               >
//                 <span>Explore Collection</span>
//                 <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </Link>
//               <Link
//                 href="#story"
//                 className="inline-flex items-center gap-3 border border-gray-300 text-gray-700 px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-light hover:border-[#c8a87c] hover:text-[#c8a87c] transition-all duration-300"
//               >
//                 <span>Our Story</span>
//                 <FiArrowRight className="w-4 h-4" />
//               </Link>
//             </div>
//           </motion.div>
//         </div>

//         {/* Decorative elements */}
//         <div className="absolute bottom-0 right-0 w-96 h-96 border-r-2 border-b-2 border-[#c8a87c]/10" />
//         <div className="absolute top-1/2 right-12 w-48 h-48 border-l-2 border-t-2 border-[#c8a87c]/10" />
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 bg-white border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             ref={ref}
//             variants={staggerContainer}
//             initial="hidden"
//             animate={controls}
//             className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
//           >
//             {stats.map((stat, index) => {
//               const Icon = stat.icon;
//               return (
//                 <motion.div
//                   key={index}
//                   variants={fadeInUp}
//                   className="text-center group"
//                 >
//                   <div className="flex justify-center mb-4">
//                     <div className="p-3 rounded-full bg-[#f8f4f0] group-hover:bg-[#c8a87c]/10 transition-colors duration-300">
//                       <Icon className="w-6 h-6 text-[#c8a87c]" />
//                     </div>
//                   </div>
//                   <div className="text-3xl lg:text-4xl font-light text-gray-900 tracking-tight mb-1">
//                     {stat.value}
//                   </div>
//                   <div className="text-sm font-medium text-gray-800 tracking-wide uppercase">
//                     {stat.label}
//                   </div>
//                   <div className="text-xs text-gray-400 mt-1 font-light tracking-wide">
//                     {stat.description}
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </div>
//       </section>

//       {/* Story Section */}
//       <section id="story" className="py-24 bg-[#f8f4f0]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//             >
//               <span className="text-[#c8a87c] text-[11px] tracking-[0.2em] uppercase font-light block mb-4">
//                 Our Story
//               </span>
//               <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-[1.2] tracking-tight mb-6">
//                 Where Excellence Meets
//                 <span className="block text-[#c8a87c] font-medium">Elegance</span>
//               </h2>
//               <div className="space-y-4 text-gray-600 font-light leading-relaxed tracking-wide">
//                 <p>
//                   LV Style was born from a simple yet powerful vision: to create a 
//                   curated destination where discerning individuals could discover 
//                   extraordinary pieces that reflect their unique style and values.
//                 </p>
//                 <p>
//                   What started as a small boutique in Paris has evolved into a 
//                   global community of fashion connoisseurs who appreciate the 
//                   finer things in life. Our journey is driven by an unwavering 
//                   commitment to quality, authenticity, and the timeless allure 
//                   of exceptional craftsmanship.
//                 </p>
//                 <p>
//                   Today, we continue to redefine luxury retail by combining 
//                   traditional values with modern innovation, ensuring that 
//                   every interaction with LV Style is nothing short of extraordinary.
//                 </p>
//               </div>
//               <div className="mt-8 flex items-center gap-6">
//                 <div className="flex -space-x-2">
//                   {[...Array(4)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"
//                       style={{
//                         backgroundImage: `url(/api/placeholder/40/40)`,
//                         backgroundSize: 'cover'
//                       }}
//                     />
//                   ))}
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium text-gray-900">Join 50,000+</div>
//                   <div className="text-xs text-gray-500 font-light">Satisfied customers</div>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="relative"
//             >
//               <div className="relative aspect-[4/5] bg-gray-200 overflow-hidden">
//                 <Image
//                   src="/api/placeholder/800/1000"
//                   alt="LV Style story"
//                   fill
//                   className="object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//               </div>
//               <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-[#c8a87c] flex items-center justify-center">
//                     <FiAward className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-sm font-medium text-gray-900">Award Winning</div>
//                     <div className="text-xs text-gray-500 font-light">Luxury Curator 2024</div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Values Section */}
//       <section className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center max-w-3xl mx-auto mb-16"
//           >
//             <span className="text-[#c8a87c] text-[11px] tracking-[0.2em] uppercase font-light block mb-4">
//               Our Values
//             </span>
//             <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-[1.2] tracking-tight mb-4">
//               The Principles That
//               <span className="block text-[#c8a87c] font-medium">Guide Us</span>
//             </h2>
//             <p className="text-gray-500 font-light tracking-wide">
//               Our values are the foundation of everything we do, from how we curate 
//               our collection to how we serve our community.
//             </p>
//           </motion.div>

//           <motion.div
//             variants={staggerContainer}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
//           >
//             {values.map((value, index) => {
//               const Icon = value.icon;
//               return (
//                 <motion.div
//                   key={index}
//                   variants={fadeInUp}
//                   className="text-center group"
//                 >
//                   <div className="inline-flex p-4 rounded-full bg-[#f8f4f0] group-hover:bg-[#c8a87c] transition-colors duration-300 mb-4">
//                     <Icon className="w-6 h-6 text-[#c8a87c] group-hover:text-white transition-colors duration-300" />
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2 tracking-wide">
//                     {value.title}
//                   </h3>
//                   <p className="text-sm text-gray-500 font-light leading-relaxed tracking-wide">
//                     {value.description}
//                   </p>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-24 bg-[#f8f4f0]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center max-w-3xl mx-auto mb-16"
//           >
//             <span className="text-[#c8a87c] text-[11px] tracking-[0.2em] uppercase font-light block mb-4">
//               Why Choose Us
//             </span>
//             <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-[1.2] tracking-tight">
//               Luxury Experience,
//               <span className="block text-[#c8a87c] font-medium">Elevated Service</span>
//             </h2>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {features.map((feature, index) => {
//               const Icon = feature.icon;
//               return (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   className="bg-white p-8 group hover:shadow-xl transition-shadow duration-500"
//                 >
//                   <div className="flex items-start gap-6">
//                     <div className={`p-3 rounded bg-gradient-to-br ${feature.color} bg-opacity-10 flex-shrink-0`}>
//                       <Icon className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-medium text-gray-900 mb-2 tracking-wide">
//                         {feature.title}
//                       </h3>
//                       <p className="text-gray-500 font-light leading-relaxed tracking-wide text-sm">
//                         {feature.description}
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Testimonial Section */}
//       <section className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="max-w-4xl mx-auto text-center"
//           >
//             <FaQuoteLeft className="w-10 h-10 text-[#c8a87c]/30 mx-auto mb-6" />
//             <blockquote className="text-2xl lg:text-3xl font-light text-gray-800 leading-relaxed tracking-wide">
//               "LV Style has completely transformed my approach to luxury shopping. 
//               Their curated selection and exceptional service make every purchase 
//               feel like discovering a hidden treasure."
//             </blockquote>
//             <div className="mt-8 flex items-center justify-center gap-4">
//               <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
//                 <Image
//                   src="/api/placeholder/48/48"
//                   alt="Customer"
//                   width={48}
//                   height={48}
//                   className="object-cover"
//                 />
//               </div>
//               <div className="text-left">
//                 <div className="font-medium text-gray-900">Isabella Martinez</div>
//                 <div className="text-sm text-gray-500 font-light">Loyal Customer since 2018</div>
//               </div>
//             </div>
//             <FaQuoteRight className="w-10 h-10 text-[#c8a87c]/30 mx-auto mt-6" />
//           </motion.div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="py-24 bg-[#f8f4f0]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center max-w-3xl mx-auto mb-16"
//           >
//             <span className="text-[#c8a87c] text-[11px] tracking-[0.2em] uppercase font-light block mb-4">
//               Our Team
//             </span>
//             <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-[1.2] tracking-tight">
//               The Passionate Minds
//               <span className="block text-[#c8a87c] font-medium">Behind LV Style</span>
//             </h2>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {teamMembers.map((member, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="group"
//               >
//                 <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden mb-4">
//                   <Image
//                     src={member.image}
//                     alt={member.name}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-700"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 tracking-wide">
//                   {member.name}
//                 </h3>
//                 <div className="text-sm text-[#c8a87c] font-light tracking-wide">
//                   {member.role}
//                 </div>
//                 <p className="text-sm text-gray-500 font-light mt-2 leading-relaxed">
//                   {member.bio}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-24 bg-black text-white relative overflow-hidden">
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#c8a87c] to-transparent" />
//         </div>
        
//         <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="text-[#c8a87c] text-[11px] tracking-[0.2em] uppercase font-light block mb-4">
//               Join Our Journey
//             </span>
//             <h2 className="text-4xl lg:text-5xl font-light leading-[1.2] tracking-tight mb-6">
//               Discover the Art of
//               <span className="block text-[#c8a87c] font-medium">Luxury Living</span>
//             </h2>
//             <p className="text-gray-400 font-light tracking-wide max-w-2xl mx-auto mb-10">
//               Subscribe to receive exclusive access to our curated collections, 
//               private sales, and personalized style recommendations.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#c8a87c] transition-colors text-sm font-light tracking-wide"
//               />
//               <button className="px-8 py-4 bg-[#c8a87c] text-white text-[11px] tracking-[0.15em] uppercase font-light hover:bg-white hover:text-black transition-all duration-300">
//                 Subscribe
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }



'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiHeart, FiStar, FiTruck, FiShield, FiUsers, FiAward, FiSmile, FiTarget, FiCheckCircle } from 'react-icons/fi';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function AboutPage() {
  const stats = [
    { icon: FiSmile, value: '10,000+', label: 'Happy Customers' },
    { icon: FiAward, value: '500+', label: 'Curated Products' },
    { icon: FiStar, value: '4.9/5', label: 'Average Rating' },
    { icon: FiTruck, value: '50+', label: 'Shipping Countries' },
  ];

  const values = [
    {
      icon: FiHeart,
      title: 'Passion for Organization',
      description: 'We believe that an organized home leads to a peaceful mind. Every product we curate is chosen with care and attention to detail.'
    },
    {
      icon: FiTarget,
      title: 'Quality First',
      description: 'We handpick each product based on quality, functionality, and design. Only the best make it to our store.'
    },
    {
      icon: FiShield,
      title: 'Trusted Partnerships',
      description: 'We work with trusted brands and manufacturers to bring you products that stand the test of time.'
    },
    {
      icon: FiUsers,
      title: 'Community Focused',
      description: 'We\'re building a community of home organization enthusiasts who share tips, ideas, and inspiration.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
      bio: 'Home organization expert with 15 years of experience in interior design.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Curation',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      bio: 'Product specialist who ensures every item meets our quality standards.'
    },
    {
      name: 'Emily Davis',
      role: 'Customer Experience',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      bio: 'Dedicated to making every customer interaction exceptional.'
    },
    {
      name: 'David Wilson',
      role: 'Content Creator',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      bio: 'Creates helpful organization tips and inspiration for our community.'
    }
  ];

  const milestones = [
    { year: '2020', title: 'The Beginning', description: 'The Tidy Loft was founded with a simple mission: help people create beautiful, organized homes.' },
    { year: '2021', title: 'Growing Community', description: 'Reached 5,000 happy customers and expanded our product categories.' },
    { year: '2022', title: '500+ Products', description: 'Curated over 500 quality products across 6 organization categories.' },
    { year: '2023', title: '10K Customers', description: 'Celebrated reaching 10,000+ customers worldwide.' },
    { year: '2024', title: 'Innovation', description: 'Launched new features and continued expanding our curated collection.' }
  ];

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#F5F2ED] to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-[#7C9082] font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mt-4 mb-6">
                About The Tidy Loft
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                We're on a mission to transform houses into organized, beautiful homes 
                that inspire joy and peace of mind. Every product we curate is chosen 
                to help you create spaces you'll love.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-[#F5F2ED] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="text-[#7C9082]" size={28} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-20 bg-[#F5F2ED]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[#7C9082] font-semibold text-sm uppercase tracking-wider">
                  Our Mission
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-3 mb-6">
                  Making Every Home Beautifully Organized
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  At The Tidy Loft, we believe that an organized home is the foundation 
                  for a peaceful, productive life. Our mission is to make home organization 
                  accessible, beautiful, and enjoyable for everyone.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We carefully curate each product in our collection, ensuring it meets 
                  our high standards for quality, functionality, and aesthetic appeal. 
                  From kitchen organization to bathroom storage, we have solutions for 
                  every room in your home.
                </p>
                <div className="space-y-3">
                  {[
                    'Curated selection of quality products',
                    'Affordable prices with exclusive deals',
                    'Expert organization tips and inspiration',
                    'Exceptional customer support',
                    'Fast and reliable shipping'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <FiCheckCircle className="text-[#7C9082] flex-shrink-0" size={18} />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
                    alt="Organized kitchen"
                    className="rounded-2xl w-full h-64 object-cover mb-6"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop"
                    alt="Organized living room"
                    className="rounded-2xl w-full h-48 object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-[#7C9082] font-semibold text-sm uppercase tracking-wider">
                What We Stand For
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-3 mb-4">
                Our Core Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do, from product selection to customer service.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#7C9082]/20"
                >
                  <div className="w-16 h-16 bg-[#F5F2ED] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="text-[#7C9082]" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="py-20 bg-[#F5F2ED]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-[#7C9082] font-semibold text-sm uppercase tracking-wider">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-3 mb-4">
                How We Got Here
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From a small idea to a thriving community of home organization enthusiasts.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#7C9082]/20 hidden md:block" />
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <span className="text-[#7C9082] font-bold text-lg">{milestone.year}</span>
                        <h3 className="text-xl font-semibold text-gray-900 mt-1 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex w-4 h-4 bg-[#7C9082] rounded-full flex-shrink-0 relative z-10" />
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-[#7C9082] font-semibold text-sm uppercase tracking-wider">
                Meet Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-3 mb-4">
                The People Behind The Tidy Loft
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A passionate team dedicated to helping you create your dream organized home.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover shadow-lg group-hover:shadow-xl transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-full border-4 border-[#7C9082]/20 group-hover:border-[#7C9082] transition-all duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-[#7C9082] text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#7C9082] to-[#6B7E71]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Ready to Transform Your Home?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Explore our curated collection of home organization products and start 
                creating the beautifully organized home you deserve.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/all_products"
                  className="px-8 py-4 bg-white text-[#7C9082] rounded-full font-semibold 
                           hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Shop All Products
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}