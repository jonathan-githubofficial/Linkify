// My Connections component
// Author: Khalid Sadat
// Date created: March 2, 2023
// Description: Connections component for showing user's connections

import React, { useEffect, useState } from "react";
import { RiSendPlaneFill } from 'react-icons/ri'
import profile_pic from '../../static/images/profile.jpg'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export default function MyGroupsComponent(props) {
    const  [group, setGroup] = useState([]);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect (() => {
        var group = props.group;
        setId(group._id);
        setTitle(group.name);
        setDescription(group.description);
    })

    var yourString = "The quick brown fox jumps over the lazy dog"; //replace with your string.
    var maxLength = 40 // maximum number of characters to extract

    //trim the string to the maximum length
    var trimmedString = description.substring(0, maxLength);

    //re-trim if we are in the middle of a word
    trimmedString = trimmedString.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

  return (
    <>
    <div className="flex justify-left mt-2 mb-3">
            <div className="flex items-start">
                <div className="flex flex-col">
                    <p className="lg:text-md font-semibold">{title}</p>
                    <span className="text-sm mt-2">
                        {trimmedString} ...
                    </span>
                    <Link to={`/group/${id}`} className='whiteBtn btn btn-sm bg-sky-400 font-light mt-3'>
                        View
                    </Link>
                </div>
            </div>
        </div>
        <hr />
    </>
  )
}