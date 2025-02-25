import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./screens/Home.jsx";
import Loading from "./screens/Loading.jsx";
import Friends from "./screens/Friends.jsx";
import Upgrade from "./screens/Upgrade.jsx";
import Wallet from "./screens/Wallet.jsx";
import Tasks from "./screens/Tasks.jsx";
import BottomNavigation from "./components/BottomNavigation.jsx";
import { TelegramProvider } from "./context/TelegramContext.jsx";

const NonMobileMessage = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-[#0b0c0e] text-white text-center">
    <h1 className="text-2xl font-bold mb-4">Access Restricted</h1>
    <p className="text-lg">Please open this website on your mobile phone.</p>
  </div>
);

const App = () => {
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();

      setTimeout(() => {
        window.Telegram.WebApp.expand();

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
          document.documentElement.style.height = `${window.innerHeight}px`;
          document.body.style.height = `${window.innerHeight}px`;
        }
      }, 100);
    }

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileDevices =
      /android|iphone|ipad|ipod|opera mini|iemobile|blackberry|kindle|mobile/i;
    setIsMobile(mobileDevices.test(userAgent));
  }, []);

  console.log("Telegram WebApp:", window.Telegram?.WebApp);

  if (!isMobile) return <NonMobileMessage />;

  const ExcludeBottomNavigation = () => {
    const location = useLocation();
    const excludeRoutes = ["/"];
    return !excludeRoutes.includes(location.pathname) && <BottomNavigation />;
  };
  return (
    <TelegramProvider>
      <Router>
        <div className="xl:w-[30%] lg:w-[50%] md:w-[70%] w-full h-[var(--app-height)] overflow-hidden flex flex-col justify-between my-0 mx-auto px-0 ">
          <Routes>
            <Route path="/" element={<Loading />} />
            <Route path="/home" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/upgrade" element={<Upgrade />} />
          </Routes>
          <ExcludeBottomNavigation />
        </div>
      </Router>
    </TelegramProvider>
  );
};

export default App;
