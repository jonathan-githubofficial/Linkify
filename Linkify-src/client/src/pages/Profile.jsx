import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'

import UserProfile from '../components/profile/UserProfile'
import MyConnections from '../components/profile/MyConnections'

function Profile() {
    // var id = '63e144d738f480e203faffdc';
    // var email = 'test1@gmail.com';
    var email = 'khalid@test.com';

    const [profile, setProfile] = useState([])

    const getUser = () => {
        axios.get('/api/account/userbymail?', {
            params: {email}
        })
        .then(res => {
            setProfile(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect (() => {
        getUser();
    }, [])

    return (
        <div className=''>
            <Helmet>
                <meta charSet='utf-8' />
                <title>User Profile</title>
            </Helmet>
            <div class="flex flex-col items-center mt-5">
                <div class="flex-auto w-full md:w-3/4 lg:w-4/5 lg:p-5">
                    <div className="flex lg:gap-8">

                        <UserProfile user={profile} getUser={getUser} />
                        <MyConnections />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
