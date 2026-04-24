"use client";
import React, { useState } from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import {
    Video, Star, MoreHorizontal, Clock, Phone,
    ArrowRight, Activity, ShieldCheck, DollarSign, Headphones
} from 'lucide-react';
import { useSession } from "next-auth/react";
import VideoCall from '@/app/(Services)/VideoCall';

const fetcher = (url) => fetch(url).then((res) => res.json());

const LiveConsult = ({ initialDoctors }) => {
    const [showVideoCall, setShowVideoCall] = useState(false);

    // SWR for high-performance background updates
    const { data: doctors } = useSWR('/api/live-consult', fetcher, {
        fallbackData: initialDoctors,
        refreshInterval: 5000,
        revalidateOnFocus: true
    });

    const { data: session } = useSession();
    const userId = session?.user?.id;
    const userName = session?.user?.name;

    const startCall = () => setShowVideoCall(true);

    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    };

    const historyItems = [
        { title: "Cold and Flue Symptom", date: "March 20, 2025" },
        { title: "Fever & Chills", date: "March 18, 2025" },
        { title: "Muscle & Joint Pain", date: "March 12, 2025" },
    ];

    return (
        <>
            {showVideoCall && (
                <VideoCall userId={userId} userName={userName} onCallEnd={() => setShowVideoCall(false)} />
            )}

            <div className="bg-[#FBFBFD] min-h-screen text-[#1d1d1f] pb-32 overflow-hidden">

                {/* --- HERO SECTION --- */}
                <header className="max-w-6xl mx-auto px-6 pt-20 pb-12">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Live Consultant</p>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-12">Take care from Home.</h1>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Interactive Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-7 relative group"
                        >
                            <div className="rounded-[2.5rem] overflow-hidden h-[450px] bg-gray-200 shadow-sm border border-gray-100">
                                <img
                                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    alt="Medical"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={startCall}
                                        className="bg-[#A3E635] p-8 rounded-full shadow-2xl relative z-10"
                                    >
                                        <Phone size={32} fill="black" />
                                    </motion.button>
                                    <div className="absolute w-24 h-24 bg-[#A3E635] rounded-full blur-3xl opacity-40 animate-pulse" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick History */}
                        <div className="lg:col-span-5 flex flex-col justify-center">
                            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                <Clock size={18} /> Recent History
                            </h2>
                            <div className="space-y-3">
                                {historyItems.map((item, i) => (
                                    <div key={i} className="p-5 bg-white border border-gray-100 rounded-[20px] flex justify-between items-center hover:border-gray-300 transition-all cursor-pointer group">
                                        <div>
                                            <p className="font-semibold text-[15px]">{item.title}</p>
                                            <p className="text-xs text-gray-400">{item.date}</p>
                                        </div>
                                        <ArrowRight size={16} className="text-gray-300 group-hover:text-black transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </header>

                {/* --- LIVE PROFESSIONALS (THE UPDATED FAST SECTION) --- */}
                <section className="max-w-6xl mx-auto px-6 mt-24">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <h2 className="text-2xl font-bold tracking-tight">Available Professionals</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {doctors?.map((doctor, index) => (
                            <ProfessionalCard key={doctor.id || index} doctor={doctor} onCall={startCall} />
                        ))}
                    </div>
                </section>

                {/* --- HOW IT WORKS --- */}
                <section className="max-w-6xl mx-auto px-6 mt-32 text-center">
                    <h2 className="text-4xl font-bold mb-4">How It Works</h2>
                    <p className="text-gray-400 mb-16 italic">Simple steps to professional AI care.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { step: "01", t: "Describe Symptoms", img: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=400" },
                            { step: "02", t: "AI Analysis", img: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400" },
                            { step: "03", t: "Get Advice", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400" },
                            { step: "04", t: "Connect Doctor", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400" }
                        ].map((item, i) => (
                            <div key={i} className="text-left">
                                <div className="rounded-[2rem] overflow-hidden h-48 mb-4">
                                    <img src={item.img} className="w-full h-full object-cover" alt="" />
                                </div>
                                <p className="text-[#A3E635] text-xs font-bold tracking-widest">{item.step}</p>
                                <h3 className="text-lg font-bold">{item.t}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- WHY USE --- */}
                <section className="max-w-6xl mx-auto px-6 mt-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-4">
                            <h2 className="text-4xl font-bold leading-tight">Why Use <br /> Consultant</h2>
                        </div>
                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <BenefitCard icon={<Headphones />} title="24/7 Availability" color="bg-purple-500" />
                            <BenefitCard icon={<Activity />} title="Fast & Accurate" color="bg-emerald-500" />
                            <BenefitCard icon={<DollarSign />} title="Saves Money" color="bg-orange-500" />
                            <BenefitCard icon={<ShieldCheck />} title="Confidential" color="bg-rose-500" />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

// --- COMPONENTS ---

const ProfessionalCard = React.memo(({ doctor, onCall }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-200/60 rounded-[24px] p-5 hover:border-gray-300 transition-colors"
    >
        <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <img src={doctor.image} alt="" className="w-14 h-14 rounded-full object-cover bg-gray-50" />
                    {doctor.available && (
                        <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                    )}
                </div>
                <div>
                    <h3 className="font-semibold text-[17px] tracking-tight">{doctor.name}</h3>
                    <p className="text-[14px] text-gray-500">{doctor.specialization}</p>
                </div>
            </div>
            <MoreHorizontal size={18} className="text-gray-400" />
        </div>

        <div className="flex items-center gap-4 mb-6">
            <div className="bg-gray-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Star size={12} className="fill-black" />
                <span className="text-[13px] font-bold">{doctor.rating}</span>
            </div>
            <div className="text-[13px] text-gray-400 font-medium">{doctor.experience} experience</div>
        </div>

        <button
            disabled={!doctor.available}
            onClick={onCall}
            className={`w-full py-3 rounded-xl font-semibold text-[15px] transition-all ${doctor.available
                    ? 'bg-[#1d1d1f] text-white hover:bg-black active:scale-[0.98]'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
        >
            {doctor.available ? 'Consult Now' : 'Currently Busy'}
        </button>
    </motion.div>
));

const BenefitCard = ({ icon, title, color }) => (
    <div className="bg-white p-6 rounded-[22px] border border-gray-100 flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color} text-white`}>
            {React.cloneElement(icon, { size: 18 })}
        </div>
        <h4 className="font-semibold text-[15px]">{title}</h4>
    </div>
);

ProfessionalCard.displayName = "ProfessionalCard";

export default LiveConsult;