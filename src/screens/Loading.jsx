import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import homepageImage from "../assets/Splash/Frame 3.png";
import animatedGif from "../assets/Splash/Star Effect.gif";
import logo from "../assets/Splash/Logo.png";
import middleImage from "../assets/Splash/Character.png";

const Loading = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const telegramId = queryParams.get("telegramId");
  const username = queryParams.get("username");

  console.log("Telegram ID:", telegramId);
  console.log("Username:", username);

  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.expand();
    }
    const timer = setTimeout(() => {
      setStep(3);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const goToHome = () => {
    navigate(`/home?telegramId=${telegramId}&username=${username}`);
  };

  return (
    <div className="container h-[var(--app-height)] w-full bg-black flex flex-col justify-end items-center relative">
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

      {/* Step 3: Final Page with Image in the Middle */}
      {step === 3 && (
        <div
          className="flex flex-col justify-center items-center h-screen text-white"
          onClick={goToHome} // User clicks to go to the home screen
        >
          {/* Retain the content */}
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

          {/* Middle Image */}
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
