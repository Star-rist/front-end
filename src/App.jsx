import { useState } from "react";
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

function App() {
  // const [count, setCount] = useState(0);

  const ExcludeBottomNavigation = () => {
    const location = useLocation();
    const excludeRoutes = ["/"]; // Add all routes where you don't want BottomNavigation
    return !excludeRoutes.includes(location.pathname) && <BottomNavigation />;
  };

  return (
    <Router>
      <ExcludeBottomNavigation />
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/upgrade" element={<Upgrade />} />
      </Routes>
    </Router>
  );
}

export default App;
