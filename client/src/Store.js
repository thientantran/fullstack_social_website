import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: "light",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

const authSliceReducer = authSlice.reducer;
export const { setMode } = authSlice.actions;
export default authSliceReducer;
