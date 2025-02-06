import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import homepageImage from "../assets/Home/image 184.png";
import animatedGif from "../assets/Splash/Star Effect.gif";
import profileIcon from "../assets/Home/Profile Icon.png";
import screen from "../assets/Home/Screen.png";
import star from "../assets/Home/Star.png";
import character from "../assets/Home/Character.png";

const FOUR_HOURS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
const TIMER_KEY = "lastCollectedTime"; // Key to store timestamp in localStorage

function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const telegramId =
    queryParams.get("id") || localStorage.getItem("telegramId") || ""; // Extract 'id' (telegramId) from the URL

  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || telegramId; // Initialize username from localStorage or use telegramId
  });
  useEffect(() => {
    if (!telegramId) return;

    // Save `telegramId` to localStorage if new
    const storedTelegramId = localStorage.getItem("telegramId");
    if (storedTelegramId !== telegramId) {
      localStorage.setItem("telegramId", telegramId);
      setUsername(telegramId); // Set username to telegramId
    }
  }, [telegramId]);

  console.log("Telegram ID:", telegramId);

  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(FOUR_HOURS);

  useEffect(() => {
    // Check last collected time from localStorage
    const lastCollected = localStorage.getItem(TIMER_KEY);
    if (lastCollected) {
      const elapsedTime = Date.now() - parseInt(lastCollected, 10);
      const remainingTime = Math.max(FOUR_HOURS - elapsedTime, 0);
      setTimeLeft(remainingTime);
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1000, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCollect = () => {
    // Store the current time as the last collected time
    localStorage.setItem(TIMER_KEY, Date.now().toString());
    setTimeLeft(FOUR_HOURS);
    setIsOpen(false);
  };

  const percentage = ((FOUR_HOURS - timeLeft) / FOUR_HOURS) * 100;
  const formattedTime = new Date(timeLeft).toISOString().substring(11, 19); // Format as HH:MM:SS

  return (
    <div className="container relative bg-black min-h-screen w-full">
      {/* Background Image */}
      <img
        src={homepageImage}
        alt="Background"
        className="absolute w-full h-full object-cover opacity-100"
      />

      {/* Animated GIF Overlay */}
      <img
        src={animatedGif}
        alt="Animation"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100"
      />

      {/* Top Left User Info */}
      <div className="absolute top-11 left-4 p-4 gap-1 flex items-center">
        <img
          src={profileIcon}
          alt="profile Icon"
          className="w-10 h-10 object-cover mr-2"
        />
        <p className="text-white text-lg font-bold">username</p>
      </div>

      {/* Main Display */}
      <div className="absolute top-60 left-0 w-full h-full flex flex-col items-center justify-start z-10">
        <div className="relative w-65 top-[-100px]">
          <img src={screen} alt="screen" className="w-full object-cover" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
            <p>2403280</p>
          </div>
        </div>

        {/* Star Overlay */}
        <img
          src={star}
          alt="star"
          className="absolute top-[-120px] left-1/2 transform -translate-x-1/2 w-12 h-12 object-cover super-bright-glow"
        />
      </div>

      {/* Character Image */}
      <div className="absolute bottom-75 left-1/2 transform -translate-x-1/2">
        <img
          src={character}
          alt="character"
          className="w-65 h-70 object-cover"
        />
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-54 left-1/2 transform -translate-x-1/2 w-95 max-w-md z-10">
        <div className="flex justify-between text-white text-lg font-bold mb-2">
          <span>Time Remaining</span>
          <span>{formattedTime}</span>
        </div>
        <div className="relative w-full h-3 bg-gray-700 overflow-hidden rounded-full">
          <div className="absolute inset-0 flex justify-between">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className="h-full w-[2px] bg-gray-500 opacity-80"
              ></div>
            ))}
          </div>
          <div
            className="h-full bg-gradient-to-r from-[#88D2EE] to-[#C7F0FF] transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Collect Points Button */}
      <div className="absolute bottom-37 left-1/2 transform -translate-x-1/2 z-10">
        <div
          className="w-95 max-w-md sm:w-48 h-12 flex items-center justify-center bg-gradient-to-r from-[#88D2EE] to-[#C7F0FF] text-black text-lg font-semibold shadow-md cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Collect Now
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#0D131B7A] backdrop-blur-lg flex items-center justify-center z-50">
          <div className="bg-gradient-to-r from-[#09090A] to-[#121315] p-6 border-1 border-[#C7F0FF] text-center w-95">
            <img src={star} alt="star" className="mx-auto w-16 h-16" />
            <h2 className="text-lg font-bold text-[#EEEEF0] mt-4">
              Collect Now - Instant Points
            </h2>
            <p className="text-sm text-[#999999] mt-2">
              Instantly collect points without waiting!{" "}
              <span className="block text-center">
                This is a one-time purchase, and you will need to buy it again
                for future use.
              </span>
            </p>

            {/* Buttons */}
            <div className="mt-6 space-y-3">
              <button className="w-full bg-gradient-to-r from-[#88D2EE] to-[#C7F0FF] text-black py-3 font-bold flex items-center justify-center gap-2">
                <span>Confirm and Pay</span>
                <img src={profileIcon} alt="star" className="w-5 h-5" />
                <span>30</span>
              </button>
              <button
                className="w-full bg-transparent border-2 border-[#797979] text-[#999999] py-3"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
