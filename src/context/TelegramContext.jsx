import { createContext, useState, useEffect } from "react";

export const TelegramContext = createContext();

export const TelegramProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [telegramId, setTelegramId] = useState(localStorage.getItem("telegramId") || "");

  useEffect(() => {
    // Update state when localStorage changes
    const storedUsername = localStorage.getItem("username");
    const storedTelegramId = localStorage.getItem("telegramId");

    if (storedUsername) setUsername(storedUsername);
    if (storedTelegramId) setTelegramId(storedTelegramId);
    
    // Ensure Telegram Mini App expands to full screen
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();

      setTimeout(() => {
        window.Telegram.WebApp.expand();

        // Fix height issue on iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
          document.documentElement.style.height = `${window.innerHeight}px`;
          document.body.style.height = `${window.innerHeight}px`;
        }
      }, 100);
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ username, telegramId }}>
      {children}
    </TelegramContext.Provider>
  );
};