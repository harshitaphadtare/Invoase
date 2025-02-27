import React from "react";
import { assets } from "../assets/assets";

const Landing = () => {
  return (
    <div className="mx-5 md:mx-12">
      <img className="mt-5 w-[120px] md:w-[160px]" src={assets.logo} alt="" />

      <div className="mt-5 flex lg:px-10 rounded-lg pb-5 px-2 bg-[#EAF3FA]">
        {/*left content*/}
        <div className="flex flex-col">
          <div className="mt-2 lg:mt-15 lg:px-5 text-center md:text-center lg:text-left">
            {/*badge*/}
            <div className="flex items-center justify-center lg:justify-start">
              <div className="bg-stone-50 shadow-sm rounded-sm h-auto w-[180px] py-[1.75px] text-[12px] px-[2px]  ">
                <span className="bg-black font-bold text-white text-[10px] rounded-sm py-[1.5px] px-1 shadow-sm mr-[1px] ">
                  NEW
                </span>{" "}
                Revolutionizing Finance
              </div>
            </div>

            {/*title*/}
            <h1 className="mt-4 text-4xl lg:text-5xl font-semibold text-[#2c3e50] ">
              Automate & Simplify Financial Approvals
            </h1>

            {/*description*/}
            <p className="mt-5 text-xs mx-7 md:mx-40 lg:mx-0 lg:text-sm text-gray-400">
              Say goodbye to slow, manual processes! Invoase digitizes tasks
              making finance management faster, smarter, and completely
              transparent.
            </p>

            {/*buttons*/}
            <div className="mt-7 flex flex-col md:flex-row md:justify-center lg:justify-start gap-3">
              <button
                className="font-medium text-md bg-[#38A37F] text-white px-5 py-2 rounded-lg shadow-md 
                     transition-all duration-300 hover:bg-[#2C8565] hover:scale-105 active:scale-100 cursor-pointer"
              >
                Get Started
              </button>

              <button
                className="text-md cursor-pointer px-4 py-2 rounded-lg border-2 border-[#2C3E50] text-[#2C3E50] 
             font-medium transition-all duration-400 active:bg-[#C5DAEE] "
              >
                Learn more
              </button>
            </div>
          </div>
        </div>

        {/*right content*/}
        <div>
          <img
            className="hidden lg:block lg:w-350 "
            src={assets.landing_img}
            alt="landing page image"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
