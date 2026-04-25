"use client";

import React, { Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { signIn, getSession, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SingInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center p-6"><div className="animate-pulse">Loading...</div></div>}>
      <SignInForm />
    </Suspense>
  );
}

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();

  const redirectTo = searchParams.get("redirectTo") || searchParams.get("callbackUrl") || null;

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ 1. Production-Ready Redirection Helper
  const handleRoleRedirect = (userRole, targetPath) => {
    let destination = targetPath;

    // Sanitize targetPath: extract pathname if it's a full URL
    try {
      if (targetPath && targetPath.startsWith("http")) {
        const url = new URL(targetPath);
        destination = url.pathname + url.search;
      }
    } catch (e) {
      destination = null;
    }

    // Block auth pages and handle role-based fallback
    if (!destination || destination.includes("/auth/") || destination.includes("/api/auth/")) {
      if (userRole === "admin") destination = "/admin-dashboard";
      else if (userRole === "doctor") destination = "/doctor-dashboard";
      else destination = "/user-profile";
    }

    router.replace(destination);
  };

  // ✅ 2. Safe Redirect for landing while already logged in
  useEffect(() => {
    if (status === "authenticated" && !loading) {
      getSession().then((session) => {
        if (session?.user?.role) {
          handleRoleRedirect(session.user.role, redirectTo);
        }
      });
    }
  }, [status, redirectTo, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email not found or password is wrong");
        setLoading(false);
        return;
      }

      // ✅ 3. Instant Session Retrieval (No Manual Fetch)
      const session = await getSession();
      if (session?.user?.role) {
        handleRoleRedirect(session.user.role, redirectTo);
      } else {
        router.replace("/user-profile");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    setLoading(true);
    setError("");
    try {
      // Social login will redirect to the provider's page
      const callback = (redirectTo && !redirectTo.includes("/auth/")) ? redirectTo : "/";
      await signIn(provider, { callbackUrl: callback });
    } catch (err) {
      setError(`Failed to sign in with ${provider}`);
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center p-6 font-sans text-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[440px] bg-white rounded-[2.5rem] p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
        >
          <div className="flex justify-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-tighter text-black select-none">
              SPOT<span className="text-blue-600">.</span>
            </h1>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Please enter your details to sign in.</p>
          </div>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-center text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-[#F5F5F7] border-none rounded-2xl focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-gray-400"
                required
              />
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
                <Link href="#" className="text-xs font-bold text-blue-600 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-[#F5F5F7] border-none rounded-2xl focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all active:scale-[0.98] mt-4 shadow-lg shadow-black/10 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-white px-4 text-gray-400">Or login with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleSocialSignIn("google")}
              disabled={loading}
              className="flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors active:scale-[0.98] disabled:opacity-50"
            >
              <FcGoogle size={24} />
              <span className="font-bold text-sm">Google</span>
            </button>
            <button
              onClick={() => handleSocialSignIn("facebook")}
              disabled={loading}
              className="flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors active:scale-[0.98] disabled:opacity-50"
            >
              <FaFacebook size={24} className="text-[#1877F2]" />
              <span className="font-bold text-sm">Facebook</span>
            </button>
          </div>

          <p className="text-center mt-10 text-sm font-medium text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="text-black font-bold hover:underline">Create one</Link>
          </p>
        </motion.div>
      </div>
  );
}