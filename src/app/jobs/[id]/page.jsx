import { getJobById } from '@/lib/api/jobs';
import React from 'react';
import { Button, Card } from "@heroui/react";
import { FaMapMarkerAlt, FaBriefcase, FaCalendarAlt, FaArrowRight, FaBuilding } from "react-icons/fa";
import { HiMiniCurrencyDollar, HiMiniCurrencyEuro, HiMiniCurrencyBangladeshi } from "react-icons/hi2";

// কারেন্সি আইকন ম্যাপ
const currencyIcons = {
  usd: <HiMiniCurrencyDollar className="text-purple-400 text-lg shrink-0" />,
  eur: <HiMiniCurrencyEuro className="text-purple-400 text-lg shrink-0" />,
  bdt: <HiMiniCurrencyBangladeshi className="text-purple-400 text-lg shrink-0" />,
};

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  // ১. সেফটি চেক: যদি কোনো কারণে ডাটাবেজ থেকে জব না পাওয়া যায়
  if (!job) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-semibold text-danger mb-2">Job Not Found</h2>
        <p className="text-default-400 text-sm">The job listing you are looking for might have expired or been removed.</p>
      </div>
    );
  }

  // অবজেক্ট ডিস্ট্রাকচারিং (ফলব্যাক ভ্যালু সহ)
  const {
    jobTitle = "Untitled Position",
    companyName = "Unknown Company",
    companyLogo = "https://placehold.co/100",
    companyLocation = "N/A",
    location = "Remote",
    jobType = "Full-time",
    isRemote = false,
    minSalary = "0",
    maxSalary = "0",
    currency = "usd",
    deadline = "N/A",
    responsibilities = "No responsibilities listed.",
    requirements = "No requirements listed.",
    benefits = "No benefits listed.",
  } = job || {};

  const currentIcon = currencyIcons[currency.toLowerCase()] || currencyIcons.usd;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        
        {/* মেইন হেডার কার্ড (কোম্পানি ও টাইটেল) */}
        <Card className="w-full p-6 sm:p-8 bg-[#121212] border border-[#222222] rounded-[28px] shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            
            {/* বামপাশ: কোম্পানি লোগো, নাম ও টাইটেল */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-[#2c2c2e] flex items-center justify-center p-2.5 shrink-0 overflow-hidden">
                <img
                  alt={`${companyName} logo`}
                  className="w-full h-full object-contain rounded-xl"
                  src={companyLogo}
                />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                  {jobTitle}
                </h1>
                <div className="flex items-center gap-2 text-sm text-purple-400 font-medium">
                  <FaBuilding className="text-xs" />
                  <span className="capitalize tracking-wide">{companyName}</span>
                  <span className="text-default-500">•</span>
                  <span className="text-default-400 font-light">{companyLocation}</span>
                </div>
              </div>
            </div>

            {/* ডানপাশ: ইনস্ট্যান্ট অ্যাপ্লাই বাটন */}
            <Button
              color="secondary"
              size="lg"
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 font-medium rounded-xl px-8 shadow-lg shadow-purple-600/20 group gap-2"
              endContent={<FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />}
            >
              Apply Now
            </Button>
          </div>

          <div className="my-6 bg-[#222222]" />

          {/* জবের কুইক ইনফো গ্রিড (ব্যাজ মেকানিজম) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* লোকেশন */}
            <div className="flex items-center gap-3 p-3 bg-[#1c1c1e] rounded-2xl border border-[#2c2c2e]">
              <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
                <FaMapMarkerAlt />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-default-400 font-light">Location</span>
                <span className="text-sm font-medium text-white truncate">{location}</span>
              </div>
            </div>

            {/* কাজের ধরন */}
            <div className="flex items-center gap-3 p-3 bg-[#1c1c1e] rounded-2xl border border-[#2c2c2e]">
              <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
                <FaBriefcase />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-default-400 font-light">Job Type</span>
                <span className="text-sm font-medium text-white truncate">
                  {isRemote ? "Remote" : jobType}
                </span>
              </div>
            </div>

            {/* স্যালারি রেঞ্জ */}
            <div className="flex items-center gap-3 p-3 bg-[#1c1c1e] rounded-2xl border border-[#2c2c2e]">
              <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
                {currentIcon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-default-400 font-light">Salary (Avg)</span>
                <span className="text-sm font-medium text-white truncate">
                  {minSalary}k–{maxSalary}k
                </span>
              </div>
            </div>

            {/* ডেডলাইন */}
            <div className="flex items-center gap-3 p-3 bg-[#1c1c1e] rounded-2xl border border-[#2c2c2e]">
              <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
                <FaCalendarAlt />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-default-400 font-light">Deadline</span>
                <span className="text-sm font-medium text-white truncate">{deadline}</span>
              </div>
            </div>

          </div>
        </Card>

        {/* জবের বিস্তারিত বিবরণ কার্ড (Responsibilities, Requirements, Benefits) */}
        <Card className="w-full p-6 sm:p-8 bg-[#121212] border border-[#222222] rounded-[28px] shadow-2xl flex flex-col gap-6 text-left">
          
          {/* ১. কাজের বিবরণ বা দায়িত্ব */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-lg font-semibold text-white tracking-wide">
              Job Description & Responsibilities
            </h3>
            <p className="text-sm text-default-400 leading-relaxed font-light whitespace-pre-line">
              {responsibilities}
            </p>
          </div>

          <div className="bg-[#222222]" />

          {/* ২. যোগ্যতা বা রিকোয়ারমেন্টস */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-lg font-semibold text-white tracking-wide">
              Requirements
            </h3>
            <p className="text-sm text-default-400 leading-relaxed font-light whitespace-pre-line">
              {requirements}
            </p>
          </div>

          <div className="bg-[#222222]" />

          {/* ৩. সুযোগ-সুবিধা বা বেনিফিটস */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-lg font-semibold text-white tracking-wide">
              Benefits & Perks
            </h3>
            <p className="text-sm text-default-400 leading-relaxed font-light whitespace-pre-line">
              {benefits}
            </p>
          </div>

        </Card>

      </div>
    </div>
  );
};

export default JobDetailsPage;