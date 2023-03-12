// Profile cover component
// Author: Khalid Sadat
// Date created: March 3, 2023
// Description: Project cover component for showing the the profile cover

import React, { useEffect, useState } from 'react'
import profile_cover from '../../static/images/profile-cover.png'

export default function ProfileCover(props) {
    var name = props.name;
    var position = props.position;
    var company = props.company;

    var pos_comp = ((position == '') && (company == '') ? '' : (position + ' | ' + company));
    
    return (
        <div>
            <img src={profile_cover} className='lg:rounded-t-xl'/>
            <div class="absolute top-[0rem] sm:top-[1.4 rem] lg:top-[1rem] lg:left-[8rem] px-4 py-2">
                <h3 class="text-[1.4rem] sm:text-[2rem] lg:text-[3rem] text-white font-bold">
                    {name}
                </h3>
                <p class="mt-0 lg:mt-2 text-[0.8rem] lg:text-lg text-gray-300">
                    {pos_comp}
                </p>
            </div>
        </div>
    )
}
