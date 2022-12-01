import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        resetUser: (state, action) => {
            state.user = {}
        }
    }
})

export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer;
