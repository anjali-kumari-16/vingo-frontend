import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../config";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";


axios.defaults.withCredentials = true;

function ForgotPassword() {
  const [step, setStep] = useState(1); // step 1: Enter Email, step 2: Enter OTP, step 3: Reset Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  /*const handleSendOtp = async () => {//
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        {
          email,
        },
        { withCredentials: true }
      ); //   withCredentials:true is used to include cookies in cross-site requests.
      console.log(result);
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  };*/
  const handleSendOtp = async () => {
    setMessage("");
    setErrorMsg("");

    if (!email) {
      setErrorMsg("Please enter your email");
      return;
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email: email.toLowerCase().trim() },
        { withCredentials: true }
      );

      setMessage("OTP sent successfully ✅");
      setStep(2);
    } catch (error) {
      console.log(error);

      setErrorMsg(error.response?.data?.message || "OTP request failed ❌");
    }
  };

  const handleVerifyOtp = async () => {
    setMessage("");
    setErrorMsg("");
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        {
          email: email.toLowerCase().trim(),
          otp,
        },
        { withCredentials: true }
      ); //   withCredentials:true is used to include cookies in cross-site requests.
      setMessage("OTP verified successfully ✅");
      console.log(result);
      setStep(3);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Invalid OTP");
    }
  };
  const handleResetPassword = async () => {
    setMessage("");
    setErrorMsg("");
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!otp) {
      alert("Please enter the OTP");
      return;
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        {
          email: email.toLowerCase().trim(),
          otp,
          newPassword: password,
        },
        { withCredentials: true }
      );
      setMessage("Password reset successfully");
      setTimeout(() => navigate("/signin"), 1500);
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <IoIosArrowBack
            size={30}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/signin")}
          />
          {/*Navigate to use cliking to a link and move to the new Url here click link then move to n signin page.*/}
          <h1 className="text-3xl font-bold text-[#ff4d2d] text-center w-full">
            Forgot Password
          </h1>
        </div>


        {/* Step 1 - Enter Email */}
        {step === 1 && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              {/* ℹ️ Helper text */}
              <p className="text-xs text-gray-500 mt-1">
                We’ll send a 4-digit OTP to your registered email
              </p>

              {/* ✅ SUCCESS MESSAGE */}
              {message && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-300 text-green-700 px-3 py-2 rounded-md mt-3">
                  <span className="text-lg">✅</span>
                  <p className="text-sm">{message}</p>
                </div>
              )}

              {/* ❌ ERROR MESSAGE */}
              {errorMsg && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-300 text-red-700 px-3 py-2 rounded-md mt-3">
                  <span className="text-lg">❌</span>
                  <p className="text-sm">{errorMsg}</p>
                </div>
              )}
            </div>

            <button
              className="w-full font-semibold rounded-lg px-4 py-2 cursor-pointer text-white bg-[#ff6600] hover:bg-[#e64323] transition duration-200"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </div>
        )}

        {/* step 2 - Enter OTP */}
        {/*
        {step == 2 && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter Otp:-
              </label>
              <input
                type="text"
                id="otp"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
            <button
              className="w-full font-semibold rounded-lg px-4 py-2 cursor-pointer text-white bg-[#ff6600] hover:bg-[#e64323] transition duration-200"
              onClick={handleVerifyOtp}
            >
              Verify
            </button>
          </div>
        )}*/}
        {/* Step 2 - Verify OTP */}
        {step === 2 && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter OTP
              </label>

              <input
                type="text"
                id="otp"
                maxLength={4}
                className="w-full text-center tracking-widest text-lg border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="• • • •"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />

              <p className="text-xs text-gray-500 mt-1">
                Please enter the 4-digit OTP sent to your email
              </p>

              {/* ✅ SUCCESS MESSAGE */}
              {message && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-300 text-green-700 px-3 py-2 rounded-md mt-3">
                  <span className="text-lg">✅</span>
                  <p className="text-sm">{message}</p>
                </div>
              )}

              {/* ❌ ERROR MESSAGE */}
              {errorMsg && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-300 text-red-700 px-3 py-2 rounded-md mt-3">
                  <span className="text-lg">❌</span>
                  <p className="text-sm">{errorMsg}</p>
                </div>
              )}
            </div>

            <button
              className="w-full font-semibold rounded-lg px-4 py-2 cursor-pointer text-white bg-[#ff6600] hover:bg-[#e64323] transition duration-200"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </div>
        )}
        {/* step 3 - Reset Password */}

        {/*{step == 3 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                new Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter new password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Confirm new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>
        )}*/}
        {/* Step 3 - Reset Password */}
        {step === 3 && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>

              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 6 characters
              </p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>

              <input
                type="password"
                id="confirmPassword"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {/* ❌ Password mismatch warning */}
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            {/* ✅ SUCCESS MESSAGE */}
            {message && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-300 text-green-700 px-3 py-2 rounded-md mt-3">
                <span className="text-lg">✅</span>
                <p className="text-sm">{message}</p>
              </div>
            )}

            {/* ❌ ERROR MESSAGE */}
            {errorMsg && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-300 text-red-700 px-3 py-2 rounded-md mt-3">
                <span className="text-lg">❌</span>
                <p className="text-sm">{errorMsg}</p>
              </div>
            )}

            <button
              disabled={!password || password !== confirmPassword}
              className={`w-full font-semibold mt-4 py-2 rounded-lg transition duration-200
        ${!password || password !== confirmPassword
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#ff4d2d] text-white hover:bg-[#e64323]"
                }`}
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
