import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../state/authState';

const Home = () => {
  const currentUser = useAuth((state) => state.currentUser);
  const history = useHistory();
  useEffect(() => {
    if (currentUser) history.push('/dashboard');
  }, [currentUser, history]);
  return <div style={{background: 'red'}}>this is home</div>;
};

export default Home;
