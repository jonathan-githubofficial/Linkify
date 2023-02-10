import React from 'react'
import { Helmet } from 'react-helmet'

import profile_pic from '../static/images/profile.jpg'

function Home() {
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

          {/* Post card */}
          <div className="w-1/2 rounded overflow-hidden shadow-lg mb-10">
              <div className="px-6 py-4">
                <div className='avatar'>
                  <div className="w-10 rounded-full">
                      <img src={profile_pic} />
                  </div>
                </div>
                <div className="font-bold text-xl mb-2">Khalid Sadat</div>
                <div style={{fontSize: "11px"}} className="mb-5">
                  Feb 9, 2023
                </div>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
              </div>
          </div>

          {/* Post card */}
          <div className="w-1/2 rounded overflow-hidden shadow-lg mb-10">
              <div className="px-6 py-4">
                <div className='avatar'>
                  <div className="w-10 rounded-full">
                      <img src={profile_pic} />
                  </div>
                </div>
                <div className="font-bold text-xl mb-2">SOEN 357</div>
                <div style={{fontSize: "11px"}} className="mb-5">
                  Feb 3, 2023
                </div>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#backend</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#bestteam</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
              </div>
          </div>

        </div>
    </div>
  )
}

export default Home
