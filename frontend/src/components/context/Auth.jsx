import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useEffect, useState } from "react";
import server from "../../environment";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${server.url}/api/v1/cookie/check`);
      if (response.data.message) {
        setIsAuthenticated(true);
        setUser(response.data.username);
      } else {
        setIsAuthenticated(false);
        setUser("");
      }
    } catch (err) {
      console.error("Auth checked failed:", err.response?.data || err.message);
      setIsAuthenticated(false);
      setUser("");
    } finally {
      setLoading(false);
    }
  };

  const userSignUp = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${server.url}/api/v1/user/register`, formData, {
        withCredentials: true,
      });
      if (response.status == httpStatus.OK) {
        setIsAuthenticated(true);
        setUser(response.data.username);
        setLoading(false);
        return true;
      }
      setIsAuthenticated(false);
      setUser();
      setLoading(false);
      return false;
    } catch (err) {
      console.error(
        "Error while registering:",
        err.response?.data || err.message
      );
      setIsAuthenticated(false);
      setUser("");
      setLoading(false);
      return false;
    } 
  };

  const userLogin = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${server.url}/api/v1/user/login`, formData, {
        withCredentials: true,
      });
      if (response.status == httpStatus.OK) {
        setIsAuthenticated(true);
        setUser(response.data.username);
        setLoading(false);
        return true;
      }
      setIsAuthenticated(false);
      setUser("");
      setLoading(false);
      return false;
    } catch (err) {
      console.log("Error while login");
      setIsAuthenticated(false);
      setUser("");
      setLoading(false);
      return false;
    }
  };

  const userLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${server.url}/api/v1/user/logout`);
      if ((response.status = httpStatus.OK)) {
        setIsAuthenticated(false);
        setUser("");
        return true;
      }
      return false;
    } catch (err) {
      console.log("Logout error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    isAuthenticated,
    user,
    loading,
    checkAuthStatus,
    userSignUp,
    userLogin,
    userLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default function useAuth() {
  return useContext(AuthContext);
}
