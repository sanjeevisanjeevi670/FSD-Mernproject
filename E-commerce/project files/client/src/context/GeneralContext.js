import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");

  const [productSearch, setProductSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count
  const fetchCartCount = async () => {
    try {
      const res = await api.get("/api/cart/fetch-cart");
      const count = Array.isArray(res.data) ? res.data.length : 0;
      setCartCount(count);
      return count;
    } catch (err) {
      console.error("Cart fetch error:", err.response?.data || err.message);
      setCartCount(0);
      return 0;
    }
  };

  // LOGIN
  const login = async () => {
    if (!email || !password) {
      alert("Email and password are required!");
      return;
    }

    try {
      const res = await api.post("/api/users/login", {
        email: email.trim(),
        password,
      });

      const { token, _id, usertype, username, email: userEmail } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", _id);
      localStorage.setItem("userType", usertype);
      localStorage.setItem("username", username);
      localStorage.setItem("email", userEmail);

      setUsername(username);
      setEmail(userEmail);
      setUsertype(usertype);

      await fetchCartCount();

      if (usertype === "customer") navigate("/");
      else if (usertype === "admin") navigate("/admin");
    } catch (err) {
      const serverMsg = err.response?.data?.message || "Login failed!";
      console.error("Login error:", err.response || err.message);
      alert(serverMsg);
    }
  };

  // REGISTER
  const register = async () => {
    try {
      const res = await api.post("/api/users/register", {
        username,
        email,
        password,
        usertype,
      });

      const { token, _id, usertype: type, username: name, email: userEmail } =
        res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", _id);
      localStorage.setItem("userType", type);
      localStorage.setItem("username", name);
      localStorage.setItem("email", userEmail);

      setUsername(name);
      setEmail(userEmail);
      setUsertype(type);

      await fetchCartCount();

      if (type === "customer") navigate("/");
      else if (type === "admin") navigate("/admin");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      alert("Registration failed!");
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/");
  };

  useEffect(() => {
    // Load saved user info from localStorage
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setUsername(localStorage.getItem("username") || "");
      setEmail(localStorage.getItem("email") || "");
      setUsertype(localStorage.getItem("userType") || "");
      fetchCartCount();
    }
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        login,
        register,
        logout,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        usertype,
        setUsertype,
        productSearch,
        setProductSearch,
        cartCount,
        setCartCount,
        fetchCartCount,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
