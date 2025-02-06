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


// Message Component for Non-Mobile Devices
const NonMobileMessage = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-[#0b0c0e] text-white text-center">
    <h1 className="text-2xl font-bold mb-4">Access Restricted</h1>
    <p className="text-lg">Please open this website on your mobile phone.</p>
  </div>
);

const App = () => {
  // const [count, setCount] = useState(0);
  // const [isMobile, setIsMobile] = useState(true);

  // useEffect(() => {
    
  //   if (window.Telegram && window.Telegram.WebApp) {
     
  //     window.Telegram.WebApp.disableVerticalSwipes();
  //   } else {
  //     console.warn('Telegram WebApp API is not available');
  //   }

  //   // Detect device type
  //   const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  //   const mobileDevices = /android|iphone|ipad|ipod|opera mini|iemobile|blackberry|kindle|mobile/i;
  //   setIsMobile(mobileDevices.test(userAgent));
  // }, []);

  // if (!isMobile) return <NonMobileMessage />;

  const ExcludeBottomNavigation = () => {
    const location = useLocation();
    const excludeRoutes = ["/"]; // Add all routes where you don't want BottomNavigation
    return !excludeRoutes.includes(location.pathname) && <BottomNavigation />;
  };
  return (
    <Router>
      <div className="xl:w-[30%] lg:w-[50%] md:w-[70%] w-full max-h-screen min-h-screen overflow-hidden bg-gradient-to-t from-[#0b0c0e] to-[#010507] flex flex-col justify-between my-0 mx-auto px-0 ">
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
  );
}

export default App;
