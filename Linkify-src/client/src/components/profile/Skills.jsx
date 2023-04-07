// Skills component
// Author: Khalid Sadat
// Date created: March 3, 2023
// Description: Skills component for showing the skills

import React, { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import SkillsModal from "./modal/Skills";
import axios from "axios";

export default function Skills(props) {
  let id = props.id;
  // var user_skills = props.skills;
  const [user_skills, setSkills] = useState([]);
  var userId = localStorage.getItem("uid");
  console.log(userId);

  useEffect(async () => {
    setSkills(await props.skills);
  });

  const removeSkill = async (skillDelete) => {
    try {
      const deleteSkill = {id : userId, skill : skillDelete};
      console.log(userId);
      console.log(skillDelete);
      
      var token = 'ewogICAgdXNlcm5hbWU6ICJraGFsaWRAdGVzdC5jb20iLAogICAgcGFzc3dvcmQ6ICJwYXNzMSIKfQ==';
        
      const headers = {
          'Content-Type': 'application/json; charset=UTF-8',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
      }
  
      
      await axios.delete('/api/user/property/deleteSkill', deleteSkill, headers)
      .then((res) => {
          console.log("Skill deleted", res);
          setIsCreated(true);
      })
      .catch(err => console.log('Error', err))

      

      // if (response.status === 200) {
      //   console.log("Comment removed successfully");
      //   getFeeds(); // Refresh the feeds to show the updated comments
      // }

    } catch (error) {
      console.error("Error removing comment:", error.message);
    }
  };

  return (
    <div className="p-5">
      <div className="grid grid-col-2 mb-2 flex">
        <div class="grid grid-cols-2 gap-2 items-start">
          <div>
            <h1 className="text-xl font-semibold mb-5">Skills</h1>
          </div>
          <div className="flex">
            {props.isOwner && (
              <div style={{ marginLeft: "auto" }}>
                <label htmlFor="skills-modal" className="">
                  <BiPencil className="cursor-pointer text-xl" />
                </label>
              </div>
            )}
          </div>
        </div>
        <SkillsModal id={id} skills={user_skills} getUser={props.getUser} />
        <div className="skills">
          {user_skills && user_skills.length == 0 ? "No skills added" : ""}
          {user_skills &&
            Object.keys(user_skills).map((skills_txt) => (
              <>
              <p className="actualProperty pb-2">&bull; {user_skills[skills_txt]}
                <button onClick={() => removeSkill(user_skills[skills_txt])} className="editProperty pl-2"> 
                  <MdDelete style={{display: 'inherit'}}/>
                </button>
              </p>
              </>
            ))}
          {/* {typeof(user_skills)} */}
        </div>
        <hr className="mt-5" />
      </div>
    </div>
  );
}
