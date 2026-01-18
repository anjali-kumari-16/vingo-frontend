import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { serverUrl } from "../config";

import axios from "axios";//Axios ek JavaScript library hai jo HTTP requests banane ke liye use hoti hai — jaise data backend (API) se frontend (React, Node.js, etc.) me lana ya bhejna.
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

axios.defaults.withCredentials = true;


function SignIns() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = useState(false);

  console.log("user data");

  const navigate = useNavigate();

  //we want to store those values in React state, so you can access or send them to backend later (e.g., API call).
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch()

  const handleSignIn = async () => {
    try {
      setError("");
      const result = await axios.post(`${serverUrl}/api/auth/signin`, {
        email, password

      }, { withCredentials: true })
      dispatch(setUserData(result.data))


    } catch (error) {
      console.log(error)
      setError("Failed to sign in. Please check your credentials.");
    }


  };
  //Google authtentication
  const handleGoogleAuth = async () => {


    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
        email: result.user.email,
        fullName: result.user.displayName,
        mobileNumber: "Google Auth", // Placeholder as mobile is usually required
        role: "user"
      }, { withCredentials: true });
      dispatch(setUserData(data))

      //console.log("Google Sign-In result:", result);
      // You might want to handle the successful sign-in here, e.g., send token to backend
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError("Failed to sign in with Google.");
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
          PetPuja
        </h1>
        <p className="text-gray-600 mb-8">
          SigIn In to your account to get started with delicious recipes and meal
          planning in food delivery app.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

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
            onChange={(e) => setEmail(e.target.value)} required
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
              onChange={(e) => setPassword(e.target.value)} required
            />
            <button
              className="absolute right-3 cursor-pointer top-2.5 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <div className='text-right mb-2 text-[#ff4d2d] cursor-pointer font-medium ' onClick={() => navigate("/forgot-password")}>
          Forgot Password
        </div>

        {/* Sign In Button */}

        <button onClick={handleSignIn} className="w-full font-semibold rounded-lg px-4 py-2 cursor-pointer text-white bg-[#ff6600] hover:bg-[#e64323] transition duration-200">
          Sign In
        </button>
        {/* Sign In with Google */}

        <button className="w-full mt-4 flex items-center cursor-pointer justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-200" onClick={(handleGoogleAuth)}>
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