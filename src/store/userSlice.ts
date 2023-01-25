import { createSlice } from "@reduxjs/toolkit";

interface userType {
  id: string;
  email: string;
  isAdmin: boolean;
}

interface initialStateType {
  [x: string]: any;
  user: userType;
  users: []
}


const initialState: initialStateType = {
  user: {
    id: "",
    email: "",
    isAdmin:false,
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
        email: "",
        isAdmin:false,
      };
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUser, resetUser, setUsers } = userSlice.actions;
export default userSlice.reducer;