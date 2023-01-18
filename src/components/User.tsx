import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { setUser} from '../store/userSlice';
import { RootState } from "../store";

const UserPage = () => {
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //fetch userData
    const fetchUser = async () => {
        const user = await axios.get("http://localhost:3000/api/user")
        dispatch(setUser(user.data))
    }

    useEffect(() => {
        fetchUser();
    },[])


    return (
        <div>
            <div>
                <h1>Account Page</h1>    
                <h2>Welcome {user.username}!!</h2>
                <Link to ={`/`}>Home</Link>
            
        </div>
    </div>
    )

}

export default UserPage;