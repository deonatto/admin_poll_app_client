import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.userId = null;
      state.token = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
