const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const getAuthHeaders = () => {
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

class ApiService {
  // File Upload to Cloudinary via Backend
  async uploadFile(file, folder = 'portfolio') {
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
  }

  async deleteFile(public_id, resource_type = 'image') {
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
  }

  // Projects API
  async getProjects() {
    try {
      const response = await fetch(`${API_URL}/projects`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  async getProjectCount() {
    try {
      const response = await fetch(`${API_URL}/projects/count`);
      const data = await response.json();
      return data.success ? data.count : 0;
    } catch (error) {
      console.error('Error fetching project count:', error);
      return 0;
    }
  }

  async createProject(projectData) {
    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(projectData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating project:', error);
      return { success: false, error: error.message };
    }
  }

  async updateProject(id, projectData) {
    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(projectData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating project:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteProject(id) {
    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting project:', error);
      return { success: false, error: error.message };
    }
  }

  // Certificates API
  async getCertificates() {
    try {
      const response = await fetch(`${API_URL}/certificates`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching certificates:', error);
      return [];
    }
  }

  async getCertificateCount() {
    try {
      const response = await fetch(`${API_URL}/certificates/count`);
      const data = await response.json();
      return data.success ? data.count : 0;
    } catch (error) {
      console.error('Error fetching certificate count:', error);
      return 0;
    }
  }

  async createCertificate(certData) {
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
  }

  async updateCertificate(id, certData) {
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
  }

  async deleteCertificate(id) {
    try {
      const response = await fetch(`${API_URL}/certificates/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting certificate:', error);
      return { success: false, error: error.message };
    }
  }

  // Contact Messages API
  async sendContactMessage(messageData) {
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
  }

  async getContactMessages() {
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
  }

  async toggleMessageRead(id) {
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
  }

  async deleteContactMessage(id) {
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
  }

  // CV / Resume API
  async getActiveCV() {
    try {
      const response = await fetch(`${API_URL}/cv`);
      const data = await response.json();
      return data.success ? data.data : null;
    } catch (error) {
      console.error('Error fetching active CV:', error);
      return null;
    }
  }

  async uploadCV(file, title = 'Muhammad Zeeshan - Resume') {
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
  }

  async deleteCV() {
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
  }

  // Gallery API
  async getGallery() {
    try {
      const response = await fetch(`${API_URL}/gallery`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching gallery:', error);
      return [];
    }
  }

  async createGalleryItem(itemData) {
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
  }

  async updateGalleryItem(id, itemData) {
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
  }

  async deleteGalleryItem(id) {
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
  }
}

export default new ApiService();
