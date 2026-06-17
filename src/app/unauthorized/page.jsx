import Link from "next/link";
import React from "react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Background Ambient Glow (Optional for extra premium look) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[400px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-md w-full text-center bg-[#121212] border border-[#222222] p-10 rounded-[32px] shadow-2xl flex flex-col items-center gap-6 overflow-hidden">
        
        {/* Subtle Top Glow inside the card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-red-500/10 blur-[50px] rounded-full pointer-events-none"></div>

        {/* Lock Icon */}
        <div className="relative w-24 h-24 rounded-[28px] bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)] rotate-12 hover:rotate-0 transition-transform duration-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-3 z-10 mt-2">
          <div className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest rounded-full w-max mx-auto mb-2">
            Error 401
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Access Denied
          </h1>
          <p className="text-sm text-stone-400 leading-relaxed font-light">
            You don't have permission to access this page. Please log in with an authorized account or contact support if you believe this is a mistake.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-6 z-10">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center h-12 px-6 bg-[#1a1a1a] hover:bg-[#2c2c2e] border border-[#2c2c2e] text-stone-300 font-medium rounded-xl transition-colors focus:outline-none"
          >
            Go to Home
          </Link>
          <Link
            href="/auth/signin" // আপনার লগইন পেজের লিংক দিন
            className="flex-1 inline-flex items-center justify-center h-12 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-900/20 focus:outline-none"
          >
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}