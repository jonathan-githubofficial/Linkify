{jobData.map((job, index) => (
    <div key={index} className="flex flex-row w-1/2 rounded items-center overflow-x-auto shadow-lg mb-10">
                        <div className='avatar'>
                            <div className="px-4 py-4">
                                <img src={profile_pic} />
                            </div>
                        </div>
                        <div className="px-4 py-4">
                            <div className="font-bold text-xl text">{job.title}</div>
                            <div style={{ fontSize: "11px" }} className="mb-5">
                                {job.company}
                                <p className="text-gray-700 italic">{job.location}</p>
                            </div>
                        </div>
                        <div className="px-6 pt-4 pb-2 flex flex-row">
                            <div className="text-center flex-column mr-8">
                                <div className="btn btn-ghost btn-circle" style={{fontSize: "20px"}}>
                                    <FaPaperPlane />
                                </div>
                                <div className={`h-3 w-20 mb-2 ${
                                        job.sent ? "bg-blue-500" : "bg-gray-500"
                                    }`}
                                ></div>
                                <p className="text-center font-semibold text-sm text-gray-500">
                                    Sent
                                </p>
                            </div>
                            <div className="text-center flex-column mr-8">

                                <div className="btn btn-ghost btn-circle" style={{fontSize: "20px"}}>
                                    <FaCheckCircle/>
                                </div>

                                <div
                                    className={`h-3 w-20 mb-2 ${
                                        job.confirmation ? "bg-blue-500" : "bg-gray-500"
                                    }`}
                                ></div>
                                <p className="text-center font-semibold text-sm text-gray-500">
                                    Confirmation
                                </p>
                            </div>
                            <div className="text-center flex-column mr-8">

                                <div className="btn btn-ghost btn-circle" style={{fontSize: "20px"}}>
                                    <MdWarning />
                                </div>

                                <div
                                    className={`h-3 w-20 mb-2 ${
                                        job.action ? "bg-blue-500" : "bg-gray-500"
                                    }`}
                                ></div>
                                <p className="text-center font-semibold text-sm text-gray-500">
                                    Action Needed
                                </p>
                            </div>
                            <div className="text-center flex-column mr-8">

                                <div className="btn btn-ghost btn-circle" style={{fontSize: "20px"}}>
                                    <FaUsers />
                                </div>
                                <div
                                    className={`h-3 w-20 mb-2 ${
                                        job.interview ? "bg-blue-500" : "bg-gray-500"
                                    }`}
                                ></div>
                                <p className="text-center font-semibold text-sm text-gray-500">
                                    Interview
                                </p>
                            </div>

                            <div className="text-center flex-column mr-2">

                                <div className="btn btn-ghost btn-circle" style={{fontSize: "20px"}}>
                                    <FaStar />
                                </div>
                                <div
                                    className={`h-3 w-20 mb-2 ${
                                        job.offer ? "bg-blue-500" : "bg-gray-500"
                                    }`}
                                ></div>
                                <p className="text-center font-semibold text-sm text-gray-500">
                                    Offer
                                </p>
                            </div>
                        </div>
                    </div>

))}