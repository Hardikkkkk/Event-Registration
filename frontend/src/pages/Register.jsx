import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [shake, setShake] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signup", {
        username,
        email,
        password,
      });
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setShake(true);
      setTimeout(() => setShake(false), 500); // Trigger shake animation
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="md:grid md:grid-cols-2 md:gap-8 bg-white shadow-xl rounded-lg overflow-hidden md:max-w-2xl w-full">
        <div className="hidden md:block">
          <div className="relative h-full">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Sample"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-indigo-500 bg-opacity-20"></div> {/* Subtle overlay */}
          </div>
        </div>
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 md:text-left">
            Register
          </h2>
          <form onSubmit={registerUser} className={`animate-fade-in ${shake ? "animate-shake" : ""}`}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out focus:border-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
            >
              Register User
            </button>
            <div className="mt-6 text-center md:text-left">
              <span className="text-sm text-gray-600">Already have an account?</span>
              <Link
                to="/login"
                className="text-indigo-600 hover:underline hover:underline-offset-2 font-bold ml-2 transition duration-300 ease-in-out"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;