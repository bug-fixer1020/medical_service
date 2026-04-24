

// // updated desing 
// 'use client'

// import { useState, useEffect } from "react";
// import { signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function AdminDashboard() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("overview");
//   const [doctorSubTab, setDoctorSubTab] = useState("show-doctors");
//   const [doctors, setDoctors] = useState([]);
//   const [liveConsults, setLiveConsults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [editingItem, setEditingItem] = useState(null);
//   const [showModal, setShowModal] = useState(false);








//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/auth/sign-in");
//     }
//   }, [status, router]);

//   useEffect(() => {
//     if (activeTab === "doctors") {
//       if (doctorSubTab === "show-doctors") {
//         fetchDoctors();
//       } else if (doctorSubTab === "live-consult") {
//         fetchLiveConsults();
//       }
//     }
//   }, [activeTab, doctorSubTab]);

//   const fetchDoctors = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/doctors");
//       const data = await response.json();
//       setDoctors(data);
//       setSearchResults(data);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchLiveConsults = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/live-consult");
//       const data = await response.json();
//       setLiveConsults(data);
//       setSearchResults(data);
//     } catch (error) {
//       console.error("Error fetching live consults:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     if (!searchTerm.trim()) {
//       if (doctorSubTab === "show-doctors") {
//         setSearchResults(doctors);
//       } else {
//         setSearchResults(liveConsults);
//       }
//       return;
//     }

//     setLoading(true);
//     try {
//       const endpoint = doctorSubTab === "show-doctors"
//         ? `/api/doctors/search?q=${searchTerm}`
//         : `/api/live-consult/search?q=${searchTerm}`;
//       const response = await fetch(endpoint);
//       const data = await response.json();
//       setSearchResults(data);
//     } catch (error) {
//       console.error("Error searching:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this item?")) return;

//     try {
//       const endpoint = doctorSubTab === "show-doctors" ? "/api/doctors" : "/api/live-consult";
//       const response = await fetch(endpoint, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });

//       if (response.ok) {
//         if (doctorSubTab === "show-doctors") {
//           fetchDoctors();
//         } else {
//           fetchLiveConsults();
//         }
//         alert("Deleted successfully!");
//       }
//     } catch (error) {
//       console.error("Error deleting:", error);
//       alert("Failed to delete");
//     }
//   };

//   const handleUpdate = async (item) => {
//     setEditingItem(item);
//     setShowModal(true);
//   };

//   const handleSaveUpdate = async (updatedItem) => {
//     try {
//       const endpoint = doctorSubTab === "show-doctors" ? "/api/doctors" : "/api/live-consult";
//       const response = await fetch(endpoint, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedItem),
//       });

//       if (response.ok) {
//         if (doctorSubTab === "show-doctors") {
//           fetchDoctors();
//         } else {
//           fetchLiveConsults();
//         }
//         setShowModal(false);
//         setEditingItem(null);
//         alert("Updated successfully!");
//       }
//     } catch (error) {
//       console.error("Error updating:", error);
//       alert("Failed to update");
//     }
//   };

//   if (status === "loading") {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (!session) return null;

//   const user = session.user;
//   const currentData = doctorSubTab === "show-doctors" ? searchResults : liveConsults;


// // const add new doctors 




