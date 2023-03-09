import React from 'react';
import { Helmet } from 'react-helmet'

import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

// import Post from './Post/Post';
// import useStyles from './styles';

const Profile = ({ setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result.googleId || user?.result?._id;
//   const { posts, isLoading } = useSelector((state) => state.posts);
//   const classes = useStyles();

//   if (!posts.length && !isLoading) return 'No posts';

    return (
        <div className=''>
            <Helmet>
                <meta charSet='utf-8' />
                <title>User Profile</title>
            </Helmet>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;
