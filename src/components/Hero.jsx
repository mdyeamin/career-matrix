"use client";

import React from "react";
import Image from "next/image";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { BsBriefcase, BsBuilding, BsPeople, BsStar } from "react-icons/bs";

const Hero = () => {
  return (
    <section className="bg-[#0A0A0C] min-h-screen text-white pt-28 md:pt-36 relative overflow-hidden font-sans w-full flex flex-col items-center">
      
      {/* ─── গ্লোবাল ব্যাকগ্রাউন্ড ইমেজ (স্থির ও প্রফেশনাল ফিটিং) ─── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 flex justify-center">
        <div className="w-full max-w-7xl h-full relative">
          <Image
            src="/globe.png"
            alt="Globe and Spotlight Background"
            fill
            className="object-cover object-top"
            priority
          />
          {/* অতিরিক্ত ডার্ক ওভারলে */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0C]/20 to-[#0A0A0C] pointer-events-none" /> */}
        </div>
      </div>

      {/* ─── ১. ওপরিভাগের কন্টেন্ট (টেক্সট ও সার্চবার) ─── */}
      <div className="max-w-7xl w-full mx-auto px-6 text-center relative z-10 flex flex-col items-center mb-12 md:mb-20">
        
        {/* Pill Badge lines সহ */}
        <div className="flex items-center justify-center gap-3 mb-8 w-full">
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-stone-700/50"></div>
          <div className="inline-flex items-center gap-2 bg-[#121214]/60 backdrop-blur-md border border-stone-800/80 px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest text-stone-300 select-none shadow-xl">
            💼 <span className="font-bold text-white">50,000+</span> NEW JOBS THIS MONTH
          </div>
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-stone-700/50"></div>
        </div>

        {/* প্রধান টাইটেল */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 max-w-3xl leading-tight drop-shadow-sm">
          Find Your Dream Job Today
        </h1>
        <p className="text-stone-300 text-sm sm:text-base font-medium max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-sm">
          CareerMatrix connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* সার্চবার পিল */}
        <div className="w-full max-w-3xl bg-[#121214]/60 backdrop-blur-md border border-stone-800/80 p-1.5 rounded-full flex flex-col md:flex-row items-center gap-2 shadow-2xl transition-all hover:border-stone-700/80">
          <div className="flex-1 flex items-center px-4 w-full h-12 md:h-auto">
            <FiSearch className="text-stone-500 mr-3 shrink-0" size={18} />
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-stone-500"
            />
          </div>

          <div className="hidden md:block w-[1px] h-6 bg-stone-700/50 shrink-0" />

          <div className="flex-1 flex items-center px-4 w-full h-12 md:h-auto border-t md:border-t-0 border-stone-800/50">
            <FiMapPin className="text-stone-500 mr-3 shrink-0" size={18} />
            <input
              type="text"
              placeholder="Location or Remote"
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-stone-500"
            />
          </div>

          <button className="w-full md:w-12 h-11 md:h-10 bg-violet-600 hover:bg-violet-500 text-white rounded-full flex items-center justify-center shrink-0 transition-colors mt-2 md:mt-0">
            <FiSearch size={18} />
          </button>
        </div>

        {/* ট্রেন্ডিং টেক্সট */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mt-8 text-[11px] sm:text-xs text-stone-400">
          <span>Trending Position</span>
          <div className="flex gap-2">
            <span className="px-3 py-1.5 rounded-full bg-[#18181B]/60 backdrop-blur-sm border border-stone-800/80 cursor-pointer hover:text-white hover:border-stone-600 transition-colors">
              Product Designer
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#18181B]/60 backdrop-blur-sm border border-stone-800/80 cursor-pointer hover:text-white hover:border-stone-600 transition-colors">
              AI Engineering
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#18181B]/60 backdrop-blur-sm border border-stone-800/80 cursor-pointer hover:text-white hover:border-stone-600 transition-colors hidden sm:block">
              Dev-ops Engineer
            </span>
          </div>
        </div>
      </div>

      {/* ─── ২. নিচের অংশের কন্টেন্ট (স্থির ও রেসপন্সিভ মার্জিন যুক্ত) ─── */}
      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center pb-24 z-10 mt-6 sm:mt-12 md:mt-20 lg:mt-28">
        
        {/* গ্লোব ওভারলে টেক্সট */}
        <div className="text-center mb-10 md:mb-14 px-4 max-w-3xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-stone-200 tracking-tight leading-snug drop-shadow-lg">
            Assisting over{" "}
            <span className="text-white font-semibold">15,000</span> job seekers{" "}
            <br className="hidden sm:block" />
            find their dream positions.
          </h2>
        </div>

        {/* স্ট্যাটস গ্রিড */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-5xl">
          <div className="bg-[#0C0C0F]/85 backdrop-blur-md border border-[#1E1E22]/80 rounded-xl p-4 flex flex-col justify-between h-24 md:h-26 transition-transform hover:scale-[1.02] shadow-xl">
            <BsBriefcase className="text-stone-400" size={16} />
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-0.5">50K</h3>
              <p className="text-[10px] md:text-xs text-stone-400">Active Jobs</p>
            </div>
          </div>

          <div className="bg-[#0C0C0F]/85 backdrop-blur-md border border-[#1E1E22]/80 rounded-xl p-4 flex flex-col justify-between h-24 md:h-26 transition-transform hover:scale-[1.02] shadow-xl">
            <BsBuilding className="text-stone-400" size={16} />
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-0.5">12K</h3>
              <p className="text-[10px] md:text-xs text-stone-400">Companies</p>
            </div>
          </div>

          <div className="bg-[#0C0C0F]/85 backdrop-blur-md border border-[#1E1E22]/80 rounded-xl p-4 flex flex-col justify-between h-24 md:h-26 transition-transform hover:scale-[1.02] shadow-xl">
            <BsPeople className="text-stone-400" size={16} />
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-0.5">2M</h3>
              <p className="text-[10px] md:text-xs text-stone-400">Job Seekers</p>
            </div>
          </div>

          <div className="bg-[#0C0C0F]/85 backdrop-blur-md border border-[#1E1E22]/80 rounded-xl p-4 flex flex-col justify-between h-24 md:h-26 transition-transform hover:scale-[1.02] shadow-xl">
            <BsStar className="text-stone-400" size={16} />
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-0.5">97%</h3>
              <p className="text-[10px] md:text-xs text-stone-400">Satisfaction Rate</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;