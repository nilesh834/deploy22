import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoMdMenu } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { setLogout } from "../redux/slice/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);

  const [dropdownMenu, setDropDown] = useState(false);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  return (
    <div className="py-[10px] sm:py-[10px] px-[20px] sm:px-[60px] flex justify-between items-center relative">
      <Link to={"/"}>
        <h1 className="text-slate-600 text-3xl font-bold ">
          Rent
          <span className="text-slate-900">Nest</span>
        </h1>
      </Link>

      <div className="flex border border-gray-500 rounded-[30px] h-[50px] px-5 gap-10 items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (search.trim() !== "") {
              navigate(`/listings/search/${search}`);
            }
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            type="submit"
            disabled={search.trim() === ""}
            className="cursor-pointer"
          >
            <FaSearch className="text-slate-600 w-6 h-6" />
          </button>
        </form>
      </div>

      <div className="flex items-center gap-5">
        {user ? (
          <Link
            to={"/create-listing"}
            className="hidden sm:block no-underline texxt-slate-500 font-bold cursor-pointer hover:text-blue-500"
          >
            Become A Host
          </Link>
        ) : (
          <Link
            to={"/login"}
            className="hidden sm:block no-underline texxt-slate-500 font-bold cursor-pointer hover:text-blue-500"
          >
            Become A Host
          </Link>
        )}

        <button
          onClick={() => setDropDown(!dropdownMenu)}
          className="h-[50px] flex items-center px-[10px] border border-gray-500 rounded-[30px] gap-2.5 bg-white cursor-pointer hover:shadow-lg"
        >
          <IoMdMenu className="text-slate-600" />

          {!user.user ? (
            <FaUser className="text-slate-600" />
          ) : (
            <img
              src={user?.user?.profileImagePath} //Cloudinary URL
              alt="profile photo"
              className="w-10 h-10 object-cover rounded-full "
            />
          )}
        </button>

        {dropdownMenu && !user.user && (
          <div className="absolute bg-white right-15 sm:right-5 top-20 flex flex-col w-48 p-2.5 border-gray-300 rounded-2xl shadow-lg z-[999]">
            <Link to={"/login"}>Log In</Link>
            <Link to={"/register"}>Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user?.user && (
          <div className="absolute bg-white right-15 sm:right-5 top-20 flex flex-col w-48 p-2.5 border-gray-300 rounded-2xl shadow-lg z-[999]">
            <Link
              to={`/${user?.user?._id}/trips`}
              className="w-full px-4 py-2 text-slate-500 no-underline font-bold hover:text-blue-500"
            >
              Trip List
            </Link>
            <Link
              to={`/${user?.user?._id}/wishList`}
              className="w-full px-4 py-2 text-slate-500 no-underline font-bold hover:text-blue-500"
            >
              Wish List
            </Link>
            <Link
              to={`/${user?.user?._id}/properties`}
              className="w-full px-4 py-2 text-slate-500 no-underline font-bold hover:text-blue-500"
            >
              Property List
            </Link>
            <Link
              to={`/${user?.user?._id}/reservations`}
              className="w-full px-4 py-2 text-slate-500 no-underline font-bold hover:text-blue-500"
            >
              Reservation List
            </Link>
            <Link
              to={"/create-listing"}
              className="w-full px-4 py-2 text-slate-500 no-underline font-bold hover:text-blue-500"
            >
              Become A Host
            </Link>

            <Link
              to={"/login"}
              className="w-full px-4 py-2 text-slate-500 no-underline font-bold hover:text-blue-500"
              onClick={() => dispatch(setLogout())}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
