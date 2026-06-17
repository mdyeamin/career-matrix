"use client";

import React from "react";
import { Table } from "@heroui/react";
import Image from "next/image";
import { updateCompany } from "@/lib/actions/companies";
import { useRouter } from "next/navigation";

const CompanyTable = ({ companies = [] }) => {
  const router = useRouter()
  // Approve Handler
  const handleApprove = async (companyId) => {
    try {
      
      const result = await updateCompany(companyId,{status: "Approved"})
      console.log(result);
      if (result.modifiedCount>0) {
        router.push('/dashboard/admin/companies')
      }
      // TODO: Call your API here
    } catch (error) {
      console.error(error);
    }
  };

  // Reject Handler
  const handleReject = async (companyId) => {
    try {
      console.log("Rejecting company with ID:", companyId);
      const result = await updateCompany(companyId, {status: "Rejected"})
       if (result.modifiedCount>0) {
        router.push('/dashboard/admin/companies')
      }
      // TODO: Call your API here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          Company Approvals
        </h1>
        <p className="text-stone-400 text-sm font-light">
          Review and manage company registration requests. Total{" "}
          <strong className="text-purple-400 font-medium">
            {companies.length}
          </strong>{" "}
          {companies.length === 1 ? "company" : "companies"}.
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-[#121214] border border-[#222222] rounded-2xl shadow-xl overflow-hidden">
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Company approvals table">
              {/* Table Header */}
              <Table.Header>
                <Table.Column
                  isRowHeader
                  className="bg-[#1a1a1c] text-stone-400 text-xs font-semibold py-4 border-b border-[#222222]"
                >
                  Company Name
                </Table.Column>
                <Table.Column className="bg-[#1a1a1c] text-stone-400 text-xs font-semibold py-4 border-b border-[#222222]">
                  Recruiter Email
                </Table.Column>
                <Table.Column className="bg-[#1a1a1c] text-stone-400 text-xs font-semibold py-4 border-b border-[#222222]">
                  Industry
                </Table.Column>
                <Table.Column className="bg-[#1a1a1c] text-stone-400 text-xs font-semibold py-4 border-b border-[#222222]">
                  Status
                </Table.Column>
                <Table.Column className="bg-[#1a1a1c] text-stone-400 text-xs font-semibold py-4 border-b border-[#222222]">
                  Date Submitted
                </Table.Column>
                <Table.Column className="bg-[#1a1a1c] text-stone-400 text-xs font-semibold py-4 border-b border-[#222222] text-right">
                  Actions
                </Table.Column>
              </Table.Header>

              {/* Table Body */}
              <Table.Body>
                {companies.length > 0 ? (
                  companies.map((company) => {
                    // ডেট ফরম্যাটিং
                    const dateValue =
                      company.createdAt?.$date ||
                      company.createdAt ||
                      new Date();
                    const formattedDate = new Date(
                      dateValue,
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    });

                    const status = company.status?.toLowerCase() || "pending";

                    return (
                      <Table.Row
                        key={company._id?.$oid || company._id}
                        className="border-b border-[#222222]/50 hover:bg-[#18181b] transition-colors"
                      >
                        {/* Company Name (Logo + Title) */}
                        <Table.Cell className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-md bg-[#1a1a1c] border border-[#2c2c2e] flex items-center justify-center shrink-0 overflow-hidden relative">
                              {/* সিম্পল লজিক: লোগো থাকলে ইমেজ দেখাবে, না থাকলে টেক্সট */}
                              {company.logo ? (
                                <Image
                                  fill
                                  sizes="36px"
                                  src={company.logo}
                                  alt={company.name}
                                  className="object-cover"
                                />
                              ) : (
                                <span className="text-sm font-bold text-stone-300">
                                  {company.name
                                    ? company.name.charAt(0).toUpperCase()
                                    : "C"}
                                </span>
                              )}
                            </div>
                            <span className="font-medium text-stone-200 capitalize">
                              {company.name}
                            </span>
                          </div>
                        </Table.Cell>

                        {/* Recruiter Email */}
                        <Table.Cell className="py-4 text-stone-400 text-sm">
                          {company.email || company.recruiterEmail || "N/A"}
                        </Table.Cell>

                        {/* Industry Pill */}
                        <Table.Cell className="py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#1a1a1c] text-stone-400 text-[11px] font-medium border border-[#2c2c2e]">
                            {company.industry || "Technology"}
                          </span>
                        </Table.Cell>

                        {/* Status (Dot + Text) */}
                        <Table.Cell className="py-4">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                status === "approved"
                                  ? "bg-emerald-500"
                                  : status === "rejected"
                                    ? "bg-red-500"
                                    : "bg-yellow-500"
                              }`}
                            ></div>
                            <span
                              className={`text-sm font-medium capitalize ${
                                status === "approved"
                                  ? "text-emerald-500"
                                  : status === "rejected"
                                    ? "text-red-500"
                                    : "text-yellow-500"
                              }`}
                            >
                              {status}
                            </span>
                          </div>
                        </Table.Cell>

                        {/* Date Submitted */}
                        <Table.Cell className="py-4 text-stone-400 text-sm">
                          {formattedDate}
                        </Table.Cell>

                        {/* Actions */}
                        <Table.Cell className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {(status === "pending" ||
                              status === "rejected") && (
                              <button
                                type="button"
                                onClick={() => handleApprove(company._id)}
                                className="px-3 py-1.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-md text-xs font-semibold hover:bg-emerald-500 hover:text-white transition-all focus:outline-none"
                              >
                                Approve
                              </button>
                            )}

                            {(status === "pending" ||
                              status === "approved") && (
                              <button
                                type="button"
                                onClick={() => handleReject(company._id)}
                                className="px-3 py-1.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-md text-xs font-semibold hover:bg-red-500 hover:text-white transition-all focus:outline-none"
                              >
                                Reject
                              </button>
                            )}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })
                ) : (
                  /* Empty State */
                  <Table.Row>
                    <Table.Cell className="py-8 text-stone-500 text-center">
                      No companies found.
                    </Table.Cell>
                    <Table.Cell className="py-8">-</Table.Cell>
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

export default CompanyTable;