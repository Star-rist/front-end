import axios from "axios";

import { TonConnect } from "@tonconnect/sdk";

export const tonConnect = new TonConnect({
  manifestUrl: "https://yourdomain.com/tonconnect-manifest.json", // Change this to your actual hosted manifest
});

const API_BASE_URL = "https://starist-o3ze.onrender.com/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProfile = async (telegramId) => {
  try {
    const response = await api.get(`/profile/${telegramId}`, {});
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const claimTokens = async (telegramId) => {
  try {
    const response = await api.post(`/claimToken`, { telegramId });
    return response.data;
  } catch (error) {
    console.error("Error claiming tokens:", error);
    throw error;
  }
};

// export const connectLink = async (userId) => {
//   try {
//     const response = await api.post(`/wallet/connect-link`, { userId });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     throw error;
//   }
// };

export const getFriends = async (telegramId) => {
  try {
    const response = await api.get(`/get-friends/${telegramId}`, {});
    return response.data;
  } catch (error) {
    console.error("Error getting friends:", error);
    throw error;
  }
};

export const getRefLink = async (telegramId) => {
  try {
    const response = await api.get(`/referral-link/${telegramId}`, {});
    return response.data;
  } catch (error) {
    console.error("Error getting referral link:", error);
    throw error;
  }
};
// 1247974918   bit_cipher
// 7444825599   emmy0932

// http://localhost:5173/home?telegramId=7444825599&username=emmy0932
