import { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { userQuery } from "../utils/data";

/// Классный способ импорта нескольких компонентов, прописан в index.js
import { Sidebar, UserProfile } from "./../components";
import { client } from "../client";
import logo from "./../assets/logo.png";
import Pins from "./Pins";

function Home() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.userId);
    // console.log(userInfo);
    // console.log(query);

    client.fetch(query).then((data) => {
      console.log(data);
      setUser(data[0]);
    });
  }, []);

  return (
    <h1 className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out ">
      <div className="hidden md:flex h-screen flex-initial ">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <HiMenu
          fontSize={40}
          className="cursor-pointer"
          onClick={() => {
            setToggleSidebar(true);
          }}
        />
        <Link to="/">
          <img src={logo} alt="logo-img" className="w-28" />
        </Link>
        <Link to={`/user-profile/${user?._id}`}>
          <img src={user?.image} alt="user-img" className="w-12" />
        </Link>
      </div>
      {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer"
              onClick={() => {
                setToggleSidebar(false);
              }}
            />
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        </div>
      )}
      <div
        className="pb-2 flex-1 h-screen overflow-y-scroll "
        ref={scrollRef}
      ></div>
    </h1>
  );
}

export default Home;
