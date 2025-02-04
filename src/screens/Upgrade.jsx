import React, { useState } from "react";
import homepageImage from "../assets/Splash/Frame 3.png";
import animatedGif from "../assets/Splash/Star Effect.gif";
import star from "../assets/Home/Star.png";
import updateStar from "../assets/Update/Component/updateStar.png";
import profileIcon from "../assets/Home/Profile Icon.png";

// Import booster icons for each level
import upgradeLv0 from "../assets/Update/Component/0.png";
import upgradeLv1 from "../assets/Update/Component/1.png";
import upgradeLv2 from "../assets/Update/Component/2.png";
import upgradeLv3 from "../assets/Update/Component/3.png";
import upgradeLv4 from "../assets/Update/Component/4.png";
import upgradeLv5 from "../assets/Update/Component/5.png";
import upgradeLv6 from "../assets/Update/Component/6.png";
import upgradeLv7 from "../assets/Update/Component/7.png";
import upgradeLv8 from "../assets/Update/Component/8.png";
import upgradeLv9 from "../assets/Update/Component/9.png";
import upgradeLv10 from "../assets/Update/Component/10.png";

// Mapping of booster levels to their respective icons
const boosterIcons = {
  0: upgradeLv0,
  1: upgradeLv1,
  2: upgradeLv2,
  3: upgradeLv3,
  4: upgradeLv4,
  5: upgradeLv5,
  6: upgradeLv6,
  7: upgradeLv7,
  8: upgradeLv8,
  9: upgradeLv9,
  10: upgradeLv10,
};

const UpgradeBox = ({ level, earnings, cost, isActive }) => (
  <div className="flex items-center justify-between p-4 border-2 border-[#88D2EE] rounded-xs w-90 mx-auto bg-[#121315] mb-4">
    {/* Left Side - Booster Icon */}
    <div className="flex gap-4">
      <div className="">
        <img
          src={boosterIcons[level]}
          alt={`Booster Lv.${level}`}
          className="w-12 h-12 object-cover"
        />
      </div>
    </div>

    {/* Center Text */}
    <div className="flex flex-col flex-grow text-sm font-semibold text-white pl-3">
      <p>{level === 0 ? "Basic" : `Booster Pack Lv.${level}`}</p>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-sm font-thin text-[#999999]">Earn</span>
        <img src={star} alt="star" className="w-6 h-6 object-cover" />
        <span className="text-sm font-bold bg-gradient-to-l from-[#C7F0FF] to-[#88D2EE] bg-clip-text text-transparent font-black">
          {earnings}
        </span>
        <span className="text-sm font-thin text-[#999999]">every 4 hours</span>
      </div>
    </div>

    {/* Right Side */}
    <div className="flex items-center">
      {isActive ? (
        <span className="text-sm font-bold text-white">Activated</span>
      ) : level === 0 ? (
        <span className="text-sm font-bold text-white">Free</span>
      ) : (
        <>
          <img
            src={updateStar}
            alt="cost"
            className="w-6 h-6 object-cover mr-2"
          />
          <span className="text-sm font-bold text-white">{cost}</span>
        </>
      )}
    </div>
  </div>
);

const CurrentBooster = ({ username, points, boosterLevel }) => {
  return (
    <div className="absolute top-11 left-0 w-full flex justify-between px-6 p-4 items-center text-white">
      {/* Left Side - User Profile */}
      <div className="flex items-center gap-3">
        <img
          src={profileIcon}
          alt="profile Icon"
          className="w-12 h-12 object-cover"
        />
        <div className="flex flex-col">
          <p className="text-lg font-bold">{username}</p>
          <span className="text-sm text-gray-400">Current Booster</span>
        </div>
      </div>

      {/* Right Side - Points and Booster Level */}
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2">
          <img src={star} alt="star" className="w-6 h-6 object-cover" />
          <p className="text-lg font-bold">{points.toLocaleString()}</p>
        </div>
        <div className="flex items-center gap-2 text-[#88D2EE] font-bold">
          <img
            src={boosterIcons[boosterLevel]}
            alt={`Booster Lv.${boosterLevel}`}
            className="w-10 h-10 object-cover"
          />
          <span>Booster Pack Lv.{boosterLevel}</span>
        </div>
      </div>
    </div>
  );
};

function Upgrade() {
  const [upgrades] = useState([
    { level: 0, earnings: "10" },
    { level: 1, earnings: "20", cost: "500", isActive: false },
    { level: 2, earnings: "25", cost: "750", isActive: false },
    { level: 3, earnings: "30", cost: "1,000", isActive: false },
    { level: 4, earnings: "35", cost: "1,250", isActive: false },
    { level: 5, earnings: "40", cost: "1,500", isActive: true },
    { level: 6, earnings: "45", cost: "1,750", isActive: false },
    { level: 7, earnings: "50", cost: "2,000", isActive: false },
    { level: 8, earnings: "55", cost: "2,250", isActive: false },
    { level: 9, earnings: "60", cost: "2,500", isActive: false },
    { level: 10, earnings: "65", cost: "2,750", isActive: false },
  ]);

  return (
    <div className="container min-h-screen w-full bg-black flex flex-col justify-center items-center relative">
      {/* Background */}
      <img
        src={homepageImage}
        alt="Background"
        className="absolute w-full h-full object-cover"
      />
      <img
        src={animatedGif}
        alt="Animation"
        className="absolute w-full h-full object-cover opacity-100"
      />

      {/* Current Booster Section */}
      <CurrentBooster username="username" points={2403280} boosterLevel={5} />

      {/* Upgrade List - Scrollable */}
      <div className="relative z-10 flex flex-col items-center space-y-4 mt-28 overflow-y-auto max-h-[60vh] w-full px-6">
        {upgrades.map((upgrade, index) => (
          <UpgradeBox key={index} {...upgrade} />
        ))}
      </div>
    </div>
  );
}

export default Upgrade;
