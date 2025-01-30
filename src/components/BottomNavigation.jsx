import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import homeIcon from "../assets/Tab Bar/Home_False.png";
import homeIcon1 from "../assets/Tab Bar/Home_True.png";

import taskIcon from "../assets/Tab Bar/Tasks__False.png";
import taskIcon1 from "../assets/Tab Bar/Tasks__True.png";

import friendIcon from "../assets/Tab Bar/Friends__False.png";
import friendIcon1 from "../assets/Tab Bar/Friends__True.png";

import upgradeIcon from "../assets/Tab Bar/Upgrade__False.png";
import upgradeIcon1 from "../assets/Tab Bar/Thunder__True.png";

import walletIcon from "../assets/Tab Bar/Wallet__False.png";
import walletIcon1 from "../assets/Tab Bar/Wallet__True.png";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentScreen, setCurrentScreen] = useState("/");

  useEffect(() => {
    setCurrentScreen(location.pathname);
  }, [location]);

  const navItems = [
    { title: "Home", icon: homeIcon, activeIcon: homeIcon1, path: "/home" },
    { title: "Tasks", icon: taskIcon, activeIcon: taskIcon1, path: "/tasks" },
    { title: "Friends", icon: friendIcon, activeIcon: friendIcon1, path: "/friends" },
    { title: "Upgrade", icon: upgradeIcon, activeIcon: upgradeIcon1, path: "/upgrade" },
    { title: "Wallet", icon: walletIcon, activeIcon: walletIcon1, path: "/wallet" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full px-5 text-white bg-black flex justify-around items-center h-[90px] z-50">
      {navItems.map((item) => (
        <div
          key={item.title}
          onClick={() => navigate(item.path)}
          className="flex flex-col items-center justify-center w-14 h-14 rounded-lg cursor-pointer transition-all duration-300 gap-1"
        >
          {/* Icon switching based on active state */}
          <img
            className="w-6 h-6 object-contain transition-all duration-300"
            src={currentScreen === item.path ? item.activeIcon : item.icon}
            alt={item.title}
          />
          {/* Text color change */}
          <p
            className={`mt-2 text-xs text-center transition-colors ${
              currentScreen === item.path ? "text-[#88D2EE]" : "text-gray-400"
            }`}
          >
            {item.title}
          </p>
        </div>
      ))}
    </nav>
  );
};

export default BottomNavigation;
