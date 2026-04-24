'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebookF, FaXTwitter, FaYoutube, FaInstagram } from 'react-icons/fa6';

const Footer = () => {
  const appleSettle = {
    initial: { scale: 1.05, opacity: 0, filter: 'blur(10px)' },
    whileInView: { scale: 1, opacity: 1, filter: 'blur(0px)' },
    viewport: { once: true },
    transition: { type: "spring", stiffness: 40, damping: 20 }
  };

  const socials = [
    { icon: <FaFacebookF size={16} />, active: true },
    { icon: <FaXTwitter size={16} />, active: false },
    { icon: <FaYoutube size={16} />, active: false },
    { icon: <FaInstagram size={16} />, active: false },
  ];

  return (
    <footer className="px-4 pb-8 mt-14">
      {/* FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto text-center">
        {/* LOGO: SPOT TEXT */}
        <Link href="/" className="inline-block mb-12">
          <span className="text-[30px] font-black text-[#111827] tracking-tighter">SPOT</span>
          <span className="text-[#92E32B] text-4xl font-black">.</span>
        </Link>

        {/* NAV LINKS */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-14 mb-12 border-y border-gray-100 py-10">
          {['Home', 'Live AI Consultant', 'Find Doctor', 'Blog'].map((link) => (
            <Link key={link} href="#" className="text-[12px] font-extrabold text-gray-500 hover:text-black transition-colors uppercase tracking-[0.15em]">
              {link}
            </Link>
          ))}
        </div>

        {/* SOCIALS */}
        <div className="flex justify-center gap-4">
          {socials.map((social, i) => (
            <Link 
              key={i} 
              href="#" 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            >
              {social.icon}
            </Link>
          ))}
        </div>
        
        <p className="text-[10px] text-gray-300 font-bold mt-12 uppercase tracking-[0.2em]">
          © 2025 SPOT HEALTHCARE SOLUTIONS. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;