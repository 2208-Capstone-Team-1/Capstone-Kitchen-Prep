import { createSlice } from "@reduxjs/toolkit";

interface ChatlogObject {}

const initialState: any = {
  chatlogs: [],
};
export const chatlogSlice = createSlice({
  name: "chatlog",
  initialState,
  reducers: {
    //display the chatlogs
    setChatlogs: (state, action) => {
      state.chatlogs = action.payload;
    },
    setAddChatlog: (state, action) => {
      state.chatlogs = [...state.chatlogs, action.payload];
    },
  },
});

export const { setChatlogs, setAddChatlog } = chatlogSlice.actions;
export default chatlogSlice.reducer;
