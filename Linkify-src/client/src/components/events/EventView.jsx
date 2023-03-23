// User profile component
// Author: Khalid Sadat
// Date created: March 1, 2023
// Description: User profile components that is responsible for rendering all sub parts such as experience, education, skills, etc.

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { format } from 'date-fns'

import ProfileCover from '../profile/ProfileCover'
import SimilarEvents from './SimilarEvents'

import { BsCalendarDate } from 'react-icons/bs'

export default function EventView() {
    const {eventId} = useParams();
    const [event, setEvent] = useState([]);
    const [profile, setProfile] = useState([]);

    const [event_date, setEventDate] = useState('');

    useEffect(() => {
        axios.get('/api/events/getEventById?', {
            params: {id: eventId}
        })
        .then(res => {
            setEvent(res.data);
        }).catch(err => {
            console.log(err)
        })
    }, []);

    useEffect(() => {
        setEventDate(event.date + "");
    });
    var eventDate = new Date(event_date.split("T")[0]);

    useEffect(() => {
        axios.get('/api/account/getUser?', {
            params: {id: event.creator}
        })
        .then(res => {
            setProfile(res.data);
        }).catch(err => {
            console.log(err)
        })
    }, [event.creator]);
    
    return (
        <div>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Event</title>
            </Helmet>
            <div class="flex flex-col items-center mt-5">
                <div class="flex-auto w-full md:w-3/4 lg:w-4/5 lg:p-5">
                    <div className="flex lg:gap-8">
                        <div class="w-full lg:w-3/4 bg-white relative lg:rounded-t-xl">
                            <ProfileCover name={event.name} position={event.location} type='events'/>
                            <hr/>
                        
                            {/* <div className='p-5'>
                                {event.description}
                            </div> */}
                            <hr />
                            
                            <div class="flex items-center">
                                <div class="w-2/3 mr-2">
                                    <div className='p-5'>
                                        <div className='leading-loose'>
                                            <div className='text-md font-extrabold' style={{color: '#b74700'}}>
                                                {eventDate.toLocaleDateString()}
                                            </div>

                                            <div>
                                                Event by &nbsp;
                                                <span className='font-extrabold' style={{color: '#266DD3'}}>
                                                    {profile.name}
                                                </span>
                                            </div>
                                            <div class="flex items-center">
                                                <div class="w-[16px] mr-2">
                                                    <BsCalendarDate />
                                                </div>
                                                <div class="w-5/6">
                                                    Friday
                                                </div>
                                            </div>
                                            <div>
                                                {2} members
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-1/3 text-right mr-3">
                                    <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                        Join
                                    </button>
                                </div>
                            </div>
                            <hr />
                            
                            <div className='p-5'>
                                {event.description}
                            </div>
                        </div>
                        <SimilarEvents />

                    </div>
                </div>
            </div>
        </div>
    )
}