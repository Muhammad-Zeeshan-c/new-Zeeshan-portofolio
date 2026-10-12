import { API_URL, getAuthHeaders } from './apiConfig.js';

export const getCertificates = async () => {
  try {
    const response = await fetch(`${API_URL}/certificates`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }
};

export const getCertificateCount = async () => {
  try {
    const response = await fetch(`${API_URL}/certificates/count`);
    const data = await response.json();
    return data.success ? data.count : 0;
  } catch (error) {
    console.error('Error fetching certificate count:', error);
    return 0;
  }
};

export const createCertificate = async (certData) => {
  try {
    const response = await fetch(`${API_URL}/certificates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(certData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating certificate:', error);
    return { success: false, error: error.message };
  }
};

export const updateCertificate = async (id, certData) => {
  try {
    const response = await fetch(`${API_URL}/certificates/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(certData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating certificate:', error);
    return { success: false, error: error.message };
  }
};

export const deleteCertificate = async (id) => {
  try {
    const response = await fetch(`${API_URL}/certificates/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error)
  {
    console.error('Error deleting certificate:', error);
    return { success: false, error: error.message };
  }
};
