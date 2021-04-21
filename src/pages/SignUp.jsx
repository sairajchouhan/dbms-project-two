import React, { useEffect, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { validateInputs } from '../utils/validators';
import { db } from '../firebase';
import { useAuth } from '../state/authState';

const SignUp = () => {
  const history = useHistory();
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const signup = useAuth((state) => state.signup);
  const currentUser = useAuth((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) history.push('/dashboard');
  }, [currentUser, history]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(data);

    const validationErrors = validateInputs(data);
    if (Object.keys(validationErrors).length > 0)
      return setErrors(validationErrors);

    try {
      setErrors({});
      setLoading(true);

      const qs = await db
        .collection('users')
        .where('username', '==', data.username)
        .limit(1)
        .get();

      if (!qs.empty) {
        setLoading(false);
        return setErrors({ ...errors, username: 'Username is taken' });
      }

      const { user } = await signup(data.email, data.password);
      user.updateProfile({ displayName: data.username });

      db.collection('users')
        .doc(user.uid)
        .set({ email: data.email, username: data.username })
        .then(() => console.log('recorded in firestore'))
        .catch((err) => {
          console.log(err.message);
          console.log(err.code);
          console.log('error in recording signup info to firestore');
        });
      history.push('/dashboard');
    } catch (err) {
      console.log(err.code);
      console.log(err.message);
      if (err.code === 'auth/email-already-in-use')
        setErrors({ ...errors, email: err.message });
    }
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-center">SignUp</h1>
      <Form
        onSubmit={handleSignup}
        style={{ maxWidth: '40%', margin: '2rem auto' }}
      >
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={data.username}
            onChange={handleChange}
            name="username"
          />
          {errors.username && (
            <Form.Text className="text-danger">{errors.username}</Form.Text>
          )}
        </Form.Group>
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

export default SignUp;
