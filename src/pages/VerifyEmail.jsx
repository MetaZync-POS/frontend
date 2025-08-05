import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Adjust path if needed
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext'; // Adjust path if needed

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get('token');

      if (!token) {
        toast.error("No token provided");
        navigate('/');
        return;
      }

      try {
        const res = await axios.get(`/auth/verify-email?token=${token}`);
        toast.success("Email verified successfully!");

        // Save user data 
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });
        localStorage.setItem('studentToken', res.data.token);

        setVerified(true);

        setTimeout(() => {
          navigate('/');
        }, 2500);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Verification failed");
        setTimeout(() => {
          navigate('/');
        }, 0);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [searchParams, navigate, dispatch]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: '#000',
        color: '#0cb085',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      {loading ? (
        <h2>Verifying your email...</h2>
      ) : verified ? (
        <>
          <h2>Email Verified!</h2>
          <p>Redirecting you to the login page...</p>
        </>
      ) : (
        <>
          <h2>Verification Failed</h2>
          <p>Please try registering again.</p>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
