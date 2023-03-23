// My Connections component
// Author: Khalid Sadat
// Date created: March 2, 2023
// Description: Connections component for showing user's connections

import React from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'
import profile_pic from '../../static/images/profile.jpg'

export default function SimilarEvents() {

  return (
    <div class="w-1/4 hidden lg:block bg-white p-5 rounded-t-xl">
        <div className='mb-5'>
            <p className='text-lg font-semibold'>
                Events near by
            </p>
        </div>
        <div className="flex justify-left mt-2 mb-3">
            <div className="flex items-start">
                <div className="flex flex-col">
                    <p className="lg:text-md font-semibold">Concordia Hackathon Session</p>
                    <span className="text-sm">Concordia University</span>
                    <button className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3">
                        View
                    </button>
                </div>
            </div>
        </div>
        <hr />

    </div>
  )
}