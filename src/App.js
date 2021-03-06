import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router';

import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import { auth, db } from './firebase';
import DashBoard from './pages/DashBoard';
import Home from './pages/Home';
import Login from './pages/Login';
import Room from './pages/Room';
import SignUp from './pages/SignUp';
import { useAuth } from './state/authState';

const App = () => {
  const setCurrentUser = useAuth((state) => state.setCurrentUser);
  const setAuthUserRef = useAuth((state) => state.setAuthUserRef);
  const setLoading = useAuth((state) => state.setLoading);
  const loading = useAuth((state) => state.loading);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      const ref = db.collection('users').doc(user?.uid);
      setAuthUserRef(ref);
      setLoading(false);
    });
    return unsub;
  }, [setCurrentUser, setAuthUserRef, setLoading]);

  return (
    <>
      {!loading && (
        <>
          <NavBar />
          <Switch>
            <Container>
              <Route path="/" component={Home} exact />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={DashBoard} />
              <PrivateRoute path="/room/:id" component={Room} />
            </Container>
          </Switch>
        </>
      )}
    </>
  );
};

export default App;
