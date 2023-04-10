import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

import logo from "../assets/logo.png";
const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize ";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize ";
const categories = [
  { name: "Animals" },
  { name: "Wallpapers" },
  { name: "Photography" },
  { name: "Gaming" },
  { name: "Coding" },
  { name: "Other" },
];

function Sidebar({ user, closeToggle }) {
  function handleCloseSidebar() {
    if (closeToggle) {
      closeToggle(false);
    }
  }

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center "
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill /> Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl ">
            Discover categories
          </h3>
          {categories.slice(0, categories.length - 1).map((el) => {
            return (
              <NavLink
                to={`/category/${el.name}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={handleCloseSidebar}
                key={el.name}
              >
                {el.name}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;