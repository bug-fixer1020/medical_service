'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, ArrowUpRight, ShieldCheck, Bot, Hospital, Activity } from 'lucide-react';

const OurServices = () => {
  // Refined Apple-style "Settle" (Scale 1.05 -> 1.0)
  const appleSettle = {
    initial: { scale: 1.05, opacity: 0, filter: 'blur(8px)', y: 10 },
    whileInView: { scale: 1, opacity: 1, filter: 'blur(0px)', y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { 
      type: "spring", 
      stiffness: 40, 
      damping: 20, 
      mass: 1.2 
    }
  };

  // Ultra-smooth "Rise" for scrolling
  const smoothRise = {
    initial: { y: 30, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } // Custom cubic-bezier for silkiness
  };

  const serviceList = [
    { title: "AI-Powered Symptom Checker", desc: "Our AI-driven tool quickly analyzes symptoms and provides instant health assessments.", icon: <Activity size={22} className="text-[#92E32B]" />, bg: "bg-[#92E32B]/10" },
    { title: "Smart Doctor & Hospital Finder", desc: "Easily find top doctors and hospitals near you with AI-powered search and instant booking.", icon: <Hospital size={22} className="text-purple-500" />, bg: "bg-purple-50" },
    { title: "Secure Health Data Management", desc: "Your health records are safely stored, easily accessible, and securely shared.", icon: <ShieldCheck size={22} className="text-blue-500" />, bg: "bg-blue-50" },
    { title: "AI Virtual Health Assistant", desc: "Chat with our intelligent AI chatbot for instant health advice and guidance anytime.", icon: <Bot size={22} className="text-orange-500" />, bg: "bg-orange-50" },
  ];

  return (
    <div className="bg-white font-sans overflow-hidden">
      
      {/* --- SECTION 1: LIST (Apple Style) --- */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <motion.div {...appleSettle}>
          <h2 className="text-[40px] font-[800] text-[#111827] tracking-tight">Our Service</h2>
          <p className="text-[13px] text-gray-400 mt-3 font-semibold uppercase tracking-widest">Explore Expert Insights and Health Tips</p>
        </motion.div>

        <div className="mt-14 space-y-4 max-w-4xl mx-auto">
          {serviceList.map((item, i) => (
            <motion.div 
              key={i}
              {...appleSettle}
              transition={{ ...appleSettle.transition, delay: i * 0.08 }}
              className="group flex items-center justify-between p-6 rounded-[30px] bg-white border border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-center gap-5 text-left">
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#111827]">{item.title}</h4>
                  <p className="text-gray-500 text-[13px] mt-1 max-w-md font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-[#92E32B] group-hover:text-white transition-all">
                <ArrowUpRight size={18} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FEATURE SECTION: ANALYTICS --- */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div {...smoothRise}>
          <h2 className="text-[34px] font-[800] leading-[1.2] text-[#111827]">AI-Enhanced Health <br/> Analytics</h2>
          <p className="text-gray-500 mt-5 text-[14px] leading-[1.6] font-medium">Leverage AI for accurate health insights and smarter diagnostics. Monitor vital signs and track health data effortlessly.</p>
          <ul className="mt-8 space-y-3">
            {["Symptom Analysis", "Health Data Monitoring", "Chronic Management"].map((text) => (
              <li key={text} className="flex items-center gap-3 text-[13px] font-bold text-gray-700">
                <div className="w-5 h-5 bg-[#92E32B]/20 rounded-full flex items-center justify-center text-[#92E32B]"><Check size={12} strokeWidth={4} /></div>
                {text}
              </li>
            ))}
          </ul>
          <button className="mt-10 px-7 py-3.5 bg-[#92E32B] text-white rounded-2xl text-[13px] font-bold shadow-lg shadow-[#92E32B]/20 hover:scale-105 transition-transform">Start Live Chat</button>
        </motion.div>
        
        <motion.div {...smoothRise} className="relative">
          <div className="rounded-[40px] overflow-hidden border-[10px] border-white shadow-2xl aspect-[1.2/1] relative">
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200"
              alt="UI"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/40 backdrop-blur-2xl px-5 py-3 rounded-full flex gap-3 border border-white/20 shadow-xl">
             <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-[14px]">🔈</div>
             <div className="w-11 h-11 rounded-full bg-red-500 flex items-center justify-center text-white -mt-1 shadow-lg">📞</div>
             <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-[14px]">🎤</div>
          </div>
        </motion.div>
      </section>

      {/* --- FEATURE SECTION: CHATBOT --- */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div {...smoothRise} className="lg:order-2">
          <h2 className="text-[34px] font-[800] leading-[1.2] text-[#111827]">Smart AI Health <br/> Chatbot</h2>
          <p className="text-gray-500 mt-5 text-[14px] leading-[1.6] font-medium">Get instant, reliable answers to health questions anytime. Our AI chatbot offers quick symptom checks 24/7.</p>
          <div className="mt-8 flex gap-10">
            <div>
              <p className="text-[28px] font-black text-[#111827] tracking-tighter">0.12 sec</p>
              <p className="text-gray-400 text-[11px] font-bold uppercase mt-1">Response Time</p>
            </div>
            <div className="w-[1px] bg-gray-100" />
            <div>
              <p className="text-[28px] font-black text-[#111827] tracking-tighter">50M+</p>
              <p className="text-gray-400 text-[11px] font-bold uppercase mt-1">Users</p>
            </div>
          </div>
          <button className="mt-10 px-7 py-3.5 bg-[#92E32B] text-white rounded-2xl text-[13px] font-bold shadow-lg shadow-[#92E32B]/20">Start Live Chat</button>
        </motion.div>
        <motion.div {...smoothRise} className="lg:order-1 rounded-[40px] overflow-hidden aspect-[1.2/1] relative shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200"
            alt="Chat"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#92E32B]/10 flex items-center justify-center">
             <div className="bg-white/90 backdrop-blur-md p-6 rounded-[30px] shadow-2xl w-[70%]">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#92E32B] flex items-center justify-center text-white text-xs">AI</div>
                  <span className="text-[14px] font-black text-[#111827]">Chat AI</span>
               </div>
               <div className="h-2 w-full bg-gray-100 rounded-full mb-2" />
               <div className="h-2 w-2/3 bg-[#92E32B]/20 rounded-full" />
             </div>
          </div>
        </motion.div>
      </section>

      {/* --- STATS BANNER --- */}
      <section className="bg-[#92E32B] py-24 px-6 mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { val: "98.9%", sub: "Accurate AI Diagnoses" },
            { val: "2.5M+", sub: "Prescriptions" },
            { val: "300K+", sub: "Specialists" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              {...smoothRise}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[32px] p-10 text-center shadow-lg hover:translate-y-[-5px] transition-transform duration-500"
            >
              <p className="text-[40px] font-black text-[#92E32B] tracking-tighter">{stat.val}</p>
              <p className="text-gray-400 text-[13px] font-bold mt-2 uppercase tracking-wide">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default OurServices;