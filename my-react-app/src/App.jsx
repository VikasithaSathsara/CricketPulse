import "./App.css";
import { useEffect } from "react";
import {
    Route,
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Outlet,
    useLocation,
} from "react-router-dom";
import HeroPage from "./pages/HeroPage/HeroPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CoachRegister from "./pages/Register/CoachRegister";
import PlayerRegister from "./pages/Register/PlayerRegister";
import AboutPage from "./pages/AboutPage/AboutPage";

function RootLayout() {
    return (
        <>
            <ScrollToTop />
            <Outlet />
        </>
    );
}

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HeroPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="coachregister" element={<CoachRegister />} />
                <Route path="playerregister" element={<PlayerRegister />} />
            </Route>
        </>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
