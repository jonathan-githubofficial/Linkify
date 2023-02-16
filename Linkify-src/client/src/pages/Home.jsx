import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import axios from 'axios'

import '../static/css/index.css'

import { RiSendPlaneFill } from 'react-icons/ri'
import { SlLike } from "react-icons/sl"

import profile_pic from '../static/images/profile.jpg'

import firstFeed from '../static/local_feed'

function Home() {

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

  return (
    
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Linkify</title>
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
            {/* Feed */}
            <div class="w-100 lg:w-2/3">
              <div class="flex flex-col my-auto items-center bgimg bg-cover">
                {firstFeed.map(feed => (
                  <div className="sm:w-2/3 lg:w-4/5 p-5 mb-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-black">
                    
                    <div className="flex items-center justify-left">
                      <div className="flex items-center">
                        <div className='avatar'>
                          <div className="w-10 rounded-full">
                              <img src={profile_pic} />
                          </div>
                        </div>
                        <div className="flex flex-col pl-5">
                            <p className="text-2xl">{feed.name}</p>
                            <span className="text-xs">{feed.occupation}</span>
                            <span className='text-xs'>{feed.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex mt-5">
                      <p className="text-gray-700 text-base">
                        {feed.post}
                      </p>
                    </div>

                    <div className="mt-5">
                      <div className="grid grid-col-2 mb-2">
                        <div class="grid grid-cols-2 gap-2">
                          <div>
                            <div className='flex items-center mb-'>
                              <SlLike />
                              <label className='text-sm pl-2'>
                                {feed.likes}
                              </label>
                            </div>
                          </div>
                          
                          <div className='text-right text-sm'>
                            {feed.comments} Comments
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>

                    <div className="mt-5">
                      <div class="grid grid-cols-10 gap-3">
                        <div class="col-span-9">
                          <input type="text" placeholder="Write Comment..." class="input input-bordered input-sm w-full" />
                        </div>
                        <div className="grid place-items-center">
                          <div>
                            <button className="btn btn-circle btn-sm text-xl">
                                <RiSendPlaneFill />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}

                {/* <div className="w-96 lg:w-[40%] p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-black">
                  <div className="flex items-center justify-left">
                    <div className="flex items-center">
                      <div className='avatar'>
                        <div className="w-10 rounded-full">
                            <img src={profile_pic} />
                        </div>
                      </div>
                      <div className="flex flex-col pl-5">
                          <p className="text-2xl">Khalid Sadat</p>
                          <span className="text-xs">Software Engineer</span>
                          <span className='text-xs'>3h</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex mt-5">
                    <p className="text-gray-700 text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                  </div>

                  <div className="mt-5">
                    <div className="grid grid-col-2 mb-2">
                      <div class="grid grid-cols-2 gap-2">
                        <div>
                          <div className='flex items-center mb-'>
                            <SlLike />
                            <label className='text-sm pl-2'>2</label>
                          </div>
                        </div>
                        
                        <div className='text-right text-sm'>
                          3 Comments
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>

                  <div className="mt-5">
                    <div class="grid grid-cols-10 gap-3">
                      <div class="col-span-9">
                        <input type="text" placeholder="Write Comment..." class="input input-bordered input-sm w-full" />
                      </div>
                      <div className="grid place-items-center">
                        <div>
                          <button className="btn btn-circle btn-sm text-xl">
                              <RiSendPlaneFill />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="w-96 lg:w-[40%] p-5 mt-5 darkbg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-black">
                  <div class="flex items-center justify-left">
                    <div class="flex items-center">
                      <div className='avatar'>
                        <div className="w-10 rounded-full">
                            <img src={profile_pic} />
                        </div>
                      </div>
                      <div class="flex flex-col pl-5">
                          <p class="text-2xl">Team SOEN 390</p>
                          <span class="text-xs">Team Project</span>
                          <span className='text-xs'>3d</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex mt-5">
                    <p className="text-gray-700 text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                  </div>

                  <div className="mt-5">
                    <div className="grid grid-col-2 mb-2">
                      <div class="grid grid-cols-2 gap-2">
                        <div>
                          <div className='flex items-center mb-'>
                            <SlLike />
                            <label className='text-sm pl-2'>40k</label>
                          </div>
                        </div>
                        
                        <div className='text-right text-sm'>
                          3.5k Comments
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>

                  <div className="mt-5">
                    <div class="grid grid-cols-10 gap-3">
                      <div class="col-span-9">
                        <input type="text" placeholder="Write Comment..." class="input input-bordered input-sm w-full" />
                      </div>
                      <div className="grid place-items-center">
                        <div>
                          <button className="btn btn-circle btn-sm text-xl">
                              <RiSendPlaneFill />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div> */}

              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home
