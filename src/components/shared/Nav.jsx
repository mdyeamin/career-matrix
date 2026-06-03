"use client";

import React, { useState } from "react";
import { Link, Button } from "@heroui/react";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Nav() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Browse Jobs", path: "/jobs" },
    { name: "Company", path: "/company" },
    { name: "Pricing", path: "/pricing" },
  ];
  console.log(session);

  return (
    <nav className="fixed top-4 inset-x-0 z-50 px-4 font-sans">
      <header className="max-w-7xl h-16 bg-[#18181B] border border-stone-800 rounded-2xl px-4 md:px-6 shadow-2xl mx-auto flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-stone-400 hover:text-white p-2 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Brand / Logo */}
        <div className="flex items-center justify-center md:justify-start">
          <Link
            href="/"
            underline="none"
            className="no-underline text-xl md:text-2xl font-black tracking-tighter uppercase text-white select-none"
          >
            CAREER<span className="text-violet-500">MATRIX</span>
          </Link>
        </div>

        {/* Right Side Group: Links + Auth */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    underline="none" // HeroUI এর ডিফল্ট আন্ডারলাইন বন্ধ করার জন্য
                    className={`no-underline relative pb-1 text-sm font-medium transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-violet-500 after:transition-all after:duration-300 hover:text-white hover:after:w-full ${
                      isActive
                        ? "text-white after:w-full"
                        : "text-stone-300 after:w-0"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="w-[1px] h-5 bg-stone-700"></div>

          <div className="flex items-center gap-5">
            <Link
              href="/auth/signin"
              underline="none"
              className="no-underline text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
            >
              Sign In
            </Link>
            <Button
              className="bg-violet-600 hover:bg-violet-500 text-white font-medium text-[11px] md:text-xs tracking-wide shadow-lg shadow-violet-600/20 px-4 md:px-5 h-9 md:h-10 transition-colors"
              radius="md"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Invisible spacer for mobile centering balance */}
        <div className="md:hidden w-10"></div>
      </header>

      {/* Mobile Dropdown Menu Drawer */}
      {isMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 bg-[#18181B] border border-stone-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`w-full text-lg font-medium py-3 px-3 rounded-lg transition-colors ${
                  isActive
                    ? "text-white bg-white/10"
                    : "text-stone-300 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}

          <Link
            className="w-full text-lg font-medium py-3 px-3 rounded-lg transition-colors text-violet-400 hover:text-violet-300 hover:bg-violet-500/10"
            href="/signin"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign In
          </Link>

          <Button
            className="bg-violet-600 hover:bg-violet-500 text-white font-bold w-full mt-4 h-12 transition-colors"
            radius="md"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
}
