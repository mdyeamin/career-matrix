"use client";

import React, { useState } from "react";
import { Input, Button, Card, Form, TextArea, Label } from "@heroui/react";
import { FaPaperPlane, FaBriefcase, FaBuilding } from "react-icons/fa";
import { submitApplication } from "@/lib/actions/applications";
import toast from "react-hot-toast"; // <-- react-hot-toast ইমপোর্ট করা হলো

const JobApply = ({ job, applicant }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [urlError, setUrlError] = useState(false);

  // জবের ডেটা ডিস্ট্রাকচারিং (ফলব্যাক ভ্যালু সহ)
  const {
    jobTitle = "Software Engineer",
    companyName = "Tech Corp",
    companyLogo = "https://ui-avatars.com/api/?name=TC&background=2a2a2b&color=fff",
  } = job || {};

  // URL ভ্যালিডেশন চেক করার ফাংশন
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Resume Link ভ্যালিডেশন
    if (!isValidUrl(data.resumeLink)) {
      setUrlError(true);
      toast.error("Please provide a valid URL for your resume."); // <-- টোস্ট এরর
      return; 
    }

    setUrlError(false);
    setLoading(true);

    try {
      const applicationData = {
        jobId: job?._id,
        jobTitle: job?.jobTitle,
        companyName: job?.companyName,
        applicantId: applicant?.id,
        applicantName: applicant?.name,
        applicantEmail: applicant?.email,
        ...data,
      };
      
      const res = await submitApplication(applicationData);

      // ব্যাকএন্ড থেকে সাকসেস রেসপন্স পেলে
      if (res?.insertedId) {
        toast.success("Application submitted successfully!"); // <-- টোস্ট সাকসেস
        setSuccess(true);
        e.target.reset();
      } else {
        // যদি রেসপন্স ঠিক না থাকে
        toast.error(res?.message || "Failed to submit application. Please try again.");
      }

    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(error?.message || "Something went wrong! Please check your connection."); // <-- ক্যাচ ব্লকে টোস্ট এরর
    } finally {
      setLoading(false);
    }
  };

  // সাবমিট সাকসেসফুল হলে এই স্ক্রিন দেখাবে
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#0a0a0a]">
        <Card className="max-w-md w-full text-center bg-[#121212] border border-[#222222] p-8 rounded-[28px] shadow-2xl flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-success-500/10 border border-success-500/20 flex items-center justify-center text-success-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-white">Application Sent!</h2>
            <p className="text-sm text-default-400 font-light">
              Your application for{" "}
              <span className="text-purple-400 font-medium">{jobTitle}</span>{" "}
              has been successfully submitted.
            </p>
          </div>
          <Button
            color="secondary"
            className="w-full bg-purple-600 rounded-xl font-medium"
            onClick={() => setSuccess(false)}
          >
            Back to Jobs
          </Button>
        </Card>
      </div>
    );
  }

  // মূল ফর্ম ডিজাইন
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* Job Summary Card */}
        <Card className="w-full p-5 bg-[#121212] border border-[#222222] rounded-2xl flex flex-row items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#2c2c2e] flex items-center justify-center p-2 shrink-0 overflow-hidden">
            <img
              alt={companyName}
              className="w-full h-full object-contain"
              src={companyLogo}
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs text-stone-400 font-light uppercase tracking-wide">
              Applying For
            </span>
            <h2 className="text-lg font-bold text-white truncate flex items-center gap-2">
              <FaBriefcase className="text-purple-400 text-sm" /> {jobTitle}
            </h2>
            <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
              <FaBuilding className="text-[10px]" />{" "}
              <span className="capitalize">{companyName}</span>
            </p>
          </div>
        </Card>

        {/* Application Form */}
        <Card className="w-full p-6 sm:p-8 bg-[#121212] border border-[#222222] rounded-[28px] shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6 border-b border-[#222222] pb-4">
            Submit Your Application
          </h3>
          <Form
            onSubmit={handleFormSubmit}
            className="flex flex-col w-full gap-6 mt-4"
          >
            {/* ১. Resume Link */}
            <div className="flex flex-col gap-1.5 w-full">
              <Label
                htmlFor="resumeLink"
                className="text-stone-300 font-medium text-sm"
              >
                Resume Link <span className="text-red-500">*</span>
              </Label>
              <Input
                isRequired
                id="resumeLink"
                name="resumeLink"
                type="url"
                placeholder="https://drive.google.com/..."
                variant="bordered"
                isInvalid={urlError}
                errorMessage={
                  urlError
                    ? "Please enter a valid URL starting with http:// or https://"
                    : ""
                }
                onChange={() => {
                  if (urlError) setUrlError(false);
                }}
              />
            </div>

            {/* ২. Why Hire You? */}
            <div className="flex flex-col gap-1.5 w-full">
              <Label
                htmlFor="whyHireYou"
                className="text-stone-300 font-medium text-sm"
              >
                Why should we hire you? <span className="text-red-500">*</span>
              </Label>
              <TextArea
                isRequired
                id="whyHireYou"
                name="whyHireYou"
                placeholder="Highlight your relevant skills, experience, and why you are a great fit..."
                variant="bordered"
                minRows={4}
              />
            </div>

            {/* ৩. Additional Info (Optional) */}
            <div className="flex flex-col gap-1.5 w-full">
              <Label
                htmlFor="additionalInfo"
                className="text-stone-300 font-medium text-sm"
              >
                Additional Information (Optional)
              </Label>
              <TextArea
                id="additionalInfo"
                name="additionalInfo"
                placeholder="Share GitHub profile, LinkedIn, or any other details..."
                variant="bordered"
                minRows={3}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#222222] mt-2 w-full">
              <Button
                type="submit"
                color="secondary"
                size="lg"
                isLoading={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 font-bold rounded-xl gap-2 shadow-lg shadow-purple-900/20"
                endContent={!loading && <FaPaperPlane className="text-xs" />}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default JobApply;