import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { setUser } from "../../store/userSlice";
import { Box } from "@mui/system";
import { Alert, TextField } from "@mui/material";

// Validation schema using yup, to check is text field entries are valid.
const validationSchema = yup.object().shape({
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

  const formik = useFormik({
    // Initializes our formik.values object to have these key-value pairs.
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      first_name: "",
      last_name: "",
      phoneNumber: "",
    },
    // Give it our yup validationSchema
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      // Update Backend: axios post req to User
      try {
        // On backend, the req.body cannot contain confirmPassword because it breaks sequelize.
        // So limit what we went back, here.
        const bodyToSubmit = {
          email: values.email,
          password: values.password,
          first_name: values.first_name,
          last_name: values.last_name,
          phoneNumber: values.phoneNumber,
        };
        console.log(bodyToSubmit);
        // createdUser from DB
        const createdUser = await axios.post("/api/users", bodyToSubmit);
        const userId = createdUser.data.id;

        //************************* AUTO LOGIN with new account info ********************************* */

        // Get/Create token for this login session
        const credentials = {
          email: values.email,
          password: values.password,
        };
        const response = await axios.post("/api/auth", credentials);
        const token = response.data;
        window.localStorage.setItem("token", token);

        setCreationSuccess(true);

        setTimeout(() => {
          // Dispatch user to the one just made
          // This goes in here to prevent the current URL from prematurely showing '404 you are already logged in!'
          dispatch(setUser(createdUser.data));
          navigate("/");
        }, 3000);
      } catch (err) {
        // For typescript, we need to define an unknown error
        let message = "Unknown error";
        // if err is a known instance of Error, then set the message to that error
        if (err instanceof Error) message = err.message;
        // Change state - If account creation failed (eg, an acct with that username already exists)
        setCreationFailure(true);
        setErrorMessage(message); // Give the error message from our api's res.send to our mui alert's text body
      }
    },
  });
  return (
    <div>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box margin={1}>
          <TextField
            name="email"
            type="email"
            label="Email*"
            variant="outlined"
            sx={{ width: "350px" }}
            value={formik.values.email || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>

        <Box margin={1}>
          <TextField
            name="password"
            type="password"
            label="Password*"
            variant="outlined"
            sx={{ width: "350px" }}
            value={formik.values.password || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>

        <Box margin={1}>
          <TextField
            name="confirmPassword"
            type="password"
            label="Confirm Password*"
            variant="outlined"
            sx={{ width: "350px" }}
            value={formik.values.confirmPassword || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </Box>

        <Box margin={1}>
          <TextField
            name="first_name"
            type="first_name"
            label="First Name*"
            variant="outlined"
            sx={{ width: "350px" }}
            value={formik.values.first_name || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.first_name && Boolean(formik.errors.first_name)
            }
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
        </Box>

        <Box margin={1}>
          <TextField
            name="last_name"
            type="last_name"
            label="Last Name*"
            variant="outlined"
            sx={{ width: "350px" }}
            value={formik.values.last_name || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />
        </Box>
        <Box margin={1}>
          <TextField
            name="phoneNumber"
            type="phoneNumber"
            label="Phone Number*"
            variant="outlined"
            sx={{ width: "350px" }}
            value={formik.values.phoneNumber || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        </Box>

        {creationSuccess && (
          <Alert sx={{ marginTop: 2 }} severity="success">
            Account created! Logging you in now...
          </Alert>
        )}
        {creationFailure && (
          <Alert sx={{ marginTop: 2 }} severity="error">
            {errorMessage}
          </Alert>
        )}

        <button type="submit" style={submitButtonStyle}>
          Submit
        </button>
      </Box>
    </div>
  );
};

export default UserCreate;
