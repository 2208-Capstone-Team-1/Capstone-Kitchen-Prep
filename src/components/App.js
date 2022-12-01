import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { setUser } from '../store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';

const App = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

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

    useEffect(() => {
        loginWithToken();
    }, []);

    if (!user.id) return <Login />
    return (
        <div>
            <h1>Hi, My name is ben!</h1>
            <div>
                <nav>
                    <Link to='/'>Home</Link>
                </nav>
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
