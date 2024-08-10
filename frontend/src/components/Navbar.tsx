import React from "react";
import { useContext } from "react";
import { AppContext, Context } from "../context/AppContext";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";

const Navbar: React.FC = () => {
  const { sidebar, setSidebar } = useContext(AppContext) as Context;

  return (
    <>
      {sidebar ? <Sidebar /> : null}
      <div className="w-screen border-b-4 border-black overflow-x-hidden shadow-4xl fixed z-40">
        <div className="w-full h-20 bg-white flex opacity-96">
          <button
            onClick={() => setSidebar(true)}
            className="bg-white border-r-2 py-8 w-20 flex items-center justify-center border-r-black transition duration-200"
          >
            <GiHamburgerMenu size={26} className="text-black" />
          </button>
          <div className="w-full flex py-8 items-center">
            <span className="text-black mx-auto pr-20 font-playwrite flex items-center justify-center gap-2 text-2xl sm:text-4xl font-extrabold">
              <span className="mt-[-0.2rem] font-extrabold text-4xl">
                AgroQuality
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
