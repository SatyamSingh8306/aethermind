import usersData from '../data/users.json';

// // Helper function to get the next available user ID
// const getNextUserId = (users) => {
//   return Math.max(...users.map(user => user.id), 0) + 1;
// };

// // Helper function to save users data
// const saveUsersData = (users) => {
//   // In a real application, this would make an API call
//   // For now, we'll just update the imported data
//   usersData.users = users;
// };
//eslint-disable-next-line
//typeof import !== 'undefined' &&
const DEFAULT_BASE = ( typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BACKEND_API_BASE);
const BASE = DEFAULT_BASE;

async function handleResponse(res) {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg = data?.message || (data?.error) || `Request failed (${res.status})`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const registerUser = async (userData) => {
  // userData expected: { email, password, name } (from UI)
  try {
    const payload = {
      fullName: userData.name || userData.fullName || '',
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword || userData.password,
    };

    const res = await fetch(`${BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await handleResponse(res);
    if (data?.token) {
      try { localStorage.setItem('token', data.token); } catch {}
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(res);
    // if backend returns token, persist it
    if (data?.token) {
      try { localStorage.setItem('token', data.token); } catch {}
    }
    return data;
  } catch (error) {
    throw error;
  }
};
