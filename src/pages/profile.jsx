import React, { useEffect, useState } from 'react';
import { Container, Typography, Divider } from '@mui/material';
import UserDetails from '../components/UserDetails';
import ChangePassword from '../components/ChangePassword';
import axios from 'axios';
import Navigation from '../components/Navigation';

const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/auth/profile', { withCredentials: true });
      setUser(res.data.admin);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
    <Navigation />
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>User Profile</Typography>
      <Divider sx={{ mb: 3 }} />
      {user && (
        <>
          <UserDetails user={user} onUpdate={setUser} />
          <ChangePassword />
        </>
      )}
    </Container>
    </>
  );
};

export default Profile;
