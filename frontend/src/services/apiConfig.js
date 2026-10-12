export const API_URL = import.meta.env.API_URL || 'http://localhost:3001/api';

export const getAuthHeaders = () => {
  const sessionData = localStorage.getItem('adminSession');
  let token = 'admin-session-active';
  if (sessionData) {
    try {
      const parsed = JSON.parse(sessionData);
      if (parsed.token) token = parsed.token;
    } catch (e) {
      console.warn('Session parse error:', e);
    }
  }
  return {
    'Authorization': `Bearer ${token}`,
    'x-admin-key': 'admin@@#123'
  };
};
