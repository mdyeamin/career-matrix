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
import { redirect } from "next/navigation";

const PostJobForm = () => {
  const [mockCompany] = useState({
    name: "Acme Corp (Auto-filled)",
    id: "company_000",
    isApproved: true,
  });

  const [isRemote, setIsRemote] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = { 
      ...data,
      companyId: mockCompany.id,
      status: "active",
      isRemote,
      isPubliclyVisible: true,
    };
    const res = await postJobs(payload);
    
    console.log("Response from postJobs action:", res);
    if (!res.insertedId) {
      toast.error("Failed to post job. Please try again.");
    }
    if (res.insertedId) {
      toast.success("Job posted successfully!");
      e.target.reset();
      redirect("/dashboard/recruiter/jobs");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a] p-4">
      <Form
        className="w-full max-w-3xl bg-[#121214] p-8 rounded-2xl border border-stone-800"
        onSubmit={onSubmit}
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-xl font-bold text-white">Post New Job</h2>
            <p className="text-stone-400 text-sm">
              Fill in the details to publish your job opening.
            </p>
          </div>
          <Button
            isIconOnly
            variant="flat"
            className="bg-transparent text-stone-400 hover:text-white"
          >
            <Xmark size={20} />
          </Button>
        </div>

        <div className="mb-10">
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-stone-800 pb-2">
            Job Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField isRequired name="jobTitle">
              <Label className="text-sm font-medium text-stone-300">
                Job Title
              </Label>
              <Input placeholder="e.g. Senior React Developer" />
            </TextField>

            <Select
              name="jobCategory"
              label="Job Category"
              placeholder="Select category"
            >
              <Label className="text-sm font-medium text-stone-300">
                Job Category
              </Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="eng">Engineering</ListBox.Item>
                  <ListBox.Item id="design">Design</ListBox.Item>
                  <ListBox.Item id="marketing">Marketing</ListBox.Item>
                  <ListBox.Item id="sales">Sales</ListBox.Item>
                  <ListBox.Item id="product">Product Management</ListBox.Item>
                  <ListBox.Item id="hr">Human Resources</ListBox.Item>
                  <ListBox.Item id="finance">Finance</ListBox.Item>
                  <ListBox.Item id="customer-support">
                    Customer Support
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            <Select name="jobType" label="Job Type" placeholder="Select type">
              <Label className="text-sm font-medium text-stone-300">
                Job Type
              </Label>
              <Select.Trigger>
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

            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-stone-300">
                Salary Range
              </Label>
              <div className="flex gap-2">
                <Input
                  name="minSalary"
                  type="number"
                  placeholder="Min"
                  className="w-full"
                />
                <Input
                  name="maxSalary"
                  type="number"
                  placeholder="Max"
                  className="w-full"
                />
                <div className="w-[140px] flex-shrink-0">
                  <Select
                    name="currency"
                    aria-label="Currency"
                    placeholder="EUR (€)"
                  >
                    <Select.Trigger>
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
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium text-stone-300">
                  Location (City, Country)
                </Label>
                <Switch>
                  <span className="text-xs text-stone-400"></span>
                </Switch>
                <Switch
                  size="sm"
                  isSelected={isRemote}
                  onChange={() => setIsRemote(!isRemote)}
                >
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Content>
                    <Label className="text-xs">Remote</Label>
                  </Switch.Content>
                </Switch>
              </div>
              {!isRemote && (
                <Input name="location" placeholder="e.g. Dhaka, Bangladesh" />
              )}
            </div>

            <TextField name="deadline">
              <Label className="text-sm font-medium text-stone-300">
                Application Deadline
              </Label>
              <Input type="date" />
            </TextField>
          </div>
        </div>

        {/* Job Description Sections */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-stone-800 pb-2">
            Job Description
          </h3>
          <div className="flex flex-col gap-6">
            <TextField name="responsibilities">
              <Label className="text-sm font-medium text-stone-300">
                Responsibilities
              </Label>
              <TextArea
                className="h-32"
                placeholder="Describe the job duties..."
              />
            </TextField>
            <TextField name="requirements">
              <Label className="text-sm font-medium text-stone-300">
                Requirements
              </Label>
              <TextArea
                className="h-32"
                placeholder="List required skills and experience..."
              />
            </TextField>
            <TextField name="benefits">
              <Label className="text-sm font-medium text-stone-300">
                Benefits (optional)
              </Label>
              <TextArea
                className="h-32"
                placeholder="List required skills and experience..."
              />
            </TextField>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-stone-800 pt-6">
          <Button
            type="reset"
            variant="flat"
            className="bg-stone-800 text-white"
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-white text-black font-bold">
            Post Job
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PostJobForm;
