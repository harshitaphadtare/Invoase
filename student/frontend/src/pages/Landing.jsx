import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/*navbar*/}
      <div className="flex justify-between mx-5 md:mx-12">
        <img
          className="mt-5 h-[33px] w-[120px] md:h-auto md:w-[160px]"
          src={assets.logo}
          alt=""
        />

        <div className="mt-5 flex justify-center items-center gap-2 bg-[#38A37F] px-4 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-[#2C8565] hover:scale-105 active:scale-100 cursor-pointer">
          <p
            onClick={() => navigate("/student/signup")}
            className="font-medium text-sm text-white"
          >
            Create Account
          </p>
          <img className="w-4 h-4" src={assets.new_page} alt="" />
        </div>
      </div>
      {/**/}
      <div className="mx-5 md:mx-12">
        <div className="mt-5 flex lg:px-10 rounded-lg pb-5 px-2 bg-[#EAF3FA]">
          {/*left content*/}
          <div className="flex flex-col px-5 py-6">
            <div className="mt-2 lg:mt-15 lg:px-5 text-center md:text-center lg:text-left">
              {/*badge*/}
              <div className="flex items-center justify-center lg:justify-start">
                <div className="bg-stone-50 flex justify-between shadow-sm rounded-sm h-auto w-[150px] py-[1.75px] text-[10px] pl-1 pr-[8px]  ">
                  <span className="bg-black font-bold text-white text-[8px] rounded-sm py-[1.5px] px-1 shadow-sm ">
                    NEW
                  </span>{" "}
                  Revolutionizing Finance
                </div>
              </div>

              {/*title*/}
              <h1 className="mt-1 text-3xl lg:text-5xl font-semibold text-[#2c3e50] ">
                Automate & Simplify Financial Approvals
              </h1>

              {/*description*/}
              <p className="mt-5 text-xs mx-7 md:mx-40 lg:mx-0 lg:text-sm text-gray-400">
                Say goodbye to slow, manual processes! Invoase digitizes tasks
                making finance management faster, smarter, and completely
                transparent.
              </p>

              {/*buttons*/}
              <div className="mt-10 flex flex-col md:flex-row md:justify-center lg:justify-start gap-3">
                <button
                  className="font-medium text-sm bg-[#38A37F] text-white px-5 py-2 rounded-lg shadow-md 
                     transition-all duration-300 hover:bg-[#2C8565] hover:scale-105 active:scale-100 cursor-pointer"
                >
                  Get Started
                </button>

                <button
                  className="text-sm cursor-pointer px-4 py-2 rounded-lg border-2 border-[#2C3E50] text-[#2C3E50] 
             font-medium transition-all duration-400 active:bg-[#2C3E50] active:text-white "
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
    </div>
  );
};

export default Landing;
