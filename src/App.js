import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import StudentCorner from "./components/studentcorner/StudentCorner";
import BlankLayout from "./components/common/BlankLayout";
import MainLayout from "./components/common/MainLayout";

function App() {
  return (
   <div className="min-h-screen bg-[#020A0F] flex flex-col font-inter
    
   ">

    {/* <Navbar /> */}

    <Routes>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verify-email" element={<VerifyEmail />} />
      </Route>


      <Route element={<BlankLayout />}>
        <Route
          path="/studentcorner/my-profile"
          element={<StudentCorner />}
        />
      </Route>

    </Routes>

   </div>
  );
}

export default App;
