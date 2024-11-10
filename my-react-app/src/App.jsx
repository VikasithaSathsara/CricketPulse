import "./App.css";
import { useEffect , useContext} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroPage from "./pages/HeroPage/HeroPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CoachRegister from "./pages/Register/CoachRegister";
import PlayerRegister from "./pages/Register/PlayerRegister";
import MemberDashBoard from "./pages/DashBoard/MemberDashBoard/MemberDashboard";
import AdminDashBoard from "./pages/DashBoard/AdminDashBoard/AdminDashboard";
import CoachDashboard from "./pages/DashBoard/CoachDashBoard/CoachDashboard";
import { StoreContext } from "./StoreContext/StoreContext";
import SideBar from "./components/SideBar/SideBar";

function App() {
  const { isLoggedIn, role } = useContext(StoreContext);

  if (!isLoggedIn) {
    return (
      <>
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/coachregister" element={<CoachRegister />} />
          <Route path="/playerregister" element={<PlayerRegister />} />
        </Routes>
        {/* <Footer /> */}
      </>
    );
  } else {
    switch (role) {
      case "ADMIN":
        return (
          <>
            <SideBar />
            <Routes>
              <Route path="/" element={<AdminDashBoard />} />
              <Route path="/dashboard" element={<AdminDashBoard />} />
            </Routes>
            {/* <Footer /> */}
          </>
        );
      case "COACH":
        return (
          <>
            <SideBar />
            <Routes>
              <Route path="/" element={<CoachDashboard />} />
              <Route path="/dashboard" element={<CoachDashboard />} />
            </Routes>
            {/* <Footer /> */}
          </>
        );
      case "MEMBER":
        return (
          <>
            <SideBar />
            <Routes>
              <Route path="/" element={<MemberDashBoard />} />
              <Route path="/dashboard" element={<MemberDashBoard />} />
            </Routes>
            {/* <Footer /> */}
          </>
        );
      default:
        return (
          <>
            {/* <NavBar /> */}
            <Routes>
              <Route path="/" element={<HeroPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/coachregister" element={<CoachRegister />} />
              <Route path="/playerregister" element={<PlayerRegister />} />
            </Routes>
            {/* <Footer /> */}
          </>
        );
    }
  }
}

export default App;
