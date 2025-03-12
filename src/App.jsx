import React, { useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./screens/Home.jsx";
import Loading from "./screens/Loading.jsx";
import Friends from "./screens/Friends.jsx";
import Upgrade from "./screens/Upgrade.jsx";
import Wallet from "./screens/Wallet.jsx";
import Tasks from "./screens/Tasks.jsx";
import BottomNavigation from "./components/BottomNavigation.jsx";
import { TelegramProvider } from "./context/TelegramContext.jsx";

const App = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();

      setTimeout(() => {
        window.Telegram.WebApp.expand();
        window.Telegram.WebApp.viewportHeight = 100;
        window.Telegram.WebApp.viewportStableHeight = 100;

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
          document.documentElement.style.height = `${window.innerHeight}px`;
          document.body.style.height = `${window.innerHeight}px`;
        }
      }, 100);
    }
  }, []);

  console.log("Telegram WebApp:", window.Telegram?.WebApp);

  const ExcludeBottomNavigation = () => {
    const location = useLocation();
    const excludeRoutes = ["/"];
    return !excludeRoutes.includes(location.pathname) && <BottomNavigation />;
  };

  return (
    <TelegramProvider>
      <Router>
        <div className="xl:w-[30%] lg:w-[50%] md:w-[70%] w-full h-[var(--app-height)] overflow-hidden flex flex-col justify-between my-0 mx-auto px-0 ">
          <Routes>
            <Route path="/" element={<Loading />} />
            <Route path="/home" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/upgrade" element={<Upgrade />} />
          </Routes>
          <ExcludeBottomNavigation />
        </div>
      </Router>
    </TelegramProvider>
  );
};

export default App;
