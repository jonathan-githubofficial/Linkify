import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaGoogle } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { RiUserAddFill } from "react-icons/ri";
import axios from "axios";
import { useTranslation } from "react-i18next";

function Login() {
  const [password, setPass] = useState({});
  const [email, setEmail] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [t] = useTranslation();

  const login = async () => {
    await axios
      .post("/api/account/login", { email, password })
      .then((res) => {
        localStorage.setItem("uid", res.data._id);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("uname", res.data.name);
        localStorage.setItem("loggedIn", 1);
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setErrorMessage(t("login.error"));
        } else {
          setErrorMessage(t("login.unknown"));
        }
        console.log("Error", err);
      });
  };
  React.useEffect(() => {
    if (localStorage.getItem("loggedIn") === 1) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <meta charSet="utf-8" />
        <title>User Registration</title>
      </Helmet>
      <div className="w-full lg:w-5/6 flex flex-col lg:flex-row bg-white shadow rounded-lg">
        <div className="lg:w-1/2 p-8 hidden lg:block">
          <img
            src="/src/static/images/loginimg.png"
            alt="Your Company"
            className="mx-auto w-96"
          />
        </div>
        <div className="lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
            {t("login.title")}
          </h2>

          {errorMessage && (
            <div
              className="bg-red-100  text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">*{errorMessage}</span>
            </div>
          )}
          <form
            className="space-y-4"
            action="#"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <div className="relative">
              <label htmlFor="email-address" className="text-sm text-gray-600">
                {t("login.email")}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder={t("login.email")}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="text-sm text-gray-600">
                {t("login.password")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder={t("login.password")}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              <BiLogIn className="mr-2" />
              {t("login.login")}
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center"></div>
              <div className="relative flex justify-left text-sm">
                <span className="px-2 bg-white text-gray-500">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-indigo-600 hover:text-indigo-500 "
                  >
                    {t("login.forgot")}
                  </Link>
                </span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  window.location.href = "/api/account/login/google";
                }}
                className="w-1/2 py-2 px-4 text-sm font-medium text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-md hover:from-pink-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 flex items-center justify-center"
              >
                <FaGoogle className="mr-2" />
                {t("login.google")}
              </button>

              <Link to="/register" className="w-1/2">
                <button className="w-full py-2 px-4 text-sm font-medium text-indigo-900 bg-blue-200 rounded-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center">
                  <RiUserAddFill className="mr-2 text-indigo-500" />
                  {t("login.register")}
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
