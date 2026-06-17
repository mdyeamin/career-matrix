"use client";

import React from "react";
import { Table } from "@heroui/react";
import { Briefcase } from "@gravity-ui/icons"; // Job আইকনের জন্য
import Image from "next/image";

// রিলেটিভ টাইম (যেমন: "2 days ago") বের করার হেল্পার ফাংশন
const getRelativeTime = (dateInput) => {
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks === 1) return "1 week ago";
  return `${diffInWeeks} weeks ago`;
};

// স্ট্যাটাস অনুযায়ী ব্যাজের কালার দেওয়ার হেল্পার ফাংশন
const renderStatusBadge = (status = "Applied") => {
  const styles = {
    Applied: "border-stone-500 text-stone-300",
    Review: "border-yellow-500 text-yellow-500",
    Shortlisted: "border-green-500 text-green-500",
    Rejected: "border-red-500 text-red-500",
    Offered: "border-stone-300 text-white",
  };

  // যদি স্ট্যাটাস ম্যাচ না করে, তবে ডিফল্ট হিসেবে 'Applied' এর স্টাইল পাবে
  const badgeStyle = styles[status] || styles.Applied;

  return (
    <span className={`px-3 py-1 rounded-full border text-[11px] font-medium tracking-wide ${badgeStyle}`}>
      {status}
    </span>
  );
};

const ApplicationsTable = ({ jobs }) => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header / Title Section */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          My Applications
        </h1>
        <p className="text-stone-400 text-sm font-light">
          You have applied to{" "}
          <strong className="text-purple-400 font-medium">
            {jobs?.length || 0}
          </strong>{" "}
          {jobs?.length === 1 ? "job" : "jobs"} so far.
        </p>
      </div>

      {/* HeroUI Table Implementation */}
      <div className="bg-[#121212] border border-[#222222] rounded-2xl shadow-xl overflow-hidden">
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Applications table">
              {/* Table Header */}
              <Table.Header>
                <Table.Column className="bg-[#1a1a1a] text-stone-400 text-xs font-semibold py-4">
                  Job Title
                </Table.Column>
                <Table.Column className="bg-[#1a1a1a] text-stone-400 text-xs font-semibold py-4">
                  Company
                </Table.Column>
                <Table.Column className="bg-[#1a1a1a] text-stone-400 text-xs font-semibold py-4">
                  Applied
                </Table.Column>
                <Table.Column className="bg-[#1a1a1a] text-stone-400 text-xs font-semibold py-4">
                  Status
                </Table.Column>
                <Table.Column className="bg-[#1a1a1a] text-stone-400 text-xs font-semibold py-4">
                  Action
                </Table.Column>
              </Table.Header>

              {/* Table Body */}
              <Table.Body>
                {jobs?.length > 0 ? (
                  jobs.map((app) => {
                    const dateValue = app.createdAt?.$date || app.createdAt;
                    const relativeTime = getRelativeTime(dateValue);

                    return (
                      <Table.Row
                        key={app._id?.$oid || app._id}
                        className="border-b border-[#222222]/50 hover:bg-[#18181b] transition-colors group"
                      >
                        {/* Job Title Cell (Icon + Title + Meta) */}
                        <Table.Cell className="py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#222222] border border-[#2c2c2e] flex items-center justify-center shrink-0">
                              <Image  width={200} height={200} src={app?.companyLogo || "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-e089327a5c476ce5c70c74f7359c5898_screen.jpg"} alt="" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-stone-200 group-hover:text-white transition-colors">
                                {app.jobTitle}
                              </span>
                              <span className="text-xs text-stone-500 mt-0.5">
                                {app.jobType || "Full-time"} • {app.location || "Remote"}
                              </span>
                            </div>
                          </div>
                        </Table.Cell>

                        {/* Company Cell (Text Only like image) */}
                        <Table.Cell className="py-4">
                          <span className="text-stone-300 text-sm">
                            {app.companyName}
                          </span>
                        </Table.Cell>

                        {/* Applied Date Cell (Relative Time) */}
                        <Table.Cell className="py-4 text-stone-400 text-sm">
                          {relativeTime}
                        </Table.Cell>

                        {/* Status Cell */}
                        <Table.Cell className="py-4">
                          {/* আপনার ডেটাবেসে status ফিল্ড না থাকলে ডিফল্ট 'Applied' দেখাবে */}
                          {renderStatusBadge(app.status || "Applied")}
                        </Table.Cell>

                        {/* Action Cell (Details Text) */}
                        <Table.Cell className="py-4">
                          <a
                            href={`/jobs/${app.jobId?.$oid || app.jobId}`}
                            className="text-sm font-medium text-stone-300 hover:text-white transition-colors"
                          >
                            Details
                          </a>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })
                ) : (
                  /* Empty State Fallback */
                  <Table.Row>
                    <Table.Cell className="py-8 text-stone-500 text-center">
                      No applications found.
                    </Table.Cell>
                    <Table.Cell className="py-8">-</Table.Cell>
                    <Table.Cell className="py-8">-</Table.Cell>
                    <Table.Cell className="py-8">-</Table.Cell>
                    <Table.Cell className="py-8">-</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
};

export default ApplicationsTable;