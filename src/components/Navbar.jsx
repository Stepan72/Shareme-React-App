import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

function Navbar({ searchTerm, setSearchTerm, user }) {
  const navigate = useNavigate();
  console.log(user);

  function onChangeHandler(e) {
    setSearchTerm(e.target.value);
  }

  if (!user) return null;

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm ">
        <IoMdSearch fontSize={21} />
        <input
          type="text"
          onChange={onChangeHandler}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3">
        <Link className="hidden md:block" to={`/user-profile/${user?._id}`}>
          <img src={user.image} alt="user" className="w-14 h-12 rounded-lg" />
        </Link>
        <Link
          className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
          to={`/create-pin`}
        >
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
