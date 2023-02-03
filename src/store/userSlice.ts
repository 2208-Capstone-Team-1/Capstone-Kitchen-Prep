import { createSlice } from "@reduxjs/toolkit";

export interface userType {
  id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  isAdmin: boolean;
  phoneNumber: string;
}
interface usersType {
  [key:string]: any;
}

interface initialStateType {
  [x: string]: any;
  user: userType;
  users: usersType;
}

const initialState: initialStateType = {
  user: {
    id: "",
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    isAdmin:false,
    phoneNumber: "",
  },
  users:[],
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
        isAdmin:false,
        phoneNumber: "",
      };
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUser, resetUser, setUsers } = userSlice.actions;
export default userSlice.reducer;