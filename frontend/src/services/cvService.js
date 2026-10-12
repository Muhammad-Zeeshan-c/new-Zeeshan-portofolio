import { API_URL, getAuthHeaders } from './apiConfig.js';

export const getActiveCV = async () => {
  try {
    const response = await fetch(`${API_URL}/cv`);
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching active CV:', error);
    return null;
  }
};

export const uploadCV = async (file, title = 'Muhammad Zeeshan - Resume') => {
  try {
    const formData = new FormData();
    formData.append('cv', file);
    formData.append('title', title);

    const response = await fetch(`${API_URL}/cv/upload`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData
    });
    return await response.json();
  } catch (error) {
    console.error('Error uploading CV:', error);
    return { success: false, error: error.message };
  }
};

export const deleteCV = async () => {
  try {
    const response = await fetch(`${API_URL}/cv`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting CV:', error);
    return { success: false, error: error.message };
  }
};
