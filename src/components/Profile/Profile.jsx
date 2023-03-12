import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';

// name or id get
// display it

function Profile() {
  const { user } = useSelector(userSelector);

  console.log(user);

  return (
    <div>
      <h3>Profile of {user.username} with id - {user.id}</h3>
    </div>
  );
}

export default Profile;
