import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { IoPersonCircle } from "react-icons/io5";
// import { userSelector } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Api from "../utils/Api";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSplitCross } from "react-icons/gi";

const Nav = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHem, setShowHem] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await Api.post("/api/v1/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      console.log(result.data);
      toast.success("Logout Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

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
        <div className="w-[30%] lg:flex items-center justify-center gap-4 hidden ">
          {!userData && (
            <IoPersonCircle
              className="w-[50px] h-[50px] fill-black cursor-pointer "
              onClick={() => setShow((prev) => !prev)}
            />
          )}

          {userData && (
            <div
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {userData?.user?.name
                ? String(userData.user.name).slice(0, 1).toUpperCase()
                : null}
            </div>
          )}

          {userData?.user?.role === "educator" && (
            <div className="px-[20px] py-[10px] bg-[black] border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer">
              Dashboard
            </div>
          )}
          {!userData ? (
            <span
              onClick={() => navigate("/login")}
              className="px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]"
            >
              Login
            </span>
          ) : (
            <span
              onClick={handleLogout}
              className="px-[20px] py-[10px] px-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer "
            >
              Logout
            </span>
          )}

          {show && (
            <div className="absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-[white] px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white cursor-pointer hover:bg-black">
              <span onClick={()=>navigate("/profile")} className="bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600">
                My Profile
              </span>
              <span className="bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600">
                My Courses
              </span>
            </div>
          )}
        </div>
        <RxHamburgerMenu
          onClick={() => setShowHem((prev) => !prev)}
          className="w-[35px] h-[30px] lg:hidden fill-white cursor-pointer"
        />
        <div
          className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden ${
            showHem
              ? "translate-x-[0] transition duration-600"
              : "translate-x-[-100%] transition duration-600 "
          }`}
        >
          <GiSplitCross
            className="w-[35px] h-[35px] fill-white absolute top-5 right-[2%] "
            onClick={() => setShowHem((prev) => !prev)}
          />
          {!userData && (
            <IoPersonCircle className="w-[50px] h-[50px] fill-black cursor-pointer " />
          )}

          {userData && (
            <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer">
              {userData?.user?.name
                ? String(userData.user.name).slice(0, 1).toUpperCase()
                : null}
            </div>
          )}
          <div onClick={()=>navigate("/profile")} className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer">
            My Profile
          </div>
          <div className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer">
            My Courses
          </div>
          {userData?.user?.role === "educator" && (
            <div className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer">
              Dashboard
            </div>
          )}
          {!userData ? (
            <span
              onClick={() => navigate("/login")}
              className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer"
            >
              Login
            </span>
          ) : (
            <span
              onClick={handleLogout}
              className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer"
            >
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
