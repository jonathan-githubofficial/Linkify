// HeadlineTop component
// Author: Khalid Sadat
// Co-Author: Jonathan Haddad
// Date created: Feb 26, 2023
// date updated : Aprl 1st, 2023
// Description: Headline component for showing the key basic info of user
import axios from "axios";
import React, { useEffect } from "react";
import { BiPencil } from "react-icons/bi";
import { useParams } from "react-router-dom";
import google_icon from "../../static/images/companies/google.png";

import EditProfile from "./modal/EditProfile";
import SetupAvatar from "./profilePicture/SetupAvatar";
import Avatar from "../shared/Avatar";

export default function HeadlineTop(props) {
  const params = useParams();
  var avatar = props.avatar;
  var profile = props.profile;
  var company = props.company;
  const [connectStatus, setConnectStatus] = React.useState(false);
  const [showCropModal, setShowCropModal] = React.useState(false);
  const [uploadedImage, setUploadedImage] = React.useState(null);
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

  const handleCropModalClose = () => {
    setShowCropModal(false);
  };

  const handleCropModalShow = () => {
    setShowCropModal(true);
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
    <div className="pl-5 pt-5 pr-5 lg:top-24 md:top-15 w-full" style={{position: 'absolute'}}>
      <div className="grid grid-col-2 mb-2 flex">
        <div class="grid grid-cols-2 gap-2 h-[6.5rem]">
          <div>
            <div className="flex items-center">
              <div className="w-24 h-24 lg:flex justify-center md:block sm:block flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" >
                <Avatar userId={props.userId} />
              </div>
            </div>
         
            <SetupAvatar
              avatar={avatar}
              isOwner={props.isOwner}
              getUser={props.getUser}
              onEdit={handleCropModalShow}
              setUploadedImage={setUploadedImage}
            />
          </div>
          
          <div className={`grid content-center`}>
            {props.isOwner ? (
              <div style={{ marginLeft: "auto" }}>
                <label htmlFor="edit-profile-modal" className="">
                  <BiPencil className="cursor-pointer text-xl" />
                </label>
              </div>
            ) : 
              <button
                onClick={() => sendRequest()}
                disabled={connectStatus}
                className={`${!props.isOwner ? 'text-right col-end-10 justify-items-end' : ''} w-[6rem] primaryBtn btn btn-sm bg-sky-400 font-light`}
                style={
                  connectStatus
                    ? { cursor: "not-allowed", color: "white" }
                    : {}
                }
              >
                {connectMessage}
              </button>
            }
          </div>
          
          <EditProfile
            profile={profile}
            avatar={avatar}
            getUser={props.getUser}
          />
        </div>
      </div>
    </div>
  );
}
