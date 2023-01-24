import { createSlice } from "@reduxjs/toolkit";

interface userType {
  id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  phoneNumber: string;
}

interface initialStateType {
  [x: string]: any;
  user: userType;
}

const initialState: initialStateType = {
  user: {
    id: "",
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    phoneNumber: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = {
        id: "",
        first_name: "",
        last_name: "",
        password: "",
        email: "",
        phoneNumber: "",
      };
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
