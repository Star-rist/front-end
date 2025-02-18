import React, { useState, useEffect, useContext } from "react";
import homepageImage from "../assets/Splash/Frame 3.png";
import animatedGif from "../assets/Splash/Star Effect.gif";
import star from "../assets/Home/Star.png";
import updateStar from "../assets/Update/Component/updateStar.png";
import profileIcon from "../assets/Home/Profile Icon.png";
import { TelegramContext } from "../context/TelegramContext";
import { ToastContainer, toast } from "react-toastify";

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
import { getProfile, upgradeBooster } from "../utils/api.js";

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
    className="flex items-center justify-between p-4 border-2 border-[#88D2EE] rounded-xs w-100 max-w-md bg-[#121315] mb-4 cursor-pointer"
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
      {isActive ? (
        <span className="text-sm font-bold text-white mr-2">Activated</span>
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
  // const [boosterLevel, setBoosterLevel] = useState(0);

  const [userPoints, setUserPoints] = useState(0); // Store user points
  const [booster, setbooster] = useState(0); // Store user points

  useEffect(() => {
    if (telegramId) {
      getProfile(telegramId)
        .then((data) => {
          const userBoosterLevel = data.data.boosterLevel || 0;
          setbooster(userBoosterLevel);
          setUserPoints(data.data.starTokens || 0);

          // Ensure only the correct booster level is active
          setUpgrades((prevUpgrades) =>
            prevUpgrades.map((upg) => ({
              ...upg,
              isActive: upg.level === userBoosterLevel, // Activate only the current booster
            }))
          );
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [telegramId]);

  const [upgrades, setUpgrades] = useState([
    { level: 0, earnings: "10", cost: 0, isActive: true },
    { level: 1, earnings: "20", cost: 500, isActive: false },
    { level: 2, earnings: "25", cost: 750, isActive: false },
    { level: 3, earnings: "30", cost: 1000, isActive: false },
    { level: 4, earnings: "35", cost: 1250, isActive: false },
    { level: 5, earnings: "40", cost: 1500, isActive: false },
    { level: 6, earnings: "45", cost: 1750, isActive: false },
    { level: 7, earnings: "50", cost: 2000, isActive: false },
    { level: 8, earnings: "55", cost: 2250, isActive: false },
    { level: 9, earnings: "60", cost: 2500, isActive: false },
    { level: 10, earnings: "65", cost: 2750, isActive: false },
  ]);

  const handleUpgrade = async (level, cost) => {
    if (!telegramId) {
      toast.error("Error: Telegram ID is required.");
      return;
    }

    if (level <= booster) {
      toast.info("You've already unlocked this level.");
      return;
    }

    if (level !== booster + 1) {
      toast.warning(
        "You must upgrade sequentially. Upgrade the next level first."
      );
      return;
    }

    if (userPoints < cost) {
      toast.warning("Insufficient points. Earn more to upgrade!");
      return;
    }

    try {
      const response = await upgradeBooster(telegramId);

      if (response.message === "Upgrade successful!") {
        setbooster(level);
        setUserPoints((prevPoints) => prevPoints - cost);

        // Activate only the newly upgraded booster
        setUpgrades(
          upgrades.map((upg) => ({
            ...upg,
            isActive: upg.level === level,
          }))
        );

        toast.success(`Upgrade to Booster Level ${level} was successful! 🎉`);
      } else {
        toast.error(`Upgrade failed: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error upgrading booster:", error);
    }
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
      <CurrentBooster
        username={username}
        points={userPoints}
        boosterLevel={booster}
      />

      {/* Upgrade List - Scrollable */}
      <div className="relative z-10 flex flex-col items-center space-y-4 mt-20 overflow-y-auto max-h-[76vh] w-full px-6">
        {upgrades.map((upgrade, index) => (
          <UpgradeBox key={index} {...upgrade} onUpgrade={handleUpgrade} />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Upgrade;
