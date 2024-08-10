import Navbar from "../components/Navbar";
import ProfileSection from "../components/ProfileSection";
import Footer from "../components/Footer";
import { usePoly } from "../hooks/usePoly";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSoil } from "../hooks/useSoil";
import { useUvi } from "../hooks/useUvi";
import { useWeather } from "../hooks/useWeather";

const Profile = () => {
  const navigate = useNavigate();
  const coordinates =
    "-121.1958,37.6683,-121.1779,37.6687,-121.1773,37.6792,-121.1958,37.6792,-121.1958,37.6683";
  const polyID = usePoly(coordinates);
  const uvIndex = useUvi("66b720137a33665bee3e48f9");
  const soilData = useSoil("66b720137a33665bee3e48f9");
  const weatherData = useWeather(coordinates);

  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "true") navigate("/signup");
    console.log(polyID);
    console.log(uvIndex);
    console.log(soilData);
    console.log(weatherData);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <ProfileSection />
      <Footer />
    </div>
  );
};

export default Profile;
