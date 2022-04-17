import { Routes, Route } from "react-router";
import Navbar from "../../src/components/Navbar";
import FlatRegistration from "../components/FlatRegistration";
import Home from "../components/Home";
import SignIn from "../components/Signin";
import SignUp from "../components/Signup";
import Viewresidents from "../components/Viewresidents";

export const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/viewresidents" element={<Viewresidents />} />
        <Route exact path="/flatregister" element={<FlatRegistration/>} />
      </Routes>
    </>
  );
};
