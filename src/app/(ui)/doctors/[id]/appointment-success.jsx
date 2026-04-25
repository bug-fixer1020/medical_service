"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AppointmentSuccess() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin text-blue-500" size={40} /></div>}>
      <AppointmentSuccessContent />
    </Suspense>
  );
}

function AppointmentSuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [appointment, setAppointment] = useState(null);

    useEffect(() => {
        if (sessionId) {
            // Verify payment and get appointment details
            fetch(`/api/verify-payment?session_id=${sessionId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setAppointment(data.appointment);
                    }
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [sessionId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Appointment Confirmed!
                </h1>

                <p className="text-gray-600 mb-6">
                    Your appointment has been successfully booked and payment confirmed.
                </p>

                {appointment && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                        <p className="text-sm text-gray-600"><strong>Doctor:</strong> {appointment.doctorName}</p>
                        <p className="text-sm text-gray-600"><strong>Date:</strong> {appointment.date}</p>
                        <p className="text-sm text-gray-600"><strong>Time:</strong> {appointment.time}</p>
                        <p className="text-sm text-gray-600"><strong>Amount Paid:</strong> ${appointment.fee}</p>
                    </div>
                )}

                <div className="space-y-3">
                    <Link
                        href="/dashboard/appointments"
                        className="block w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        View My Appointments
                    </Link>
                    <Link
                        href="/doctors"
                        className="block w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                        Book Another Appointment
                    </Link>
                </div>
            </div>
        </div>
    );
}