import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Api from "../utils/Api"; // yaha pe apni axios wali file ka path lagana
import { toast } from "react-toastify";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // form reload hone se rokega
    try {
      const res = await Api.post("/api/v1/auth/login", {
        email,
        password,
      });

      toast.success(res.data?.message || "Login successful 🎉");
      navigate("/"); // login ke baad home ya dashboard pe bhejna
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed ❌");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center">
      <form
        className="w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex"
        onSubmit={handleLogin}
      >
        {/* left div */}
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-black text-2xl">Welcome back</h1>
            <h2 className="text-[#999797] text-[18px]">
              Login in your account
            </h2>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!show ? (
              <FaRegEye
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          <button
            type="submit"
            className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]"
          >
            Login
          </button>

          <span className="text-[13px] cursor-pointer text-[#585757]">
            Forget your password ?
          </span>

          <div className="w-[80%] flex items-center gap-2 ">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4] "></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">
              or continue
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4] "></div>
          </div>

          <div className="w-[80%] h-[40px] border-1 Oborder-[black] rounded-[5px] flex items-center justify-center">
            <img src={google} alt="" className="w-[25px]" />
            <span className="text-[18px] text-gray-500 ">oogle</span>
          </div>

          <div className="text-[#6f6f6f]">
            Create an account?{" "}
            <span
              className="underline underline-offset-1 text-black cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              SignUp
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

export default Login;
