'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

// ========== MOCK DATA ==========
const blogPosts = [
  {
    id: 1,
    title: "How AI is Revolutionizing Modern Healthcare",
    date: "Jun 25, 2025",
    author: "Dr. Sarah Johnson",
    imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800",
  },
  {
    id: 2,
    title: "5 Morning Habits for a Healthier Heart",
    date: "Jun 18, 2025",
    author: "Dr. Michael Chen",
    imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800",
  },
  {
    id: 3,
    title: "Understanding Mental Health in Digital Age",
    date: "Jun 10, 2025",
    author: "Dr. Emily Rodriguez",
    imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=800",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sophia M.",
    role: "CEO of Prime Network",
    text: "I was amazed at how quickly I received accurate advice from the AI doctor!",
    rating: 5,
    variant: "dark",
  },
  {
    id: 2,
    name: "Dr. Liam H.",
    role: "Orthopedics",
    text: "As a doctor, the AI solutions help me provide more efficient patient care.",
    rating: 5,
    variant: "light",
  },
];

// ========== ANIMATION SETTINGS ==========
const fadeUpVariants = {
  initial: { y: 40, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
};

// ========== REUSABLE COMPONENTS ==========
const NavButton = ({ icon: Icon, variant = "outline", onClick }) => {
  const isPrimary = variant === "primary";
  
  return (
    <button
      onClick={onClick}
      className={`
        w-10 h-10 rounded-full flex items-center justify-center transition-all
        ${isPrimary 
          ? 'bg-lime-500 text-white shadow-lg hover:bg-lime-600' 
          : 'border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600'
        }
      `}
    >
      <Icon size={18} />
    </button>
  );
};

const StarRating = ({ rating, size = 12 }) => {
  return (
    <div className="flex gap-1">
      {[...Array(rating)].map((_, i) => (
        <FaStar key={i} size={size} className="text-lime-500" />
      ))}
    </div>
  );
};

const BlogCard = ({ post, index }) => {
  return (
    <motion.article
      {...fadeUpVariants}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="rounded-3xl overflow-hidden aspect-[1.3/1] relative mb-5 bg-gray-100">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      
      <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
        <span>{post.date}</span>
        <span>•</span>
        <span>By {post.author}</span>
      </div>
      
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-base font-extrabold text-gray-900 leading-tight group-hover:text-lime-500 transition-colors">
          {post.title}
        </h3>
        <div className="shrink-0 w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-lime-500 group-hover:text-white group-hover:border-lime-500 transition-all">
          <FiArrowUpRight size={18} />
        </div>
      </div>
    </motion.article>
  );
};

const TestimonialCard = ({ testimonial }) => {
  const isDark = testimonial.variant === "dark";
  
  return (
    <motion.div
      {...fadeUpVariants}
      transition={{ delay: testimonial.id === 1 ? 0.2 : 0.3 }}
      className={`
        flex-1 p-10 rounded-[35px] relative
        ${isDark 
          ? 'bg-gray-900 text-white' 
          : 'bg-white border border-gray-100 shadow-lg'
        }
      `}
    >
      <FaQuoteLeft className="text-lime-500 mb-8 opacity-50" size={28} />
      <StarRating rating={testimonial.rating} />
      <p className={`
        text-base font-medium leading-relaxed my-6 italic
        ${isDark ? 'text-gray-300' : 'text-gray-600'}
      `}>
        &quot;{testimonial.text}&quot;
      </p>
      <div>
        <p className="font-bold text-sm">{testimonial.name}</p>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">
          {testimonial.role}
        </p>
      </div>
    </motion.div>
  );
};

// ========== MAIN COMPONENT ==========
const Articles = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      
      {/* Header Section */}
      <div className="flex flex-wrap justify-between items-end gap-6 mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Our Latest Articles
          </h2>
          <p className="text-xs md:text-sm text-gray-400 font-semibold mt-2 uppercase tracking-wider">
            Explore Expert Insights and Health Tips
          </p>
        </div>
        
        <div className="flex gap-3">
          <NavButton icon={FiArrowLeft} />
          <NavButton icon={FiArrowRight} variant="primary" />
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-32">
        {blogPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {/* Testimonials Section */}
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side - Header */}
        <div className="lg:col-span-4">
          <span className="inline-block px-3 py-1 bg-lime-500/10 text-lime-600 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
            Testimonial
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Trusted by Patients and Healthcare Professionals
          </h2>
          <div className="flex gap-3 mt-8 md:mt-10">
            <NavButton icon={FiArrowLeft} />
            <NavButton icon={FiArrowRight} variant="primary" />
          </div>
        </div>

        {/* Right Side - Testimonials Cards */}
        <div className="lg:col-span-8 flex flex-col md:flex-row gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Articles;