import React from 'react'
import { Helmet } from 'react-helmet'

import { RiSendPlaneFill } from 'react-icons/ri'
import { SlLike } from "react-icons/sl"

import profile_pic from '../static/images/profile.jpg'

import firstFeed from '../static/local_feed'

function Home() {
  const feed_length = Object.keys(firstFeed).length;
  
  var feeds = function() {
    var result = [];

    // for (var i = 0; i < firstFeed.length; i++) {
    //   let name = firstFeed[i].name;
    //   let occupation = firstFeed[i].occupation;
    //   let date = firstFeed[i].date;
    //   let post = firstFeed[i].post;
    //   let like = firstFeed[i].like;
    //   let comment = firstFeed[i].comment;

      
    // }
    
    // return firstFeed.map(c => c.name);
    var res = "<div>";
    for(var i = 0; i < firstFeed.length; i++) {
      res += "<h1>" + firstFeed[i].name + "</h1>";
    }
    res += "</div>";

    document.getElementById("feed_result").innerHTML = res;
  }

  

  return (
    
    <div >
      <Helmet>
        <meta charSet='utf-8' />
        <title>Linkify</title>
      </Helmet>
  
      <div class="flex flex-col h-screen my-auto items-center bgimg bg-cover">
        <div className='text-base'>
          {/* Welcome, Khalid */}
        </div>
        {firstFeed.map(feed => (
          <div className="w-96 lg:w-[40%] p-5 mt-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-black">
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
  )
}

export default Home
