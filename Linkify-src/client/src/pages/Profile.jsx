import React, { useEffect, useState } from 'react'

import { PaperClipIcon } from '@heroicons/react/20/solid'
import { BiPencil } from 'react-icons/bi'
import { RiSendPlaneFill } from 'react-icons/ri'

import { Helmet } from 'react-helmet'
import axios from 'axios'

import EditProfile from './profile_views/EditProfile'
import profile_pic from '../static/images/profile.jpg'
import profile_cover from '../static/images/profile-cover.png'

import google_icon from '../static/images/companies/google.png'

import concordia_icon from '../static/images/education/concordia.png'
import vanier_icon from '../static/images/education/vanier.png'

import localExperiences from '../static/local_experience'
import localEducation from '../static/local_education'

function Profile() {
    // var id = '63e144d738f480e203faffdc';
    // var email = 'test1@gmail.com';
    var email = 'khalid@test.com';

    const [profile, setProfile] = useState([])

    useEffect (() => {
        axios.get('/api/account/userbymail?', {
            params: {email}
        })
            .then(res => {
                setProfile(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    var first_job = profile.jobs;
    console.log(profile.skills);

    return (
        <div className=''>
            <Helmet>
                <meta charSet='utf-8' />
                <title>User Profile</title>
            </Helmet>
            <div class="flex flex-col items-center mt-5">
                <div class="flex-auto w-full md:w-3/4 lg:w-4/5 lg:p-5">
                    <div className="flex lg:gap-8">
                        {/* Profile */}
                        <div class="w-full lg:w-3/4 bg-white relative lg:rounded-t-xl">
                            {/* Cover Picture with Name */}
                            <div class="">
                                <img src={profile_cover} className='lg:rounded-t-xl'/>
                                <div class="absolute top-[0rem] sm:top-[1.4 rem] lg:top-[1rem] lg:left-[8rem] px-4 py-2">
                                    <h3 class="text-[1.4rem] sm:text-[2rem] lg:text-[3rem] text-white font-bold">
                                        {profile.name}
                                    </h3>
                                    <p class="mt-0 lg:mt-2 text-[0.8rem] lg:text-lg text-gray-300">
                                        Software Engineer | My Company Inc.
                                    </p>
                                </div>
                            </div>
                            <hr/>
                            
                            {/* Top */}
                            <div className='p-5'>
                                <div className="grid grid-col-2 mb-2 flex">
                                    <div class="grid grid-cols-2 gap-2 items-center">
                                        <div>
                                            <div className='flex items-center'>
                                                <img src={google_icon} className='w-6' alt="" />
                                                <label className='text-md pl-2 font-semibold'>
                                                    Google Inc.
                                                </label>
                                            </div>
                                            <div>
                                                <p className='primaryGray text-[0.8rem] mt-2'>
                                                    Laval, Quebec, Canada
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className='text-right text-sm'>
                                            <button className="primaryBtn btn btn-sm bg-sky-400 font-light">Connect</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            
                            {/* Experience */}
                            <div className='p-5'>
                                <h1 className='text-xl font-semibold mb-5'>Experience</h1>
                                {localExperiences.map(experience => (
                                    <div>
                                        <div className="flex justify-left mt-2">
                                            <div className="flex items-start">
                                                <div className='avatar'>
                                                    <div className="w-12">
                                                        <img src={experience.company_logo} />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col pl-5">
                                                    <p className="text-lg lg:text-xl">{experience.position}</p>
                                                    <span className="text-sm">{experience.company}</span>
                                                    <span className='text-xs mt-1'>{experience.startDate} - {experience.endDate}</span>
                                                    <span className='text-xs mt-1'>
                                                        United States
                                                    </span>
                                                    <div className='mt-2'>
                                                        <p className='text-s'>
                                                            - Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                                                        </p>
                                                        <p>
                                                            - Voluptatibus quia, nulla! Maiores et perferendis eaque.
                                                        </p>
                                                        <p>
                                                            - Exercitationem praesentium nihil.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='mt-5' />
                                    </div>
                                ))}
                            </div>

                            {/* Education */}
                            <div className='p-5'>
                                <h1 className='text-xl font-semibold mb-5'>Education</h1>
                                {localEducation.map(education => (
                                    <div>
                                        <div className="flex justify-left mt-2">
                                            <div className="flex items-start">
                                                <div className='avatar'>
                                                    <div className="w-12">
                                                        <img src={education.school_logo} className='eduLogo' />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col pl-5">
                                                    <p className="text-lg lg:text-xl">{education.school_name}</p>
                                                    <span className="text-sm">{education.degree}</span>
                                                    <span className='text-xs mt-1'>{education.startDate} - {education.endDate}</span>

                                                    <div className='mt-2'>
                                                        <p className='text-s'>
                                                            - {education.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='mt-5' />
                                    </div>

                                    
                                ))}
                            </div>

                            
                        </div>

                        {/* My Connections */}
                        <div class="w-1/4 hidden lg:block bg-white p-5 rounded-t-xl">
                            <div className='mb-5'>
                                <p className='text-lg font-semibold'>
                                    My Connections
                                </p>
                            </div>
                            <div className="flex justify-left mt-2 mb-3">
                                <div className="flex items-start">
                                    <div className='avatar'>
                                        <div className="w-12 rounded-full">
                                            <img src={profile_pic} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col pl-5">
                                        <p className="lg:text-md font-semibold">Ayeshah</p>
                                        <span className="text-sm">Software Engineer</span>
                                        <button className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3">
                                            <RiSendPlaneFill /> &nbsp; Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div className="flex justify-left mt-2 mb-3">
                                <div className="flex items-start">
                                    <div className='avatar'>
                                        <div className="w-12 rounded-full">
                                            <img src={profile_pic} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col pl-5">
                                        <p className="lg:text-md font-semibold">Mohamad</p>
                                        <span className="text-sm">Software Engineer</span>
                                        <button className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3">
                                            <RiSendPlaneFill /> &nbsp; Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div className="flex justify-left mt-2 mb-3">
                                <div className="flex items-start">
                                    <div className='avatar'>
                                        <div className="w-12 rounded-full">
                                            <img src={profile_pic} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col pl-5">
                                        <p className="lg:text-md font-semibold">Nadine</p>
                                        <span className="text-sm">Software Engineer</span>
                                        <button className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3">
                                            <RiSendPlaneFill /> &nbsp; Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div className="flex justify-left mt-2 mb-3">
                                <div className="flex items-start">
                                    <div className='avatar'>
                                        <div className="w-12 rounded-full">
                                            <img src={profile_pic} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col pl-5">
                                        <p className="lg:text-md font-semibold">Saad</p>
                                        <span className="text-sm">Software Engineer</span>
                                        <button className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3">
                                            <RiSendPlaneFill /> &nbsp; Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div className="flex justify-left mt-2 mb-3">
                                <div className="flex items-start">
                                    <div className='avatar'>
                                        <div className="w-12 rounded-full">
                                            <img src={profile_pic} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col pl-5">
                                        <p className="lg:text-md font-semibold">Jonnathan</p>
                                        <span className="text-sm">Software Engineer</span>
                                        <button className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3">
                                            <RiSendPlaneFill /> &nbsp; Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div className="flex justify-left mt-2 mb-3">
                                <div className="flex items-start">
                                    <div className='avatar'>
                                        <div className="w-12 rounded-full">
                                            <img src={profile_pic} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col pl-5">
                                        <p className="lg:text-md font-semibold">Hadi</p>
                                        <span className="text-sm">Software Engineer</span>
                                        <button className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3">
                                            <RiSendPlaneFill /> &nbsp; Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div className="flex justify-left mt-2 mb-3">
                                <div className="flex items-start">
                                    <div className='avatar'>
                                        <div className="w-12 rounded-full">
                                            <img src={profile_pic} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col pl-5">
                                        <p className="lg:text-md font-semibold">Daria</p>
                                        <span className="text-sm">Software Engineer</span>
                                        <button className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3">
                                            <RiSendPlaneFill /> &nbsp; Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div className="flex justify-left mt-2 mb-3">
                                <div className="flex items-start">
                                    <div className='avatar'>
                                        <div className="w-12 rounded-full">
                                            <img src={profile_pic} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col pl-5">
                                        <p className="lg:text-md font-semibold">Jean</p>
                                        <span className="text-sm">Software Engineer</span>
                                        <button className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3">
                                            <RiSendPlaneFill /> &nbsp; Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
