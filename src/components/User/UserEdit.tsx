import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setUser } from '../../store/userSlice';
import "./user.css";

const UserEdit = () => {

    const { user } = useSelector((state: RootState) => state.user);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const id = user.id;
    const [first_name, setfirst_name] = useState(user.first_name);
    const [last_name, setLast_name] = useState(user.last_name);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

    const firstnameHandler = (event: any) => {
        setfirst_name(event.target.value);
    }
    const lastnameHandler = (event: any) => {
        setfirst_name(event.target.value);
    }
    const phoneNumberHandler = (event: any) => {
        setfirst_name(event.target.value);
    }

    const updateHandler = async (event: any) => {
        try {
            event.preventDefault();
            const update = {first_name, last_name, phoneNumber};
            await axios.put(`/api/users/${id}`, update);
            const userData = await axios.get(`/api/user/${id}`);
            console.log(userData.data)
            dispatch(setUser(userData.data));
        } catch (error) {
            console.log(error)
        }
    }

    const loader = () =>{
        setLoading(true);
    }

    useEffect(()=>{
        loader();
    }, [])

    if(!loading){ return( <div>Ooops! Something went wrong!</div>)}

    return (
        <div className='userEdit_body'>
            <h1 className='userEdit_h1'>Account Profile</h1>
            <p>Please edit your profile here</p>
            <div className='userEdit_formbody'>
                <form className='userEdit_form'>
                <label>First Name</label>
                <input value={first_name} onChange={firstnameHandler} />
                <label>Last Name</label>
                <input value={last_name} onChange={lastnameHandler} />
                <label>Phone Number</label>
                <input value={phoneNumber} onChange={phoneNumberHandler} />
                <button type='submit' className='submit_button'>Save</button>
                </form>
            </div>
        </div>
    );
};

export default UserEdit;