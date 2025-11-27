import React, { useState } from "react";
import { useUserHook } from "../hooks/useUserHook";
import { Lock, Mail, User } from "lucide-react";

export default function SignIn() {
  const [islogin, setIsLogin] = useState(false);
  const { register, login } = useUserHook();

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(userData);
    setUserData({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    register(userData);
    setUserData({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="flex flex-col h-screen w-full items-center justify-center bg-linear-to-br from-sky-200 to-sky-400">
        {islogin ? (
          <div className="flex text-center max-w-min items-center justify-center bg-sky-100 shadow-md py-6 -z-50 rounded-4xl">
            <div className="p-2 space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold font1">Login</h1>
                <h2 className="font-semibold text-gray-500">Welcome Back</h2>
              </div>
              <div>
                <form onSubmit={handleLogin} className="p-4 space-y-4">
                  <div className="flex gap-4 items-center bg-gray-300 px-6 py-4 rounded-4xl">
                    <User className="ml-4" />
                    <input
                      type="text"
                      name="username"
                      value={userData.username}
                      placeholder="Username"
                      className="font1 font-semibold focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex gap-4 items-center bg-gray-300 px-6 py-4 rounded-4xl">
                    <Mail className="ml-4" />
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      placeholder="Email"
                      className="font1 font-semibold focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex gap-4 items-center bg-gray-300 px-6 py-4 rounded-4xl">
                    <Lock className="ml-4" />
                    <input
                      type="password"
                      name="password"
                      value={userData.password}
                      placeholder="Password"
                      className="font1 font-semibold focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex gap-4 items-center justify-center mt-8">
                    <button
                      type="submit"
                      className="font1 text-lg font-bold px-6 py-2 rounded-4xl bg-linear-to-br from-sky-400 to-sky-200 shadow-lg"
                    >
                      Login
                    </button>
                    <button
                      type="reset"
                      className="font1 text-lg font-bold px-6 py-2 rounded-4xl bg-gray-300 shadow-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                <div className="mt-4 text-sm font-semibold">
                  <h2>
                    New User?&nbsp;
                    <span
                      className="text-blue-400"
                      onClick={() => setIsLogin(false)}
                    >
                      SignIn
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex text-center max-w-min items-center justify-center bg-sky-100 shadow-md py-6 -z-50 rounded-4xl">
              <div className="p-2 space-y-6">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold font1">Signup</h1>
                  <h2 className="font-semibold text-gray-500">
                    Create A new Account
                  </h2>
                </div>
                <div>
                  <form onSubmit={handleSignUp} className="p-4 space-y-4">
                    <div className="flex gap-4 items-center bg-gray-300 px-6 py-4 rounded-4xl">
                      <User className="ml-4" />
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        placeholder="Name"
                        className="font1 font-semibold focus:outline-none"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex gap-4 items-center bg-gray-300 px-6 py-4 rounded-4xl">
                      <User className="ml-4" />
                      <input
                        type="text"
                        name="username"
                        value={userData.username}
                        placeholder="Username"
                        className="font1 font-semibold focus:outline-none"
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="flex gap-4 items-center bg-gray-300 px-6 py-4 rounded-4xl">
                      <Mail className="ml-4" />
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        placeholder="Email"
                        className="font1 font-semibold focus:outline-none"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex gap-4 items-center bg-gray-300 px-6 py-4 rounded-4xl">
                      <Lock className="ml-4" />
                      <input
                        type="password"
                        name="password"
                        value={userData.password}
                        placeholder="Password"
                        className="font1 font-semibold focus:outline-none"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex gap-4 items-center justify-center mt-8">
                      <button className="font1 text-lg font-bold px-6 py-2 rounded-4xl bg-linear-to-br from-sky-400 to-sky-200 shadow-lg">
                        SignIn
                      </button>
                      <button className="font1 text-lg font-bold px-6 py-2 rounded-4xl bg-gray-300 shadow-lg">
                        Cancel
                      </button>
                    </div>
                  </form>
                  <div className="mt-4 text-sm font-semibold">
                    <h2>
                      Already Have an Account? &nbsp;
                      <span
                        className="text-blue-400"
                        onClick={() => setIsLogin(true)}
                      >
                        Login
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
