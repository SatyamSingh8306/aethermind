import { createSlice } from '@reduxjs/toolkit';

function loadInitialAuth() {
  let user = null;
  let token = null;
  try {
    const u = localStorage.getItem('user');
    const t = localStorage.getItem('token');
    if (u) user = JSON.parse(u);
    if (t) token = t;
  } catch {}
  return { user, token };
}

const initialState = {
  ...loadInitialAuth(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      const { user, token } = action.payload || {};
      state.user = user || null;
      state.token = token || null;
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;


