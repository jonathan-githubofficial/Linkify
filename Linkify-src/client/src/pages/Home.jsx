import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../static/css/index.css";
import profile_pic from "../static/images/profile.jpg";

import { RiSendPlaneFill } from "react-icons/ri";
import { SlLike } from "react-icons/sl";

import Sidebar from "../components/shared/Sidebar";


function Home() {
  var email = "";
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [getFeed, setFeed] = useState([]);

  // checks if user is logged in, if not, redirects to login page
  React.useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "1") {
      navigate("/login");
    } else {
      email = localStorage.getItem("email");
    }
  }, []);

  useEffect(() => {
    axios
      .get("/api/account/userbymail?", {
        params: { email },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [profile, setProfile] = useState([]);
  const [user_skills, setSkills] = useState([]);

  const getUser = () => {
    axios
      .get("/api/account/userbymail?", {
        params: { email },
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getFeeds();
  };

  const getFeeds = () => {
    const id = localStorage.getItem("uid");
    const feed = [];
    // get posts for user by his connections
    axios
      .get("/api/user/feed/getPersonalFeed", {
        params: { id: id },
      })
      .then((res) => {
        setFeed(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(async () => {
    setSkills(await profile.skills);
  });

  const experiences = user.experience;
  // var occupation = experiences[experiences.length - 1];
  var occupation = "";

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Linkify</title>
      </Helmet>

      <div className="flex flex-col items-center mt-5">
        <div className="w-full lg:w-2/3">
          <div class="flex">
            {/* Side Profile Bar */}
            <Sidebar user_skills={user_skills} name={profile.name}/>

            {/* Feed */}
            <div class="w-100 lg:w-2/3">
              <div class="flex flex-col my-auto items-center bgimg bg-cover">
                {getFeed.map((feed) => (
                  <div className="sm:w-2/3 lg:w-4/5 p-5 mb-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-black">
                    <div className="flex items-center justify-left">
                      <div className="flex items-center">
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <img src={profile_pic} />
                          </div>
                        </div>
                        <div className="flex flex-col pl-5">
                          <p className="text-2xl">{feed.name}</p>
                          <span className="text-xs">Software Engineer</span>
                          <span className="text-xs">
                            {feed.postedOn.split("T")[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex mt-5">
                      <p className="text-gray-700 text-base">
                        {feed.description}
                      </p>
                    </div>

                    <div className="mt-5">
                      <div className="grid grid-col-2 mb-2">
                        <div class="grid grid-cols-2 gap-2">
                          <div>
                            <div className="flex items-center mb-">
                              <SlLike />
                              <label className="text-sm pl-2">
                                {feed.likes.length}
                              </label>
                            </div>
                          </div>

                          <div className="text-right text-sm">
                            {feed.comments.length} Comments
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>

                    <div className="mt-5">
                      <div class="grid grid-cols-10 gap-3">
                        <div class="col-span-9">
                          <input
                            type="text"
                            placeholder="Write Comment..."
                            class="input input-bordered input-sm w-full"
                          />
                        </div>
                        <div className="grid place-items-center">
                          <div>
                            <button className="btn btn-circle btn-sm text-xl">
                              <RiSendPlaneFill />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
