import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import axios from 'axios';

const Login = () => {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const onChange = ev => {
        setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
    };

    const loginWithToken = async () => {
        const token = window.localStorage.getItem('token');
        if (token) {
            const response = await axios.get('/api/auth', {
                headers: {
                    authorization: token
                }
            });

            dispatch(setUser(response.data))
        }
    };

    const attemptLogin = async (event) => {
        event.preventDefault();
        const response = await axios.post('/api/auth', credentials);
        const token = response.data;
        window.localStorage.setItem('token', token);

        loginWithToken(token)
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={attemptLogin}>
                <input
                    placeholder='username'
                    value={credentials.username}
                    name='username'
                    onChange={onChange}
                />
                <input
                    placeholder='password'
                    name='password'
                    value={credentials.password}
                    onChange={onChange}
                />
                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;
