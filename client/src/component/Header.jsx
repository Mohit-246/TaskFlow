import React, { useContext } from "react";
import { Goal } from "lucide-react";
import { useUserHook } from "../hooks/useUserHook";
import { AuthContext } from "../context/AuthContext";


export default function Header() {
  const { logout } = useUserHook();
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <div className="flex px-6 z-50 items-center justify-between shadow-md">
        <div className="flex items-center">
          <Goal size={50} className="text-sky-500 font-bold" />
          <div className=" block p-4">
            <h2 className="text-3xl font-bold font1">Task Flow</h2>
            <h3 className="text-sm font-semibold text-gray-500">
              Manage Your Tasks Like A Pro
            </h3>
          </div>
        </div>

        <div>
        {isLoggedIn&&
          <button
          onClick={logout}
          className="bg-sky-300 text-white px-4 py-2 rounded-lg font-semibold focus:outline-none "
          >
            Logout
          </button>
          }
        </div>
      </div>
    </>
  );
}
