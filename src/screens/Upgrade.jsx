import React, { useState, useEffect, useContext } from "react";
import homepageImage from "../assets/Splash/Frame 3.png";
import animatedGif from "../assets/Splash/Star Effect.gif";
import star from "../assets/Home/Star.png";
import updateStar from "../assets/Update/Component/updateStar.png";
import profileIcon from "../assets/Home/Profile Icon.png";
import { TelegramContext } from "../context/TelegramContext";

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
import { getProfile } from "../utils/api.js";

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

const UpgradeBox = ({ level, earnings, cost, isActive, onUpgrade }) => (
  <div
    className="flex items-center justify-between p-4 border-2 border-[#88D2EE] rounded-xs w-full max-w-md bg-[#121315] mb-4 cursor-pointer"
    onClick={() => onUpgrade(level, cost)}
  >
    <div className="flex gap-4">
      <img
        src={boosterIcons[level]}
        alt={`Booster Lv.${level}`}
        className="w-12 h-12 object-cover"
      />
    </div>

    <div className="flex flex-col flex-grow text-sm font-semibold text-white pl-3">
      <p>{level === 0 ? "Basic" : `Booster Pack Lv.${level}`}</p>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-sm font-thin text-[#999999]">Earn</span>
        <img src={star} alt="star" className="w-6 h-6 object-cover" />
        <span
          className={`text-base font-bold ${
            isActive
              ? "bg-gradient-to-l from-[#5E6466] to-[#5B6C73] bg-clip-text text-transparent font-bold" // Change color to gray when activated
              : "bg-gradient-to-l from-[#C7F0FF] to-[#88D2EE] bg-clip-text text-transparent font-bold"
          }`}
        >
          {earnings}
        </span>
        <span className="text-sm font-thin text-[#999999]">every 4 hours</span>
      </div>
    </div>

    <div className="flex items-center">
      {isActive && (
        <span className="text-sm font-bold text-white mr-2">Activated</span>
      )}
      {level !== 0 && !isActive && (
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
    <div className="absolute top-4 left-0 w-full flex justify-between px-4 p-4 items-center text-white">
      <div className="absolute top-4 left-0 w-full flex justify-between px-4 p-4 items-center">
        {/* Image and Text at Top Left */}
        <div className="flex items-center gap-3">
          <img
            src={profileIcon}
            alt="profile Icon"
            className="w-12 h-12 object-cover"
          />
          <p className="text-white text-lg font-bold">{username}</p>
        </div>

        {/* Second Text and Image at Top Right */}
        <div className="flex items-center gap-2">
          <img
            src={star}
            alt="star"
            className="w-6 h-6 object-cover rounded-full"
          />
          <p className="text-lg font-bold text-white">{points}</p>
        </div>
      </div>

      <div className="absolute top-18 left-0 w-full flex justify-between px-4 p-4 items-center">
        {/* Image and Text at Top Left */}
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-400">Current Booster</p>
        </div>

        {/* Second Text and Image at Top Right */}
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
  const { username, telegramId } = useContext(TelegramContext);

  const [userPoints, setUserPoints] = useState(0); // Store user points

  useEffect(() => {
    if (telegramId) {
      getProfile(telegramId)
        .then((data) => {
          setUserPoints(data.data.starTokens || 0); // Assuming API returns `points`
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [telegramId]);

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

  const handleUpgrade = (level, cost) => {
    if (level <= boosterLevel || points < cost) return;
    setBoosterLevel(level);
    setPoints(points - cost);
    setUpgrades(
      upgrades.map((upg) => ({
        ...upg,
        isActive: upg.isActive || upg.level === level,
      }))
    );
  };

  return (
    <div className="container min-h-screen w-full bg-black flex flex-col justify-center items-center relative">
      <img
        src={homepageImage}
        alt="Background"
        className="absolute w-full h-full object-cover"
      />
      <img
        src={animatedGif}
        alt="Animation"
        className="absolute w-full h-full object-cover opacity-100 pointer-events-none"
      />

      {/* Current Booster Section */}
      <CurrentBooster username={username} points={userPoints} boosterLevel={5} />

      {/* Upgrade List - Scrollable */}
      <div className="relative z-10 flex flex-col items-center space-y-4 mt-28 overflow-y-auto max-h-[77vh] w-full px-6">
        {upgrades.map((upgrade, index) => (
          <UpgradeBox key={index} {...upgrade} onUpgrade={handleUpgrade} />
        ))}
      </div>
    </div>
  );
}

export default Upgrade;
