// experience modal component
// Author: Khalid Sadat
// Date created: March 1, 2023
// Description: experience modal component for adding a new experience

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";

import { BiPencil } from "react-icons/bi";

export default function Experience(props) {
  var id = props.id;
  // let id = "63eabb9c07f2dc10446a1c7c";
  var experiences = props.experiences;

  const [position, setPosition] = useState("");
  const [companyName, setCommpanyName] = useState("");
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
 

  const handlePosition = (e) => {
    const position = e.target.value;
    console.log(position);
    setPosition(position);
  };

  const handleMyCompany = (e) => {
    const company = e.target.value;
    console.log(company);
    setCommpanyName(company);
  };


  const handleCountry = (e) => {
    const country = e.target.value;
    console.log(country);
    setCountry(country);
  };
  
  const handleStartDate = (e) => {
    const start_date = e.target.value;
    console.log(start_date);
    setStartDate(start_date);
  }
  
  const handleEndDate = (e) => {
    const end_date = e.target.value;
    console.log(end_date);
    setEndDate(end_date);
  };
  
  const handleDescription = (e) => {
    const description = e.target.value;
    console.log(description);
    setDescription(description);
  };

  const addExperience = async (e) => {
    e.preventDefault();

    var token =
      "ewogICAgdXNlcm5hbWU6ICJraGFsaWRAdGVzdC5jb20iLAogICAgcGFzc3dvcmQ6ICJwYXNzMSIKfQ==";

    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const experienceStr = position + ", " + companyName + ", " + startDate + ", " + endDate + ", " + country + ", " + description; 
    const newExperience = { id: id, experience: experienceStr };

    await axios
      .post("/api/user/property/addExperience", newExperience, headers)
      .then((res) => {
        console.log("Adding", res);
        props.getUser();
      })
      .catch((err) => console.log("Error", err));

    setPosition("");
    setCommpanyName("");
    setStartDate("");
    setEndDate("");
    setCountry("");
    setDescription("");
  };

  return (
    <div>
      <input type="checkbox" id="experience-modal" className="modal-toggle" />
      <div className="modal items-start pt-10">
        <div className="modal-box w-11/12 max-w-5xl editProfileModal">
          <label
            htmlFor="experience-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h1 className="text-xl font-semibold mb-5">Edit Experiences</h1>
          <div>
            <form>
              <div className="">

                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-full-name"
                  >
                    New Experience
                  </label>
                </div>

                {/* <div className="md:w-2/3">
                  <input
                    value={experience}
                    onChange={handleExperience}
                    placeholder="Experience"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                  />
                </div> */}

                <div className="md:w-2/3">

                  <div className="mb-6">
                    <div class="flex space-x-4">
                      <div class="w-1/2 ">
                        <div className="">
                          <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                          <input type="text" id="position" value={position} onChange={handlePosition} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your event name" required />
                        </div>
                      </div>
                      <div class="w-1/2 ">
                        <div>
                          <label htmlFor="companyh-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                          <input type="text" id="companyh-name" value={companyName} onChange={handleMyCompany} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your event name" required />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div class="flex space-x-4">
                      <div class="w-1/2 ">
                        <div className="">
                          <label htmlFor="start-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                          <input type="text" id="start-date" value={startDate} onChange={handleStartDate} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your event name" required />
                        </div>
                      </div>
                      <div class="w-1/2 ">
                        <div>
                          <label htmlFor="end-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                          <input type="text" id="end-date" value={endDate} onChange={handleEndDate} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your event name" required />
                        </div>
                      </div>
                      <div class="w-1/2 ">
                        <div>
                          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                          <input type="text" id="description" value={country} onChange={handleCountry} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your event name" required />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                      <textarea id="description" value={description} onChange={handleDescription} rows={4} className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Describe your event..." required />
                  </div>

                </div>
              </div>
              <button onClick={addExperience} className="primaryBtn btn mt-5">
                Add
              </button>
              {/* <input type="submit" /> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}