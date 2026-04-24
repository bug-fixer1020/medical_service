"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Clock,
  Calendar,
  Globe,
  Mail,
  Phone,
  User,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Loader2,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function DoctorDetails({ params }) {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  // booking state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const { data: session } = useSession();
  const router = useRouter();

  const handlePaymentBooking = async () => {
    // User login check
    const user = session?.user;
    if (!user) {
      alert('Please login first');
      router.push('/auth/sign-in');
      return;
    }

    // Date validation
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time');
      return;
    }

    setProcessingPayment(true);

    try {
      // Create payment session
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorName: doctor.name,
          doctorEmail: doctor.contact.email,
          patientName: user.name,
          patientEmail: user.email,
          date: selectedDate,
          time: selectedTime,
          fee: doctor.fees.offline
        })
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('Failed to create payment session');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Error processing payment: ' + error.message);
      setProcessingPayment(false);
    }
  };

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { id } = await params;
        const res = await fetch(`/api/doctors/${id}`);
        if (!res.ok) throw new Error("Could not find doctor details");
        const data = await res.json();
        setDoctor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [params]);

  // Check for payment cancellation
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('canceled') === 'true') {
      alert('Payment was cancelled. Please try again.');
    }
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="animate-spin text-slate-400 mb-4" size={40} />
        <p className="text-slate-500 font-medium tracking-wide">
          Loading Profile...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-slate-500">
        {error}
      </div>
    );

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-white text-slate-800 pb-20 font-sans"
    >
      {/* back button  */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <Link href={'/doctors'} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold transition-all shadow-md active:scale-[0.98]">
          ← Back to Doctors
        </Link>
      </div>

      {/* Top Banner Area */}
      <div className="bg-slate-50 border-b border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Left Top Image - Decent Size */}
            <div className="w-full md:w-80 shrink-0">
              <div className="relative aspect-[4/5] bg-slate-200 rounded-lg overflow-hidden border border-slate-300 shadow-sm">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover grayscale-[20%]"
                  priority
                />
              </div>
            </div>

            {/* Right Side Personal Info */}
            <div className="flex-1 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <ShieldCheck size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Verified Specialist
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-slate-900 mb-1">
                  {doctor.name}
                </h1>
                <p className="text-xl text-slate-500 font-medium">
                  {doctor.specialization}
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-y border-slate-200">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">
                    Experience
                  </p>
                  <div className="flex items-center gap-2 font-semibold">
                    <Briefcase size={16} className="text-slate-400" />
                    {doctor.experience} Years
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">
                    Rating
                  </p>
                  <div className="flex items-center gap-2 font-semibold">
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                    {doctor.rating} ({doctor.reviewsCount})
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">
                    Gender
                  </p>
                  <div className="flex items-center gap-2 font-semibold">
                    <User size={16} className="text-slate-400" />
                    {doctor.gender}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">
                    Languages
                  </p>
                  <div className="flex items-center gap-2 font-semibold">
                    <Globe size={16} className="text-slate-400" />
                    {doctor.languages.join(", ")}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={16} className="text-slate-300" />
                  <span className="text-slate-600">{doctor.contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={16} className="text-slate-300" />
                  <span className="text-slate-600">{doctor.contact.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Details Section Below */}
      <div className="max-w-6xl mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Detailed Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Professional Summary */}
            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                About Professional
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg italic bg-slate-50 p-6 rounded-r-lg border-l-4 border-slate-200">
                "{doctor.about}"
              </p>
            </section>

            {/* Academic History */}
            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <GraduationCap className="text-slate-400" /> Education &
                Training
              </h3>
              <div className="space-y-8">
                {doctor.education.map((edu, index) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-slate-300" />
                    <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                    <p className="text-slate-500">{edu.institute}</p>
                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                      Awarded in {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Facility Location */}
            <section className="bg-slate-50 p-8 rounded-xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="text-slate-400" size={20} /> Current Hospital
              </h3>
              <div>
                <p className="text-xl font-bold text-slate-800">
                  {doctor.hospital.name}
                </p>
                <p className="text-slate-500">{doctor.hospital.address}</p>
                <p className="text-slate-500 font-medium">
                  {doctor.hospital.city}
                </p>
              </div>
            </section>
          </div>

          {/* Logistics & Action Column */}
          <div className="space-y-8">
            {/* Scheduling Info */}
            <div className="border border-slate-200 rounded-2xl p-8 space-y-8 shadow-sm">
              <div>
                <h4 className="text-xs font-black uppercase text-slate-400 mb-4 tracking-widest">
                  Availability
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-slate-400 shrink-0" size={18} />
                    <span className="text-sm font-semibold">
                      {doctor.availableDays.join(", ")}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-slate-400 shrink-0" size={18} />
                    <span className="text-sm font-semibold">
                      {doctor.timeSlots[0]}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase text-slate-400 mb-4 tracking-widest">
                  Fees
                </h4>
                <div className="space-y-3">
                  {/* <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Video Consultation</span>
                    <span className="font-bold">৳{doctor.fees.online}</span>
                  </div> */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Physical Visit</span>
                    <span className="font-bold">৳{doctor.fees.offline}</span>
                  </div>
                </div>
              </div>

              {/* Final Booking Button */}
              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold transition-all"
              >
                Book Appointment
              </button>

              {/* Booking Modal with Payment */}
              {showBookingModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  {/* Backdrop with blur */}
                  <div
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                    onClick={() => setShowBookingModal(false)}
                  />

                  {/* Modal Content */}
                  <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl transform transition-all overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <h3 className="text-xl font-semibold text-gray-800">Book Appointment</h3>
                      <button
                        onClick={() => setShowBookingModal(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="p-6 space-y-5">
                      {/* Date Selection */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={selectedDate}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50/30"
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      {/* Time Selection */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          Available Time
                        </label>
                        <select
                          value={selectedTime}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50/30 appearance-none cursor-pointer"
                          onChange={(e) => setSelectedTime(e.target.value)}
                        >
                          <option value="">Select a time slot</option>
                          {doctor.timeSlots.map((slot, idx) => (
                            <option key={idx} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>

                      {/* Fee Info */}
                      <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-blue-900">Consultation Fee</span>
                          <span className="text-lg font-bold text-blue-700">${doctor.fees.online}</span>
                        </div>
                        <p className="text-xs text-blue-600">Secure payment via Stripe</p>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 pt-0 flex gap-3">
                      <button
                        onClick={() => setShowBookingModal(false)}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handlePaymentBooking}
                        disabled={processingPayment}
                        className="flex-1 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {processingPayment ? (
                          <>
                            <Loader2 className="animate-spin" size={18} />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard size={18} />
                            Pay & Book
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-center text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                Secure payment powered by Stripe
              </p>
            </div>

            {/* Support Message */}
            <div className="p-6 bg-slate-50 rounded-xl text-xs text-slate-500 leading-relaxed text-center">
              Our specialists follow international medical protocols and provide
              evidence-based treatment plans.
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}