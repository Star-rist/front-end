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
  }, []);

  return (
    <TelegramContext.Provider value={{ username, telegramId }}>
      {children}
    </TelegramContext.Provider>
  );
};
