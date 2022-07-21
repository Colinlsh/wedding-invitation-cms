import React, { useState } from "react";
import { useNavigate } from "react-router";
import { MdDashboard } from "react-icons/md";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { RiMenu2Line, RiCloseLine } from "react-icons/ri";
import NavbarItem from "./ui/NavbarItem";

const NavBar = () => {
  const [navbar, setNavbar] = useState(false);
  const [selectedNav, setSelectedNav] = useState(0);

  const navigate = useNavigate();

  return (
    <div className="w-fit h-full">
      <div
        className="fixed bg-linkedinShade backdrop-blur-sm bg-opacity-50 right-5 top-5 p-3 rounded-full transition-all md:hidden z-10"
        onClick={() => setNavbar(!navbar)}
      >
        <div
          className={`fixed transition-all duration-700 ${
            navbar ? "scale-0" : "scale-1"
          }`}
        >
          <RiMenu2Line size={20} />
        </div>
        <div
          className={`transition-all duration-700 ${
            navbar ? "scale-1" : "scale-0"
          }`}
        >
          <RiCloseLine size={20} />
        </div>
      </div>

      <div
        className={`fixed top-16 right-10 transition-all duration-700 rounded-lg md:hidden ${
          navbar ? "opacity-1 z-10" : "opacity-0 translate-x-10 -z-10"
        } bg-linkedinShade`}
      >
        <div className="flex flex-col justify-between">
          <div className="w-full flex flex-col">
            <NavbarItem
              icon={<MdDashboard className="text-white" size={25} />}
              name="Dashboard"
              className={`flex justify-center items-center p-5 cursor-pointer space-x-2 ${
                selectedNav === 0 ? "bg-white bg-opacity-50" : ""
              }`}
              onClick={() => {
                navigate("/");
                setNavbar(false);
                setSelectedNav(0);
              }}
            />
            <NavbarItem
              icon={
                <img src="/assets/singapore.svg" alt="sgs" className="h-5" />
              }
              name="Singapore"
              className={`flex justify-center items-center p-5 cursor-pointer space-x-2 ${
                selectedNav === 1 ? "bg-white bg-opacity-50" : ""
              }`}
              onClick={() => {
                navigate("/sg");
                setNavbar(false);
                setSelectedNav(1);
              }}
            />
            <NavbarItem
              icon={<img src="/assets/malaysia.svg" alt="my" className="h-5" />}
              name="Malaysia"
              className={`flex justify-center items-center p-5 cursor-pointer space-x-2 ${
                selectedNav === 2 ? "bg-white bg-opacity-50" : ""
              }`}
              onClick={() => {
                navigate("/my");
                setNavbar(false);
                setSelectedNav(2);
              }}
            />
          </div>
          <NavbarItem icon={<FiSettings />} name="Settings" />
        </div>
      </div>

      <div
        className={`h-full bg-linkedinShade md:flex flex-col transition-width duration-500 hidden`}
      >
        <div
          className="text-white flex items-center space-x-2 justify-end text-xl cursor-pointer h-20 px-5"
          onClick={() => setNavbar(!navbar)}
        >
          <div
            className={`w-full h-10 flex items-center transition-all ${
              navbar ? "justify-end" : "justify-center"
            }`}
          >
            {navbar ? (
              <AiOutlineMenuFold size={25} />
            ) : (
              <AiOutlineMenuUnfold size={25} />
            )}
          </div>
        </div>
        <div className="h-[90%] flex flex-col justify-between">
          <div className="w-full flex flex-col space-y-2">
            <NavbarItem
              icon={<MdDashboard className="text-white" size={25} />}
              name="Dashboard"
              className={`rounded-xl flex justify-center items-center p-2 cursor-pointer ${
                selectedNav === 0 ? "bg-white bg-opacity-50" : ""
              } ${navbar ? "space-x-2" : ""}`}
              isShow={navbar}
              onClick={() => {
                navigate("/");
                setSelectedNav(0);
              }}
            />
            <NavbarItem
              icon={
                <img src="/assets/singapore.svg" alt="sgs" className="h-5" />
              }
              name="Singapore"
              className={`rounded-xl flex justify-center items-center p-2 cursor-pointer ${
                selectedNav === 1 ? "bg-white bg-opacity-50" : ""
              } ${navbar ? "space-x-2" : ""}`}
              isShow={navbar}
              onClick={() => {
                navigate("/sg");
                setSelectedNav(1);
              }}
            />
            <NavbarItem
              icon={<img src="/assets/malaysia.svg" alt="my" className="h-5" />}
              name="Malaysia"
              className={`rounded-xl flex justify-center items-center p-2 cursor-pointer ${
                selectedNav === 2 ? "bg-white bg-opacity-50" : ""
              } ${navbar ? "space-x-2" : ""}`}
              isShow={navbar}
              onClick={() => {
                navigate("/my");
                setSelectedNav(2);
              }}
            />
          </div>
          <NavbarItem icon={<FiSettings />} name="Settings" isShow={navbar} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
