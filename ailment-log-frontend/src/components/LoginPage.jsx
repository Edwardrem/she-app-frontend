// src/components/LoginPage.jsx

import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async (values) => {
      try {
        const response = await login(values);
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        setIsLoggedIn(true);
        navigate('/');
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="username"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      <input
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
