import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import profile_pic from "../static/images/profile.jpg";
import StartDM from "../components/messages/StartDM"
import { useNavigate } from "react-router-dom";


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

      <div class="flex justify-center md:w-3/4 lg:w-2/3 lg:p-5">
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

          {/* Experience */}
          <div className="mt-10 p-5">
            <h1 className="text-xl font-semibold mb-5">Your Connections</h1>
            {connectionsData.map((connections) => (
              <div>
                <div className="border p-5">
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col items-center">
                      <figure className="px-5">
                        <img
                          src={profile_pic}
                          alt="pic"
                          className=" w-60 lg:w-40 rounded-full"
                        />
                      </figure>
                      <div className="flex flex-col items-center px-4">
                        <label className="text-md pl-2 font-semibold">
                          {connections.name}
                        </label>
                        <p className="text-center text-bold primaryGray text-[0.8rem] mt-2">
                          {connections.title} at {connections.company} at{" "}
                          {connections.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-center justify-center text-sm p-5">
                      <button
                        className="w-20 primaryBtn btn btn-sm bg-sky-400 font-light"
                        onClick={() => removeConnections(connections._id)}
                      >
                        Remove
                      </button>
                      <div className="p-2">
                        <StartDM userId={connections._id} userName={connections.name}/>  
                      </div>                      
                    </div>
                  </div>
                </div>
                <hr className="mt-5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Network;
