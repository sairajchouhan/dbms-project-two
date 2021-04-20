import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Container>
          <Route path="/" component={Home} exact />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </Container>
      </Switch>
    </div>
  );
};

export default App;
