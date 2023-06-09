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
import { fetchUser } from "../utils/fetchUser";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo = fetchUser();
  // console.log(user);

  useEffect(() => {
    const user = fetchUser();
    if (!user) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const query = userQuery(userInfo?.userId);
    // console.log(userInfo);
    // console.log(query);

    client.fetch(query).then((data) => {
      // console.log(data);
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h1 className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out ">
        <div className="hidden md:flex h-screen flex-initial ">
          <Sidebar user={user && user} />
        </div>
        <div className="flex md:hidden flex-row">
          <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
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
              </div>
              <Sidebar user={user && user} closeToggle={setToggleSidebar} />
            </div>
          )}
        </div>

        <div
          className="pb-2 flex-1 h-screen overflow-y-scroll "
          ref={scrollRef}
        >
          <Routes>
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/*" element={<Pins user={user && user} />} />
          </Routes>
        </div>
      </h1>
      <div className="text-center text-sm font-bold">
        <h3>©Created by Stepan Nimchuk 2023</h3>
      </div>
    </>
  );
}

export default Home;
