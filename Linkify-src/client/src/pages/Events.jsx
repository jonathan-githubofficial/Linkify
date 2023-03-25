// evnts component
// Author: Khalid Sadat
// Date created: March 20, 2023
// Description: events page that is used for events.

import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet'
import axios from 'axios'
import profile_pic from "../static/images/profile.jpg";

import Sidebar from '../components/shared/Sidebar';
import JobsView from '../components/jobs/JobsView';
import CardSkeleton from '../components/shared/CardSkeleton';

function Events() {
    
    // Loading
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState([]);

    const navigate = useNavigate();
    // checks if user is logged in, if not, redirects to login page
    useEffect(() => {
        if (localStorage.getItem("loggedIn") !== "1") {
            navigate("/login");
        }
    }, []);

    const getEvents = async () => {
        axios.get("/api/events/getAllEvents")
            .then(res => {
                setEvents(res.data)
                setIsLoading(false);

            }).catch(err => {
            console.log(err)
        })
    }

    useEffect (() => {
        getEvents();
    }, [])

    
    
    return (
        <div className=''>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Events</title>
            </Helmet>
            <div class="flex flex-col items-center mt-5">
                <div class="flex-auto w-full md:w-3/4 lg:w-4/5 lg:p-5">
                    <div className="flex lg:gap-8">
                        
                        {/* Params: name, skills */}
                        <Sidebar name='Khalid Sadat' />

                        <div className="w-full w-full lg:w-3/4 bg-white relative lg:rounded-t-xl">
                            <div className="flex flex-col justify-between gap-3">
                                <h2 className="flex justify-center text-2xl font-bold md:text-3xl m-12">List of available events</h2>
                            </div>
                            
                            {isLoading && <CardSkeleton cards={4}/>} 

                            {events.slice(0).reverse().map((event)=> (
                                <div className=" items-center grid gap-5 my-2 md:grid-cols-2 lg:grid-cols-1 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 text-black max-w-screen-xl">
                                    <div className="flex flex-col justify-between gap-3 px-6 py-6 border border-gray-200 lg:flex-row group hover:border-black rounded-xl">
                                        <JobsView event={event} profile_pic={profile_pic} type='events' />
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Events