import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BiLogIn } from "react-icons/bi";
import { useTranslation } from "react-i18next";

function LandingPage() {
  const [t] = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Helmet>
        <meta charSet="utf-8" />
        <title>User Login</title>
      </Helmet>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-1/2 mx-auto mb-6">
          <img
            className="h-100 w-auto"
            src="/src/static/images/loginimg.png"
            alt="Your Company"
          />
        </div>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            {t("landingPage.title")}
          </h2>
          <br></br>

          <Link to="/login">
            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <BiLogIn className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
              {t("landingPage.login")}
            </button>
          </Link>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {t("landingPage.message")}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/register">
                <button className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {t("landingPage.register")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
