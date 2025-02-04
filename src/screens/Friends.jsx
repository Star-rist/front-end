import React from "react";
import profileIcon from "../assets/Home/Profile Icon.png";
import star from "../assets/Home/Star.png";
import homepageImage from "../assets/Splash/Frame 3.png";
import animatedGif from "../assets/Splash/Star Effect.gif";
import linkButton from "../assets/Friends/Component/Attachment, Link.png";

const referralRewards = [
  { invites: "3", reward: "100" },
  { invites: "10", reward: "300" },
  { invites: "100", reward: "1,000" },
  { invites: "300", reward: "3,000" },
  { invites: "1,000", reward: "10,000" },
];

const Friends = () => {
  return (
    <div
      className="container min-h-screen w-full bg-black flex flex-col items-center p-6 relative"
      style={{
        backgroundImage: `url(${homepageImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* User Profile Section */}
      <div className="flex items-center justify-between w-full text-white">
        <div className="flex items-center gap-3">
          <img
            src={profileIcon}
            alt="Profile Icon"
            className="w-12 h-12 object-cover"
          />
          <div className="flex flex-col">
            <p className="text-lg font-bold">username</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src={star} alt="Star" className="w-6 h-6 object-cover" />
          <p className="text-lg font-bold">2,403,320</p>
        </div>
      </div>

      {/* Friends Count and Referral Info */}
      <div className="text-center w-100 rounded-xs mt-6">
        <p className="text-sm text-[#999999] mb-2 font-normal">Friends</p>
        <p className="text-5xl text-[#EEEEF0] font-black mb-5">35</p>
        <p className="text-sm flex justify-center space-x-1">
          <span className="bg-gradient-to-l from-[#C7F0FF] to-[#88D2EE] bg-clip-text text-transparent font-black">
            +50
          </span>
          <span className="bg-gradient-to-l from-[#C7F0FF] to-[#88D2EE] bg-clip-text text-transparent font-bold">
            stars for invite
          </span>
        </p>
        <p className="text-sm font-thin text-[#999999] mt-2">
          You and your friends will earn 50 stars upon successful registration.
        </p>
        <p className="text-sm font-thin text-[#999999] mt-5">
          Win prizes everytime your referral upgrades their creatures.
        </p>
      </div>

      {/* Animated Background Effect */}
      <img
        src={animatedGif}
        alt="Animated Effect"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
      />

      {/* Referral Rewards */}
      <div className="w-100 max-w-md mt-6">
        {referralRewards.map((reward, index) => (
          <div
            key={index}
            className="flex items-center text-white justify-between p-4 border-2 border-[#88D2EE] rounded-xs w-full bg-[#121315] mb-4"
          >
            <button>{reward.invites} Invites</button>
            <div className="flex items-center gap-2">
              <img src={star} alt="Star" className="w-6 h-6 object-cover" />
              <span className="bg-gradient-to-l from-[#C7F0FF] to-[#88D2EE] bg-clip-text text-transparent font-black">
                {reward.reward}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Button & Link Button */}
      <div className="flex items-center gap-4 w-90 mx-auto mt-6">
        <button className="p-3 w-full bg-gradient-to-l from-[#C7F0FF] to-[#88D2EE] text-black text-center rounded-none font-bold">
          Invite Friends
        </button>
        <button className="border-2 border-[#88D2EE] p-3">
          <img src={linkButton} alt="Link Button" className="rounded-none" />
        </button>
      </div>
    </div>
  );
};

export default Friends;
