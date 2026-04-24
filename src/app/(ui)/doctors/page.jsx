"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
const DoctorListing = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Apple-style Animation Variants
  const smokyVariant = {
    hidden: { 
      opacity: 0, 
      scale: 1.6,       // Ultra zoom start
      filter: "blur(20px)", // Smoky/Blurry start
    },
    visible: (i) => ({
      opacity: 1,
      scale: 1,         // Familiar size
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1, // Staggered appearance
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom Apple-like cubic-bezier
      }
    }),
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
      transition: { duration: 0.3 }
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/doctors');
        if (!response.ok) throw new Error('Failed to fetch doctors');
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doc =>
    doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen text-red-500 font-medium">
      Error: {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fbfbfd] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-black tracking-tight mb-4">
            Find Best Doctors even for <span className="text-blue-500">fever</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium">A healthier you, just a search away.</p>
        </motion.div>

        {/* Search Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-xl mx-auto mb-20 relative"
        >
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or specialization..."
              className="w-full pl-14 pr-6 py-5 bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm focus:shadow-xl focus:ring-1 focus:ring-gray-300 transition-all outline-none text-lg"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <Loader2 className="animate-spin text-blue-500" size={40} />
            <p className="text-gray-400 animate-pulse">Consulting our database...</p>
          </div>
        ) : (
          <>
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
            >
              <AnimatePresence mode='popLayout'>
                {filteredDoctors.map((doc, i) => (
                  <motion.div
                    key={doc.id || doc._id || i}
                    custom={i}
                    variants={smokyVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="bg-white  overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 transition-shadow duration-500"
                  >
                    {/* Centered Card Layout */}
                    <div className="flex flex-col items-center p-8">
                      {/* Image - Circular/Premium Style */}
                      <div className="h-44 w-44  overflow-hidden mb-6 ring-4 ring-gray-50 shadow-inner">
                        <Image
                          src={doc.image || '/placeholder-doctor.jpg'} 
                          alt={doc.name}
                          width={200}
                          height={350}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Text Content Center Aligned */}
                      <div className="text-center w-full">
                        <h3 className="text-2xl font-bold text-gray-900 mb-1 leading-tight">
                          {doc.name}
                        </h3>
                        <p className="text-blue-500 font-semibold tracking-wide uppercase text-xs mb-8">
                          {doc.specialization}
                        </p>
                        {/* slug sections */}
                        <motion.section
                         
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-4 bg-black hover:bg-gray-800 text-white rounded-2xl font-bold tracking-tight transition-colors shadow-lg shadow-gray-200"
                        >
                         <Link href={`/doctors/${doc._id}`} className="block w-full text-center">
                           Details
                         </Link>
                        </motion.section>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredDoctors.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-20"
              >
                <p className="text-gray-400 text-xl font-light italic underline decoration-blue-200 underline-offset-8">
                  No specialists found for your search.
                </p>
              </motion.div>
            )}

            {/* Pagination UI */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-24 flex justify-center items-center gap-2"
            >
              <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-black hover:text-white transition-all shadow-sm">
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex items-center bg-gray-100 p-1.5 rounded-full px-4 space-x-2">
                {[1, 2, 3].map((page) => (
                  <button 
                    key={page}
                    className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
                      page === 1 ? 'bg-white text-black shadow-md' : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-black hover:text-white transition-all shadow-sm">
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorListing;