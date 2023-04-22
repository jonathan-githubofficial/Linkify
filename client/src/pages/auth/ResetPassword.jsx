import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [t] = useTranslation();

  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(t("resetPassword.dontMatch"));
      setMessage("");
      return;
    }

    try {
      console.log({ token, newPassword: password });
      await axios.post("/api/account/resetPassword", {
        token,
        newPassword: password,
      });
      setMessage(t("resetPassword.success"));
      setError("");
    } catch (err) {
      setError(t("resetPassword.error"));
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
        <h1 className="text-3xl font-semibold text-center mb-4">
          {t("resetPassword.title")}
        </h1>
        {message && (
          <p className="text-green-600 text-center mb-2">{message}</p>
        )}
        {error && <p className="text-red-600 text-center mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">{t("resetPassword.new")}:</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base text-gray-700"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">{t("resetPassword.confirm")}:</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base text-gray-700"
            />
          </label>
          <button
            type="submit"
            className="w-full mt-6 py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center"
          >
            {t("resetPassword.reset")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
