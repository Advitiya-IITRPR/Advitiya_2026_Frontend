"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import axios from "axios"

const VerifyOtp = () => {
  const router = useRouter();
  const params = useParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const verifyOtp = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await axios.post(
        `/api/user/verifyUser/${params.userId}`,
        {
          verificationCode: otp.join(""),
        }
      );

      if (response.data.success) {
        toast.success("Email verified successfully! Please login.");
        router.push("/login");
      } else {
        const errorMsg = response.data.message || "Invalid OTP";
        toast.error(errorMsg);
        setError(errorMsg);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during verification";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async () => {
    try {
      const response = await axios.post(
        `/api/user/sendOTPForResetPassword`,
        { type: "VERIFY", userId: params.userId }
      );

      if (response.data.success) {
        toast.success("OTP sent to your email!");
        issetOtpSent(true);
        setUserId(response.data.data.id)
      } else {
        toast.error(response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred while sending OTP.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#021334] via-[#012a61] to-[#275a91]">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/E-Cell Image.jpg"
            alt="E-Cell Logo"
            width={80}
            height={80}
            className="rounded-full mb-4"
          />
          <h2 className="text-3xl font-bold text-[#021334]">Verify Email</h2>
          <p className="text-gray-600 mt-2">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {/* OTP Input */}
        <div className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#275a91] focus:border-[#275a91] transition-colors duration-200 text-black [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[0_0_0_30px_white_inset] [&:-webkit-autofill]:text-black"
              />
            ))}
          </div>
          <button
            type="button"
            onClick={sendOTP}
            className="mt-2 text-sm text-blue-700 hover:text-blue-800 dark:hover:text-orange-500 font-semibold transition-colors duration-200 cursor-pointer"
          >
            Resend OTP
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            onClick={verifyOtp}
            disabled={isLoading || otp.some((digit) => !digit)}
            className="w-full py-3 px-4 bg-[#275a91] text-white font-semibold rounded-lg hover:bg-[#021334] focus:ring-4 focus:ring-[#275a91]/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
