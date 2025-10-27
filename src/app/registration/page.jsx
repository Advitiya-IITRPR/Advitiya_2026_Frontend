"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios"
import { Input } from "@/components/ui/input";
import { StarsBackground } from "@/components/StarsBackground";

const RegistrationPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError("");

  
      const response = await axios.post(`api/user/registerUser`, {
        userName: data.name,
        email: data.email,
        mobileNo: data.mobile,
        password: data.password,
      });
  
      if (response.data.success && response.data.data?.id) {
        toast.success("Registration successful! Please verify your email.");
        router.push(`/verifyotp/${response.data.data.id}`);
      } else {
        const errorMsg = response.data.message || "Registration failed";
        toast.error(errorMsg);
        setError(errorMsg);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      const errorMessage = error.response?.data?.message || "An error occurred during registration";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StarsBackground className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950">
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-[#021334] backdrop-blur-sm rounded-xl shadow-2xl py-4">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo2.png"
            alt="Advitiya Logo"
            width={80}
            height={80}
            className="rounded-full mb-4"
          />
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-gray-300 mt-2">Welcome to Advitiya 2025</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2">
              <User className="w-4 h-4 text-blue-400" />
              Full Name
            </label>
            <Input
              type="text"
              placeholder="Enter your full name"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2">
              <Mail className="w-4 h-4 text-blue-400" />
              Email Address
            </label>
            <Input
              type="email"
              placeholder="Enter your email address"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2">
              <Phone className="w-4 h-4 text-blue-400" />
              Mobile Number
            </label>
            <Input
              type="tel"
              placeholder="Enter your mobile number"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit mobile number",
                },
              })}
            />
            {errors.mobile && (
              <p className="text-red-400 text-sm mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2">
              <Lock className="w-4 h-4 text-blue-400" />
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors duration-200 placeholder-gray-400"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                    message:
                      "Password must contain at least one letter and one number",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-400/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        </div>
      </div>
    </StarsBackground>
  );
};

export default RegistrationPage;