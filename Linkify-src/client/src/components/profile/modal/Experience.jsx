// experience modal component
// Author: Khalid Sadat
// Date created: March 1, 2023
// Description: experience modal component for adding a new experience

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";

import { BiPencil } from "react-icons/bi";

export default function Experience(props) {
  // let profile_id = props.id;
  let id = "63eabb9c07f2dc10446a1c7c";
  var experiences = props.experiences;

  const [experience, setExperience] = useState("");

  const handleExperience = (e) => {
    const new_experience = e.target.value;
    console.log(new_experience);
    setExperience(new_experience);
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

    const newExperience = { id: id, experience: experience };
    console.log(newExperience);

    await axios
      .post("/api/user/property/addExperience", newExperience, headers)
      .then((res) => {
        console.log("Adding", res);
        props.getUser();
      })
      .catch((err) => console.log("Error", err));

    setExperience("");
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
                <p className="mb-5">
                  Separate each field by comma:&nbsp;
                  <div className="italic text-sm">
                    position, company_name, start - end, country, description
                  </div>
                </p>

                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-full-name"
                  >
                    New Experience
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    value={experience}
                    onChange={handleExperience}
                    placeholder="Experience"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                  />
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
