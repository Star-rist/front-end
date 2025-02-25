import axios from "axios";

import { TonConnect } from "@tonconnect/sdk";

export const tonConnect = new TonConnect({
  manifestUrl: "https://yourdomain.com/tonconnect-manifest.json", // Change this to your actual hosted manifest
});

const API_BASE_URL = "https://starist.onrender.com/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProfile = async (telegramId) => {
  try {
    const response = await api.get(`/profile/${telegramId}`, {});
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

export const claimTokensInstantly = async (telegramId) => {
  try {
    const response = await api.post(`/claimTokenInstantly`, { telegramId });
    return response.data;
  } catch (error) {
    console.error("Error claiming tokens:", error);
    throw error;
  }
};

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

export const upgradeBooster = async (telegramId) => {
  try {
    const response = await api.post(`/upgrade`, { telegramId });
    return response.data;
  } catch (error) {
    console.error("Error upgrading boosterPack:", error);
    throw error;
  }
};

export const referralReward = async (userId) => {
  try {
    const response = await api.post(`/referral-rewards`, { userId });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error upgrading boosterPack:", error);
    throw error;
  }
};
// http://localhost:5173/home?telegramId=1247974918&username=bit_cipher