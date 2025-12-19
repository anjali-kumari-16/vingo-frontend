
import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate} from "react-router-dom";


function ForgotPassword() {
  const [step, setStep] = useState(3); // step 1: Enter Email, step 2: Enter OTP, step 3: Reset Password
  const [email, setEmail] = useState("");
  const [otp,setOtp] = useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const navigate=useNavigate();


  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <IoIosArrowRoundBack size={30} className="text-[#ff4d2d] cursor-pointer" onClick ={() =>navigate("/signin")} />
            {/*Navigate to use cliking to a link and move to the new Url here click link then move to n signin page.*/}
          <h1 className="text-3xl font-bold text-[#ff4d2d] text-center w-full">
            Forgot Password
          </h1>
    </div>

        {/* Step 1 - Enter Email */}
        {step === 1 
          && 
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
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button
              className="w-full font-semibold rounded-lg px-4 py-2 cursor-pointer text-white bg-[#ff6600] hover:bg-[#e64323] transition duration-200"
              onClick={() => setStep(2)}
            >
              Send OTP
            </button>
        </div>
          
        }
        {step==2 
           && 
          <div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1">
                Enter Otp:-
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter Otp"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
            <button
              className="w-full font-semibold rounded-lg px-4 py-2 cursor-pointer text-white bg-[#ff6600] hover:bg-[#e64323] transition duration-200"
              onClick={() => setStep(2)}
            >
              Verify
            </button>
          </div>
        }
        {
            step==3 
            && 
            <div>
              <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
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
              <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}>Verify</button>
            </div>
             
        }


      </div>
    </div>
  );
}

export default ForgotPassword;
