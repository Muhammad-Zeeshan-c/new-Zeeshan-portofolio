import { API_URL, getAuthHeaders } from './apiConfig.js';

export const getProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/projects`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const getProjectCount = async () => {
  try {
    const response = await fetch(`${API_URL}/projects/count`);
    const data = await response.json();
    return data.success ? data.count : 0;
  } catch (error) {
    console.error('Error fetching project count:', error);
    return 0;
  }
};

export const createProject = async (projectData) => {
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
};

export const updateProject = async (id, projectData) => {
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
};

export const deleteProject = async (id) => {
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
};
