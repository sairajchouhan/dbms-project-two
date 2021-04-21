import React, { useEffect, useState } from 'react';
import { Form, Spinner, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../state/authState';

const Login = () => {
  const history = useHistory();
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const login = useAuth((state) => state.login);
  const currentUser = useAuth((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) history.push('/dashboard');
  }, [currentUser, history]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (data.email.trim() === '')
      validationErrors.email = 'Email cannot be empty';
    if (data.password.trim() === '')
      validationErrors.password = 'Password cannot be empty';
    if (Object.keys(validationErrors).length > 0)
      return setErrors(validationErrors);

    try {
      setLoading(true);
      await login(data.email, data.password);
      history.push('/dashboard');
    } catch (err) {
      console.log(err.code);
      console.log(err.message);
      console.log('failed to login');
      if (err.code === 'auth/user-not-found') {
        setErrors({ ...errors, email: 'User not found, Signup to continue' });
      }
      if (err.code === 'auth/wrong-password')
        setErrors({ ...errors, password: 'Incorrect password' });
    }
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-center">LogIn</h1>
      <Form
        onSubmit={handleLogin}
        style={{ maxWidth: '40%', margin: '2rem auto' }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={data.email}
            onChange={handleChange}
          />
          {errors.email && (
            <Form.Text className="text-danger">{errors.email}</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />
          {errors.password && (
            <Form.Text className="text-danger">{errors.password}</Form.Text>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          {loading ? <Spinner animation="grow" /> : <span>Submit</span>}
        </Button>
      </Form>
    </>
  );
};

export default Login;
