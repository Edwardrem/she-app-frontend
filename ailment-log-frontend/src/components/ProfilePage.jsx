// src/components/ProfilePage.jsx

import React, { useEffect, useState } from 'react';
import { fetchProfile } from '../api';

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [ailments, setAilments] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profileResponse = await fetchProfile();
        setProfile(profileResponse.data);

        const ailmentsResponse = await api.get(`/profiles/${profileResponse.data.id}/ailments/`);
        setAilments(ailmentsResponse.data);
      } catch (error) {
        console.error('Fetching profile failed', error);
      }
    };

    getProfile();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p>Full Name: {profile.first_name} {profile.last_name}</p>
      <p>Email: {profile.email}</p>
      <p>Department: {profile.department}</p>
      <p>Job Title: {profile.job_title}</p>
      <p>Phone Number: {profile.phone_number}</p>
      <h2>Logged Ailments</h2>
      <ul>
        {ailments.map((ailment) => (
          <li key={ailment.id}>
            {ailment.date} - {ailment.ailment} - {ailment.department}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
