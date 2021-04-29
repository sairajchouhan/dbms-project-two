import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../state/authState';

const NavBar = () => {
  const h = useHistory();
  const currentUser = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);
  const handleLogout = () => {
    logout();
    h.push('/');
  };
  return (
    <Navbar bg="light" expand="md" className="px-5">
      <Navbar.Brand as={Link} to="/">
        DBMS phase two project
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {currentUser ? (
            <>
              <Nav.Link>{currentUser.displayName}</Nav.Link>
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
