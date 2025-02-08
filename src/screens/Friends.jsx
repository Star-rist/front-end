import React, { useState, useContext } from "react";
import profileIcon from "../assets/Home/Profile Icon.png";
import star from "../assets/Home/Star.png";
import homepageImage from "../assets/Splash/Frame 3.png";
import animatedGif from "../assets/Splash/Star Effect.gif";
import linkButton from "../assets/Friends/Component/Attachment, Link.png";
import checkButton from "../assets/Friends/Component/check.png";
import { TelegramContext } from "../context/TelegramContext";

const referralRewards = [
  { invites: 3, reward: "100" },
  { invites: 10, reward: "300" },
  { invites: 100, reward: "1,000" },
  { invites: 300, reward: "3,000" },
  { invites: 1000, reward: "10,000" },
];

const Friends = () => {
  const { username, telegramId } = useContext(TelegramContext);
  const [invites, setInvites] = useState(0);
  const [receivedRewards, setReceivedRewards] = useState([]);

  if (!username || !telegramId) {
    return <p className="text-red-500">Error: User data not available.</p>;
  }

  // Function to handle inviting friends
  const handleInvite = () => {
    setInvites((prev) => prev + 1); // Ensure proper state update
  };

  // Function to handle receiving rewards
  const handleReceiveReward = (invitesRequired) => {
    if (
      invites >= invitesRequired &&
      !receivedRewards.includes(invitesRequired)
    ) {
      setReceivedRewards((prev) => [...prev, invitesRequired]);
    }
  };

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
            <p className="text-lg font-bold">{username}</p>
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
        <p className="text-5xl text-[#EEEEF0] font-black mb-5">{invites}</p>
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
          Win prizes every time your referral upgrades their creatures.
        </p>
      </div>

      {/* Animated Background Effect */}
      <img
        src={animatedGif}
        alt="Animated Effect"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100 -z-10 pointer-events-none"
      />

      {/* Referral Rewards */}
      <div className="w-95 max-w-md mt-6">
        {referralRewards.map((reward, index) => (
          <button
            key={index}
            className="relative flex items-center text-white justify-between p-4 border-2 border-[#88D2EE] rounded-xs w-full bg-[#121315] mb-4 cursor-pointer overflow-hidden"
            onClick={() => handleReceiveReward(reward.invites)}
            aria-label={`Claim ${reward.reward} stars for ${reward.invites} invites`}
          >
            {/* Normal Content (Invites & Reward) */}
            <span>{reward.invites} Invites</span>
            <div className="flex items-center gap-2">
              <img src={star} alt="Star" className="w-6 h-6 object-cover" />
              <span className="bg-gradient-to-l from-[#C7F0FF] to-[#88D2EE] bg-clip-text text-transparent font-black">
                {reward.reward}
              </span>
            </div>

            {/* "Received" Overlay with Image */}
            {receivedRewards.includes(reward.invites) && (
              <div className="absolute inset-0 bg-[#0F0F10] flex items-center justify-center">
                <img src={checkButton} alt="Received" className="w-5 h-5" />
                <span className="text-[#EEEEF0] font-bold ml-2">Received</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Invite Button & Link Button */}
      <div className="flex items-center gap-4 w-95 max-w-md mt-6">
        <button
          className="p-3 w-full bg-gradient-to-l from-[#C7F0FF] to-[#88D2EE] text-black text-center rounded-none cursor-pointer font-bold"
          onClick={handleInvite}
          aria-label="Invite friends"
        >
          Invite Friends
        </button>
        <button className="border-2 border-[#88D2EE] p-3 cursor-pointer">
          <img src={linkButton} alt="Link Button" className="rounded-none" />
        </button>
      </div>
    </div>
  );
};

export default Friends;
