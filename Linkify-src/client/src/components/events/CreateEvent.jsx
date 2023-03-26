// Create event component
// Author: Khalid Sadat
// Date created: March 25, 2023
// Description: Create event component to create a new event

import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet'
import profile_pic from '../../static/images/profile.jpg';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import MyGroupsComponent from "../shared/MyGroupsComponent";

import { RiSendPlaneFill } from 'react-icons/ri';
import { IoCreateOutline } from 'react-icons/io5';
import MyGroups from "../groups/MyGroups";
import Sidebar from "../shared/Sidebar";

export default function CreateEvent() {

    const loggedInUserId = localStorage.getItem("uid");

    // Loading
    const [isLoading, setIsLoading] = useState(true);

    // Group
    const [groups, setGroups] = useState([]);
    const [isCreated, setIsCreated] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(false);

    const handleGroupName = (e) => {
        const group_name = e.target.value;
        setName(group_name);
    }
    
    const handleDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    }

    const handleStatus = (e) => {
        const status = e.target.checked;
        setStatus(status);
    }

    const createGroup = async (e) => {
        e.preventDefault();
        
        var token = 'ewogICAgdXNlcm5hbWU6ICJraGFsaWRAdGVzdC5jb20iLAogICAgcGFzc3dvcmQ6ICJwYXNzMSIKfQ==';
        
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
   
        const newGroup = {name: name, description: description, creator: loggedInUserId, status: status};
        console.log(newGroup);

        await axios.post('/api/groups/createGroup', newGroup, headers)
        .then((res) => {
            console.log("Group created", res);
            setIsCreated(true);
        })
        .catch(err => console.log('Error', err))

        setName("");
        setDescription("");
        setStatus(false);
    }

  return (
    <div className=''>
        <Helmet>
            <meta charSet='utf-8' />
            <title>Create Group</title>
        </Helmet>
        <div class="flex flex-col items-center mt-5">
            <div class="flex-auto w-full md:w-3/4 lg:w-4/5 lg:p-5">
                <div className="flex lg:gap-8">
                    
                    {/* Params: name, skills */}
                    <Sidebar name='Khalid Sadat' />

                    <div className="w-full w-full lg:w-3/4 bg-white relative lg:rounded-t-xl p-5">
                        <div className="flex flex-col justify-between gap-3">
                            <h2 className="flex justify-center text-2xl font-bold md:text-3xl m-12">Create a new event</h2>
                        </div>

                        {isCreated == true && 
                            <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                <span class="font-medium">Event created successfully.</span>
                            </div>
                        }

                        <form>
                            <div className="mb-6">
                                <label htmlFor="group-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" id="group-name" value={name} onChange={handleGroupName} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your group name" required />
                            </div>
                            
                            <div className="relative max-w-sm">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                                </div>
                                <input datepicker datepicker-autohide type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea id="description" value={description} onChange={handleDescription} rows={4} className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Describe your group..." defaultValue={""} />
                            </div>
                            <div className="flex mb-6">
                                <div className="flex items-center h-5">
                                    <input id="status-active" onChange={handleStatus} checked={status} aria-describedby="status-active-text" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                </div>
                                <div className="ml-2 text-sm">
                                    <label htmlFor="status-active" className="font-medium text-gray-900 dark:text-gray-300">Active</label>
                                    <p id="status-active-text" className="text-xs font-normal text-gray-500 dark:text-gray-300">
                                        Active Status: This group will be active and users can join it anytime.
                                    </p>
                                </div>
                            </div>

                            <button onClick={createGroup} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Create
                            </button>
                        </form>

                        <hr className="mt-6 mb-6" />
                        
                        <div className="text-gray-500 text-sm">
                            Note: You will be the owner of this group.
                        </div>
                    </div>

                    

                </div>
            </div>
        </div>
    </div>
  )
}