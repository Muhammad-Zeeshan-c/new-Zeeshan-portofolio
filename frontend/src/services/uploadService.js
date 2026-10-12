import { API_URL, getAuthHeaders } from './apiConfig.js';

export const uploadFile = async (file, folder = 'portfolio') => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Upload failed');
    return data;
  } catch (error) {
    console.error('File Upload Error:', error);
    throw error;
  }
};

export const deleteFile = async (public_id, resource_type = 'image') => {
  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ public_id, resource_type })
    });
    return await response.json();
  } catch (error) {
    console.error('File Delete Error:', error);
    throw error;
  }
};
