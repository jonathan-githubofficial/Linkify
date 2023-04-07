// HeadlineTop component
// Author: Khalid Sadat
// Co-Author: Jonathan Haddad
// Date created: Feb 26, 2023
// date updated : Aprl 1st, 2023
// Description: Headline component for showing the key basic info of user
import axios from "axios";
import React from "react";
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

  const sendRequest = async () => {
    const res = await axios.post("/api/user/connection/sendConnectionRequest", {
      senderId: localStorage.getItem("uid"),
      receiverId: params.id,
    });
    if (res) {
      setConnectStatus(true);
    }
    console.log("Accept: ", res);
  };

  const handleCropModalClose = () => {
    setShowCropModal(false);
  };

  const handleCropModalShow = () => {
    setShowCropModal(true);
  };

  return (
    <div className="p-5">
      <div className="grid grid-col-2 mb-2 flex">
        <div class="grid grid-cols-2 gap-2 items-start">
          <div>
          <Avatar userId={props.userId} />
          <SetupAvatar
              avatar={avatar}
              isOwner={props.isOwner}
              getUser={props.getUser}
              onEdit={handleCropModalShow}
              setUploadedImage={setUploadedImage}
            />
            <div className="flex items-center">
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
                >
                  {connectStatus ? "Sent" : "Connect"}
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
            avatar={avatar}
            getUser={props.getUser}
          />
        </div>
      </div>
    </div>
  );
}
