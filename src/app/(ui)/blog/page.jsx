"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Clock, User, ChevronRight, Share2 } from 'lucide-react';

const categories = ["All", "Wellness", "Technology", "Mental Health", "Nutrition", "Innovation"];

const blogPosts = [
    {
        id: 1,
        category: "Technology",
        title: "The Future of AI in Remote Patient Monitoring",
        excerpt: "How artificial intelligence is closing the gap between home care and hospital-grade diagnostics.",
        author: "Dr. Sarah Chen",
        date: "March 24, 2025",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
        featured: true
    },
    {
        id: 2,
        category: "Wellness",
        title: "Understanding Your Heart Rate Variability",
        excerpt: "Why HRV is the most important metric you aren't tracking for your long-term health.",
        author: "Marcus Thorne",
        date: "March 22, 2025",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1505751172107-573225a91200?auto=format&fit=crop&q=80&w=800",
        featured: false
    },
    {
        id: 3,
        category: "Mental Health",
        title: "Digital Detox: Reclaiming Focus in a Wired World",
        excerpt: "Practical strategies to reduce screen time and improve cognitive function and sleep quality.",
        author: "Emma Wilson",
        date: "March 20, 2025",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1493839523149-2864fca44919?auto=format&fit=crop&q=80&w=800",
        featured: false
    },
    {
        id: 4,
        category: "Nutrition",
        title: "The Science of Gut Health and Immunity",
        excerpt: "Exploring the profound connection between your microbiome and your body's defense system.",
        author: "Dr. Julian Voss",
        date: "March 18, 2025",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
        featured: false
    },
];

const Spotblog = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredPosts = activeCategory === "All"
        ? blogPosts
        : blogPosts.filter(post => post.category === activeCategory);

    const featuredPost = blogPosts.find(p => p.featured);

    return (
        <div className="bg-[#FBFBFD] min-h-screen text-[#1d1d1f] pb-20">
            {/* --- NAVIGATION / HEADER --- */}
            <header className="max-w-6xl mx-auto px-6 pt-20 pb-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-widest mb-2">Insights</p>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Health Library.</h1>
                    </div>

                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-black transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="bg-white border border-gray-200 rounded-full py-3 pl-12 pr-6 w-full md:w-80 outline-none focus:border-black transition-all shadow-sm"
                        />
                    </div>
                </motion.div>

                {/* --- CATEGORY FILTER --- */}
                <div className="flex gap-3 mt-12 overflow-x-auto pb-4 no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat
                                    ? 'bg-black text-white shadow-lg'
                                    : 'bg-white border border-gray-200 hover:border-gray-400'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </header>

            {/* --- FEATURED ARTICLE --- */}
            {activeCategory === "All" && featuredPost && (
                <section className="max-w-6xl mx-auto px-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative rounded-[2.5rem] overflow-hidden bg-white border border-gray-100 shadow-sm group cursor-pointer"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="h-[300px] lg:h-[500px] overflow-hidden">
                                <img
                                    src={featuredPost.image}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    alt="Featured"
                                />
                            </div>
                            <div className="p-10 lg:p-16 flex flex-col justify-center">
                                <span className="text-[#A3E635] font-bold text-xs uppercase tracking-[0.2em] mb-4">Featured Article</span>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight group-hover:underline decoration-1 underline-offset-4">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm">
                                            {featuredPost.author[0]}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">{featuredPost.author}</p>
                                            <p className="text-xs text-gray-400">{featuredPost.date} • {featuredPost.readTime}</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            )}

            {/* --- ARTICLE GRID --- */}
            <main className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.filter(p => !p.featured || activeCategory !== "All").map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="rounded-[2rem] overflow-hidden bg-gray-100 aspect-[4/3] mb-6 relative shadow-sm border border-gray-100">
                                <img
                                    src={post.image}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    alt={post.title}
                                />
                                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
                                    {post.category}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-gray-600 transition-colors leading-snug">
                                {post.title}
                            </h3>
                            <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-gray-400" />
                                    <span className="text-[12px] font-medium text-gray-400">{post.readTime}</span>
                                </div>
                                <div className="flex items-center gap-1 text-[12px] font-bold group-hover:translate-x-1 transition-transform">
                                    Read Article <ChevronRight size={14} />
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </main>

            {/* --- NEWSLETTER SECTION --- */}
            <section className="max-w-6xl mx-auto px-6 mt-32">
                <div className="bg-white border border-gray-200 rounded-[3rem] p-12 md:p-20 text-center shadow-sm">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Healthy inbox, healthy life.</h2>
                        <p className="text-gray-500 mb-10 max-w-md mx-auto">Join 10,000+ others receiving our weekly medical digest and wellness innovations.</p>
                        <form className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-grow bg-gray-50 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-gray-200 transition-all"
                            />
                            <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-[0.98]">
                                Subscribe
                            </button>
                        </form>
                        <p className="text-[11px] text-gray-400 mt-6 uppercase tracking-widest font-semibold">Zero Spam. Unsubscribe anytime.</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Spotblog;