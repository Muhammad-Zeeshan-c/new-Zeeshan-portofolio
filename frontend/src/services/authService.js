import { API_URL } from './apiConfig.js';

export const adminLogin = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return await response.json();
  } catch (error) {
    console.error('Login Error:', error);
    return { success: false, message: error.message };
  }
};
