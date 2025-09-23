import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export type TUser = {
  userEmail: string;
  role: string;
  iat: number;
  exp: number;
};

export interface IAuthState {
  user: TUser | null;
  token: string | null;
}

const initialState: IAuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
