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
  const setAuthUserRefValues = useAuth((state) => state.setAuthUserRefValues);
  const setLoading = useAuth((state) => state.setLoading);
  const authUserRefValues = useAuth((state) => state.authUserRefValues);
  const loading = useAuth((state) => state.loading);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      const ref = db.collection('users').doc(user?.uid);
      db.collection('users')
        .doc(user?.uid)
        .get()
        .then((doc) => {
          setAuthUserRef(ref);
          setAuthUserRefValues(doc.data());
          setLoading(false);
        })
        .catch((err) => {
          console.log('error in App.js');
        });
    });
    return unsub;
  }, [setCurrentUser, setAuthUserRef, setLoading, setAuthUserRefValues]);

  return (
    <>
      {!loading && Object.keys(authUserRefValues).length > 0 && (
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
