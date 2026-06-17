"use client";

import React from "react";
import { Table } from "@heroui/react";
import { Envelope, Eye, TrashBin } from "@gravity-ui/icons"; // আপনার ব্যবহৃত আইকন লাইব্রেরি

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
                <Table.Column className="bg-[#1a1a1a] text-stone-400 text-xs uppercase tracking-wider py-4">
                  Job Title
                </Table.Column>
                <Table.Column className="bg-[#1a1a1a] text-stone-400 text-xs uppercase tracking-wider py-4">
                  Company
                </Table.Column>
                <Table.Column className="bg-[#1a1a1a] text-stone-400 text-xs uppercase tracking-wider py-4">
                  Applied Date
                </Table.Column>
                <Table.Column className="bg-[#1a1a1a] text-stone-400 text-xs uppercase tracking-wider py-4 text-center">
                  Action
                </Table.Column>
              </Table.Header>

              {/* Table Body */}
              <Table.Body>
                {jobs?.length > 0 ? (
                  jobs.map((app) => {
                    // ডেট ফরম্যাটিং
                    const dateValue = app.createdAt?.$date || app.createdAt;
                    const formattedDate = new Date(
                      dateValue,
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });

                    // লোগোর ফলব্যাক জেনারেট করা
                    const companyLogoUrl =
                      app.companyLogo ||
                      `https://ui-avatars.com/api/?name=${app.companyName}&background=2a2a2b&color=fff&rounded=true`;

                    return (
                      <Table.Row
                        key={app._id?.$oid || app._id}
                        className="border-b border-[#222222]/50 hover:bg-[#18181b] transition-colors group"
                      >
                        {/* Job Title Cell */}
                        <Table.Cell className="py-4">
                          <span className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                            {app.jobTitle}
                          </span>
                        </Table.Cell>

                        {/* Company Cell (With Image) */}
                        <Table.Cell className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-[#2c2c2e] overflow-hidden shrink-0 flex items-center justify-center">
                              <img
                                src={companyLogoUrl}
                                alt={app.companyName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-stone-300 capitalize text-sm font-medium">
                              {app.companyName}
                            </span>
                          </div>
                        </Table.Cell>

                        {/* Date Cell */}
                        <Table.Cell className="py-4 text-stone-400 text-sm">
                          {formattedDate}
                        </Table.Cell>

                        {/* Action Cell */}
                        {/* Action Cell */}
                        <Table.Cell className="py-4">
                          <div className="flex items-center justify-center gap-2">
                            {/* Resume Button */}
                            <a
                              href={app.resumeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center px-3 py-1.5 bg-purple-600/10 text-purple-400 border border-purple-600/20 rounded-lg text-xs font-semibold hover:bg-purple-600 hover:text-white transition-all focus:outline-none gap-1.5"
                            >
                              <Envelope className="w-3.5 h-3.5" />
                              Resume
                            </a>

                            {/* View Job Button */}
                            <a
                              href={`/jobs/${app.jobId}`}
                              className="inline-flex items-center justify-center px-3 py-1.5 bg-[#222222] text-stone-300 border border-[#2c2c2e] rounded-lg text-xs font-semibold hover:bg-stone-300 hover:text-black transition-all focus:outline-none gap-1.5"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              View
                            </a>

                            {/* Delete Button (UI Only) */}
                            <button
                              type="button"
                              className="inline-flex items-center justify-center px-3 py-1.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-xs font-semibold hover:bg-red-600 hover:text-white transition-all focus:outline-none gap-1.5"
                            >
                              <TrashBin className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
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
