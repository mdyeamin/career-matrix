import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import JobApply from "./JobApply";

const applyPage = async ({ params }) => {
  const { id } = await params;

  const user = await getUserSession();
  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }
  if (user?.role !== "seeker") {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#0a0a0a]">
      <div className="max-w-md w-full text-center bg-[#121212] border border-[#222222] p-8 rounded-[28px] shadow-2xl flex flex-col items-center gap-6">
        
        {/* লক বা নিষেধাজ্ঞা নির্দেশক আইকন */}
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>

        {/* মেসেজ সেকশন */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Access Denied
          </h2>
          <p className="text-sm text-default-400 leading-relaxed font-light">
            This page is exclusively for job seekers. Recruiters or other roles do not have access to view this content.
          </p>
        </div>

        {/* অ্যাকশন বাটন (হোম পেজে ব্যাক করার জন্য) */}
        <Link 
          href="/"
          className="w-full inline-flex items-center justify-center h-11 px-6 bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm rounded-xl transition-colors shadow-lg shadow-purple-600/10 focus:outline-none"
        >
          Back to Home
        </Link>
        
      </div>
    </div>
  );
}


const job = await getJobById(id)

  return <div className="mt-10">

  <JobApply applicant={user} job={job}/>;
  </div>
};

export default applyPage;
