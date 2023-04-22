import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [t] = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/account/forgotPassword", { email });
      setMessage(t("forgotPassword.success"));
      setError("");
    } catch (err) {
      setError(t("forgotPassword.error"));
      setMessage("");
    }
  };
  React.useEffect(() => {
    if (localStorage.getItem("loggedIn") === 1) {
      navigate("/");
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-96 rounded-lg p-8 shadow-md">
        <h1 className="text-3xl font-bold text-center  mb-4">
          {t("forgotPassword.title")}
        </h1>
        <p className="text-sm text-gray-600 text-center font-bold mb-4">
          {t("forgotPassword.desc")}
        </p>
        {message && (
          <p className="text-green-600 text-center mb-2">{message}</p>
        )}
        {error && <p className="text-red-600 text-center mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base text-gray-700"
            />
          </label>
          <button
            type="submit"
            className="w-full py-2 px-4 text-sm font-medium text-indigo-900 bg-blue-200 rounded-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
          >
            {t("forgotPassword.button")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
