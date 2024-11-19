import React, { useState } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });

  const login = async (username, password) => {
    // 🐨 Todo: Exercise #4
    //  ให้เขียน Logic ของ Function `login` ตรงนี้
    //  Function `login` ทำหน้าที่สร้าง Request ไปที่ API POST /login
    //  ที่สร้างไว้ด้านบนพร้อมกับ Body ที่กำหนดไว้ในตารางที่ออกแบบไว้

    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));

      const response = await axios.post("http://localhost:4000/auth/login", {
        username,
        password,
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setState((prevState) => ({
          ...prevState,
          loading: false,
          user: response.data.user,
          error: null,
        }));
        return true; // Login successful
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        user: null,
        error:
          error.response?.data?.message || "An error occurred during login",
      }));
      return false; // Login failed
    }
  };

  // 🐨 Todo: Exercise #2
  //  ให้เขียน Logic ของ Function `register` ตรงนี้
  //  Function register ทำหน้าที่สร้าง Request ไปที่ API POST /register
  //  ที่สร้างไว้ด้านบนพร้อมกับ Body ที่กำหนดไว้ในตารางที่ออกแบบไว้
  const register = async (username, password, firstName, lastName) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));

      const response = await axios.post("http://localhost:4000/auth/register", {
        username,
        password,
        firstName,
        lastName,
      });

      if (response.status === 201) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: null,
        }));
        return true; // Registration successful
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error.response || error);
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error:
          error.response?.data?.message ||
          "An error occurred during registration",
      }));
      return false; // Registration failed
    }
  };

  const logout = () => {
    // 🐨 Todo: Exercise #7
    //  ให้เขียน Logic ของ Function `logout` ตรงนี้
    //  Function logout ทำหน้าที่ในการลบ JWT Token ออกจาก Local Storage
    // Remove the JWT token from Local Storage
    localStorage.removeItem("token");

    // Update the state to reflect that the user is logged out
    setState({
      loading: false,
      error: null,
      user: null,
    });
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await register(username, password, firstName, lastName);
    if (success) {
      // Registration successful, perhaps redirect to login page or show a success message
    } else {
      // Registration failed, perhaps show an error message
    }
  };

  return (
    <AuthContext.Provider
      value={{ state, login, logout, register, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
