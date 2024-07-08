// src/components/RegistrationPage.jsx

import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { register, login } from '../api';

const RegistrationPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      first_name: '',
      last_name: ''
    },
    onSubmit: async (values) => {
      try {
        await register(values);
        const loginResponse = await login({
          username: values.username,
          password: values.password
        });
        localStorage.setItem('access_token', loginResponse.data.access);
        localStorage.setItem('refresh_token', loginResponse.data.refresh);
        setIsLoggedIn(true);
        navigate('/');
      } catch (error) {
        console.error('Registration failed', error);
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
      <input
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <input
        name="first_name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.first_name}
      />
      <input
        name="last_name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.last_name}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationPage;
