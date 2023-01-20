import { createSlice } from "@reduxjs/toolkit";

interface userType {
  id: string;
  username: string;
}
interface allUsersType {
  [key:string]:any
}

interface initialStateType {
  [x: string]: any;
  user: userType;
  allUsers: allUsersType;
}

const initialState: initialStateType = {
  user: {
    id: "",
    username: "",
  },
  allUsers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAllUsers: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = {
        id: "",
        username: "",
      };
    },
  },
});

export const { setUser, setAllUsers, resetUser } = userSlice.actions;
export default userSlice.reducer;
