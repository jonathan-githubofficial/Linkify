import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet'
import axios from 'axios'

import UserProfile from '../components/profile/UserProfile'
import MyConnections from '../components/profile/MyConnections'

function Profile() {
    
    const [profile, setProfile] = useState([])
    const [email, setEmail] = useState([])
    
    var email_s = '';
    
    const navigate = useNavigate();
    // checks if user is logged in, if not, redirects to login page
    useEffect(() => {
        if (localStorage.getItem("loggedIn") !== "1") {
            navigate("/login");
        }
        else {
            // setId(localStorage.getItem("uid"));
            email_s = localStorage.getItem("email");
            // setEmail(localStorage.getItem("email"));
            // email_s = email;
        }
    }, []);
        

    const getUser = async () => {
        axios.get('/api/account/userbymail?', {
            params: {email: email_s}
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
