import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import homepageImage from "../assets/Splash/Frame 3.png";
import { useTonConnectUI } from "@tonconnect/ui-react";
// import { Address } from "@ton/core";
import star from "../assets/Home/Star.png";
import profileIcon from "../assets/Home/Profile Icon.png";
import walletIcon from "../assets/Wallet/Icon.png";
import { TelegramContext } from "../context/TelegramContext";
import { getProfile } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";

const Wallet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { username, telegramId } = useContext(TelegramContext);
  const [userPoints, setUserPoints] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (telegramId) {
      getProfile(telegramId)
        .then((data) => {
          setUserPoints(data.data.starTokens || 0); // Assuming API returns `points`
          setUserId(data.data._id);
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [telegramId]);

  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  const handleWalletConnection = useCallback((address) => {
    setTonWalletAddress(address);
    localStorage.setItem("tonWalletAddress", address);
    console.log("Wallet connected successfully!", address);
    toast.success(`Wallet connected: ${address}`); // Success toast for connection
  }, []);

  // const handleWalletDisconnection = useCallback(() => {
  //   setTonWalletAddress(null);
  //   console.log("Wallet disconnected successfully!");
  //   toast.info("Wallet disconnected!");  // Informative toast for disconnection
  // }, []);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account?.address);
      }
      // else {
      // handleWalletDisconnection();
      // }
    };

    checkWalletConnection();

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address);
      }
      // else {
      //   handleWalletDisconnection();
      // }
    });

    return () => {
      unsubscribe();
    };
  }, [tonConnectUI, handleWalletConnection]);

  const handleWalletAction = async () => {
    try {
      if (tonConnectUI.connected) {
        await tonConnectUI.disconnect();
      } else {
        await tonConnectUI.openModal();
      }
    } catch (error) {
      console.error("Error during wallet connection:", error);
      toast.error("Error during wallet connection!"); // Toast message
    }
  };

  // const formatAddress = (address) => {
  //   const tempAddress = Address.parse(address).toString();
  //   return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
  // };

  // if (isLoading) {
  //   return (
  //     <main className="flex min-h-screen flex-col items-center justify-center">
  //       <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
  //         Loading...
  //       </div>
  //     </main>
  //   );
  // }

  return (
    <div className="container min-h-screen w-full bg-black flex flex-col justify-end items-center relative">
      <div className="absolute top-4 left-0 w-full flex justify-between px-4 p-4 items-center">
        {/* Image and Text at Top Left */}
        <div className="flex items-center gap-1">
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
          <p className="text-lg font-bold text-white">{userPoints}</p>
        </div>
      </div>

      <div className="absolute top-10 items-center justify-start text-white text-5xl font-bold pt-25">
        {/* Logo at the top */}
        <p>AIRDROP</p>
      </div>

      <div className="absolute top-55 justify-center text-sm font-bold">
        <h1 className="text-sm bg-gradient-to-r from-[#88D2EE] to-[#C7F0FF] bg-clip-text text-transparent ">
          Task for participating in AIRDROP
        </h1>
      </div>

      <div className="absolute top-61 flex flex-col items-center justify-center w-100 text-xs font-light">
        <p className="mt-2 text-[#999999]">
          You and your friends will earn 50 stars each upon successful{" "}
          <span className="block text-center"> registration.</span>
        </p>
        <p className="mt-8 text-[#999999]">
          Win prizes every time your referral upgrades their creatures..
        </p>
      </div>

      {/* Button */}
      <div className="absolute top-90 left-1/2 transform -translate-x-1/2 z-10">
        <div
          className="w-100 sm:w-48 h-12 flex items-center justify-center bg-gradient-to-r from-[#88D2EE] to-[#C7F0FF] text-black text-lg font-semibold shadow-md cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Connect Wallet
        </div>
      </div>

      <div className="fixed top-1/2 justify-center font-bold">
        <h1 className="text-sm bg-gradient-to-r from-[#88D2EE] to-[#C7F0FF] bg-clip-text text-transparent ">
          Instructions on HOW TO CONNECT A WALLET{" "}
        </h1>
      </div>

      <div className="fixed bottom-80 flex flex-col items-center justify-center w-90 text-xs font-light">
        <p className="mt-2 text-[#999999]">
          An airdrop is the distribution of tokens to players' wallets. These
          tokens will be traded on top exchanges, and you can either sell or
          hold them. To receive your tokens, you must connect your{" "}
          <span className="block text-center"> wallet.</span>
        </p>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#0D131B7A] backdrop-blur-lg flex items-center justify-center z-50">
          {/* Modal Content */}
          <div className="bg-gradient-to-r from-[#09090A] to-[#121315] p-6 border-1 border-[#C7F0FF] text-center w-95">
            {/* Wallet Icon */}
            <img src={walletIcon} alt="Wallet" className="mx-auto w-16 h-16" />

            {/* Modal Text */}
            <h2 className="text-lg font-bold text-[#EEEEF0] mt-4">
              Connect your TON Wallet{" "}
            </h2>
            <p className="text-sm text-[#999999] mt-2">
              Connect your crypto wallet to receive airdop allocation. If you
              don't have one, create one in your Telegram account.
            </p>

            {/* Buttons */}
            <div className="mt-6 space-y-3">
              <button
                className="w-full bg-gradient-to-r from-[#88D2EE] to-[#C7F0FF] text-black py-3  font-bold"
                onClick={handleWalletAction}
              >
                Connect Wallet
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
};

export default Wallet;
