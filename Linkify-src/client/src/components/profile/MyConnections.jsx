// My Connections component
// Author: Khalid Sadat
// Date created: March 2, 2023
// Description: Connections component for showing user's connections

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import StartDM from "../messages/StartDM";
import PositionName from "../shared/PositionName";
import Avatar from "../shared/Avatar";
import VerifiedUser from "./VerifiedUser";
import { useTranslation } from "react-i18next";

export default function MyConnections(props) {
  var connections = props.connections;

  const navigate = useNavigate();
  const [t] = useTranslation();
  const [randomUsers, setRandomUsers] = useState([]);

  const profileNavigate = (uid) => {
    navigate(`/profile/${uid}`);
    window.location.reload();
  };

  const getRandomUsers = async () => {
    
    var token =
      "ewogICAgdXNlcm5hbWU6ICJraGFsaWRAdGVzdC5jb20iLAogICAgcGFzc3dvcmQ6ICJwYXNzMSIKfQ==";

    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const randUser = {size: 4, user: localStorage.getItem("uid")};

    const res = await axios.get("/api/account/getRandomUsers", {
      params: { user: localStorage.getItem("uid"), size: 4 },
      headers
    });
    setRandomUsers(res.data);

    // await axios
    //   .get("/api/account/getRandomUsers", randUser)
    //   .then((res) => {
    //     console.log("Random users retrieved", res);
    //     setRandomUsers(res.data);
    //   })
    //   .catch((err) => console.log("Error", err));
  };

  useEffect(() => {
    getRandomUsers();
  }, []);

  console.log('random:' + randomUsers);



  return (
    <div class="w-1/4 hidden lg:block">
      {/* connections */}
      <div className="bg-white p-5 max-h-[29rem] rounded-xl">
        <div className="mb-5">
          <p className="text-lg font-semibold">
            {t("userProfile.rightBar.myConnects")}
          </p>
        </div>

        {connections.reverse().slice(0,4).map((connections) => (
          <div>
            <div className="flex justify-left mt-2 mb-3">
              <div className="flex items-start">
                <div className="avatar">
                  <div className="w-12 rounded-full bg-gray-800 ">
                    {/* <img src={profile_pic} /> */}
                    <Avatar userId={connections._id} />
                  </div>
                </div>
                <div className="flex flex-col pl-5">
                  {/* <Link to={`/profile/${connections._id}`}> */}
                  <button onClick={() => profileNavigate(connections._id)}>
                    {/* <p className="lg:text-md font-semibold text-left" >
                                          {connections.name}
                                      </p> */}
                    <div className="flex items-center">
                      <div className="w-auto">{connections.name}</div>
                      <VerifiedUser name={connections.name} />
                    </div>
                  </button>
                  {/* </Link> */}
                  <span className="text-sm">
                    <PositionName id={connections._id} />
                  </span>
                  <div className="mt-2">
                    <StartDM
                      userId={connections._id}
                      userName={connections.name}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-white p-5 max-h-[29rem] rounded-xl mt-5">
        <div className="mb-5">
          <p className="text-lg font-semibold">
            Poeple you may know
          </p>
        </div>

        {randomUsers.map((connections) => (
          <div>
            <div className="flex justify-left mt-2 mb-3">
              <div className="flex items-start">
                <div className="avatar">
                  <div className="w-12 rounded-full bg-gray-800 ">
                    {/* <img src={profile_pic} /> */}
                    <Avatar userId={connections._id} />
                  </div>
                </div>
                <div className="flex flex-col pl-5">
                  {/* <Link to={`/profile/${connections._id}`}> */}
                  <button onClick={() => profileNavigate(connections._id)}>
                    <div className="flex items-center">
                      <div className="w-auto">{connections.name}</div>
                      <VerifiedUser name={connections.name} />
                    </div>
                  </button>
                  {/* </Link> */}
                  <span className="text-sm">
                    <PositionName id={connections._id} />
                  </span>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}

      </div>
    </div>
  );
}
