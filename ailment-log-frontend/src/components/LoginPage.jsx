// src/components/LoginPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

const LoginPage = ({ setIsLoggedin }) => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async (values) => {
            try {
                const response = await login(values);
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);
                setIsLoggedin(true);
                navigate("/");
            } catch (error) {
                console.error("Login Failed", error);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
            />
            <label htmlFor="password">Password</label>
            <input
                id="password"
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
