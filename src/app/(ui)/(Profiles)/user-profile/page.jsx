"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, User, Loader2 } from "lucide-react";

export default function UserProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/sign-in");
    }
  }, [status, router]);

  // Fetch appointments when tab changes to appointments
  useEffect(() => {
    if (activeTab === "appointments" && session?.user?.email) {
      fetchAppointments();
    }
  }, [activeTab, session]);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/user/appointments?email=${session.user.email}`);
      const data = await response.json();
      
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        setError("Failed to load appointments");
      }
    } catch (err) {
      setError("Error loading appointments");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin h-12 w-12 text-gray-900" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">My Profile</h1>
              <div className="ml-10 flex space-x-4">
                <button 
                  onClick={() => setActiveTab("profile")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "profile" ? "bg-gray-900 text-white" : "text-gray-700"
                  }`}
                >
                  Profile
                </button>
                <button 
                  onClick={() => setActiveTab("appointments")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "appointments" ? "bg-gray-900 text-white" : "text-gray-700"
                  }`}
                >
                  My Appointments
                </button>
                <button 
                  onClick={() => setActiveTab("medical")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "medical" ? "bg-gray-900 text-white" : "text-gray-700"
                  }`}
                >
                  Medical Records
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <button 
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* User Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "profile" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="mt-1 text-lg">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-lg">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-lg capitalize">{user.role || 'Patient'}</p>
              </div>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
                Edit Profile
              </button>
            </div>
          </div>
        )}

        {activeTab === "appointments" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
            
            {loading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="animate-spin h-8 w-8 text-gray-900" />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {error}
              </div>
            )}

            {!loading && !error && appointments.length === 0 && (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500">No appointments found</p>
                <button 
                  onClick={() => router.push('/doctors')}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Book an Appointment
                </button>
              </div>
            )}

            {!loading && !error && appointments.length > 0 && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {appointments.map((apt) => (
                        <tr key={apt._id}>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <User className="h-4 w-4 text-gray-400 mr-2" />
                              {apt.doctorName}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              {new Date(apt.date).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-2" />
                              {apt.time}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Confirmed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "medical" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Medical Records</h2>
            <p className="text-gray-500">No medical records available</p>
          </div>
        )}
      </div>
    </div>
  );
}