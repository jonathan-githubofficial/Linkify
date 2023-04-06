import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import profile_pic from "../static/images/profile.jpg";
import StartDM from "../components/messages/StartDM"
import { useNavigate } from "react-router-dom";
import PositionName from "../components/shared/PositionName";
import { Link } from "react-router-dom";

import { RiSendPlaneFill } from 'react-icons/ri';
import { HiUserRemove } from 'react-icons/hi';


function Network() {
  const [networkData, setNetworkData] = useState([]);
  const [connectionsData, setConnectionsData] = useState([]);

  const getRequests = async () => {
    const res = await axios.get("/api/user/connection/getConnectionRequests?", {
      params: { userId: localStorage.getItem("uid") },
    });
    setNetworkData(res.data);
  };

  const getAllConnections = async () => {
    const res = await axios.get("/api/user/connection/getAllConnections?", {
      params: { userId: localStorage.getItem("uid") },
    });
    console.log(res.data);
    setConnectionsData(res.data);
  };

  const rejectRequest = async (senderId) => {
    const receiverId = localStorage.getItem("uid");
    const res = await axios.post(
      "/api/user/connection/rejectConnectionRequest",
      {
        senderId,
        receiverId,
      }
    );
    getRequests();
    console.log("Reject: ", res);
  };

  const acceptRequest = async (senderId) => {
    const receiverId = localStorage.getItem("uid");
    const res = await axios.post(
      "/api/user/connection/acceptConnectionRequest",
      {
        senderId,
        receiverId,
      }
    );
    getAllConnections();
    getRequests();
    console.log("Accept: ", res);
  };

  const removeConnections = async (connectionId) => {
    const userId = localStorage.getItem("uid");
    const res = await axios.post("/api/user/connection/removeConnection", {
      connectionId,
      userId,
    });
    getAllConnections();
    console.log("Removed connection: ", res);
  };

  useEffect(() => {
    getAllConnections();
    getRequests();
  }, []);

  return (
    <div className="flex justify-center items-center mt-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Network</title>
      </Helmet>

      <div class="flex justify-center w-full md:w-3/4 lg:w-2/3 lg:p-5">
        {/* Profile */}
        <div class="w-full lg:w-2/3 bg-white relative lg:rounded-t-xl">
          {/* Top */}
          {networkData.map((network, index) => (
            <div className="border p-5" key={index}>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center">
                  <figure className="px-5">
                    <img
                      src={profile_pic}
                      alt="Shoes"
                      className=" w-60 lg:w-40 rounded-full"
                    />
                  </figure>
                  <div className="flex flex-col items-center px-4">
                    <label className="text-md pl-2 font-semibold">
                      {network.name}
                    </label>
                    <p className="text-center text-bold primaryGray text-[0.8rem] mt-2">
                      {network.title} at {network.company} at {network.location}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center text-sm p-5">
                  <button
                    className="btn-sm font-bold font-light"
                    onClick={() => rejectRequest(network._id)}
                  >
                    IGNORE
                  </button>
                  <button
                    className="w-20 primaryBtn btn btn-sm bg-sky-400 font-light"
                    onClick={() => acceptRequest(network._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Connection */}
          <div className="mt-10 p-5">
            <h1 className="text-xl font-semibold mb-5">Your Connections</h1>
              <div className="w-full bg-white rounded-lg shadow sm:p-8 dark:bg-gray-800">
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    
                    {connectionsData && connectionsData.length == 0 && 
                      <div className="text-center">
                        You do not have any people in your network.
                      </div>
                    }

                    {connectionsData.map((connections) => (
                      <div>
                        <li className="p-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <img className="w-12 h-12 rounded-full" src={profile_pic} alt="Neil image" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-md font-medium text-gray-900 truncate dark:text-white">
                                {connections.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                <PositionName profile={connections} />
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              {/* <StartDM userId={connections._id} userName={connections.name} /> */}
                              <Link to={`/messages/${connections._id}/${connections.name}`}>
                                <div data-tooltip-target="tooltip-network-msg" className="mr-2 btn btn-ghost btn-circle" >
                                  <RiSendPlaneFill  className="text-xl"/>
                                </div>
                              </Link>
                              <div id="tooltip-network-msg" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                  Message
                                  <div class="tooltip-arrow" data-popper-arrow></div>
                              </div>

                              <button onClick={() => removeConnections(connections._id)} data-tooltip-target="tooltip-network-remove" className="mr-2 btn btn-ghost btn-circle" >
                                <HiUserRemove className="text-xl" />
                              </button>
                              <div id="tooltip-network-remove" role="tooltip" class="absolute text-sm z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                  Remove
                                  <div class="tooltip-arrow" data-popper-arrow></div>
                              </div>
                              {/* <button
                                className="w-20 primaryBtn btn btn-sm bg-sky-400 font-light"
                                onClick={() => removeConnections(connections._id)}
                              >
                                Remove
                              </button> */}
                            </div>
                          </div>
                        </li>
                        <hr />
                      </div>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Network;
