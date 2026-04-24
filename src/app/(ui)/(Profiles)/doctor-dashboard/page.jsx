"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, User, Mail, Loader2, Stethoscope } from "lucide-react";

export default function DoctorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("appointments");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/sign-in");
    }
  }, [status, router]);

  // Fetch appointments when component mounts or tab changes
  useEffect(() => {
    if (activeTab === "appointments" && session?.user?.email) {
      fetchAppointments();
    }
  }, [activeTab, session]);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/doctor/appointments?email=${session.user.email}`);
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

  // Group appointments by date
  const getTodaysAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === today);
  };

  const getUpcomingAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.date > today);
  };

  const getPastAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.date < today);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin h-12 w-12 text-gray-900" />
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;
  const todaysAppointments = getTodaysAppointments();
  const upcomingAppointments = getUpcomingAppointments();
  const pastAppointments = getPastAppointments();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Doctor Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Stethoscope className="h-6 w-6 text-gray-900 mr-2" />
              <h1 className="text-xl font-bold">Doctor Dashboard</h1>
              <div className="ml-10 flex space-x-4">
                <button 
                  onClick={() => setActiveTab("appointments")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "appointments" ? "bg-gray-900 text-white" : "text-gray-700"
                  }`}
                >
                  Appointments ({appointments.length})
                </button>
                <button 
                  onClick={() => setActiveTab("patients")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "patients" ? "bg-gray-900 text-white" : "text-gray-700"
                  }`}
                >
                  My Patients
                </button>
                <button 
                  onClick={() => setActiveTab("schedule")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "schedule" ? "bg-gray-900 text-white" : "text-gray-700"
                  }`}
                >
                  Schedule
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Dr. {user.name}</span>
              <button 
                onClick={() => signOut()}
                className="px-4 py-2 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-800"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Doctor Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "appointments" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
            
            {loading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="animate-spin h-8 w-8 text-gray-900" />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-4">
                {error}
              </div>
            )}

            {!loading && !error && appointments.length === 0 && (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500">No appointments found</p>
              </div>
            )}

            {!loading && !error && appointments.length > 0 && (
              <div className="space-y-6">
                {/* Today's Appointments */}
                {todaysAppointments.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Clock className="h-5 w-5 text-green-600 mr-2" />
                      Today's Appointments ({todaysAppointments.length})
                    </h3>
                    <div className="space-y-3">
                      {todaysAppointments.map((apt) => (
                        <div key={apt._id} className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <User className="h-4 w-4 text-gray-400" />
                                <p className="font-semibold">{apt.patientName}</p>
                              </div>
                              <div className="flex items-center gap-2 mb-1 text-sm text-gray-600">
                                <Mail className="h-3 w-3" />
                                <p>{apt.patientEmail}</p>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="h-3 w-3" />
                                <p>{new Date(apt.date).toLocaleDateString()}</p>
                                <Clock className="h-3 w-3 ml-2" />
                                <p>{apt.time}</p>
                              </div>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                              Start Consultation
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upcoming Appointments */}
                {upcomingAppointments.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                      Upcoming Appointments ({upcomingAppointments.length})
                    </h3>
                    <div className="space-y-3">
                      {upcomingAppointments.map((apt) => (
                        <div key={apt._id} className="bg-white rounded-lg shadow p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <User className="h-4 w-4 text-gray-400" />
                                <p className="font-semibold">{apt.patientName}</p>
                              </div>
                              <div className="flex items-center gap-2 mb-1 text-sm text-gray-600">
                                <Mail className="h-3 w-3" />
                                <p>{apt.patientEmail}</p>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="h-3 w-3" />
                                <p>{new Date(apt.date).toLocaleDateString()}</p>
                                <Clock className="h-3 w-3 ml-2" />
                                <p>{apt.time}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Past Appointments */}
                {pastAppointments.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Clock className="h-5 w-5 text-gray-600 mr-2" />
                      Past Appointments ({pastAppointments.length})
                    </h3>
                    <div className="space-y-3">
                      {pastAppointments.map((apt) => (
                        <div key={apt._id} className="bg-white rounded-lg shadow p-4 opacity-75">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <User className="h-4 w-4 text-gray-400" />
                                <p className="font-semibold">{apt.patientName}</p>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="h-3 w-3" />
                                <p>{new Date(apt.date).toLocaleDateString()}</p>
                                <Clock className="h-3 w-3 ml-2" />
                                <p>{apt.time}</p>
                              </div>
                            </div>
                            <button className="px-3 py-1 bg-gray-600 text-white rounded-md text-sm">
                              View Records
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "patients" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Patients</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Visit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((apt) => (
                    <tr key={apt._id}>
                      <td className="px-6 py-4">{apt.patientName}</td>
                      <td className="px-6 py-4">{apt.patientEmail}</td>
                      <td className="px-6 py-4">{new Date(apt.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800">View Records</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Schedule Settings</h2>
            <p className="text-gray-500">Schedule management coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}