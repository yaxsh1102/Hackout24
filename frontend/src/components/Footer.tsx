import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="border-t-2 border-t-black flex justify-center overflow-x-hidden items-center shadow w-screen bg-[#0b3d0b]">
      <div className="w-full mx-auto p-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <span className="text-2xl font-extrabold font-playwrite whitespace-nowrap text-white">
              AgroQuality
            </span>
          </div>
          <div className="flex space-x-4 text-white mr-[1rem]">
            <a
              href="#"
              className="hover:text-green-300 transition-colors duration-300"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="#"
              className="hover:text-green-300 transition-colors duration-300"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              className="hover:text-green-300 transition-colors duration-300"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              className="hover:text-green-300 transition-colors duration-300"
            >
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
        <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
        <span className="block text-lg text-gray-400 sm:text-center">
          © 2024{" "}
          <a href="#" className="hover:underline">
            AgroQuality™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
