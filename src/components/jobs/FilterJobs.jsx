"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@heroui/react";
import { FaSearch } from "react-icons/fa";
import JobCard from "./JobsCard";

const categories = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Product Management",
  "Human Resources",
  "Finance",
  "Customer Support",
];

const jobTypes = ["Full-time", "Part-time", "Contract"];

export default function FilterJobs({ allJobs }) {
  // ১. সাধারণ ৪টি স্টেট (ইউজারের ইনপুট ধরে রাখার জন্য)
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [isRemote, setIsRemote] = useState(false);

  // ফিল্টার হওয়ার পর যে জবগুলো স্ক্রিনে দেখাবে, সেগুলো এই স্টেটে থাকবে
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  // ২. ফিল্টারিং লজিক (যেকোনো একটি স্টেট পরিবর্তন হলেই এই কোডটি আবার চলবে)
  useEffect(() => {
    // শুরুতেই সব জবের একটি কপি বা নকল তৈরি করে নিচ্ছি
    let result = allJobs;

    // ক. সার্চ ফিল্টার (ইউজার কিছু টাইপ করলে এই লজিকটি চলবে)
    if (search.trim() !== "") {
      result = result.filter((job) => {
        const titleMatch = job.jobTitle.toLowerCase().includes(search.toLowerCase());
        const companyMatch = job.companyName.toLowerCase().includes(search.toLowerCase());
        
        // টাইটেল অথবা কোম্পানির নামের সাথে মিললেই সেটি রেজাল্ট-এ থাকবে
        return titleMatch || companyMatch;
      });
    }

    // খ. ক্যাটাগরি ফিল্টার
    if (category !== "") {
      result = result.filter((job) => {
        // ডাটাবেজের ক্যাটাগরি এবং সিলেক্ট করা ক্যাটাগরি মিলিয়ে দেখা হচ্ছে
        // (ডাটাতে "eng" বা "Engineering" যাই থাকুক, ছোট হাতের অক্ষরে রূপান্তর করে চেক করছি)
        const jobCat = job.jobCategory.toLowerCase();
        const selectedCat = category.toLowerCase();

        if (selectedCat === jobCat) {
          
          return jobCat === selectedCat;
        }
      });
    }

    // গ. জব টাইপ ফিল্টার (Full-time, Part-time ইত্যাদি)
    if (type !== "") {
      result = result.filter((job) => {
        return job.jobType.toLowerCase() === type.toLowerCase();
      });
    }

    // ঘ. রিমোট ফিল্টার (যদি চেকবক্সে টিক দেওয়া থাকে)
    if (isRemote === true) {
      result = result.filter((job) => {
        return job.isRemote === true;
      });
    }

    // সব ফিল্টার শেষে ফাইনাল রেজাল্টটি স্টেটে সেট করে দিচ্ছি
    setFilteredJobs(result);

  }, [search, category, type, isRemote, allJobs]); // এই ৫টি জিনিস চেঞ্জ হলেই শুধু ভেতরের কোড রান করবে

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* ফিল্টার বার */}
      <div className="w-full bg-[#121212] p-4 rounded-2xl border border-[#222222]">
        <div className="flex flex-col lg:flex-row gap-4 items-center w-full">
          
          {/* ১. সার্চ বক্স */}
          <Input
            className="w-full lg:flex-1"
            placeholder="Search jobs..."
            startContent={<FaSearch className="text-default-400" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* ২. ক্যাটাগরি ড্রপডাউন */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full lg:max-w-xs h-10 px-3 rounded-xl bg-[#1c1c1e] text-sm text-default-600 border border-[#2c2c2e] cursor-pointer"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* ৩. জব টাইপ ড্রপডাউন */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full lg:max-w-[180px] h-10 px-3 rounded-xl bg-[#1c1c1e] text-sm text-default-600 border border-[#2c2c2e] cursor-pointer"
          >
            <option value="">Job Type</option>
            {jobTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* ৪. রিমোট কাস্টম বাটন/চেকবক্স */}
          <div className="flex items-center shrink-0 w-full lg:w-auto justify-end pl-2">
            <button
              type="button"
              onClick={() => setIsRemote(!isRemote)} // ক্লিক করলে ট্রু থাকলে ফলস হবে, ফলস থাকলে ট্রু হবে
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <span className="text-sm text-default-400 uppercase text-[12px]">Remote</span>
              
              {/* কাস্টম বক্স */}
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                isRemote ? "bg-purple-600 border-purple-600" : "bg-[#1c1c1e] border-[#2c2c2e]"
              }`}>
                {/* টিক চিহ্ন */}
                {isRemote && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* জব কার্ড গ্রিড */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((singleJob) => (
            <JobCard key={singleJob._id} job={singleJob} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-default-400 border border-dashed border-[#222222] rounded-2xl">
          No jobs found matching your criteria.
        </div>
      )}

    </div>
  );
}