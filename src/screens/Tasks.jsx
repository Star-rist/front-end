import React, { useState } from "react";
import homepageImage from "../assets/Splash/Frame 3.png";
import animatedGif from "../assets/Splash/Star Effect.gif";
import star from "../assets/Home/Star.png";
import profileIcon from "../assets/Home/Profile Icon.png";

const TaskBox = ({ iconLeft, points, text, secondText, imgAlt }) => (
  <div className="flex items-center justify-between p-4 border-2 border-[#88D2EE] rounded-xs w-100 max-w-md mx-auto bg-[#121315] mb-4">
    {/* Left Icon */}
    <div className="flex gap-4">
      <div
        className={`p-4 w-14 rounded-xs ${
          iconLeft === "medium"
            ? "bg-black"
            : iconLeft === "x"
            ? "bg-black"
            : "bg-blue-400"
        }`}
      >
        <i className={`fab fa-${iconLeft} text-white text-xl`} />
      </div>
    </div>

    {/* Middle Text and Second Text with Image */}
    <div className="flex flex-col flex-grow text-sm font-semibold text-white pl-3">
      {/* First Text */}
      <div>{text}</div>

      {/* Second Text with Image */}
      <div className="flex items-center gap-1 mt-1">
        <div className="text-sm font-thin text-[#999999]">{secondText}</div>
        {/* Image */}
        <img
          src={star}
          alt={star}
          className="w-6 h-6 object-cover rounded-full"
        />
        <div className="text-sm font-bold text-[#88D2EE]">{points}</div>
      </div>
    </div>

    {/* Greater than sign on the right */}
    <div className="text-xl text-white">&gt;</div>
  </div>
);

function Tasks() {
  const [activeTab, setActiveTab] = useState("Daily");

  return (
    <div className="container min-h-screen w-full bg-black flex flex-col justify-center items-center relative">
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

      {/* Top Bar Container */}
      <div className="absolute top-11 left-0 w-100 flex justify-between px-4 p-4 items-center">
        {/* Image and Text at Top Left */}
        <div className="flex items-center gap-1">
          <img
            src={profileIcon}
            alt="profile Icon"
            className="w-10 h-10 object-cover"
          />
          <p className="text-white text-lg font-bold">username</p>
        </div>

        {/* Second Text and Image at Top Right */}
        <div className="flex items-center gap-2">
          <img
            src={star}
            alt="star"
            className="w-6 h-6 object-cover rounded-full"
          />
          <p className="text-lg font-bold text-white">2,403,280</p>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="absolute top-37 z-10 w-full flex flex-col items-center">
        {/* Tabs */}
        <div className="flex justify-center space-x-18 text-[#999999] font-light text-lg mb-2">
          {["Daily", "Special", "Game"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-1 transition-all ${
                activeTab === tab ? "font-bold text-white" : "text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Underline Effect */}
        <div className="relative w-[100%] mx-auto h-0.5 bg-gray-800">
          <div
            className="absolute h-1 bg-blue-400 rounded-full transition-all duration-300"
            style={{
              width: "30%",
              left:
                activeTab === "Daily"
                  ? "5%"
                  : activeTab === "Special"
                  ? "35%"
                  : "65%",
            }}
          ></div>
        </div>
      </div>

      {/* Task Boxes Container */}
      <div className="relative z-10 flex flex-col items-center space-y-4">
        <TaskBox
          iconLeft="medium"
          text="Follow our blog on Medium"
          secondText="You can earn"
          points="1,250,000"
          imgAlt="star"
        />
        <TaskBox
          iconLeft="x"
          text="Follow us on X"
          secondText="You can earn"
          imgAlt="star"
          points="3,000,000"
        />
        <TaskBox
          iconLeft="x"
          text="Retweet our latest post"
          secondText="You can earn"
          imgAlt="star"
          points="1,500,000"
        />
        <TaskBox
          iconLeft="telegram"
          text="Join us on Telegram"
          secondText="Second Text 4"
          imgAlt="star"
          points="2,000,000"
        />
      </div>
    </div>
  );
}

export default Tasks;
