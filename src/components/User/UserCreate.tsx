import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

// Validation schema using yup, to check is text field entries are valid.
const userSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(3, "Password should be a minimum 3 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    // This is how you look at 'password' and make sure it is the same:
    .oneOf([yup.ref("password"), null], "Passwords should match"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  phoneNumber: yup
    .number()
    .min(10, "Phone number should be at least 10 digits"),
});

const submitButtonStyle = {
  margin: "10px",
  width: "250px",
};

const UserCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // States used for error message display rendering if account creation was successful or not
  const [creationSuccess, setCreationSuccess] = useState(false);
  const [creationFailure, setCreationFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return <div>Hello</div>;
};

export default UserCreate;
