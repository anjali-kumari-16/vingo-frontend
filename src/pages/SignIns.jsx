import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { serverUrl } from "../App";

import axios from "axios";//Axios ek JavaScript library hai jo HTTP requests banane ke liye use hoti hai — jaise data backend (API) se frontend (React, Node.js, etc.) me lana ya bhejna.
axios.defaults.withCredentials = true;


function SignIns() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  
  //we want to store those values in React state, so you can access or send them to backend later (e.g., API call).
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
    const handleSignIn =async () => {
    try{
      const result = await axios.post(`${serverUrl}/api/auth/signin`,{
             email,password

      },{withCredentials:true})
      console.log(result)
 

    }catch(error){
      console.log(error)

    }

    
  };


  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`}
        style={{ border: `1px solid  ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: primaryColor }}
        >
          Vingo
        </h1>
        <p className="text-gray-600 mb-8">
          SigIn In to your account to get started with delicious recipes and meal
          planning in food delivery app.
        </p>
        
        {/*Email*/}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            placeholder="Enter your Email:"
            style={{ border: `1px solid ${borderColor}` }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/*Password*/}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none "
              placeholder="Enter your password:"
              style={{ border: `1px solid ${borderColor}` }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute right-3 cursor-pointer top-2.5 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <div className='text-right mb-2 text-[#ff4d2d] cursor-pointer font-medium 'onClick={()=>navigate("/forgot-password")}>
          Forgot Password
        </div>
        
        {/* Sign In Button */}

        <button onClick={handleSignIn} className="w-full font-semibold rounded-lg px-4 py-2 cursor-pointer text-white bg-[#ff6600] hover:bg-[#e64323] transition duration-200">
          Sign In
        </button>
        {/* Sign In with Google */}

        <button className="w-full mt-4 flex items-center cursor-pointer justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-200">
          <FcGoogle size={20} />
          <span>Sign In with Google</span>
        </button>        
        {/* Already have account */}


        <p
          className="cursor-pointer text-center mt-4"
          onClick={() => navigate("/signup")}
        >
          Want to create a new account ?{" "}
          <span className="text-[#ff4d2d] hover:underline">Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default SignIns;
