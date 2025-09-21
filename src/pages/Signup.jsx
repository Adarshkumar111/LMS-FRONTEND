import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Api from "../utils/Api"; // <-- yaha se axios instance import kiya
import { toast } from "react-toastify"; // <-- toast import kiya
import { ClipLoader } from "react-spinners"; // ✅

const Signup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loding, setLoading] = useState(false);

  const handleSignup = async (e) => {
    setLoading(true);
    e.preventDefault(); // form reload na ho
    try {
      const res = await Api.post("/api/v1/auth/signup", {
        name,
        email,
        password,
        role,
      });
      console.log(res.data);
      toast.success(res.data.message || "Signup successful ✅");
      setLoading(false);
      navigate("/"); // signup ke baad login page par bhejna
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed ❌");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex "
      >
        {/* left div */}
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 ">
          <div>
            <h1 className="font-semibold text-black text-2xl ">
              Let's get started
            </h1>
            <h2 className="text-[#999797] text-[18px] ">Create your account</h2>
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-2">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-2">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)} // <-- yaha pehle onClick tha, usko onChange kiya
              value={email}
            />
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-2 relative">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              id="password"
              type={show ? "text" : "password"}
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)} // <-- yaha bhi onChange kiya
              value={password}
            />
            {!show ? (
              <FaRegEye
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%] "
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          <div className="flex md:w-[50%] w-[70%] items-center justify-between ">
            <span
              onClick={() => setRole("student")}
              className={`px-[10px] py-[5px] border-[2px] rounded-2xl cursor-pointer hover:border-black ${
                role === "student" ? "border-black" : "border-[#bfbfbf]"
              }`}
            >
              Student
            </span>
            <span
              onClick={() => setRole("educator")}
              className={`px-[10px] py-[5px] border-[2px] rounded-2xl cursor-pointer hover:border-black ${
                role === "educator" ? "border-black" : "border-[#bfbfbf]"
              }`}
            >
              Educator
            </span>
          </div>
          <button
            type="submit"
            className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]"
            disabled={loding}
          >
            {loding ? <ClipLoader size={30} color="white" /> : "SignUp"}
          </button>
          <div className="w-[80%] flex items-center gap-2 ">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4] "></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center ">
              or continue
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4] "></div>
          </div>
          <div className="w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center cursor-pointer">
            <img src={google} alt="" className="w-[25px]" />
            <span className="text-[18px] text-gray-500 ">oogle</span>
          </div>
          <div className="text-[#6f6f6f]">
            Already have an account?{" "}
            <span
              className="underline underline-offset-1 text-black cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>

        {/* right div */}
        <div className="w-[50%] h-[100%] rounded-r-2xl bg-black md:flex items-center justify-center hidden flex-col">
          <img src={logo} alt="logo" className="w-30 shadow-2xl" />
          <span className="text-2xl text-white">VIRTUAL COURSES</span>
        </div>
      </form>
    </div>
  );
};

export default Signup;


