// My Connections component
// Author: Khalid Sadat
// Date created: March 2, 2023
// Description: Connections component for showing user's connections

import React, { useEffect, useState } from "react";
import { RiSendPlaneFill } from 'react-icons/ri'
import profile_pic from '../../static/images/profile.jpg'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import MyGroupsComponent from "./MyGroupsComponent";

export default function MyGroups() {

    const loggedInUserId = localStorage.getItem("uid");

    // Loading
    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState([]);

    const getMyCreatedGroups = async () => {
        axios.get('/api/groups/myCreatedGroups?', {
            params: {memberId: loggedInUserId}
        })
        .then(res => {
            setGroups(res.data)
            setIsLoading(false);

        }).catch(err => {
        console.log(err)
        })
    }

    useEffect (() => {
        getMyCreatedGroups();
    }, [])

  return (
    <div class="w-1/4 hidden lg:block bg-white p-5 rounded-t-xl">
        <div className='mb-5'>
            <p className='text-lg font-semibold'>
                My Groups <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Owner</span>
            </p>
        </div>
        {groups.slice(0).reverse().map((group)=> (
            <MyGroupsComponent group={group}/>
        ))}

    </div>
  )
}