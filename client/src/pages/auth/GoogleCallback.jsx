import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get("uid");
    const email = urlParams.get("email");
    const uname = urlParams.get("uname");

    if (uid && email && uname) {
      localStorage.setItem("uid", uid);
      localStorage.setItem("email", email);
      localStorage.setItem("uname", uname);
      localStorage.setItem("loggedIn", 1);
      navigate("/");
      window.location.reload();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
}

export default GoogleCallback;
