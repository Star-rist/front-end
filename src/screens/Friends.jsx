import React, { useState, useEffect, useContext } from "react";
import profileIcon from "../assets/Home/Profile Icon.png";
import star from "../assets/Home/Star.png";
import homepageImage from "../assets/Splash/Frame 3.png";
import animatedGif from "../assets/Splash/Star Effect.gif";
import linkButton from "../assets/Friends/Component/Attachment, Link.png";
import checkButton from "../assets/Friends/Component/check.png";
import { TelegramContext } from "../context/TelegramContext";
import {
  getFriends,
  getProfile,
  getRefLink,
  referralReward,
} from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import { FaTelegram, FaTwitter, FaWhatsapp } from "react-icons/fa"; // Import social icons

const referralRewards = [
  { invites: 3, reward: "100" },
  { invites: 10, reward: "300" },
  { invites: 100, reward: "1,000" },
  { invites: 300, reward: "3,000" },
  { invites: 1000, reward: "10,000" },
];

const Friends = () => {
  const { username, telegramId } = useContext(TelegramContext);
  const [userId, setUserId] = useState("");
  const [userPoints, setUserPoints] = useState(0);
  const [referralLink, setReferralLink] = useState("");
  const [referralsCount, setReferralsCount] = useState(0);
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    if (telegramId) {
      getProfile(telegramId)
        .then((data) => {
          setUserPoints(data.data.starTokens || 0); // Assuming API returns `points`
          setUserId(data.data._id); // Store userId
          setReferralsCount(data.data.referralCount || 0); // Assuming API returns `points`
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [telegramId]);

  useEffect(() => {
    const storedRewards = localStorage.getItem(`receivedRewards-${telegramId}`);
    if (storedRewards) {
      setReceivedRewards(JSON.parse(storedRewards));
    }
  }, [telegramId]);

  const [invites, setInvites] = useState(0);
  const [receivedRewards, setReceivedRewards] = useState([]);

  const handleInvite = async () => {
    try {
      if (!telegramId) {
        toast.error("User data not available.");
        return;
      }

      const data = await getRefLink(telegramId);
      if (data?.data?.referralLink) {
        setReferralLink(data.data.referralLink);
        setIsModalOpen(true);
        setLinkGenerated(true);
        // toast.success("Invite link generated successfully!");
      } else {
        toast.error("Failed to generate invite link.");
      }
    } catch (error) {
      console.error("Error generating invite link:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  // Function to copy referral link
  const handleCopy = () => {
    if (!referralLink) return;

    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        toast.success("Invite link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy the invite link.");
      });
  };

  // if (!username || !telegramId) {
  //   return <p className="text-red-500">Error: User data not available.</p>;
  // }

  // Function to handle receiving rewards
  const handleReceiveReward = async (invitesRequired) => {
    if (referralsCount < invitesRequired) {
      toast.error("Not enough invites to claim this reward.");
      return;
    }

    if (receivedRewards.includes(invitesRequired)) {
      toast.info("You have already claimed this reward.");
      return;
    }

    const rewardItem = referralRewards.find(
      (item) => item.invites === invitesRequired
    );
    const rewardAmount = rewardItem ? rewardItem.reward : "unknown";

    try {
      const response = await referralReward(userId, invitesRequired);

      if (response?.status === "success") {
        const updatedRewards = [...receivedRewards, invitesRequired];
        setReceivedRewards(updatedRewards);

        // Store in localStorage
        localStorage.setItem(
          `receivedRewards-${telegramId}`,
          JSON.stringify(updatedRewards)
        );

        const updatedProfile = await getProfile(telegramId);
        setUserPoints(updatedProfile.data.starTokens || 0);

        toast.success(`Successfully claimed ${rewardAmount} stars!`);
      } else {
        toast.error(response.message || "Failed to claim reward.");
      }
    } catch (error) {
      console.error("Error claiming reward:", error);
      toast.error("An error occurred while claiming the reward.");
    }
  };

  // Share to social platforms
  const handleShare = (platform) => {
    if (!referralLink) return;

    let url = "";
    const encodedLink = encodeURIComponent(referralLink);

    switch (platform) {
      case "telegram":
        url = `https://t.me/share/url?url=${encodedLink}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=Join me and earn rewards! ${encodedLink}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=Join%20me%20and%20earn%20rewards!%20${encodedLink}`;
        break;
      default:
        return;
    }

    window.open(url, "_blank");
  };

  return (
    <div
      className="container min-h-screen w-full bg-black flex flex-col items-center p-4 relative"
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
          <p className="text-lg font-bold">{userPoints}</p>
        </div>
      </div>

      {/* Friends Count and Referral Info */}
      <div className="text-center w-100 rounded-xs mt-5">
        <p className="text-sm text-[#999999] mb-2 font-normal">Friends</p>
        <p className="text-5xl text-[#EEEEF0] font-black mb-3">
          {referralsCount}
        </p>
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
        className="absolute w-full h-full object-cover opacity-100 -z-10 pointer-events-none"
      />

      <div className="overflow-y-auto overflow-x-hidden w-90 max-w-md mt-2">
        <div className="">
          {referralRewards.map((reward, index) => (
            <button
              key={index}
              className="relative flex items-center text-white justify-between p-3 border-2 border-[#88D2EE] rounded-xs w-full bg-[#121315] mb-3 cursor-pointer overflow-hidden"
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
                  <span className="text-[#EEEEF0] font-bold ml-2">
                    Received
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Invite Button & Link Button */}
        <div className="flex items-center gap-3 w-90 max-w-md mb-15">
          <button
            className="p-3 w-full bg-gradient-to-l from-[#C7F0FF] to-[#88D2EE] text-black text-center rounded-none cursor-pointer font-bold"
            onClick={handleInvite}
          >
            Invite Friends
          </button>
          <button
            className="border-2 border-[#88D2EE] p-3 cursor-pointer"
            onClick={handleCopy}
            disabled={!referralLink}
          >
            <img src={linkButton} alt="Link Button" className="rounded-none" />
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-[#0D131B7A] backdrop-blur-lg flex items-center justify-center z-50">
            <div className="bg-gradient-to-r from-[#09090A] to-[#121315] p-6 border-1 border-[#C7F0FF] text-center w-95">
              <h2 className="text-lg font-bold text-white">
                Share Your Invite Link
              </h2>
              <p className="text-sm text-gray-400 mt-2">
                Invite friends and earn rewards!
              </p>

              {/* Referral Link Box */}
              <div className="flex justify-between items-center bg-gray-800 p-3 rounded-md mt-4">
                <span className="text-gray-300 truncate">{referralLink}</span>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm"
                  onClick={handleCopy}
                >
                  Copy
                </button>
              </div>

              {/* Social Media Sharing */}
              <div className="flex justify-around mt-4">
                <button
                  className="flex items-center gap-2 text-white text-sm px-3 py-2 bg-[#0088cc] rounded-md"
                  onClick={() => handleShare("telegram")}
                >
                  <FaTelegram className="text-lg" /> Telegram
                </button>
                <button
                  className="flex items-center gap-2 text-white text-sm px-3 py-2 bg-[#1DA1F2] rounded-md"
                  onClick={() => handleShare("twitter")}
                >
                  <FaTwitter className="text-lg" /> Twitter
                </button>
                <button
                  className="flex items-center gap-2 text-white text-sm px-3 py-2 bg-[#25D366] rounded-md"
                  onClick={() => handleShare("whatsapp")}
                >
                  <FaWhatsapp className="text-lg" /> WhatsApp
                </button>
              </div>

              {/* Close Button */}
              <button
                className="w-full bg-red-500 text-white py-2 rounded-md mt-4"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Friends;
