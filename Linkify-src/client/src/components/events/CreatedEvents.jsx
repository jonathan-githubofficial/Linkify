// My Groups component
// Author: Khalid Sadat
// Date created: March 2, 2023
// Description: Groups component to show list of my groups.

import React, { useEffect, useState } from "react";
import profile_pic from "../../static/images/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import MyGroupsComponent from "../shared/MyGroupsComponent";

import { RiSendPlaneFill } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import Sidebar from "../shared/Sidebar";
import CardSkeleton from "../shared/CardSkeleton";
import ListSection from "../shared/ListSection";
import { useTranslation } from "react-i18next";

export default function CreatedEvents() {
  const loggedInUserId = localStorage.getItem("uid");
  const [t] = useTranslation();
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const getMyCreatedEvents = async () => {
    axios
      .get("/api/events/createdEvents?", {
        params: { memberId: loggedInUserId },
      })
      .then((res) => {
        setEvents(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  var event;
  useEffect(() => {
    getMyCreatedEvents();
  }, []);

  return (
    <div className="">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("events.createdEventsTitle")}</title>
      </Helmet>
      <div class="flex flex-col items-center mt-5">
        <div class="flex-auto w-full md:w-3/4 lg:w-4/5 lg:p-5">
          <div className="flex lg:gap-8">
            {/* Params: name, skills */}
            <Sidebar name="Khalid Sadat" />

            <div className="w-full w-full lg:w-3/4 bg-white relative lg:rounded-t-xl mb-20">
              <div className="flex flex-col justify-between gap-3">
                <h2 className="flex justify-center text-2xl font-bold md:text-3xl m-12">
                  {t("events.createdEvents")}
                </h2>
              </div>

              {isLoading && <CardSkeleton cards={4} />}

              {events.length == 0 && (
                <>
                  <div className="flex flex-col justify-between gap-3">
                    {/* <h2 className="flex justify-center text-2xl font-bold md:text-3xl m-12">List of available groups</h2> */}
                    <div className="flex justify-center text-center">
                      <span className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                          {t("events.empty")}
                        </p>
                      </span>
                    </div>
                  </div>
                </>
              )}

              {events
                .slice(0)
                .reverse()
                .map((event) => (
                  <div className=" items-center grid gap-5 my-2 md:grid-cols-2 lg:grid-cols-1 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 text-black max-w-screen-xl">
                    <div className="flex flex-col justify-between gap-3 px-6 py-6 border border-gray-200 lg:flex-row group hover:border-black rounded-xl">
                      <ListSection
                        event={event}
                        profile_pic={profile_pic}
                        type="events"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
