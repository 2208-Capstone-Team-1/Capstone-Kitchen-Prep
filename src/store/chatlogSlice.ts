import { createSlice } from "@reduxjs/toolkit";

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
    resetChatlog: (state) => {
      state.chatlogs = [];
    },
  },
});

export const { setChatlogs, setAddChatlog, resetChatlog } =
  chatlogSlice.actions;
export default chatlogSlice.reducer;
