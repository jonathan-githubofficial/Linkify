// HeadlineTop component
// Author: Khalid Sadat
// Date created: Feb 26, 2023
// Description: Headline component for showing the key basic info of user

import axios from "axios";
import React, { useEffect } from "react";
import { BiPencil } from "react-icons/bi";
import { useParams } from "react-router-dom";
import google_icon from "../../static/images/companies/google.png";

import EditProfile from "./modal/EditProfile";

export default function HeadlineTop(props) {
  const params = useParams();
  var profile_pic = props.profile_pic;
  var profile = props.profile;
  var company = props.company;
  const [connectStatus, setConnectStatus] = React.useState(false);
  const [connectMessage, setConnectMessage] = React.useState("Connect");

  const sendRequest = async () => {
    const res = await axios.post("/api/user/connection/sendConnectionRequest", {
      senderId: localStorage.getItem("uid"),
      receiverId: params.id,
    });
    if (res) {
      setConnectStatus(true);
      setConnectMessage("Sent");
    }
    console.log("Accept: ", res);
  };

  const checkConnectionStatus = async () => {
    const userId = localStorage.getItem("uid");
    const profileId = params.id;
    const res1 = await axios.get("/api/user/connection/getAllConnections?", {
      params: { userId },
    });
    const res2 = await axios.get(
      "/api/user/connection/getConnectionRequests?",
      {
        params: { userId: profileId },
      }
    );
    if (res1.data.filter((item) => item._id === profileId).length > 0) {
      setConnectStatus(true);
      setConnectMessage("Connected");
    } else if (res2.data.filter((item) => item._id === userId).length > 0) {
      setConnectStatus(true);
      setConnectMessage("Sent");
    }
  };

  useEffect(() => {
    checkConnectionStatus();
  }, []);

  return (
    <div className="p-5">
      <div className="grid grid-col-2 mb-2 flex">
        <div class="grid grid-cols-2 gap-2 items-start">
          <div>
            <div className="flex items-center">
              {/* <img src={google_icon} className='w-6' alt="" />
                                <label className='text-md pl-2 font-semibold'>{company}</label> */}
              {company != "" ? (
                <img src={google_icon} className="w-6" alt="" />
              ) : (
                ""
              )}
              {company != "" ? (
                <label className="text-md pl-2 font-semibold">{company}</label>
              ) : (
                ""
              )}
            </div>
            <div>
              <p
                className="primaryGray text-[0.8rem] mt-2"
                datat-testid="user-location"
              >
                Laval, Quebec, Canada
              </p>
            </div>
            <div className="mt-5">
              {!props.isOwner && (
                <button
                  onClick={() => sendRequest()}
                  disabled={connectStatus}
                  className="primaryBtn btn btn-sm bg-sky-400 font-light"
                  style={
                    connectStatus
                      ? { cursor: "not-allowed", color: "white" }
                      : {}
                  }
                >
                  {connectMessage}
                </button>
              )}
            </div>
          </div>

          <div>
            <div className="flex">
              {props.isOwner && (
                <div style={{ marginLeft: "auto" }}>
                  <label htmlFor="edit-profile-modal" className="">
                    <BiPencil className="cursor-pointer text-xl" />
                  </label>
                </div>
              )}
            </div>
          </div>
          <EditProfile
            profile={profile}
            profile_pic={profile_pic}
            getUser={props.getUser}
          />
        </div>
      </div>
    </div>
  );
}
