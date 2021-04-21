import React, { useEffect } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../state/authState';

const Home = () => {
  const currentUser = useAuth((state) => state.currentUser);
  const history = useHistory();
  useEffect(() => {
    if (currentUser) history.push('/dashboard');
  }, [currentUser, history]);
  return (
    <div className="mt-5">
      <Jumbotron>
        <h1>DBMS phase two project</h1>
        <p>
          This is a simple chat application where you can join rooms and hangout
          with peers
        </p>
        <p>
          <Button variant="primary" as={Link} to="/login" className="mt-3">
            Login to kickstart !
          </Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default Home;
