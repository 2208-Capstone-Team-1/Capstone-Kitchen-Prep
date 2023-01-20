import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AboutPage = () => {
    


    return (
        <div>
            <h1>About Page</h1>
            <p>Chef's Kiss is a kitchen helper application that can help you decide meal of the day based on ingredients in your fridge! </p>
        </div>
    )
}

export default AboutPage;