import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";

export function useUserHook() {
  const URL = import.meta.env.VITE_BACKEND_URL;
  
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedUser = JSON.parse(storedUserInfo);
      setUser(parsedUser.user || parsedUser.newUser); // handle both register/login responses
      setIsLoggedIn(true);
    }
  }, []);

  const register = async (user) => {
    try {
      const res = await axios.post(`${URL}/v1/user/create`, user);
      console.log(res.data.success);
      if (res.data.success) {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        localStorage.setItem("token", res.data.token);
        setUser(res.data.newUser);
        setIsLoggedIn(true);
        toast.success("User Created Successfully");
        return;
      } else {
        toast.error(res.data.message);
        console.error("Error Occured ", res.data.message);
        return;
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      return;
    }
  };

  const login = async (user) => {
    try {
      const res = await axios.post(`${URL}/v1/user/login`, user);
      if (res.data.success) {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        localStorage.setItem("token", res.data.token);
        setUser(res.data.User);
        setIsLoggedIn(true);
        toast.success(res.data.message);
        return;
      } else {
        toast.error("User Not found");
        console.error("Error Occured ", res.data.message);
        return;
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      return;
    }
  };

  const logout = async () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    setUser([]);
    setIsLoggedIn(false);
    toast.info("Logged Out Successfully");
  };

  return {
    isLoggedIn,
    user,
    register,
    login,
    logout,
  };
}
