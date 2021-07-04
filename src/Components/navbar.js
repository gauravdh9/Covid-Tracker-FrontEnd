import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutAction } from "../redux/slice/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutAction());
    localStorage.setItem("token", "");
    history.push("/login");
  };
  return (
    <div className="w-full justify-around lg:justify-evenly items-center flex  shadow-md">
      <span className="text-lg font-medium">Dashboard</span>
      <div className=" flex w-2/3 lg:w-4/12 items-center justify-center">
        <span>Welcome</span>
        <span className="text-xl mx-2 font-bold capitalize">{user?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 rounded-md p-2 m-4 text-white"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
