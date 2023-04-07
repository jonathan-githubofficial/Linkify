// Avatar component
// Author: Jonathan Haddad
// Date created: Apr 1, 2023
// Description: view avatar




import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Avatar = ({ userId }) => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [userName, setUserName] = useState('');

  const fetchAvatar = async () => {
    if (userId) {
      try {
        const res = await axios.get(`/api/account/getUser?id=${userId}`);
        const avatarPath = res.data.avatar;
        const name = res.data.name;
        setAvatarUrl(avatarPath);
        setUserName(name);
      } catch (error) {
        console.error("Error fetching avatar:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, [userId]);

  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  };

  const imageUrl = avatarUrl && `http://localhost:8080/${avatarUrl}`;

  return (
    <div className="w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center text-2xl font-bold text-white">
      {imageUrl ? (
        <img src={imageUrl} alt="Profile Avatar" className="w-24 h-24 rounded-full" />
      ) : (
        getInitials(userName)
      )}
    </div>
  );
};

export default Avatar;
