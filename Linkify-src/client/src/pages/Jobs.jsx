import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import profile_pic from "../static/images/profile.jpg";
import { FaPaperPlane } from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import axios from 'axios'



function Jobs() {

    var email = 'test1@gmail.com';
    const [user, setUser] = useState([]);

    useEffect (() => {
      axios.get('/api/account/userbymail?', {
          params: {email}
      })
          .then(res => {
              setUser(res.data)
          }).catch(err => {
              console.log(err)
          })
    }, [])

    var skills = user.skills;


    const jobData = [
        {
            title: "Software Engineer",
            company: "Microsoft",
            location: "New York City, NY",
            sent: true,
            confirmation: true,
            action: false,
            interview: false,
            offer: false
        },
        {
            title: "Software Engineer",
            company: "Microsoft",
            location: "New York City, NY",
            sent: true,
            confirmation: false,
            action: false,
            interview: false,
            offer: false
        },
        {
            title: "Software Engineer",
            company: "Microsoft",
            location: "New York City, NY",
            sent: true,
            confirmation: true,
            action: false,
            interview: false,
            offer: false
        },
        {
            title: "Software Engineer",
            company: "Microsoft",
            location: "New York City, NY",
            sent: true,
            confirmation: true,
            action: true,
            interview: false,
            offer: false
        }
    ];

    return (
        <div>
            <Helmet>
                <meta charSet='utf-8'/>
                <title>Job Application</title>
            </Helmet>

            <div className='flex flex-col items-center mt-5'>
                <div className='w-full lg:w-2/3'>
                <div class="flex ...">
                    {/* Side Profile Bar */}
                    <div class="flex flex-items items-center hidden lg:block">
                        <div className='w-[15rem]'>
                            <div className="card bg-base-100 shadow-xl p-5">
                            <figure className="px-10 pt-10">
                                <img src={profile_pic} alt="Shoes" className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Khalid Sadat</h2>
                                <div className='side-user-info'>
                                <p>Software Engineer</p>
                                <p>My Company Inc.</p>
                                </div>
                                <hr />
                                <div className="side-user-info items-left italic">
                                <p>Skills:
                                    {skills}
                                </p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    {/* Jobs */}
                    <div class="w-100 lg:w-2/3">
                        <div class="flex flex-col my-auto items-center bgimg bg-cover">
                            {jobData.map((job, index)=> (
                            <div className="sm:w-2/3 lg:w-4/5 items-center text-center p-5 mb-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-black">
                                    <div className='avatar'>
                                        <div className="px-4 py-4 lg:w-60">
                                            <img src={profile_pic} />
                                        </div>
                                    </div>
                                    <div className="card-body text-center items-center">
                                        {/* Your loop here */}
                                        <h2 className="card-title">{job.title}</h2>
                                        <p>{job.company}</p>
                                        <p>{job.location}</p>
                                        <div className="flex flex-row">
                                            <div className="flex flex-col card-actions items-center px-2 pt-10">
                                                <div className="" style={{fontSize: "20px"}}>
                                                    <FaPaperPlane />
                                                </div>
                                                <p className="text-center font-semibold text-sm text-gray-500">
                                                    Sent
                                                </p>
                                                <div className={`h-3 w-20 mb-2 ${
                                                    job.sent ? "bg-blue-500" : "bg-gray-500"
                                                }`}
                                                ></div>

                                            </div>
                                            <div className="flex flex-col card-actions items-center px-2 pt-10">
                                                <div className="" style={{fontSize: "20px"}}>
                                                    <FaCheckCircle/>
                                                </div>
                                                <p className="text-center font-semibold text-sm text-gray-500">
                                                    Confirmation
                                                </p>
                                                <div className={`h-3 w-20 mb-2 ${
                                                    job.confirmation ? "bg-blue-500" : "bg-gray-500"
                                                }`}
                                                ></div>

                                            </div>
                                            <div className="flex flex-col card-actions items-center px-2 pt-10">
                                                <div className="" style={{fontSize: "20px"}}>
                                                    <MdWarning />
                                                </div>
                                                <p className="text-center font-semibold text-sm text-gray-500">
                                                    Action Needed
                                                </p>
                                                <div className={`h-3 w-20 mb-2 ${
                                                    job.action ? "bg-blue-500" : "bg-gray-500"
                                                }`}
                                                ></div>

                                            </div>
                                            <div className="flex flex-col card-actions items-center px-2 pt-10">
                                                <div className="" style={{fontSize: "20px"}}>
                                                    <FaUsers />
                                                </div>
                                                <p className="text-center font-semibold text-sm text-gray-500">
                                                    Interview
                                                </p>
                                                <div className={`h-3 w-20 mb-2 ${
                                                    job.interview ? "bg-blue-500" : "bg-gray-500"
                                                }`}
                                                ></div>

                                            </div>
                                            <div className="flex flex-col card-actions items-center px-2 pt-10">
                                                <div className="" style={{fontSize: "20px"}}>
                                                    <FaStar />
                                                </div>
                                                <p className="text-center font-semibold text-sm text-gray-500">
                                                    Offer
                                                </p>
                                                <div className={`h-3 w-20 mb-2 ${
                                                    job.offer ? "bg-blue-500" : "bg-gray-500"
                                                }`}
                                                ></div>

                                            </div>
                                        </div>
                                    </div>

                            </div>
                            ))}

                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs
