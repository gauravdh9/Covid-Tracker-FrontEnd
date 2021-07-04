import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
  },
  reducers: {
    loginAction: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logoutAction: (state) => {
      state.name = "";
      state.email = "";
    },
  },
});
export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
