import axios from "axios";
import { serverUrl } from "../config";
import { setUserData } from "../redux/userSlice";
import { RxCross2 } from "react-icons/rx";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { address } = useSelector((state) => state.map);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true });
      dispatch(setUserData(null));
      navigate("/signin");
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  return (
    <div className="w-full h-[70px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 left-0 right-0 z-[9999] bg-[#fff9f6]">
      {showSearch && (
        <div className="w-[90%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] flex fixed top-[80px] left-[5%]">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{address || "Locating..."}</div>
          </div>
          <div className="w-[80%] flex items-center gap-[10px]">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="search delicious food..."
              className="px-[10px] text-gray-700 outline-0 w-full"
            />
          </div>
          <RxCross2
            size={25}
            className="text-[#ff4d2d] mr-[10px] cursor-pointer"
            onClick={() => setShowSearch(false)}
          />
        </div>
      )}

      <h1 className="text-4xl font-bold text-[#ff4d2d]">PetPuja</h1>

      <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] hidden md:flex">
        <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
          <FaLocationDot size={25} className="text-[#ff4d2d]" />
          <div className="w-[80%] truncate text-gray-600">{address || "Locating..."}</div>
        </div>

        <div className="w-[80%] flex items-center gap-[10px]">
          <IoIosSearch size={25} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="search delicious food..."
            className="px-[10px] text-gray-700 outline-0 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-[10px]">
        <IoIosSearch
          size={25}
          className="text-[#ff4d2d] md:hidden cursor-pointer"
          onClick={() => setShowSearch(true)}
        />

        {/* Add cart area */}
        <div className="relative cursor-pointer">
          <FaShoppingCart size={25} className="text-[#ff4d2d]" />
          <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">0</span>
        </div>

        {/* My Orders button */}
        <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
          My Orders
        </button>

        {/* Profile icon */}
        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white shadow-xl font-semibold cursor-pointer"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullName?.slice(0, 1)}
        </div>

        {showInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div className="text-[17px] font-semibold">{userData?.fullName}</div>
            <div className="text-[#ff4d2d] md:hidden font-semibold cursor-pointer">
              My Orders
            </div>
            <div
              className="text-[#ff4d2d] font-semibold cursor-pointer"
              onClick={handleLogout}
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;