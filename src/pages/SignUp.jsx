import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { serverUrl } from "../config";
import axios from "axios";

import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";


// Initialize Firebase auth

axios.defaults.withCredentials = true;

function SignUp() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobileNumber: "",
    role: "user",
  });
  //const [loading,setLoading] 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please fill in all fields (Full Name, Email, Password)");
      setLoading(false);
      return;
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        formData,
        { withCredentials: true }
      );
      console.log("Signup successful:", result.data);
      // Redirect or show success message
      // Redirect or show success message
      navigate("/signin"); // Redirect to login page after successful signup
      dispatch(setUserData(result.data))
    } catch (error) {
      console.error("Signup error:", error);
      setError(
        error.response?.data?.message || "Something went wrong during sign up"
      );
    } finally {
      setLoading(false);
    }
  };
  //Google authtentication
  const handleGoogleAuth = async () => {
    if (!formData.mobileNumber) {
      //alert("Mobile number is required");
      //alert("Mobile number is required");
      return setError("Mobile number is required");
    }

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    try {
      const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        mobileNumber: formData.mobileNumber,
        role: formData.role,
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
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          PetPuja
        </h1>
        <p className="text-gray-600 mb-8">
          Create your account to get started with delicious recipes and meal
          planning.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 font-medium mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none"
              placeholder="Enter your Full Name"
              style={{ border: `1px solid ${borderColor}` }}
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

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
              name="email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none"
              placeholder="Enter your email"
              style={{ border: `1px solid ${borderColor}` }}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none"
                placeholder="Enter your password"
                style={{ border: `1px solid ${borderColor}` }}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="mobileNumber"
              className="block text-gray-700 font-medium mb-1"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none"
              placeholder="Enter your mobile number"
              style={{ border: `1px solid ${borderColor}` }}
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Role</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                />
                <span className="ml-2">User</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="role"
                  value="owner"
                  checked={formData.role === "owner"}
                  onChange={handleChange}
                />
                <span className="ml-2">Owner</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="role"
                  value="deliveryboy"
                  checked={formData.role === "deliveryboy"}
                  onChange={handleChange}
                />
                <span className="ml-2">Delivery</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full font-semibold py-3 rounded-lg transition duration-200 mb-4`}
            style={{
              backgroundColor: primaryColor,
              color: "white",
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>


          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 px-4 hover:bg-gray-50 transition-colors"
            onClick={handleGoogleAuth}
          >
            <FcGoogle className="text-xl" />
            <span>Sign up with Google</span>
          </button>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="font-medium"
              style={{ color: primaryColor }}
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
