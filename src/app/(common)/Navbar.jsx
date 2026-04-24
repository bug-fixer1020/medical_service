// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { signOut, useSession } from 'next-auth/react';

// const navLinks = [
//   { name: 'Home', href: '/' },
//   { name: 'Live AI Consultant', href: '/consultant' },
//   { name: 'Find Doctor', href: '/doctors' },
//   { name: 'Blog', href: '/blog' },
// ];

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const pathname = usePathname();
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);


//   const isLoggedIn = status === 'authenticated' && session?.user;
//   const name = session?.user?.name || session?.user?.email || 'User';
//   const firstLetter = name.charAt(0).toUpperCase();
//   const avatarImage = session?.user?.image;
//   const role = session?.user?.role || 'user';

//   const dashboardHref = '/dashboard';
//   const profileHref = '/user-profile';

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-5 py-4 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
//         }`}
//     >
//       <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
//         <Link href="/" className="flex items-center">
//           <span className="text-[28px] font-extrabold text-[#111827] tracking-tight cursor-pointer">
//             Spot
//           </span>
//         </Link>

//         <div className="hidden lg:flex items-center gap-8">
//           {navLinks.map((link) => {
//             const isActive = pathname === link.href;
//             return (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className={`text-[15px] transition-colors ${isActive
//                   ? 'text-[#92E32B] font-semibold'
//                   : 'text-[#6B7280] font-medium hover:text-black'
//                   }`}
//               >
//                 {link.name}
//               </Link>
//             );
//           })}
//         </div>

//         <div className="flex items-center gap-4 relative">
//           {isLoggedIn ? (
//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => setDropdownOpen((open) => !open)}
//                 title={name}
//                 className="w-11 h-11 rounded-full border-2 border-gray-100 bg-[#F3F4F6] text-lg font-semibold text-[#111827] flex items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-[1.03]"
//               >
//                 {avatarImage ? (
//                   <img
//                     src={avatarImage}
//                     alt={name}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span>{firstLetter}</span>
//                 )}
//               </button>

//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-3 w-64 rounded-3xl bg-white border border-slate-200 shadow-xl ring-1 ring-black/5 transition duration-200">
//                   <div className="p-4 border-b border-slate-200">
//                     <p className="text-sm font-semibold text-slate-900">{name}</p>
//                     <p className="text-xs text-slate-500 capitalize">{role}</p>
//                   </div>
//                   <div className="flex flex-col gap-2 p-3">
//                     <Link
//                       href={profileHref}
//                       className="rounded-2xl px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
//                     >
//                       Profile
//                     </Link>

//                   </div>

//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="flex items-center gap-3">
//               <Link
//                 href="/auth/sign-in"
//                 className="px-5 py-2 bg-[#111827] text-white rounded-full text-[14px] font-semibold hover:bg-black transition-all active:scale-95 shadow-sm"
//               >
//                 Sign In
//               </Link>

//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Live  Consultant', href: '/consultant' },
  { name: 'Find Doctor', href: '/doctors' },
  { name: 'Blog', href: '/blog' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const isLoggedIn = status === 'authenticated' && session?.user;
  const name = session?.user?.name || session?.user?.email || 'User';
  const firstLetter = name.charAt(0).toUpperCase();
  const avatarImage = session?.user?.image;
  const role = session?.user?.role || 'user';

  // Role-based redirection
  const getDashboardHref = () => {
    if (role === 'admin') return '/admin-dashboard';
    if (role === 'doctor') return '/doctor-dashboard';
    return '/user-profile';
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    window.location.href = getDashboardHref();
  };

  const handleMobileNavClick = (href) => {
    setMobileMenuOpen(false);
    window.location.href = href;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-5 py-4 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center">
          <span className="text-[28px] font-extrabold text-[#111827] tracking-tight cursor-pointer">
            Spot
          </span>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[15px] transition-colors ${isActive
                  ? 'text-[#92E32B] font-semibold'
                  : 'text-[#6B7280] font-medium hover:text-black'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4 relative">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((open) => !open)}
                title={name}
                className="w-11 h-11 rounded-full border-2 border-gray-100 bg-[#F3F4F6] text-lg font-semibold text-[#111827] flex items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-[1.03]"
              >
                {avatarImage ? (
                  <img
                    src={avatarImage}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{firstLetter}</span>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-3xl bg-white border border-slate-200 shadow-xl ring-1 ring-black/5 transition duration-200">
                  <div className="p-4 border-b border-slate-200">
                    <p className="text-sm font-semibold text-slate-900">{name}</p>
                    <p className="text-xs text-slate-500 capitalize">{role}</p>
                  </div>
                  <div className="flex flex-col gap-2 p-3">
                    <button
                      onClick={handleProfileClick}
                      className="rounded-2xl px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 text-left w-full"
                    >
                      Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/sign-in"
                className="px-5 py-2 bg-[#111827] text-white rounded-full text-[14px] font-semibold hover:bg-black transition-all active:scale-95 shadow-sm"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Mobile Menu Button - Three lines */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 bg-[#111827] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#111827] transition-all duration-300 my-1 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#111827] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile Menu Panel */}
          <div
            ref={mobileMenuRef}
            className="fixed top-[73px] left-0 right-0 bg-white border-b border-slate-200 shadow-xl z-50 lg:hidden animate-in slide-in-from-top duration-200"
          >
            <div className="flex flex-col p-4 gap-2">
              {/* Mobile Navigation Links */}
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleMobileNavClick(link.href)}
                    className={`text-left px-4 py-3 rounded-xl text-[15px] transition-colors ${isActive
                      ? 'text-[#92E32B] font-semibold bg-gray-50'
                      : 'text-[#6B7280] font-medium hover:bg-gray-50'
                      }`}
                  >
                    {link.name}
                  </button>
                );
              })}

              {/* Divider */}
              <div className="h-px bg-slate-200 my-2" />

              {/* Mobile Profile Section */}
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-[#F3F4F6] text-lg font-semibold text-[#111827] flex items-center justify-center overflow-hidden">
                      {avatarImage ? (
                        <img
                          src={avatarImage}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{firstLetter}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">{name}</p>
                      <p className="text-xs text-slate-500 capitalize">{role}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleProfileClick}
                    className="text-left px-4 py-3 rounded-xl text-[15px] text-[#6B7280] font-medium hover:bg-gray-50"
                  >
                    Profile
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleMobileNavClick('/auth/sign-in')}
                  className="text-left px-4 py-3 rounded-xl text-[15px] text-[#6B7280] font-medium hover:bg-gray-50"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;