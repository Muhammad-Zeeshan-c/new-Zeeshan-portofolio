import { API_URL, getAuthHeaders } from './apiConfig.js';

export const sendContactMessage = async (messageData) => {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending contact message:', error);
    return { success: false, error: error.message };
  }
};

export const getContactMessages = async () => {
  try {
    const response = await fetch(`${API_URL}/messages`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

export const toggleMessageRead = async (id) => {
  try {
    const response = await fetch(`${API_URL}/messages/${id}/read`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Error toggling message read status:', error);
    return { success: false, error: error.message };
  }
};

export const deleteContactMessage = async (id) => {
  try {
    const response = await fetch(`${API_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting message:', error);
    return { success: false, error: error.message };
  }
};
