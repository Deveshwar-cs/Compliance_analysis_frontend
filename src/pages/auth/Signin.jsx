import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {toast} from "react-toastify";

const SignIn = () => {
  const {login} = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(formData);

      if (res) {
        toast.success("Login succesfully");
        navigate("/");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login Failed!!";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white to-blue-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute w-72 h-72 bg-blue-200 rounded-full blur-3xl top-10 left-10 opacity-40"></div>
      <div className="absolute w-72 h-72 bg-purple-200 rounded-full blur-3xl bottom-10 right-10 opacity-40"></div>

      {/* Card */}
      <div className="relative bg-white p-8 rounded-3xl shadow-xl w-96 border border-gray-100">
        {/* Accent */}
        <div className="h-1 w-20 bg-linear-to-br from-blue-500 to-purple-500 rounded-full mb-6 mx-auto"></div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Login to continue your journey
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="peer w-full p-3 border border-gray-300 rounded-xl 
              focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
              placeholder-transparent"
              required
            />
            <label
              className="absolute left-3 -top-2.5 text-sm text-blue-500 bg-white px-1 
              transition-all duration-200
              peer-placeholder-shown:top-3
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:-top-2.5
              peer-focus:text-sm
              peer-focus:text-blue-500"
            >
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="peer w-full p-3 border border-gray-300 rounded-xl 
              focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
              placeholder-transparent"
              required
            />
            <label
              className="absolute left-3 -top-2.5 text-sm text-blue-500 bg-white px-1 
              transition-all duration-200
              peer-placeholder-shown:top-3
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:-top-2.5
              peer-focus:text-sm
              peer-focus:text-blue-500"
            >
              Password
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-br from-blue-500 to-indigo-500 text-white p-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-500">
          Don't have an account?
          <a
            href="/signup"
            className="text-blue-600 ml-1 font-semibold hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
