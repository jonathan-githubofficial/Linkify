import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import profile_pic from "../static/images/profile.jpg";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import MyConnections from "../components/profile/MyConnections";


const Jobs = () => {
    const navigate = useNavigate();
    const email = localStorage.getItem('email') || '';

    // States related to user and job data
    const [user, setUser] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [jobListings, setJobListings] = useState([]);

    // States related to job search
    const [searchTerm, setSearchTerm] = useState('');

    // States related to job application
    const [cvFile, setCvFile] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [activeJobApplicationId, setActiveJobApplicationId] = useState(null);

    // States related to job detail and job application modals
    const [activeModalId, setActiveModalId] = useState(null);

    // States related to adding a job listing
    const [jobTitle, setJobTitle] = useState('');
    const [jobCompany, setJobCompany] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [jobSalary, setJobSalary] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    // Redirect to login if not logged in
    useEffect(() => {
        if (!localStorage.getItem('loggedIn')) {
            navigate('/login');
        }
    }, []);

    // Fetch user data
    useEffect(() => {
        if (email) {
            axios
                .get('/api/account/userbymail', { params: { email } })
                .then(res => setUser(res.data))
                .catch(err => console.log(err));
        }
    }, [email]);

    // Fetch job data
    useEffect(() => {
        axios
            .get('../api/user/jobPosts/getJobPosts')
            .then(res => setJobs(res.data))
            .catch(err => console.log(err));
    }, []);

    // Toggle body overflow when modal is open
    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', !!activeModalId);
    }, [activeModalId]);

    // Job application functions
    const handleCoverLetterChange = (e) => {
        setCoverLetter(e.target.value);
    };

    const handleApplyJob = async () => {
        if (!cvFile || !coverLetter) {
            alert('Please upload your CV and enter a cover letter before applying');
            return;
        }

        const formData = new FormData();
        formData.append('cv', cvFile);
        formData.append('coverLetter', coverLetter);
        formData.append('jobId', activeJobApplicationId);

        try {
            await axios.post('/api/job-application/submit', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Job application submitted successfully');
            handleCloseJobApplicationModal();
        } catch (error) {
            console.error('Error submitting job application:', error);
            alert('Failed to submit job application');
        }
    };

    const handleOpenJobApplicationModal = (event, jobId) => {
        event.stopPropagation();
        setActiveJobApplicationId(jobId);
        setActiveModalId(null);
    };

    const handleCloseJobApplicationModal = () => {
        setActiveJobApplicationId(null);
        setCvFile(null);
        setCoverLetter('');
    };

    // Job detail modal functions
    const handleOpenModal = (job) => {
        setActiveModalId(job._id);
    };

    const handleCloseModal = () => {
        setActiveModalId(null);
    };
    // Add job listing functions
    const handleInputChange = (e, setState) => {
        setState(e.target.value);
    };

    const handleAddJobListing = async (e) => {
        e.preventDefault();
        try {
            const newJob = {
                title: jobTitle,
                company: jobCompany,
                location: jobLocation,
                salary: jobSalary,
                description: jobDescription,
            };
            const response = await axios.post('/api/user/jobPosts/createJobPost', newJob);
            setJobListings([...jobListings, response.data]);
            setJobTitle('');
            setJobCompany('');
            setJobLocation('');
            setJobSalary('');
            setJobDescription('');
        } catch (error) {
            console.error('Error adding job listing:', error);
        }
    };


    return (

        <div className="w-100">
            <Helmet>
                <meta charSet='utf-8'/>
                <title>Job Application</title>
            </Helmet>

            <div className="flex flex-col items-center mt-5">
                <div className="flex-auto w-full md:w-3/4 lg:w-10/12 lg:p-5">
                    <div className="flex lg:gap-8">
                        <div class="flex flex-items items-center hidden lg:block">
                            <div className="w-[15rem]">
                                <div className="card bg-base-100 shadow-xl p-5">
                                <figure className="px-10 pt-10">
                                    <img src={profile_pic} alt="Shoes" className="rounded-xl" />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">{user.name}</h2>
                                    <div className="side-user-info">
                                    <p>software eng</p>
                                    {/* <p>My Company Inc.</p> */}
                                    </div>
                                    <hr />
                                    <div className="side-user-info items-left">
                                    <p>
                                        <span className="font-semibold">
                                        {/* Skills: <br /> */}
                                        </span>
                                        {/* {user_skills && Object.keys(user_skills).map((skills_txt) => (
                                        <span>{user_skills[skills_txt]}</span>
                                    ))} */}

                                    </p>
                                    {/* {user_skills} */}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        {/* if user is a recruiter*/}
                        {user.isRecruiter === true ? (
                            <div className="w-100">
                                <Helmet>
                                    <meta charSet='utf-8' />
                                    <title>Recruiter Dashboard</title>
                                </Helmet>

                                <div className="w-full w-full lg:w-3/4 bg-white relative lg:rounded-t-xl">
                                    <div className="flex flex-col justify-between gap-3">
                                        <h2 className="text-2xl font-bold md:text-3xl m-12 text-center">Recruiter Dashboard</h2>
                                        {/* Add the recruiter side content here */}
                                        <h3 className="text-xl font-semibold mb-3">Add a New Job Listing</h3>
                                        <form onSubmit={handleAddJobListing} className="space-y-4">
                                            <input
                                                type="text"
                                                placeholder="Job Title"
                                                value={jobTitle}
                                                onChange={(e) => handleInputChange(e, setJobTitle)}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Company"
                                                value={jobCompany}
                                                onChange={(e) => handleInputChange(e, setJobCompany)}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Location"
                                                value={jobLocation}
                                                onChange={(e) => handleInputChange(e, setJobLocation)}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded"
                                            />
                                            <input
                                                type="text"
                                                placeholder={"Salary"}
                                                value={jobSalary}
                                                onChange={(e) => handleInputChange(e, setJobSalary)}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded"
                                            />
                                            <textarea
                                                placeholder="Job Description"
                                                value={jobDescription}
                                                onChange={(e) => handleInputChange(e, setJobDescription)}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded"
                                                rows="4"
                                            ></textarea>
                                            <button
                                                type="submit"
                                                className="w-full p-2 bg-indigo-600 text-white font-semibold rounded"
                                            >
                                                Add Job Post
                                            </button>
                                        </form>

                                        <h3 className="text-xl font-semibold mt-8 mb-3">Your Job Listings</h3>
                                        <div>
                                            {jobListings.map((job) => (
                                                <div key={job._id} className="p-4 mb-4 border border-gray-300 rounded">
                                                    <h4 className="text-lg font-semibold">{job.title}</h4>
                                                    <p className="text-green-500">{job.company}</p>
                                                    <p>{job.location}</p>
                                                    <p>{job.salary}</p>
                                                    <p>{job.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>


                                    </div>

                        ) :
                            //IF USER IS NOT RECRUITER:
                            <div className="w-full w-full lg:w-3/4 bg-white relative lg:rounded-t-xl">

                            <div className="flex flex-col justify-between gap-3">
                                <h2 className="flex justify-center text-2xl font-bold md:text-3xl m-12">Recent Available Jobs</h2>
                                <div className="mb-4 flex gap-x-5 md:gap-x-10 justify-center">
                                    <form>
                                        <div className="flex">
                                            <div className="relative w-full">
                                                <input type="text"
                                                       placeholder="Search jobs..."
                                                       className="rounded-lg w-full py-2 px-4 leading-tight focus:outline-none focus:shadow-outline"
                                                       value={searchTerm}
                                                       onChange={(event) => setSearchTerm(event.target.value)}
                                                       required/>
                                                <button type="submit"
                                                        className="absolute top-0 right-0 p-2 text-sm font-medium text-white bg-indigo-400 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                    <svg aria-hidden="true" className="w-5 h-5" fill="none"
                                                         stroke="currentColor" viewBox="0 0 24 24"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                              stroke-width="2"
                                                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                    </svg>
                                                    <span className="sr-only">Search</span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {jobs
                                .slice(0)
                                .reverse()
                                .filter((job) =>
                                    `${job.title} ${job.company} ${job.location}`
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )
                                .map((job) => (
                                    <div key={job._id} className=" items-center grid gap-5 my-2 md:grid-cols-2 lg:grid-cols-1 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 text-black max-w-screen-xl">
                                        <div onClick={() => handleOpenModal(job)} className="flex flex-col justify-between gap-3 px-6 py-6 border border-gray-200 lg:flex-row group hover:border-black rounded-xl">
                                            <div className="flex flex-col items-start flex-1 gap-5 lg:flex-row">
                                                <div className="w-20">
                                                    <img className={"rounded-lg"} src={profile_pic} alt="Logo"/>
                                                </div>

                                                <div className="flex-1 items-initial lg:text-start">
                                                    <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                                                    <div>
                                                        <span className="text-green-500">{job.company}</span>
                                                        <span className='pl-2 pr-2'>•</span>
                                                        <span className='jobs-salary'>{job.salary}</span>

                                                        <span className='jobs-location'>{job.location}</span>
                                                        <div className='jobs-description pt-5'>
                                                            {job.description.substring(0, 50)} ...
                                                        </div>
                                                    </div>
                                                    <div className='pt-5 text-right'>
                                                        <a onClick={(event) => handleOpenJobApplicationModal(event,job._id)} className="cursor-pointer px-6 py-2 text-white font-semibold duration-150 transform border border-white rounded-full hover:bg-blue-800 bg-indigo-400 group-hover:border-transparent">
                                                            Apply
                                                        </a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                        {/* Modal */}
                                        {activeModalId === job._id && (
                                            <>
                                                {/* Modal container */}
                                                <div className="fixed inset-0 flex items-center justify-center z-10">
                                                    {/* Backdrop */}
                                                    <div className="fixed inset-0 bg-black opacity-50 pointer-events-auto"></div>

                                                    {/* Modal content */}
                                                    <div className="flex flex-col lg:h-3/4 lg:w-1/2 sm:w- bg-white max-w-lg lg:rounded-lg relative h-full ">
                                                        <div className={"flex flex-col h-full pr-6 pl-6 pt-6 justify-between"}>
                                                            <label onClick={handleCloseModal} className="btn btn-sm btn-circle absolute right-2 top-2">
                                                                ✕
                                                            </label>
                                                            <div>
                                                                <img
                                                                    src={profile_pic}
                                                                    className="mt-5 flex w-1/3 mr-auto mb-8 ml-auto rounded-full shadow-xl"
                                                                />
                                                                <p className="text-lg font-semibold">{job.title}</p>
                                                                <p className="text-lg text-green-500 font-semibold mb-2">{job.company}</p>
                                                            </div>
                                                            <div className="flex flex-col overflow-auto">
                                                                <p className="text-left mt-8 text-2xl italic font-semibold text-lg">Description:</p>
                                                                <p className="text-left mt-3 text-base leading-relaxed text-black-200">
                                                                    {job.description}
                                                                </p>
                                                                <p className="text-left mt-8 text-2xl italic font-semibold text-lg">Salary:</p>
                                                                <p className="text-left mt-3 text-base leading-relaxed text-black-200 mb-2">
                                                                    {job.salary}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center justify-center w-full py-5">
                                                                <a
                                                                    onClick={(event) => handleOpenJobApplicationModal(event,job._id)} className="cursor-pointer m-auto text-center w-40 items-center justify-center pt-4 pb-4 font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                >
                                                                    Apply Now
                                                                </a>
                                                            </div>
                                                         </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Job Application Modal */}
                                        {activeJobApplicationId && (
                                            <>
                                                {/* Modal container */}
                                                <div className="fixed inset-0 flex items-center justify-center z-10">
                                                    {/* Backdrop */}
                                                    <div className="fixed inset-0 bg-black opacity-50 pointer-events-auto"></div>

                                                    {/* Modal content */}
                                                    <div className="bg-white w-full sm:max-w-md lg:max-w-lg p-6 my-8 mx-auto rounded-lg shadow-md z-10">
                                                        <div className="flex justify-between items-center">
                                                            <h2 className="text-2xl font-bold">Apply for Job</h2>
                                                            <button onClick={handleCloseJobApplicationModal} className="btn btn-sm btn-circle">
                                                                ✕
                                                            </button>
                                                        </div>
                                                        <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
                                                            <label htmlFor="cv" className="ml-2 block text-sm font-medium text-gray-700">
                                                                Upload CV:
                                                            </label>
                                                            <input
                                                                type="file"
                                                                id="cv"
                                                                name="cv"
                                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                                onChange={(e) => setCvFile(e.target.files[0])}
                                                                required
                                                            />
                                                            <label htmlFor="coverLetter" className="block mt-4 text-sm font-medium text-gray-700">
                                                                Cover Letter:
                                                            </label>
                                                            <textarea
                                                                id="coverLetter"
                                                                name="coverLetter"
                                                                rows="4"
                                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                                value={coverLetter}
                                                                onChange={handleCoverLetterChange}
                                                                required
                                                            ></textarea>
                                                            <button
                                                                type="submit"
                                                                className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                onClick={handleApplyJob}
                                                            >
                                                                Submit Application  </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                ))}

                        </div>}
                        <MyConnections />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs