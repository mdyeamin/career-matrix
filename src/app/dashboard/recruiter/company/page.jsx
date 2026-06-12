"use client";
import { useState } from "react";
import {
  Button,
  Chip,
  Input,
  Label,
  ListBox,
  Select,
  TextField,
  TextArea,
} from "@heroui/react";
import { createCompany } from "@/lib/actions/companies";
import toast from "react-hot-toast";

const CompanyProfile = () => {
  // State to toggle between view mode and edit/register mode
  const [isEditing, setIsEditing] = useState(false);

  const [company, setCompany] = useState(null);

  // Image Upload States
  const [logoUrl, setLogoUrl] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // ImgBB Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Create instant local preview for amazing UX
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);

    // 2. Upload to ImgBB in the background
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      // IMPORTANT: Replace with your actual free ImgBB API key
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();

      if (data.success) {
        setLogoUrl(data.data.url); // Set the permanent URL for form submission
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Attach the uploaded image URL to the company data
    data.logo = logoUrl || company?.logo;

    const newCompanyData = { ...data, status: "Pending" };

    setCompany(newCompanyData); // Update state with new company data
    const payload = await createCompany(newCompanyData); // Send data to server
    console.log("send data to the server", payload);
    if (payload.insertedId) {
      toast.success(
        "Company information saved successfully! Awaiting approval.",
      );
    }
    if (!payload.insertedId) {
      toast.error("Failed to save company information. Please try again.");
    }
    setIsEditing(false); // Switch back to view mode after saving
    console.log("company data", newCompanyData);
  };

  const getStatusChip = (status) => {
    const map = { Pending: "warning", Approved: "success", Rejected: "danger" };
    return (
      <Chip
        color={map[status] || "default"}
        variant="flat"
        className="capitalize"
      >
        {status}
      </Chip>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      {/* --- CONDITIONAL RENDERING --- */}
      {isEditing ? (
        /* 1. EDIT / REGISTER FORM (INLINE) */
        <div className="bg-[#121214] p-8 rounded-2xl border border-stone-800 shadow-xl">
          <div className="mb-8 pb-6 border-b border-stone-800">
            <h2 className="text-xl font-bold text-white">
              {company ? "Edit Company Information" : "Register Company"}
            </h2>
            <p className="text-sm text-stone-400 mt-1">
              Fill in the details below to complete your company profile.
            </p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-2 gap-6">
              <TextField
                name="name"
                defaultValue={company?.name}
                isRequired
                className="w-full"
              >
                <Label className="text-stone-300 mb-1">Company Name</Label>
                <Input
                  placeholder="e.g. Acme Corp"
                  defaultValue={company?.name}
                  className="bg-[#1a1a1c] border-stone-800"
                />
              </TextField>

              <div className="w-full">
                <Select
                  name="industry"
                  className="w-full"
                  defaultSelectedKey={
                    company?.industry || "Software Development"
                  }
                >
                  <Label className="text-stone-300 mb-1">
                    Industry / Category
                  </Label>
                  <Select.Trigger className="bg-[#1a1a1c] border border-stone-800">
                    <Select.Value
                      defaultValue={company?.industry}
                      placeholder="Select industry"
                    />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item
                        id="Software Development"
                        textValue="Software Development"
                      >
                        Software Development
                      </ListBox.Item>
                      <ListBox.Item
                        id="AI & Machine Learning"
                        textValue="AI & Machine Learning"
                      >
                        AI & Machine Learning
                      </ListBox.Item>
                      <ListBox.Item
                        id="Cybersecurity"
                        textValue="Cybersecurity"
                      >
                        Cybersecurity
                      </ListBox.Item>
                      <ListBox.Item
                        id="Cloud Computing"
                        textValue="Cloud Computing"
                      >
                        Cloud Computing
                      </ListBox.Item>
                      <ListBox.Item
                        id="Data Analytics & Big Data"
                        textValue="Data Analytics & Big Data"
                      >
                        Data Analytics & Big Data
                      </ListBox.Item>
                      <ListBox.Item id="Fintech" textValue="Fintech">
                        Fintech
                      </ListBox.Item>
                      <ListBox.Item id="Healthtech" textValue="Healthtech">
                        Healthtech
                      </ListBox.Item>
                      <ListBox.Item id="Edtech" textValue="Edtech">
                        Edtech
                      </ListBox.Item>
                      <ListBox.Item
                        id="Web3 & Blockchain"
                        textValue="Web3 & Blockchain"
                      >
                        Web3 & Blockchain
                      </ListBox.Item>
                      <ListBox.Item
                        id="Hardware & IoT"
                        textValue="Hardware & IoT"
                      >
                        Hardware & IoT
                      </ListBox.Item>
                      <ListBox.Item id="E-commerce" textValue="E-commerce">
                        E-commerce
                      </ListBox.Item>
                      <ListBox.Item
                        id="IT Services & Consulting"
                        textValue="IT Services & Consulting"
                      >
                        IT Services & Consulting
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <TextField
                name="website"
                defaultValue={company?.website}
                className="w-full"
              >
                <Label className="text-stone-300 mb-1">Website URL</Label>
                <div className="flex w-full overflow-hidden rounded-lg border border-stone-800 focus-within:border-stone-500 transition-colors">
                  <div className="flex items-center px-3 bg-[#2a2a2c] text-stone-400 text-sm border-r border-stone-800">
                    https://
                  </div>
                  <Input
                    placeholder="www.company.com"
                    defaultValue={
                      company?.website
                        ? company.website.replace("https://", "")
                        : ""
                    }
                    className="bg-[#1a1a1c] border-none rounded-none focus:ring-0"
                  />
                </div>
              </TextField>

              <TextField
                defaultValue={company?.location}
                name="location"
                className="w-full"
              >
                <Label className="text-stone-300 mb-1">Location</Label>
                <Input
                  placeholder="City, Country"
                  defaultValue={company?.location}
                  className="bg-[#1a1a1c] border-stone-800"
                />
              </TextField>

              <div className="w-full">
                <Select
                  name="employeeCount"
                  className="w-full"
                  defaultSelectedKey={company?.employeeCount || "1-10"}
                >
                  <Label className="text-stone-300 mb-1">
                    Employee Count Range
                  </Label>
                  <Select.Trigger className="bg-[#1a1a1c] border border-stone-800">
                    <Select.Value placeholder="Select range" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="1-10" textValue="1-10 employees">
                        1-10 employees
                      </ListBox.Item>
                      <ListBox.Item id="11-50" textValue="11-50 employees">
                        11-50 employees
                      </ListBox.Item>
                      <ListBox.Item id="51-200" textValue="51-200 employees">
                        51-200 employees
                      </ListBox.Item>
                      <ListBox.Item id="201-500" textValue="201-500 employees">
                        201-500 employees
                      </ListBox.Item>
                      <ListBox.Item id="500+" textValue="500+ employees">
                        500+ employees
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* COMPANY LOGO UPLOADER */}
              <div className="w-full flex flex-col gap-3">
                <Label className="text-stone-300 font-medium text-sm">
                  Company Logo
                </Label>
                <div className="flex items-center gap-4">
                  <label className="relative flex cursor-pointer items-center justify-center w-[72px] h-[72px] rounded-[1.25rem] border-2 border-dashed border-stone-700 bg-[#1a1a1c] hover:bg-stone-800 transition-all overflow-hidden group shrink-0">
                    {previewImage || logoUrl || company?.logo ? (
                      <img
                        src={previewImage || logoUrl || company?.logo}
                        alt="Company Logo Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                    )}

                    {isUploading && (
                      <div className="absolute inset-0 bg-[#1a1a1c]/70 flex items-center justify-center backdrop-blur-[1px]">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      </div>
                    )}

                    <input
                      type="file"
                      className="hidden"
                      accept="image/png, image/jpeg"
                      onChange={handleImageUpload}
                    />
                  </label>

                  <div className="flex flex-col">
                    <span className="text-[15px] font-semibold text-white tracking-wide">
                      Upload image
                    </span>
                    <span className="text-[13px] text-stone-500 mt-0.5">
                      PNG, JPG up to 5MB
                    </span>
                  </div>
                </div>
              </div>

              <TextField
                defaultValue={company?.description}
                name="description"
                className="w-full col-span-2"
              >
                <Label className="text-stone-300 mb-1">Brief Description</Label>
                <TextArea
                  placeholder="Tell us about your company's mission and culture..."
                  defaultValue={company?.description}
                  className="bg-[#1a1a1c] border-stone-800 min-h-[100px]"
                />
              </TextField>
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-stone-800">
              {company && (
                <Button
                  variant="flat"
                  onPress={() => setIsEditing(false)}
                  className="bg-transparent text-stone-300 border border-stone-700"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                className="bg-white text-black font-bold px-6"
                isLoading={isUploading}
              >
                {company ? "Save Changes" : "Register Company"}
              </Button>
            </div>
          </form>
        </div>
      ) : !company ? (
        /* 2. EMPTY STATE VIEW */
        <div className="bg-[#121214] p-12 rounded-2xl border border-stone-800 text-center shadow-xl">
          <h2 className="text-xl font-bold text-white mb-2">
            No Company Registered
          </h2>
          <p className="text-stone-400 mb-6">
            Register your company to manage your profile and job posts.
          </p>
          <Button
            className="bg-white text-black font-bold px-6"
            onPress={() => setIsEditing(true)}
          >
            Register Company
          </Button>
        </div>
      ) : (
        /* 3. REGISTERED PROFILE VIEW */
        <div className="bg-[#121214] p-8 rounded-2xl border border-stone-800 shadow-xl">
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-stone-800">
            <div className="flex items-center gap-4">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt="Logo"
                  className="w-14 h-14 rounded-2xl object-cover border border-stone-700"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-400 font-bold text-xl">
                  {company.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-white">{company.name}</h2>
                <a
                  href={`https://${company.website.replace("https://", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-400 hover:underline"
                >
                  {company.website.replace("https://", "")}
                </a>
              </div>
            </div>
            {getStatusChip(company.status)}
          </div>

          <div className="grid grid-cols-2 gap-8 text-stone-300">
            <div>
              <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider mb-1">
                Industry
              </p>
              <p className="text-white text-lg">{company.industry}</p>
            </div>
            <div>
              <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider mb-1">
                Location
              </p>
              <p className="text-white text-lg">{company.location}</p>
            </div>
            <div>
              <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider mb-1">
                Company Size
              </p>
              <p className="text-white text-lg">
                {company.employeeCount} employees
              </p>
            </div>
            <div className="col-span-2 mt-2">
              <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider mb-2">
                About the Company
              </p>
              <p className="text-white leading-relaxed whitespace-pre-wrap">
                {company.description}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-800 flex justify-end">
            <Button
              variant="flat"
              onPress={() => setIsEditing(true)}
              className="bg-stone-800 text-white font-medium"
            >
              Edit Company Information
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