//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Admin Navigation */}
//       <nav className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <h1 className="text-xl font-bold">Admin Dashboard</h1>
//               <div className="ml-10 flex space-x-4">
//                 <button
//                   onClick={() => setActiveTab("overview")}
//                   className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === "overview" ? "bg-gray-900 text-white" : "text-gray-700"
//                     }`}
//                 >
//                   Overview
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("users")}
//                   className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === "users" ? "bg-gray-900 text-white" : "text-gray-700"
//                     }`}
//                 >
//                   Manage Users
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("doctors")}
//                   className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === "doctors" ? "bg-gray-900 text-white" : "text-gray-700"
//                     }`}
//                 >
//                   Manage Doctors
//                 </button>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <span className="text-sm text-gray-600">Welcome, {user.name}</span>
//               <button
//                 onClick={() => signOut()}
//                 className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
//               >
//                 Sign Out
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Admin Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {activeTab === "overview" && (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="bg-white rounded-lg shadow p-6">
//                 <h3 className="text-lg font-semibold mb-2">Total Users</h3>
//                 <p className="text-3xl font-bold text-blue-600">1,234</p>
//               </div>
//               <div className="bg-white rounded-lg shadow p-6">
//                 <h3 className="text-lg font-semibold mb-2">Total Doctors</h3>
//                 <p className="text-3xl font-bold text-green-600">45</p>
//               </div>
//               <div className="bg-white rounded-lg shadow p-6">
//                 <h3 className="text-lg font-semibold mb-2">Appointments</h3>
//                 <p className="text-3xl font-bold text-purple-600">567</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "users" && (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">User Management</h2>
//             <div className="bg-white rounded-lg shadow overflow-hidden">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   <tr>
//                     <td className="px-6 py-4">John Doe</td>
//                     <td className="px-6 py-4">john@example.com</td>
//                     <td className="px-6 py-4">User</td>
//                     <td className="px-6 py-4">
//                       <button className="text-red-600 hover:text-red-800">Delete</button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {activeTab === "doctors" && (
//           <div>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold">Doctor Management</h2>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => {
//                     setDoctorSubTab("show-doctors");
//                     setSearchTerm("");
//                   }}
//                   className={`px-4 py-2 rounded-md text-sm font-medium ${doctorSubTab === "show-doctors"
//                       ? "bg-gray-900 text-white"
//                       : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                     }`}
//                 >
//                   Show Doctors
//                 </button>
//                 <button
//                   onClick={() => {
//                     setDoctorSubTab("live-consult");
//                     setSearchTerm("");
//                   }}
//                   className={`px-4 py-2 rounded-md text-sm font-medium ${doctorSubTab === "live-consult"
//                       ? "bg-gray-900 text-white"
//                       : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                     }`}
//                 >
//                   Live Consult
//                 </button>
//               </div>
//             </div>

//             {/* Search Box */}
//             <div className="mb-6 flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Search by name or email..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
//                 onKeyPress={(e) => e.key === "Enter" && handleSearch()}
//               />
//               <button
//                 onClick={handleSearch}
//                 className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
//               >
//                 Search
//               </button>
//             </div>

//             {/* Data Table */}
//             <div className="bg-white rounded-lg shadow overflow-hidden">
//               {loading ? (
//                 <div className="text-center py-8">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
//                 </div>
//               ) : (
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {currentData.map((item) => (
//                       <tr key={item._id}>
//                         <td className="px-6 py-4">
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             className="h-10 w-10 rounded-full object-cover"
//                           />
//                         </td>
//                         <td className="px-6 py-4 font-medium">{item.name}</td>
//                         <td className="px-6 py-4">{item.email}</td>
//                         <td className="px-6 py-4">{item.specialization || "N/A"}</td>
//                         <td className="px-6 py-4 space-x-2">
//                           <button
//                             onClick={() => handleUpdate(item)}
//                             className="text-blue-600 hover:text-blue-800"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(item._id)}
//                             className="text-red-600 hover:text-red-800"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                     {currentData.length === 0 && (
//                       <tr>
//                         <td colSpan="5" className="text-center py-8 text-gray-500">
//                           No data found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Edit Modal */}
//       {showModal && editingItem && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <h3 className="text-xl font-bold mb-4">Edit Item</h3>
//             <form onSubmit={(e) => {
//               e.preventDefault();
//               handleSaveUpdate(editingItem);
//             }}>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Name</label>
//                   <input
//                     type="text"
//                     value={editingItem.name}
//                     onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Email</label>
//                   <input
//                     type="email"
//                     value={editingItem.email}
//                     onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"

//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Specialization</label>
//                   <input
//                     type="text"
//                     value={editingItem.specialization || ""}
//                     onChange={(e) => setEditingItem({ ...editingItem, specialization: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Image URL</label>
//                   <input
//                     type="text"
//                     value={editingItem.image}
//                     onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-2 mt-6">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client'

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [doctorSubTab, setDoctorSubTab] = useState("show-doctors");
  const [doctors, setDoctors] = useState([]);
  const [liveConsults, setLiveConsults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    slug: "",
    specialization: "",
    experience: "",
    gender: "Male",
    about: "",
    education: [],
    hospital: {
      name: "",
      address: "",
      city: ""
    },
    fees: {
      online: "",
      offline: ""
    },
    contact: {
      phone: "",
      email: ""
    },
    rating: "",
    reviewsCount: "",
    available: true,
    availableDays: [],
    timeSlots: [],
    languages: [],
    image: "",
    role: "doctor"
  });
  const [educationInput, setEducationInput] = useState({ degree: "", institute: "", year: "" });
  const [availableDayInput, setAvailableDayInput] = useState("");
  const [timeSlotInput, setTimeSlotInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/sign-in");
    }
  }, [status, router]);

  useEffect(() => {
    if (activeTab === "doctors") {
      if (doctorSubTab === "show-doctors") {
        fetchDoctors();
      } else if (doctorSubTab === "live-consult") {
        fetchLiveConsults();
      }
    }
  }, [activeTab, doctorSubTab]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/doctors");
      const data = await response.json();
      setDoctors(data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLiveConsults = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/live-consult");
      const data = await response.json();
      setLiveConsults(data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching live consults:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      if (doctorSubTab === "show-doctors") {
        setSearchResults(doctors);
      } else {
        setSearchResults(liveConsults);
      }
      return;
    }

    setLoading(true);
    try {
      const endpoint = doctorSubTab === "show-doctors"
        ? `/api/doctors/search?q=${searchTerm}`
        : `/api/live-consult/search?q=${searchTerm}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const endpoint = doctorSubTab === "show-doctors" ? "/api/doctors" : "/api/live-consult";
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        if (doctorSubTab === "show-doctors") {
          fetchDoctors();
        } else {
          fetchLiveConsults();
        }
        alert("Deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete");
    }
  };

  const handleUpdate = async (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleSaveUpdate = async (updatedItem) => {
    try {
      const endpoint = doctorSubTab === "show-doctors" ? "/api/doctors" : "/api/live-consult";
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        if (doctorSubTab === "show-doctors") {
          fetchDoctors();
        } else {
          fetchLiveConsults();
        }
        setShowModal(false);
        setEditingItem(null);
        alert("Updated successfully!");
      }
    } catch (error) {
      console.error("Error updating:", error);
      alert("Failed to update");
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Generate slug from name
      const slug = newDoctor.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

      const doctorData = {
        ...newDoctor,
        slug,
        experience: parseInt(newDoctor.experience),
        rating: parseFloat(newDoctor.rating) || 0,
        reviewsCount: parseInt(newDoctor.reviewsCount) || 0,
        fees: {
          online: parseInt(newDoctor.fees.online) || 0,
          offline: parseInt(newDoctor.fees.offline) || 0
        },
        createdAt: new Date().toISOString()
      };

      const response = await fetch("/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorData),
      });

      if (response.ok) {
        alert("Doctor added successfully!");
        setShowAddModal(false);
        resetNewDoctorForm();
        fetchDoctors();
      } else {
        alert("Failed to add doctor");
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };

  const resetNewDoctorForm = () => {
    setNewDoctor({
      name: "",
      slug: "",
      specialization: "",
      experience: "",
      gender: "Male",
      about: "",
      education: [],
      hospital: {
        name: "",
        address: "",
        city: ""
      },
      fees: {
        online: "",
        offline: ""
      },
      contact: {
        phone: "",
        email: ""
      },
      rating: "",
      reviewsCount: "",
      available: true,
      availableDays: [],
      timeSlots: [],
      languages: [],
      image: "",
      role: "doctor"
    });
    setEducationInput({ degree: "", institute: "", year: "" });
    setAvailableDayInput("");
    setTimeSlotInput("");
    setLanguageInput("");
  };

  const addEducation = () => {
    if (educationInput.degree && educationInput.institute && educationInput.year) {
      setNewDoctor({
        ...newDoctor,
        education: [...newDoctor.education, { ...educationInput }]
      });
      setEducationInput({ degree: "", institute: "", year: "" });
    }
  };

  const removeEducation = (index) => {
    const updatedEducation = newDoctor.education.filter((_, i) => i !== index);
    setNewDoctor({ ...newDoctor, education: updatedEducation });
  };

  const addAvailableDay = () => {
    if (availableDayInput && !newDoctor.availableDays.includes(availableDayInput)) {
      setNewDoctor({
        ...newDoctor,
        availableDays: [...newDoctor.availableDays, availableDayInput]
      });
      setAvailableDayInput("");
    }
  };

  const removeAvailableDay = (day) => {
    setNewDoctor({
      ...newDoctor,
      availableDays: newDoctor.availableDays.filter(d => d !== day)
    });
  };

  const addTimeSlot = () => {
    if (timeSlotInput && !newDoctor.timeSlots.includes(timeSlotInput)) {
      setNewDoctor({
        ...newDoctor,
        timeSlots: [...newDoctor.timeSlots, timeSlotInput]
      });
      setTimeSlotInput("");
    }
  };

  const removeTimeSlot = (slot) => {
    setNewDoctor({
      ...newDoctor,
      timeSlots: newDoctor.timeSlots.filter(s => s !== slot)
    });
  };

  const addLanguage = () => {
    if (languageInput && !newDoctor.languages.includes(languageInput)) {
      setNewDoctor({
        ...newDoctor,
        languages: [...newDoctor.languages, languageInput]
      });
      setLanguageInput("");
    }
  };

  const removeLanguage = (lang) => {
    setNewDoctor({
      ...newDoctor,
      languages: newDoctor.languages.filter(l => l !== lang)
    });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;
  const currentData = doctorSubTab === "show-doctors" ? searchResults : liveConsults;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <div className="ml-10 flex space-x-4">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === "overview" ? "bg-gray-900 text-white" : "text-gray-700"
                    }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === "users" ? "bg-gray-900 text-white" : "text-gray-700"
                    }`}
                >
                  Manage Users
                </button>
                <button
                  onClick={() => setActiveTab("doctors")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === "doctors" ? "bg-gray-900 text-white" : "text-gray-700"
                    }`}
                >
                  Manage Doctors
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

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-blue-600">1,234</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2">Total Doctors</h3>
                <p className="text-3xl font-bold text-green-600">45</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2">Appointments</h3>
                <p className="text-3xl font-bold text-purple-600">567</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">John Doe</td>
                    <td className="px-6 py-4">john@example.com</td>
                    <td className="px-6 py-4">User</td>
                    <td className="px-6 py-4">
                      <button className="text-red-600 hover:text-red-800">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "doctors" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Doctor Management</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setDoctorSubTab("show-doctors");
                    setSearchTerm("");
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${doctorSubTab === "show-doctors"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  Show Doctors
                </button>
                <button
                  onClick={() => {
                    setDoctorSubTab("live-consult");
                    setSearchTerm("");
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${doctorSubTab === "live-consult"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  Live Consult
                </button>
                {doctorSubTab === "show-doctors" && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                  >
                    + Add Doctor
                  </button>
                )}
              </div>
            </div>

            {/* Search Box */}
            <div className="mb-6 flex gap-2">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
              >
                Search
              </button>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentData.map((item) => (
                      <tr key={item._id}>
                        <td className="px-6 py-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-6 py-4 font-medium">{item.name}</td>
                        <td className="px-6 py-4">{item.email || item.contact?.email}</td>
                        <td className="px-6 py-4">{item.specialization || "N/A"}</td>
                        <td className="px-6 py-4 space-x-2">
                          <button
                            onClick={() => handleUpdate(item)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {currentData.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-8 text-gray-500">
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-md w-full my-8">
            <h3 className="text-xl font-bold mb-4">Edit Item</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSaveUpdate(editingItem);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={editingItem.email || editingItem.contact?.email}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      email: e.target.value,
                      contact: { ...editingItem.contact, email: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Specialization</label>
                  <input
                    type="text"
                    value={editingItem.specialization || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, specialization: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Add New Doctor</h3>
            <form onSubmit={handleAddDoctor}>
              <div className="space-y-4">
                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name *</label>
                    <input
                      type="text"
                      value={newDoctor.name}
                      onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Specialization *</label>
                    <input
                      type="text"
                      value={newDoctor.specialization}
                      onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Experience (years) *</label>
                    <input
                      type="number"
                      value={newDoctor.experience}
                      onChange={(e) => setNewDoctor({ ...newDoctor, experience: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <select
                      value={newDoctor.gender}
                      onChange={(e) => setNewDoctor({ ...newDoctor, gender: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">About</label>
                  <textarea
                    value={newDoctor.about}
                    onChange={(e) => setNewDoctor({ ...newDoctor, about: e.target.value })}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Contact Information */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input
                        type="text"
                        value={newDoctor.contact.phone}
                        onChange={(e) => setNewDoctor({
                          ...newDoctor,
                          contact: { ...newDoctor.contact, phone: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email *</label>
                      <input
                        type="email"
                        value={newDoctor.contact.email}
                        onChange={(e) => setNewDoctor({
                          ...newDoctor,
                          contact: { ...newDoctor.contact, email: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Hospital Information */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Hospital Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Hospital Name</label>
                      <input
                        type="text"
                        value={newDoctor.hospital.name}
                        onChange={(e) => setNewDoctor({
                          ...newDoctor,
                          hospital: { ...newDoctor.hospital, name: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Address</label>
                      <input
                        type="text"
                        value={newDoctor.hospital.address}
                        onChange={(e) => setNewDoctor({
                          ...newDoctor,
                          hospital: { ...newDoctor.hospital, address: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input
                        type="text"
                        value={newDoctor.hospital.city}
                        onChange={(e) => setNewDoctor({
                          ...newDoctor,
                          hospital: { ...newDoctor.hospital, city: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Fees */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Consultation Fees (BDT)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Online</label>
                      <input
                        type="number"
                        value={newDoctor.fees.online}
                        onChange={(e) => setNewDoctor({
                          ...newDoctor,
                          fees: { ...newDoctor.fees, online: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Offline</label>
                      <input
                        type="number"
                        value={newDoctor.fees.offline}
                        onChange={(e) => setNewDoctor({
                          ...newDoctor,
                          fees: { ...newDoctor.fees, offline: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Education</h4>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Degree"
                      value={educationInput.degree}
                      onChange={(e) => setEducationInput({ ...educationInput, degree: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Institute"
                      value={educationInput.institute}
                      onChange={(e) => setEducationInput({ ...educationInput, institute: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Year"
                      value={educationInput.year}
                      onChange={(e) => setEducationInput({ ...educationInput, year: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addEducation}
                    className="text-blue-600 text-sm mb-2"
                  >
                    + Add Education
                  </button>
                  {newDoctor.education.map((edu, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded mt-1">
                      <span>{edu.degree} - {edu.institute} ({edu.year})</span>
                      <button type="button" onClick={() => removeEducation(index)} className="text-red-600">Remove</button>
                    </div>
                  ))}
                </div>

                {/* Available Days */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Available Days</h4>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Day (e.g., Monday)"
                      value={availableDayInput}
                      onChange={(e) => setAvailableDayInput(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <button type="button" onClick={addAvailableDay} className="px-4 py-2 bg-gray-900 text-white rounded-md">
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newDoctor.availableDays.map((day) => (
                      <span key={day} className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-2">
                        {day}
                        <button type="button" onClick={() => removeAvailableDay(day)} className="text-red-600">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Time Slots</h4>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Time Slot (e.g., 5:00 PM - 9:00 PM)"
                      value={timeSlotInput}
                      onChange={(e) => setTimeSlotInput(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <button type="button" onClick={addTimeSlot} className="px-4 py-2 bg-gray-900 text-white rounded-md">
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newDoctor.timeSlots.map((slot) => (
                      <span key={slot} className="bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-2">
                        {slot}
                        <button type="button" onClick={() => removeTimeSlot(slot)} className="text-red-600">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Languages</h4>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Language"
                      value={languageInput}
                      onChange={(e) => setLanguageInput(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <button type="button" onClick={addLanguage} className="px-4 py-2 bg-gray-900 text-white rounded-md">
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newDoctor.languages.map((lang) => (
                      <span key={lang} className="bg-purple-100 text-purple-800 px-2 py-1 rounded flex items-center gap-2">
                        {lang}
                        <button type="button" onClick={() => removeLanguage(lang)} className="text-red-600">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image URL */}
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    type="text"
                    value={newDoctor.image}
                    onChange={(e) => setNewDoctor({ ...newDoctor, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="https://iili.io/example.jpg"
                  />
                </div>

                {/* Rating */}
                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Rating (0-5)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newDoctor.rating}
                      onChange={(e) => setNewDoctor({ ...newDoctor, rating: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Reviews Count</label>
                    <input
                      type="number"
                      value={newDoctor.reviewsCount}
                      onChange={(e) => setNewDoctor({ ...newDoctor, reviewsCount: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Available */}
                <div className="border-t pt-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newDoctor.available}
                      onChange={(e) => setNewDoctor({ ...newDoctor, available: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Available for consultation</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetNewDoctorForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Doctor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}