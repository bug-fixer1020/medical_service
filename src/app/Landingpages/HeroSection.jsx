'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero = () => {
  // Apple-style "Settle": Starts 10% larger and settles to 100%
  const appleSettle = {
    initial: { scale: 1.1, opacity: 0, filter: 'blur(15px)' },
    animate: { scale: 1, opacity: 1, filter: 'blur(0px)' },
    transition: { 
      type: "spring", 
      stiffness: 60, 
      damping: 20, 
      mass: 1.2
    }
  };

  const waveHeights = [40, 70, 45, 90, 65, 30, 80, 55, 95, 40, 60, 35, 75, 50, 85];

  return (
    <section className="h-screen min-h-200 flex flex-col justify-center items-center bg-white px-4 overflow-hidden">
      <div className="max-w-screen-xl w-full mx-auto">
        
        {/* --- TOP SECTION --- */}
        <div className="text-center mb-8">
          <motion.div {...appleSettle} transition={{ ...appleSettle.transition, delay: 0.1 }}>
            <span className="px-4 py-1 rounded-full bg-[#92E32B]/10 text-[#92E32B] text-[10px] font-extrabold uppercase tracking-[0.2em]">
              AI Healthcare Service
            </span>
          </motion.div>

          <motion.h1 
            {...appleSettle} transition={{ ...appleSettle.transition, delay: 0.2 }}
            className="mt-4 text-[44px] lg:text-[60px] font-[800] text-[#111827] leading-[1.1] tracking-tight"
          >
            Experience Smart, AI-Driven <span className="text-[#92E32B]">Healthcare</span>
            <div className="flex items-center justify-center gap-4 mt-1">
              <div className="flex -space-x-4">
                {[1, 2].map((i) => (
                  <div key={i} className="w-11 h-11 rounded-full border-[3px] border-white overflow-hidden relative shadow-sm">
                    <Image
                      src={`https://i.pravatar.cc/150?u=${i+20}`}
                      alt="u"
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="w-11 h-11 rounded-full border-[3px] border-white bg-[#111827] text-white flex items-center justify-center text-[10px] font-bold z-10 shadow-sm">
                  2+
                </div>
              </div>
              <span className="font-heading">for Faster, Better Care!</span>
            </div>
          </motion.h1>

          <motion.div 
            {...appleSettle} transition={{ ...appleSettle.transition, delay: 0.3 }}
            className="mt-8 max-w-xl mx-auto relative"
          >
            <input 
              type="text" 
              placeholder="Search any question about health and hospital related"
              className="w-full py-4 px-8 pr-16 rounded-full border border-gray-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-2 focus:ring-[#92E32B]/30 text-sm font-medium"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#92E32B] rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-90">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </motion.div>
        </div>

        {/* --- BOTTOM INTERFACE GRID --- */}
        <div className="grid grid-cols-12 gap-6 items-end mt-4">
          
          {/* LEFT COLUMN */}
          <motion.div {...appleSettle} transition={{ ...appleSettle.transition, delay: 0.4 }} className="col-span-3 space-y-4">
            <div className="bg-white p-5 rounded-[30px] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-[800] text-[13px] text-gray-900">Chat History</h3>
                <span className="text-[9px] text-gray-400 font-bold cursor-pointer">SEE ALL</span>
              </div>
              <div className="space-y-4">
                {[{t:'Best Hospital In Dhaka', i:'📄'}, {t:'Best Doctor in Dhaka', i:'👤'}].map((item, i) => (
                  <div key={i} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#92E32B]/10 flex items-center justify-center text-[12px]">{item.i}</div>
                      <span className="text-[11px] font-bold text-gray-700">{item.t}</span>
                    </div>
                    <span className="text-gray-300 group-hover:rotate-90 transition-transform">↺</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#92E32B]/10 p-6 rounded-[30px] relative overflow-hidden">
               <p className="text-[13px] font-[700] text-[#111827] leading-[1.5] relative z-10">
                 We empower healthcare with AI-driven solutions for faster, accurate, and personalized care.
               </p>
            </div>
          </motion.div>

          {/* CENTER COLUMN (MAIN VIEW) */}
          <motion.div {...appleSettle} transition={{ ...appleSettle.transition, delay: 0.5 }} className="col-span-6">
            <div className="rounded-[45px] overflow-hidden border-[8px] border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] relative aspect-[16/10] bg-gray-50">
              <Image
                src={'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'}
                alt="AI Consultant"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="eager"
                className="object-cover"
              />
              <div className="absolute top-5 left-5">
                <span className="bg-black/40 backdrop-blur-2xl text-white text-[10px] px-4 py-2 rounded-full border border-white/20 font-bold">
                  AI Health Consultant
                </span>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl border border-white/20 text-white">🔈</button>
                <button className="w-14 h-14 rounded-full bg-[#FF3B30] flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all">
                   <span className="rotate-[135deg] text-2xl">📞</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl border border-white/20 text-white">🎤</button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN (VOICE/CHAT) */}
          <motion.div {...appleSettle} transition={{ ...appleSettle.transition, delay: 0.6 }} className="col-span-3 space-y-4">
            <div className="bg-white p-4 rounded-[25px] border border-gray-100 shadow-sm flex items-center gap-3">
               <button className="w-8 h-8 rounded-full bg-[#92E32B] flex items-center justify-center text-white shadow-md">▶</button>
               <div className="flex-1 h-6 flex items-end gap-[2px]">
                  {waveHeights.map((h, i) => (
                    <div key={i} className="flex-1 bg-[#92E32B]/30 rounded-full" style={{ height: `${h}%` }}></div>
                  ))}
               </div>
               <span className="text-[10px] font-extrabold text-gray-400">4:15</span>
            </div>

            <div className="space-y-3">
              <div className="bg-[#92E32B]/10 p-4 rounded-[22px] rounded-tl-none text-[11px] font-bold text-gray-700 leading-relaxed">
                Hi! I&apos;m here to help. Can you tell me more about your symptoms?
              </div>
              <div className="bg-[#111827] p-4 rounded-[22px] rounded-tr-none text-[11px] font-bold text-white ml-auto max-w-[85%]">
                I&apos;ve had a headache since yesterday.
              </div>
              <div className="bg-[#92E32B]/10 p-4 rounded-[22px] rounded-tl-none text-[11px] font-bold text-gray-700">
                Do you also have a fever?
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;