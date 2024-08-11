import React from "react";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  function clickHandler() {
    navigate("/pricing");
  }

  return (
    <div className="w-full h-full flex flex-col justify-center font-sans overflow-x-hidden mb-28">
      {/* Hero Section */}
      <div className="w-screen h-screen flex items-center justify-center p-8 md:p-32 bg-[url('https://thumbs.wbm.im/pw/medium/e0a8bf2099861254af1dc34ac38f0934.avif')] bg-cover bg-opacity-30 flex-col gap-y-8 text-white">
        <p className="text-lg sm:text-xl md:text-2xl text-center">
          Empowering Farmers, Growing the Future
        </p>

        <p className="text-xl sm:text-3xl md:text-4xl font-semibold text-center">
          "Bridging Agriculture and People."
        </p>

        <p className="text-lg sm:text-2xl md:text-5xl w-full md:w-[50rem] text-center">
          Empowering employees and farmers with tools for growth and collaboration
        </p>

        <div className="w-full flex justify-center gap-x-4 sm:gap-x-6 mt-4">
          <button
            className="w-[10rem] sm:w-[12rem] h-[2.5rem] sm:h-[3rem] bg-[#2d6930] text-base sm:text-lg font-semibold rounded-lg hover:bg-green-900 hover:border-2 hover:border-white transition-all duration-300"
            onClick={clickHandler}
          >
            Get Started
          </button>
          <button
            className="w-[12rem] sm:w-[14rem] h-[2.5rem] sm:h-[3rem] bg-[#2d6930] font-semibold text-base sm:text-lg rounded-lg hover:bg-green-900 hover:border-2 hover:border-white transition-all duration-300"
            onClick={() => navigate("/virtual-tour")}
          >
            Take A Virtual Tour
          </button>
        </div>
      </div>

      {/* Informational Section */}
      <div className="flex flex-col items-center justify-center p-8 bg-[url('splash.webp')] bg-cover bg-opacity-30">
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-playwrite mb-6">
          <span>Agriculture</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-5 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <img
              width={800}
              src="hero-section.png"
              className="min-w-[300px] md:min-w-[500px] lg:min-w-[700px] w-full max-w-[900px]"
              alt="Hero Section"
            />
          </div>
          <div className="max-w-[30rem] text-sm sm:text-base text-justify font-serif mx-2">
            <span className="font-bold">Agriculture</span>, with its allied sectors, is
            unquestionably the largest livelihood provider in India, more so in
            the vast rural areas. It also contributes a significant figure to
            the <span className="font-bold">Gross Domestic Product (GDP)</span>.
            Sustainable agriculture, in terms of food security, rural
            employment, and environmentally sustainable technologies such as
            soil conservation, sustainable natural resource management, and
            biodiversity protection, are essential for holistic rural
            development. Indian agriculture and allied activities have witnessed
            a green revolution, a white revolution, a yellow revolution, and a
            blue revolution.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
