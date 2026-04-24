"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";


import AdminDashboard from "../(Profiles)/admin-dashboard/page.jsx";
import DoctorDashboard from "../(Profiles)/doctor-dashboard/page.jsx";
import UserDashboard from "../(Profiles)/user-profile/page.jsx";

export default function DashboardRouter() {
  const { data: session, status } = useSession();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (session?.user?.role) {
      setRole(session.user.role);
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect("/auth/sign-in");
  }

  // Render role-specific dashboard
  switch (role) {
    case "admin":
      return <AdminDashboard user={session.user} />;
    case "doctor":
      return <DoctorDashboard user={session.user} />;
    case "user":
      return <UserDashboard user={session.user} />;
    default:
      return <UserDashboard user={session.user} />;
  }
}