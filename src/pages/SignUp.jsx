import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { serverUrl } from "../App";

import axios from "axios";//Axios ek JavaScript library hai jo HTTP requests banane ke liye use hoti hai — jaise data backend (API) se frontend (React, Node.js, etc.) me lana ya bhejna.
axios.defaults.withCredentials = true;


function SignUp() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(""); //When the user types their Full Name, Email, Password, or Mobile Number,
  //we want to store those values in React state, so you can access or send them to backend later (e.g., API call).
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
    const handleSignUp =async () => {
    try{
      const result = await axios.post(`${serverUrl}/api/auth/signup`,{
             fullName,email,password,mobileNumber,role

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
          Create your account to get started with delicious recipes and meal
          planning in food delivery app.
        </p>
        {/*fullName}*/}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            placeholder="Enter your Full Name:"
            style={{ border: `1px solid ${borderColor}` }}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            /*value={fullName}

This connects the input to React state.

Whatever is in fullName will show inside the input box.

onChange={(e) => setFullName(e.target.value)}

This listens to user typing.

e.target.value is the current text typed by the user.

setFullName(e.target.value) updates the React state.

This way, fullName always stores the latest input.*/
          />
        </div>
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
        {/*MobileNumber*/}
        <div className="mb-4">
          <label
            htmlFor="mobileNumber"
            className="block text-gray-700 font-medium mb-1"
          >
            Mobile NUmber
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            placeholder="Enter your Mobile Number:"
            style={{ border: `1px solid ${borderColor}` }}
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        {/*Role*/}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Role
          </label>

          <div className="flex gap-2">
            {["user", "owner", "deliveryboy"].map((r) => (
              <button
                key={r}
                className="flex-1 w-full border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                onClick={() => setRole(r)}
                style={
                  role === r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : {
                        border: `1px solid ${primaryColor}`,
                        color: primaryColor,
                      }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        {/* Sign Up Button */}

        <button onClick={handleSignUp} className="w-full font-semibold rounded-lg px-4 py-2 cursor-pointer text-white bg-[#ff6600] hover:bg-[#e64323] transition duration-200">
          Sign Up
        </button>
        {/* Sign Up with Google */}

        <button className="w-full mt-4 flex items-center cursor-pointer justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-200">
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>        
        {/* Already have account */}


        <p
          className="cursor-pointer text-center mt-4"
          onClick={() => navigate("/signin")}
        >
          Already have an account?{" "}
          <span className="text-[#ff4d2d] hover:underline">Sign In</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
