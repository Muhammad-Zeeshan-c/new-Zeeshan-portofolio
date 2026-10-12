import { API_URL, getAuthHeaders } from './apiConfig.js';

export const getGallery = async () => {
  try {
    const response = await fetch(`${API_URL}/gallery`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
};

export const createGalleryItem = async (itemData) => {
  try {
    const response = await fetch(`${API_URL}/gallery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(itemData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return { success: false, error: error.message };
  }
};

export const updateGalleryItem = async (id, itemData) => {
  try {
    const response = await fetch(`${API_URL}/gallery/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(itemData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating gallery item:', error);
    return { success: false, error: error.message };
  }
};

export const deleteGalleryItem = async (id) => {
  try {
    const response = await fetch(`${API_URL}/gallery/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return { success: false, error: error.message };
  }
};
