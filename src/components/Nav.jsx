import React from "react";
import logo from "../assets/logo.jpg";
import { IoPersonCircle } from "react-icons/io5";
// import { userSelector } from "../redux/userSlice";
import { useSelector } from "react-redux";

const Nav = () => {
  const { userData } = useSelector(state => state.user);
  return (
    <div>
      <div className="w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10 ">
        <div className="lg:w-[20%] w-[40%] lg:pl-[50px] ">
          <img
            src={logo}
            alt=""
            className="w-[60px] rounded-[5px] border-2 border-white "
          />
        </div>
        <div className="w-[30%] lg:flex items-center justify-center gap-4 ">
          <IoPersonCircle className="w-[50px] h-[50px] fill-black cursor-pointer " />
          <div className="px-[20px] py-[10px] bg-[black] border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer">
            Dashboard
          </div>
          {!userData ? (
            <span className="px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5">
              Login
            </span>
          ) : (
            <span className="px-[20px] py-[10px] px-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer ">
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
