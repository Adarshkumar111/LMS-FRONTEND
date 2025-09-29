import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import geyCurrentUser from "./customHook/getCostumUser";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";

// export const serverURL = "http://localhost:8000"
const App = () => {
  geyCurrentUser(); // ✅ ab correctly Redux update karega
  const { userData } = useSelector((state) => state.user);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/forget"
          element={!userData ? <ForgetPassword /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
};

export default App;
