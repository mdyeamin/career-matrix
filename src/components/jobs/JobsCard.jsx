import React from "react";
import { Card, Button } from "@heroui/react";
import { FaMapMarkerAlt, FaBriefcase, FaArrowRight } from "react-icons/fa";
import {
  HiMiniCurrencyDollar,
  HiMiniCurrencyEuro,
  HiMiniCurrencyBangladeshi,
} from "react-icons/hi2";
import Link from "next/link";

// কারেন্সি আইকন ম্যাপ
const currencyIcons = {
  usd: (
    <HiMiniCurrencyDollar className="text-purple-400 shrink-0 text-medium" />
  ),
  eur: <HiMiniCurrencyEuro className="text-purple-400 shrink-0 text-medium" />,
  bdt: (
    <HiMiniCurrencyBangladeshi className="text-purple-400 shrink-0 text-medium" />
  ),
};

export default function JobCard({ job }) {
  const {
    jobTitle,
    responsibilities,
    jobType,
    minSalary,
    maxSalary,
    currency,
    location,
    isRemote,
    companyName,
    companyLogo,
  } = job || {};

  const currentIcon =
    currencyIcons[currency.toLowerCase()] || currencyIcons.usd;

  return (
    <Card className="w-full max-w-[420px] p-6 bg-[#121212] border border-[#222222] rounded-[28px] shadow-xl flex flex-col gap-5 text-left">
      {/* Company Info (Logo and Name) */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#2c2c2e] flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
          <img
            alt={`${companyName} logo`}
            className="w-full h-full object-contain rounded-lg"
            src={companyLogo}
          />
        </div>
        <span className="text-sm font-medium text-default-400 capitalize tracking-wide">
          {companyName}
        </span>
      </div>

      {/* Job Title & Description */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-white tracking-tight leading-tight">
          {jobTitle}
        </h2>
        <p className="text-sm text-default-400 leading-relaxed font-light line-clamp-2">
          {responsibilities}
        </p>
      </div>

      {/* Badges Layout */}
      <div className="flex flex-wrap gap-2 pt-1">
        {/* Location Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1c1c1e] text-[#f2f2f7] rounded-full text-xs font-medium border border-[#2c2c2e]">
          <FaMapMarkerAlt className="text-purple-400 shrink-0" />
          <span>{location}</span>
        </div>

        {/* Work Mode Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1c1c1e] text-[#f2f2f7] rounded-full text-xs font-medium border border-[#2c2c2e]">
          <FaBriefcase className="text-purple-400 shrink-0" />
          <span>
            {isRemote ? "Remote" : jobType === "Full-time" ? "Hybrid" : jobType}
          </span>
        </div>

        {/* Salary Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1c1c1e] text-[#f2f2f7] rounded-full text-xs font-medium border border-[#2c2c2e] w-full sm:w-auto">
          {currentIcon}
          <span>
            {minSalary}–{maxSalary}/hour
            
            
          </span>
        </div>
      </div>

      {/* Apply Now Action Button */}
      <div className="pt-2 mt-auto">
        <Link
        href={`jobs/${job._id}`}
          variant="light"
          className="p-0 h-auto min-w-0 bg-transparent text-white font-medium hover:text-purple-400 gap-2 transition-all duration-200 group text-[15px]"
          endContent={
            <FaArrowRight className="text-sm transition-transform duration-200 group-hover:translate-x-1" />
          }
        >
          Apply Now
        </Link>
      </div>
    </Card>
  );
}
