"use client";

import React from 'react';
import { motion } from 'framer-motion';

const appleSettle = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: {
    duration: 0.8,
    ease: [0.25, 1, 0.5, 1],
  },
};

const AiHeading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center mx-auto">
      <motion.div 
        {...appleSettle}
        className="max-w-7xl w-full bg-[#92E32B]/10 rounded-[50px] py-24 text-center px-6 relative overflow-hidden"
      >
        <h2 className="text-[38px] md:text-[50px] font-[800] text-[#111827] leading-[1.1] tracking-tight relative z-10">
          Ready to Experience Smarter <br className="hidden md:block"/> Healthcare?
        </h2>

        <p className="text-gray-500 text-[14px] font-semibold mt-6 mb-10 max-w-lg mx-auto relative z-10">
          Start a live chat with our AI doctor or explore our AI-powered solutions.
        </p>

        <button className="bg-[#92E32B] text-white px-9 py-4 rounded-full font-[800] text-[13px] shadow-lg shadow-[#92E32B]/30 hover:scale-105 active:scale-95 transition-all relative z-10">
          Try Now This Platform
        </button>

        <div className="absolute top-0 right-0 w-64 h-64 bg-[#92E32B]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      </motion.div>
    </div>
  );
};

export default AiHeading;