import React from 'react'

import ProfileCover from '../profile/ProfileCover'
import HeadlineTop from '../profile/HeadlineTop'
import Experience from '../profile/Experience'
import Education from '../profile/Education'
import Skills from '../profile/Skills'

export default function UserProfile(props) {
    var profile = props.user;
    let profile_id = profile._id;

    var skills = profile.skills;
    return (
        <div class="w-full lg:w-3/4 bg-white relative lg:rounded-t-xl">
            <ProfileCover user={profile}/>
            <hr/>
            
            <HeadlineTop />
            <hr />
            
            <Experience />

            <Education />

            <Skills id={profile_id} skills={skills} getUser={props.getUser}/>
        </div>
    )
}
