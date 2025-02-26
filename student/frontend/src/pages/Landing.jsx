import React from "react";
import { assets } from "../assets/assets";

const Landing = () => {
  return (
    <div className="flex ml-10 ">
      {/*left content*/}
      <div className="flex flex-col">
        <img className="w-[160px]" src={assets.logo} alt="" />
        <div className="ml-4 mt-25">
          <div className="bg-gray-100 rounded-sm h-auto w-[15vw] py-[1.5px] text-[12px] px-1">
            <span className="bg-black font-bold text-white text-[10px] rounded-sm py-[1.5px] px-1 shadow-sm mr-1">
              NEW
            </span>{" "}
            Revolutionizing Finance
          </div>
          <h1 className="mt-4 text-5xl font-semibold text-[#2c3e50]">
            Automate & Simplify Financial Approvals
          </h1>
          <p className="mt-5 text-sm text-gray-500 w-[36vw]">
            Say goodbye to slow, manual processes! Invoase digitizes tasks
            making finance management faster, smarter, and completely
            transparent.
          </p>
          <div className="flex gap-2 mt-10">
            <button className="font-medium text-md bg-[#38A37F] text-white px-5 py-2 rounded-lg shadow-md">
              Get Started
            </button>
            <button className="font-medium font-[#2C3E50] text-md px-4 py-2 rounded-lg border-2 border-[#2C3E50] ">
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/*right content*/}
      <div>
        <img
          className="lg:w-316 "
          src={assets.landing_img}
          alt="landing page image" // change the widht of the image and page is not responsive
        />
      </div>
    </div>
  );
};

export default Landing;
