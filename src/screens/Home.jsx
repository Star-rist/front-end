import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import homepageImage from "../assets/Home/image 184.png";
import animatedGif from "../assets/Splash/Star Effect.gif";
import profileIcon from "../assets/Home/Profile Icon.png";
import screen from "../assets/Home/Screen.png";
import updateStar from "../assets/Update/Component/updateStar.png";
import star from "../assets/Home/Star.png";
import character from "../assets/Home/Character.png";
import characterJumping from "../assets/Home/Character Jumping.png";
import { claimTokens, claimTokensInstantly, getProfile } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FOUR_HOURS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
const TIMER_KEY = "lastCollectedTime"; // Key to store timestamp in localStorage

function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const telegramIdFromUrl = queryParams.get("telegramId");
  const usernameFromUrl = queryParams.get("username");
  const [userPoints, setUserPoints] = useState(0);
  const [telegramId, setTelegramId] = useState(() => {
    return localStorage.getItem("telegramId") || "";
  });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });

  useEffect(() => {
    if (telegramIdFromUrl && telegramIdFromUrl !== telegramId) {
      setTelegramId(telegramIdFromUrl);
      localStorage.setItem("telegramId", telegramIdFromUrl);
    }

    if (usernameFromUrl && usernameFromUrl !== username) {
      setUsername(usernameFromUrl);
      localStorage.setItem("username", usernameFromUrl);
    }
  }, [telegramIdFromUrl, usernameFromUrl, telegramId, username]);

  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(FOUR_HOURS);
  const [isCharacterJumping, setIsCharacterJumping] = useState(false);
  const [characterPosition, setCharacterPosition] = useState("bottom-56"); // Initial position

  useEffect(() => {
    if (telegramId) {
      getProfile(telegramId)
        .then((data) => {
          const lastClaimTime = new Date(data.data.lastClaimTime); // Convert string to Date
          const now = Date.now(); // Get current time
          const elapsedTime = now - lastClaimTime.getTime(); // Time difference in milliseconds
          const remainingTime = Math.max(FOUR_HOURS - elapsedTime, 0); // Calculate remaining time

          setUserPoints(data.data.starTokens || 0); // Update user points

          setTimeLeft(remainingTime); // Set remaining time for countdown
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [telegramId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval); // Stop the timer once it reaches 0
          setIsCharacterJumping(true); // Trigger character change
          setCharacterPosition("bottom-64"); // Move the character up
          return 0;
        }
        return prev - 1000; // Decrease time left every second
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  const handleClaimTokens = async () => {
    if (!telegramId) return;

    try {
      const response = await claimTokens(telegramId);
      if (response.status === "success") {
        const currentTime = Date.now();
        localStorage.setItem(TIMER_KEY, currentTime.toString());
        setTimeLeft(FOUR_HOURS);
        setIsOpen(false);
        toast.success(response.message);
        getProfile(telegramId).then((data) => {
          setUserPoints(data.data.starTokens || 0);
        });
        setIsCharacterJumping(false); // Trigger character change
      } else {
        toast.error("Failed to claim tokens. Please try again.");
      }
    } catch (error) {
      toast.error("Error claiming tokens. Please try again.");
      console.error("Error claiming tokens:", error);
    }
  };

  const handleClaimInstantly = async () => {
    if (!telegramId) return;

    try {
      const response = await claimTokensInstantly(telegramId);
      console.log(response);
      if (response.status === "success") {
        const currentTime = Date.now();
        localStorage.setItem(TIMER_KEY, currentTime.toString());
        setTimeLeft(FOUR_HOURS);
        setIsOpen(false);
        toast.success(response.message);
        getProfile(telegramId).then((data) => {
          setUserPoints(data.data.starTokens || 0);
        });
      } else {
        toast.error("Failed to claim tokens instantly. Please try again.");
      }
    } catch (error) {
      toast.error("Error: " + error.response.data.message);
      console.error("Error claiming tokens instantly:", error);
    }
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
        className="fixed w-full h-full object-cover opacity-100"
      />

      {/* Top Left User Info */}
      <div className="absolute top-2 p-4 gap-1 w-full flex items-center">
        <img
          src={profileIcon}
          alt="profile Icon"
          className="w-12 h-12 object-cover mr-2"
        />
        <p className="text-white text-lg font-bold">{username}</p>
      </div>

      {/* Main Display */}
      <div className="fixed top-58 left-0 w-full h-full flex flex-col items-center justify-start z-10">
        <div className="relative w-65 top-[-100px]">
          <img src={screen} alt="screen" className="w-full object-cover" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
            <p>{userPoints}</p>
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
      <div
        className={`fixed ${characterPosition} left-1/2 transform -translate-x-1/2`}
      >
        <img
          src={isCharacterJumping ? characterJumping : character} // Change image
          alt="character"
          className="w-70 h-60 object-cover"
        />
      </div>
      

      {/* Parent Container */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-full max-w-md z-10 flex flex-col items-center space-y-4 p-4">
        {/* Progress Bar */}
        <div className="w-full">
          <div className="flex justify-between text-white text-lg font-bold mb-2">
            <span>Time Remaining</span>
            <span>{formattedTime}</span>
          </div>
          <div className="relative w-full h-3 bg-gray-700 overflow-hidden">
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
        <div
          className="w-full p-4 max-w-md h-12 flex items-center justify-center bg-gradient-to-r from-[#88D2EE] to-[#C7F0FF] text-black text-lg font-semibold shadow-md cursor-pointer"
          onClick={() => {
            if (timeLeft === 0) {
              handleClaimTokens(); // Free claim if 4 hours have passed
            } else {
              setIsOpen(true); // Open modal for instant claim
            }
          }}
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
              <button
                className="w-full bg-gradient-to-r from-[#88D2EE] to-[#C7F0FF] text-black py-3 font-bold flex items-center justify-center gap-2"
                onClick={handleClaimInstantly}
              >
                <span>Confirm and Pay</span>
                <img src={updateStar} alt="star" className="w-5 h-5" />
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

      <ToastContainer />
    </div>
  );
}

export default Home;
