import React, { useState } from "react";
import { RiUserAddFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaGoogle } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [password, setPass] = useState({});
  const [email, setEmail] = useState({});
  const [name, setName] = useState({});
  const [isRecruiter, setRecruiter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const parseErrorMessageFromHtml = (html) => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(html, "text/html");
    let errorMessage = htmlDoc.querySelector("pre")?.textContent || "";
    errorMessage = errorMessage.replace(/\s+at.*/g, "");
    return errorMessage;
  };
  

  const register = async () => {
    await axios
      .post("/api/account/register", { email, password, name, isRecruiter })
      .then((res) => {
        console.log("logged in", res);
        navigate("/");
      })

      .catch((err) => {
        if (err.response && err.response.status === 400) {
          const parsedMessage = parseErrorMessageFromHtml(err.response.data);
          setErrorMessage(parsedMessage);
        } else {
          setErrorMessage("Something went wrong. Please try again later.");
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
            Create an account
          </h2>
          {errorMessage && (
            <div
              className="bg-red-100 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
          <form
            className="space-y-4"
            action="#"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              register();
            }}
          >
            <div className="relative">
              <label htmlFor="name" className="text-sm text-gray-600">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="block w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="User Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="email-address" className="text-sm text-gray-600">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="text-sm text-gray-600">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <input
                id="isRecruiter"
                name="isRecruiter"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                onChange={() => {
                  setRecruiter(!isRecruiter);
                }}
              />
              <label
                htmlFor="isRecruiter"
                className="ml-2 block text-sm text-gray-900"
              >
                Are you trying to create an account as recruiter ?
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              <RiUserAddFill className="mr-2" />
              Register
            </button>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  window.location.href = "/api/account/login/google";
                }}
                className="w-1/2 py-2 px-4 text-sm font-medium text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-md hover:from-pink-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 flex items-center justify-center"
              >
                <FaGoogle className="mr-2" />
                Login with Google
              </button>

              <Link to="/login" className="w-1/2">
                <button className="w-full py-2 px-4 text-sm font-medium text-indigo-900 bg-blue-200 rounded-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center">
                  <BiLogIn className="mr-2 text-indigo-500" />
                  Already have an account ?
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
