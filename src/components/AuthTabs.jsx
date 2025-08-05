import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { motion } from 'framer-motion';

const AuthTabs = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (_, newValue) => setTab(newValue);

  return (
    <Box>
      <Tabs value={tab} onChange={handleChange} centered sx={{
          mb: 3,
          '& .MuiTabs-indicator': {
            backgroundColor: '#0cb085ff',
          },
        }} >
        <Tab label="Login" sx={{
            color: 'white',
            '&.Mui-selected': {
              color: '#0cb085ff',
              fontWeight: 'bold',
            },
          }} />
        <Tab label="Register" sx={{
            color: 'white',
            '&.Mui-selected': {
              color: '#0cb085ff',
              fontWeight: 'bold',
            },
          }} />
      </Tabs>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}

      >
        {tab === 0 ? <LoginForm /> : <RegisterForm />}
      </motion.div>
    </Box>
  );
};

export default AuthTabs;
