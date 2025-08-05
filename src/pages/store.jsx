import React, { useContext } from 'react';
import StorePage from '../components/StorePage';
import { AuthContext } from '../context/AuthContext';
import Navigation from '../components/Navigation';

const Store = () => {
  const { user } = useContext(AuthContext); 

  const userRole = user?.role || 'Admin';

  return (
    <>
    <Navigation />
    <StorePage userRole={userRole} />
    </>
  );
};

export default Store;
