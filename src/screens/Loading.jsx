import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import homepageImage from "../assets/Splash/Frame 3.png";
import animatedGif from "../assets/Splash/Star Effect.gif";
import logo from "../assets/Splash/Logo.png";
import middleImage from "../assets/Splash/Character.png";

const Loading = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // Extract parameters from the URL
  const telegramId = queryParams.get("telegramId");
  const username = queryParams.get("username");

  console.log("Telegram ID:", telegramId);
  console.log("Username:", username);
  const [step, setStep] = useState(1);
  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleClick = () => {
    if (step === 1) {
      setStep(2); // Move to loading screen after user clicks
    } else if (step === 3) {
      navigate(`/home?telegramId=${telegramId}&username=${username}`);
    }
  };

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        setStep(3); // Automatically move to final page after 1 seconds
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="container min-h-screen w-full bg-black flex flex-col justify-end items-center relative">
      {/* Background Image */}
      <img
        src={homepageImage}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Animated GIF Overlay */}
      <img
        src={animatedGif}
        alt="Animation"
        className="absolute w-full h-full object-cover opacity-100"
      />

      {/* Step 1: Clickable Logo Screen */}
      {step === 1 && (
        <div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 cursor-pointer"
          onClick={handleClick} // Ensure the entire area is clickable
        >
          <img src={logo} alt="logo" className="max-w-full h-auto" />
        </div>
      )}

      {/* Step 2: Loading Animation with Logo at the Top */}
      {step === 2 && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start text-white z-10 pt-25">
          {/* Logo at the top */}
          <img src={logo} alt="logo" className="max-w-full h-auto" />

          {/* Loading Animation & Text */}
          <div className="absolute bottom-30 text-center px-4">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 border-3 border-[#88D2EE] border-t-transparent rounded-full animate-spin mb-8"></div>
              <p className="text-lg font-bold text-[#88D2EE]">
                Launching very soon
              </p>
              <p className="mt-2 text-sm font-light text-[#999999]">
                Be on the lookout for updates
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Final Page with Image in the Middle */}
      {step === 3 && (
        <div
          className="flex flex-col justify-center items-center h-screen text-white"
          onClick={handleClick} // User clicks to go to the home screen
        >
          {/* Retain the content from Step 2 */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start text-white z-10 pt-25">
            {/* Logo at the top */}
            <img src={logo} alt="logo" className="max-w-full h-auto" />
            <div className="absolute bottom-30 text-center px-4">
              <div className="flex flex-col items-center">
                <p className="text-lg font-bold text-[#88D2EE]">
                  Launching very soon
                </p>
                <p className="mt-2 text-sm font-light text-[#999999]">
                  Be on the lookout for updates
                </p>
              </div>
            </div>
          </div>

          {/* New image in the middle */}
          <img
            src={middleImage}
            alt="Middle Image"
            className="w-70 h-auto my-8"
          />
        </div>
      )}
    </div>
  );
};
export default Loading;
