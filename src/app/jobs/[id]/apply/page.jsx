import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import JobApply from "./JobApply";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import { getPlanById } from "@/lib/api/plans";

const applyPage = async ({ params }) => {
  const { id } = await params;

  const user = await getUserSession();

  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }

  // রিক্রুটার বা অন্য রোলের জন্য অ্যাক্সেস ডিনাইড কার্ড
  if (user?.role !== "seeker") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#0a0a0a]">
        <div className="max-w-md w-full text-center bg-[#121212] border border-[#222222] p-8 rounded-[28px] shadow-2xl flex flex-col items-center gap-6">
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
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Access Denied
            </h2>
            <p className="text-sm text-stone-400 leading-relaxed font-light">
              This page is exclusively for job seekers. Recruiters or other
              roles do not have access to view this content.
            </p>
          </div>
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

  const job = await getJobById(id);
  const applications = await getApplicationsByApplicant(user?.id);

  const plan = await getPlanById(user?.plan || "seeker_free");


  const hasReachedLimit = applications.length >= plan.maxApplicationsPerMonth;
  const progressPercentage =
    (applications.length / plan.maxApplicationsPerMonth) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* কোটা/লিমিট ট্র্যাকার ব্যানার */}
        <div className="bg-[#121212] border border-[#222222] rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-end mb-3">
            <div className="flex flex-col">
              <span className="text-xs text-stone-400 font-medium uppercase tracking-wider mb-1">
                Monthly Quota ({plan.name} Plan)
              </span>
              <h3 className="text-lg font-bold text-white">
                {applications.length}{" "}
                <span className="text-stone-500 font-normal">
                  / {plan.maxApplicationsPerMonth} Applied
                </span>
              </h3>
            </div>
            {/* ওয়ার্নিং ব্যাজ যদি লিমিট শেষের দিকে থাকে */}
            {!hasReachedLimit &&
              applications.length === plan.maxApplicationsPerMonth - 1 && (
                <span className="bg-orange-500/10 text-orange-400 text-xs font-bold px-2.5 py-1 rounded-full border border-orange-500/20">
                  1 Left!
                </span>
              )}
          </div>

          {/* প্রগ্রেস বার */}
          <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${hasReachedLimit ? "bg-red-500" : "bg-purple-500"}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* লজিক: লিমিট শেষ হলে ওয়ার্নিং কার্ড, না হলে ফর্ম */}
        {hasReachedLimit ? (
          <div className="w-full text-center bg-[#121212] border border-red-500/20 p-8 rounded-[28px] shadow-2xl flex flex-col items-center gap-6 mt-4">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Application Limit Reached
              </h2>
              <p className="text-sm text-stone-400 leading-relaxed font-light">
                You have used all{" "}
                <strong className="text-white">
                  {plan.maxApplicationsPerMonth}
                </strong>{" "}
                of your free applications for this month. Please upgrade your
                plan to continue applying for jobs.
              </p>
            </div>
            <Link
              href="/plans"
              className="w-full inline-flex items-center justify-center h-12 px-6 bg-white text-black font-bold rounded-xl transition-colors hover:bg-stone-200"
            >
              Upgrade Plan
            </Link>
          </div>
        ) : (
          <JobApply applicant={user} job={job} />
        )}
      </div>
    </div>
  );
};

export default applyPage;
