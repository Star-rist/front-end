import { createContext, useState, useEffect } from "react";

export const TelegramContext = createContext();

export const TelegramProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [telegramId, setTelegramId] = useState(localStorage.getItem("telegramId") || "");

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();

      setTimeout(() => {
        window.Telegram.WebApp.expand();

        // Force full height on iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
          document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
          document.body.style.height = "var(--app-height)";
        }

        // Listen for resize and update dynamically
        window.addEventListener("resize", () => {
          document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
          document.body.style.height = "var(--app-height)";
        });
      }, 100);
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ username, telegramId }}>
      {children}
    </TelegramContext.Provider>
  );
};
