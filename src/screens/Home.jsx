import React from "react";
import homepageImage from "../assets/Home/image 184.png";
import animatedGif from "../assets/Splash/Star Effect.gif";
import profileIcon from "../assets/Home/Profile Icon.png";
import screen from "../assets/Home/Screen.png";
import star from "../assets/Home/Star.png";
import character from "../assets/Home/Character.png";
import button from "../assets/Home/Button_Default.png";

function Home() {
  const CountdownBar = ({ duration }) => {
    const [timeLeft, setTimeLeft] = useState(duration); // Time left in seconds

    useEffect(() => {
      if (timeLeft <= 0) return; // Stop countdown when time reaches 0

      const interval = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000); // Decrease time every second

      return () => clearInterval(interval);
    }, [timeLeft]);

    const percentage = (timeLeft / duration) * 100; // Calculate fill percentage
    const formattedTime = new Date(timeLeft * 1000)
      .toISOString()
      .substring(11, 16); // Format as HH:MM
  };

  return (
    <div className="container relative bg-black min-h-screen w-full">
      {/* Background Image */}
      <img
        src={homepageImage}
        alt="Background"
        className="absolute w-full h-full object-cover opacity-100"
      />

      {/* Animated GIF Overlay */}
      <img
        src={animatedGif}
        alt="Animation"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100"
      />

      {/* Image and Text at Top Left */}
      <div className="absolute top-11 left-4 p-4 gap-1 flex items-center">
        <img
          src={profileIcon}
          alt="profile Icon"
          className="w-10 h-10 object-cover mr-2"
        />
        <p className="text-white text-lg font-bold">username</p>
      </div>

      {/* Container for the first image and text */}
      <div className="absolute top-40 left-0 w-full h-full flex flex-col items-center justify-start z-10 pt-25">
        {/* First Image */}
        <div className="relative w-65 top-[-100px]">
          <img src={screen} alt="screen" className="w-full object-cover" />

          {/* Text inside the first image */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
            <p>2403280</p>
          </div>
        </div>

        {/* Second image overlaying the first image with an intense glowing effect */}
        <img
          src={star}
          alt="star"
          className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-12 h-12 object-cover super-bright-glow"
        />
      </div>

      {/* Image Below the First Image, Centered */}
      <div className="absolute bottom-75 left-1/2 transform -translate-x-1/2">
        <img
          src={character} // Replace with your image source
          alt="character"
          className="w-65 h-70 object-cover" // Adjust the size as needed
        />
      </div>

     {/* Progress Bar */}
     <div className="absolute bottom-54 left-1/2 transform -translate-x-1/2 w-100 max-w-md z-10">
        <div className="flex justify-between text-white text-lg font-bold mb-2">
          <span>Time Remaining</span>
          <span>02:15:27</span>
        </div>
        <div className="relative w-full h-3 bg-black overflow-hidden">
          <div className="absolute inset-0 flex justify-between">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className="h-full w-[2px] bg-gray-700 opacity-80"
              ></div>
            ))}
          </div>
          <div
            className="h-full bg-gradient-to-r from-[#88D2EE] to-[#C7F0FF] transition-all duration-1000"
            style={{ width: "60%" }}
          ></div>
        </div>
      </div>

     {/* Button */}
     <div className="absolute bottom-37 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-100 max-w-md sm:w-48 h-12 flex items-center justify-center bg-gradient-to-r from-[#88D2EE] to-[#C7F0FF] text-black text-lg font-semibold shadow-md cursor-pointer">
          Collect Now
        </div>
      </div>
    </div>
  );
}

export default Home;
