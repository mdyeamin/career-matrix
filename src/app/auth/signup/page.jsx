"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  InputGroup,
  FieldError,
  Button,
  Link,
} from "@heroui/react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiImage,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
const router = useRouter()
  const handleSighUp = async (e) => {
    e.preventDefault();
    const fromData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(fromData.entries());

    try {
      const { data, error } = await authClient.signUp.email({
        ...userData,
        // callbackURL: "/",
      });
      if (error) {
        console.log("error", error);
        toast.error(error.message || "Registration failed!");
      }
      if(data){
        toast.success("successfully! Redirecting... Please login");
        await authClient.signOut();
        router.push("/auth/signin")
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    }
    // console.log("data",data,"error",error);
  };

  return (
    <div className="w-full min-h-screen pt-32 md:pt-40 pb-12 px-4 flex items-center justify-center bg-[#0A0A0C]">
      <div className="w-full max-w-[600px] p-5 sm:p-8 bg-[#121214]/90 backdrop-blur-md border border-stone-800/80 rounded-2xl shadow-2xl">
        <Form
          onSubmit={handleSighUp}
          className="w-full"
          validationBehavior="native"
        >
          <Fieldset className="w-full space-y-5">
            {/* হেডার */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-white uppercase leading-none">
                Create Account
              </h2>
              <p className="text-[11px] sm:text-xs font-semibold text-stone-400 tracking-wide block">
                Join thousands of professionals worldwide.
              </p>
            </div>

            {/* ইনপুট ফিল্ডস (Grid Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              {/* Name */}
              <TextField
                className="w-full"
                isRequired
                name="name"
                type="text"
                validate={(v) =>
                  !v || v.trim().length < 3 ? "Name too short" : null
                }
              >
                <Label className="text-[9px] font-extrabold text-stone-400 tracking-widest uppercase mb-1 block">
                  Full Name
                </Label>
                <InputGroup className="border border-stone-800 focus-within:border-violet-500 rounded-lg bg-[#18181B] overflow-hidden">
                  <InputGroup.Prefix className="pl-3 text-stone-500">
                    <FiUser size={14} />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    className="bg-transparent text-[13px] text-white w-full outline-none py-2.5 px-2"
                    placeholder="Julian Casablancas"
                  />
                </InputGroup>
                <FieldError className="text-[10px] text-rose-500 mt-0.5" />
              </TextField>

              {/* Profile Image URL */}
              <TextField
                className="w-full"
                name="image"
                type="text"
                validate={(v) =>
                  v && v.trim() !== ""
                    ? v.startsWith("http")
                      ? null
                      : "Invalid URL"
                    : null
                }
              >
                <Label className="text-[9px] font-extrabold text-stone-400 tracking-widest uppercase mb-1 block">
                  Profile URL (Optional)
                </Label>
                <InputGroup className="border border-stone-800 focus-within:border-violet-500 rounded-lg bg-[#18181B] overflow-hidden">
                  <InputGroup.Prefix className="pl-3 text-stone-500">
                    <FiImage size={14} />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    className="bg-transparent text-[13px] text-white w-full outline-none py-2.5 px-2"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </InputGroup>
                <FieldError className="text-[10px] text-rose-500 mt-0.5" />
              </TextField>

              {/* Email */}
              <TextField
                className="w-full"
                name="email"
                type="email"
                isRequired
                validate={(v) =>
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v)
                    ? "Invalid email"
                    : null
                }
              >
                <Label className="text-[9px] font-extrabold text-stone-400 tracking-widest uppercase mb-1 block">
                  Email
                </Label>
                <InputGroup className="border border-stone-800 focus-within:border-violet-500 rounded-lg bg-[#18181B] overflow-hidden">
                  <InputGroup.Prefix className="pl-3 text-stone-500">
                    <FiMail size={14} />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    className="bg-transparent text-[13px] text-white w-full outline-none py-2.5 px-2"
                    placeholder="julian@careermatrix.com"
                  />
                </InputGroup>
                <FieldError className="text-[10px] text-rose-500 mt-0.5" />
              </TextField>

              {/* Password */}
              <TextField
                className="w-full"
                name="password"
                isRequired
                validate={(v) =>
                  !passwordRegex.test(v)
                    ? "Password requirements not met"
                    : null
                }
              >
                <Label className="text-[9px] font-extrabold text-stone-400 tracking-widest uppercase mb-1 block">
                  Password
                </Label>
                <InputGroup className="border border-stone-800 focus-within:border-violet-500 rounded-lg bg-[#18181B] overflow-hidden">
                  <InputGroup.Prefix className="pl-3 text-stone-500">
                    <FiLock size={14} />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    className="bg-transparent text-[13px] text-white w-full outline-none py-2.5 px-2"
                    type={isVisible ? "text" : "password"}
                    placeholder="••••••••"
                  />
                  <InputGroup.Suffix className="pr-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="ghost"
                      className="text-stone-500 min-w-0 p-0"
                      onPress={() => setIsVisible(!isVisible)}
                    >
                      {isVisible ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                    </Button>
                  </InputGroup.Suffix>
                </InputGroup>
                <FieldError className="text-[10px] text-rose-500 mt-0.5" />
              </TextField>
            </div>

            {/* বাটন গ্রুপ */}
            <div className="space-y-3 pt-2">
              <Button
                type="submit"
                className="w-full h-10 bg-violet-600 text-white font-bold text-xs rounded-lg hover:bg-violet-500 transition-all uppercase"
              >
                <span>Register Now</span>
              </Button>

              <div className="flex items-center gap-2">
                <div className="h-[1px] flex-1 bg-stone-800" />
                <span className="text-[9px] font-bold text-stone-600 uppercase">
                  or
                </span>
                <div className="h-[1px] flex-1 bg-stone-800" />
              </div>

              <Button
                variant="bordered"
                className="w-full h-10 border-stone-800 bg-[#18181B] text-stone-300 font-bold text-[12px] rounded-lg flex items-center gap-2 hover:bg-stone-800"
              >
                <svg className="size-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Sign up with Google</span>
              </Button>

              <p className="text-center text-[11px] text-stone-500 font-medium">
                Already a member ?{" "}
                <Link
                  href="/auth/signin"
                  className="text-violet-500 font-bold ml-1"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </Fieldset>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
