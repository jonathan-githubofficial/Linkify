import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import profile_pic from "../static/images/profile.jpg";
import { FaPaperPlane } from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

//add salary (optional)
//description
//PostedBy
//PostedOn
//isExternal?
//externalLink

const Jobs = () => {

    const navigate = useNavigate();

    // checks if user is logged in, if not, redirects to login page
    React.useEffect(() => {
        if (localStorage.getItem("loggedIn") !== "1") {
        navigate("/login");
        }
    }, []);

    const [user, setUser] = useState([]);
    const skills = user && user?.skills;
    const [jobs, setJobs] = useState([]);

    console.log(jobs);


    const getJobs = async () => {
        axios.get("../api/user/jobPosts/getJobPosts")
            .then(res => {
                setJobs(res.data)
            }).catch(err => {
            console.log(err)
        })
    }

    useEffect (() => {
        getJobs();
    }, [])

    return (

        <div className="w-100">
            <Helmet>
                <meta charSet='utf-8'/>
                <title>Job Application</title>
            </Helmet>

            <div className='flex flex-col items-center mt-5'>
                <div className='lg:w-2/3'>
                    <div className="flex">
                        {/* Side Profile Bar */}
                        <div className="flex flex-items items-center hidden lg:block">
                            <div className='w-[15rem]'>
                                <div className="card bg-base-100 shadow-xl">
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
                        <div className="w-100 lg:w-2/3">
                            <div className="flex flex-col my-auto items-center">
                                
                            {jobs.slice(0).reverse().map((job)=> (
                                <div  key={job._id} className="sm:w-2/3 lg:w-4/5 items-center text-center mb-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-black">
                                    <div className='avatar'>
                                        <div className="px-4 py-4 lg:w-60 w-40">
                                            <img src={profile_pic}  alt={"Profile_pic"}/>
                                        </div>
                                    </div>
                                    <div className="card-body text-center items-center">
                                        {/* Your loop here */}
                                        <h2 className="card-title">{job.title}</h2>
                                        <p>{job.company}</p>
                                        <p>{job.location}</p>
                                        <div className="flex flex-col">
                                            <div className="flex flex-row">
                                                <div className="flex flex-col card-actions items-center px-2 pt-10">
                                                    <div className="" style={{fontSize: "20px"}}>
                                                        <FaPaperPlane />
                                                    </div>
                                                    <p className="text-center font-semibold text-sm text-gray-500">
                                                        Sent
                                                    </p>
                                                    <div className={`h-3 w-20 mb-2 ${
                                                        job.status === "Sent" ? "bg-blue-500" : "bg-gray-500"
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
                                                        job.status === "Confirmation" ? "bg-blue-500" : "bg-gray-500"
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
                                                        job.status === "Action" ? "bg-blue-500" : "bg-gray-500"
                                                    }`}
                                                    ></div>
                                                </div>

                                            </div>
                                            <div className="flex flex-row justify-center pt-4">
                                                <div className="flex flex-col card-actions items-center px-2">
                                                    <div className="" style={{fontSize: "20px"}}>
                                                        <FaUsers />
                                                    </div>
                                                    <p className="text-center font-semibold text-sm text-gray-500">
                                                        Interview
                                                    </p>
                                                    <div className={`h-3 w-20 mb-2 ${
                                                        job.status === "Interview" ? "bg-blue-500" : "bg-gray-500"
                                                    }`}
                                                    ></div>

                                                </div>
                                                <div className="flex flex-col card-actions items-center px-2">
                                                    <div className="" style={{fontSize: "20px"}}>
                                                        <FaStar />
                                                    </div>
                                                    <p className="text-center font-semibold text-sm text-gray-500">
                                                        Offer
                                                    </p>
                                                    <div className={`h-3 w-20 mb-2 ${
                                                        job.status === "Offer" ? "bg-blue-500" : "bg-gray-500"
                                                    }`}
                                                    ></div>
                                                </div>
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