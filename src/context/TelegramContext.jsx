import { createContext, useState, useEffect } from "react";

export const TelegramContext = createContext();

export const TelegramProvider = ({ children }) => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [telegramId, setTelegramId] = useState(
    localStorage.getItem("telegramId") || ""
  );

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      setTimeout(() => {
        window.Telegram.WebApp.expand();

        // Set viewportHeight and viewportStableHeight
        window.Telegram.WebApp.viewportHeight = 100;
        window.Telegram.WebApp.viewportStableHeight = 100;

        // Fix iOS height issue
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
          const updateHeight = () => {
            document.documentElement.style.setProperty(
              "--app-height",
              `${window.innerHeight}px`
            );
          };

          updateHeight(); // Set height on load
          window.addEventListener("resize", updateHeight); // Update on resize
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
