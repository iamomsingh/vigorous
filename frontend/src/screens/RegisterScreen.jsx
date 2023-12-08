import React, {useState, useEffect} from 'react';
import { Form, Row, Col, Button} from "react-bootstrap";
import FormContainer from '../components/FormContainer';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {useRegisterMutation} from '../slices/usersApiSlice';
import { setCredentials } from "../slices/authSlice";
import {toast} from 'react-toastify';

const RegisterScreen = () => {
  const [name, setName ] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector( (state) => state.auth);

  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/login';

  useEffect(() => {
    if (userInfo) {
        navigate(redirect);
    }
}, [userInfo, redirect, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('password do not match');
            return;
        } else {
            try {
                const res = await register({name, email, password}).unwrap();
                dispatch(setCredentials(...res));
                navigate(redirect);
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }

  };
  
  return (
    <FormContainer>
      <h1>Sign Up</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username" className="my-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2">
          Register
        </Button> 
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account? <Link to={'/login'}>Login</Link>
        </Col>
      </Row>  
    </FormContainer>
  )
};

export default RegisterScreen;