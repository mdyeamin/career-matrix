"use client";

import { useState } from "react";
import {
  Button,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
  Switch,
} from "@heroui/react";
import { Xmark } from "@gravity-ui/icons";
import { postJobs } from "@/lib/actions/jobs";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

const PostJobForm = ({ company }) => {
  const [isRemote, setIsRemote] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      companyId: company._id,
      companyName: company.name,
      companyLogo: company.logo,
      companyLocation: company.location,
      status: "active",
      isRemote,
      isPubliclyVisible: true,
    };

    const res = await postJobs(payload);

    if (!res.insertedId) {
      toast.error("Failed to post job. Please try again.");
    }
    if (res.insertedId) {
      toast.success("Job posted successfully!");
      e.target.reset();
      redirect("/dashboard/recruiter/jobs");
    }
  };

  const isApproved = company?.status?.toLowerCase() === "approved";

  // Helper function to render styled status badge
  const renderStatusBadge = (status) => {
    const statusLower = status?.toLowerCase() || "pending";
    let badgeStyle = "bg-stone-500/10 text-stone-400 border-stone-500/20"; // Default

    if (statusLower === "approved" || statusLower === "active") {
      badgeStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    } else if (statusLower === "pending") {
      badgeStyle = "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    } else if (statusLower === "rejected" || statusLower === "inactive") {
      badgeStyle = "bg-red-500/10 text-red-400 border-red-500/20";
    }

    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${badgeStyle}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4 md:py-10 font-sans">
      
      <div className="w-full max-w-3xl flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* =========================================
            Header Section
            ========================================= */}
        <div className="flex justify-between items-start px-2">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              Post New Job
            </h2>
            
            <div className="flex items-center gap-3 mb-3">
              <p className="text-sm text-stone-400 font-light">
                Posting as: <strong className="text-stone-200 font-medium">{company?.name || "Unknown Company"}</strong>
              </p>
              {renderStatusBadge(company?.status)}
            </div>

            <p className="text-stone-500 text-sm font-light">
              Fill in the details below to publish your job opening.
            </p>
          </div>
          
          <Button
            isIconOnly
            variant="flat"
            onPress={() => router.back()}
            className="bg-[#1a1a1c] text-stone-400 hover:text-white hover:bg-stone-800 transition-colors rounded-full shadow-md mt-1"
          >
            <Xmark size={18} />
          </Button>
        </div>

        {/* =========================================
            Form or Restriction Card Rendering
            ========================================= */}
       { isApproved ? (
         <Form
          className="w-full bg-[#121214] p-8 md:p-10 rounded-[28px] border border-[#222222] shadow-2xl"
          onSubmit={onSubmit}
        >
          {/* ... (Your existing form content remains exactly the same here) ... */}
          {/* Job Info Section */}
          <div className="w-full mb-10">
            <h3 className="text-lg font-semibold text-white mb-6 border-b border-[#222222] pb-3">
              Job Info
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <TextField isRequired name="jobTitle" className="w-full">
                <Label className="text-sm font-medium text-stone-300">
                  Job Title
                </Label>
                <Input
                  placeholder="e.g. Senior React Developer"
                  className="bg-[#1a1a1c] w-full"
                />
              </TextField>

              <Select
                name="jobCategory"
                label="Job Category"
                placeholder="Select category"
                className="w-full"
              >
                <Label className="text-sm font-medium text-stone-300">
                  Job Category
                </Label>
                <Select.Trigger className="bg-[#1a1a1c]">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Engineering">Engineering</ListBox.Item>
                    <ListBox.Item id="Design">Design</ListBox.Item>
                    <ListBox.Item id="Marketing">Marketing</ListBox.Item>
                    <ListBox.Item id="Sales">Sales</ListBox.Item>
                    <ListBox.Item id="Product Management">Product Management</ListBox.Item>
                    <ListBox.Item id="Human Resources">Human Resources</ListBox.Item>
                    <ListBox.Item id="Finance">Finance</ListBox.Item>
                    <ListBox.Item id="Customer Support">Customer Support</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              <Select name="jobType" label="Job Type" placeholder="Select type" className="w-full">
                <Label className="text-sm font-medium text-stone-300">
                  Job Type
                </Label>
                <Select.Trigger className="bg-[#1a1a1c]">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Full-time">Full-time</ListBox.Item>
                    <ListBox.Item id="Part-time">Part-time</ListBox.Item>
                    <ListBox.Item id="Contract">Contract</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              <div className="flex flex-col gap-1.5 w-full">
                <Label className="text-sm font-medium text-stone-300">
                  Salary Range
                </Label>
                <div className="flex gap-2">
                  <Input
                    name="minSalary"
                    type="number"
                    placeholder="Min"
                    className="w-full bg-[#1a1a1c]"
                  />
                  <Input
                    name="maxSalary"
                    type="number"
                    placeholder="Max"
                    className="w-full bg-[#1a1a1c]"
                  />
                  <div className="w-[110px] sm:w-[140px] flex-shrink-0">
                    <Select
                      name="currency"
                      aria-label="Currency"
                      placeholder="EUR (€)"
                    >
                      <Select.Trigger className="bg-[#1a1a1c]">
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="eur">EUR (€)</ListBox.Item>
                          <ListBox.Item id="usd">USD ($)</ListBox.Item>
                          <ListBox.Item id="bdt">BDT (৳)</ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Location with Remote Toggle */}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center h-[28px]">
                  <Label className="text-sm font-medium text-stone-300">
                    Location
                  </Label>
                  <Switch
                    size="sm"
                    isSelected={isRemote}
                    onChange={() => setIsRemote(!isRemote)}
                  >
                    <Switch.Control>
                      <Switch.Thumb />
                    </Switch.Control>
                    <Switch.Content>
                      <Label className="text-xs text-stone-400">Remote Only</Label>
                    </Switch.Content>
                  </Switch>
                </div>
                {!isRemote && (
                  <Input
                    name="location"
                    placeholder="e.g. Dhaka, Bangladesh"
                    className="bg-[#1a1a1c] w-full"
                  />
                )}
              </div>

              <TextField name="deadline" className="w-full">
                <Label className="text-sm font-medium text-stone-300">
                  Application Deadline
                </Label>
                <Input type="date" className="bg-[#1a1a1c] w-full" />
              </TextField>
            </div>
          </div>

          {/* Job Description Section */}
          <div className="w-full mb-10">
            <h3 className="text-lg font-semibold text-white mb-6 border-b border-[#222222] pb-3">
              Job Description
            </h3>
            <div className="flex flex-col gap-6">
              <TextField name="responsibilities" className="w-full">
                <Label className="text-sm font-medium text-stone-300">
                  Responsibilities
                </Label>
                <TextArea
                  className="min-h-[120px] bg-[#1a1a1c] w-full"
                  placeholder="Describe the main job duties..."
                />
              </TextField>
              
              <TextField name="requirements" className="w-full">
                <Label className="text-sm font-medium text-stone-300">
                  Requirements
                </Label>
                <TextArea
                  className="min-h-[120px] bg-[#1a1a1c] w-full"
                  placeholder="List required skills and experience..."
                />
              </TextField>
              
              <TextField name="benefits" className="w-full">
                <Label className="text-sm font-medium text-stone-300">
                  Benefits (Optional)
                </Label>
                <TextArea
                  className="min-h-[100px] bg-[#1a1a1c] w-full"
                  placeholder="List benefits, perks, etc..."
                />
              </TextField>
            </div>
          </div>

          {/* Submit Action Area */}
          <div className="flex justify-end gap-4 border-t border-[#222222] pt-8 mt-2">
            <Button
              type="reset"
              variant="flat"
              onPress={() => router.back()}
              className="bg-stone-800/40 hover:bg-stone-800 text-stone-300 font-medium px-6 transition-colors rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-white hover:bg-stone-200 text-black font-bold px-8 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-xl"
            >
              Post Job
            </Button>
          </div>
        </Form>
       ) : (
        /* =========================================
           Restriction Card (When Not Approved)
           ========================================= */
        <div className="w-full bg-[#121214] p-10 rounded-[28px] border border-[#222222] shadow-2xl flex flex-col items-center justify-center text-center py-16">
          <div className="w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 mb-6 shadow-[0_0_30px_-5px_rgba(234,179,8,0.2)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2.25m0 4.5h.01M2.25 12c0 5.385 4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75S17.385 2.25 12 2.25 2.25 6.615 2.25 12z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Approval Required</h2>
          <p className="text-stone-400 max-w-md mx-auto mb-8">
            Your company profile is currently <span className="text-yellow-400 font-medium">Pending Approval</span>. You will be able to post new jobs once our team reviews and approves your account.
          </p>
          <Button
             onPress={() => router.back()}
             className="bg-white hover:bg-stone-200 text-black font-bold px-8 h-12 transition-colors rounded-xl"
          >
            Go Back
          </Button>
        </div>
       )}
      </div>
      
    </div>
  );
};

export default PostJobForm;