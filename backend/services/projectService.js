import Project from '../models/Project.js';
import { deleteFileFromCloudinary } from './cloudinaryService.js';

/**
 * Project Service
 * Handles business logic and DB interactions for portfolio projects
 */
export const getAllProjects = async () => {
  return await Project.find().sort({ priority: 1, created_at: -1 });
};

export const countProjects = async () => {
  return await Project.countDocuments();
};

export const createNewProject = async (projectData) => {
  const { title, description, tags, demo_url, github_url, image_url, image_public_id, featured, priority } = projectData;

  const formattedTags = Array.isArray(tags)
    ? tags
    : typeof tags === 'string'
    ? tags.split(',').map(t => t.trim()).filter(Boolean)
    : [];

  return await Project.create({
    title,
    description,
    tags: formattedTags,
    demo_url,
    github_url,
    image_url,
    image_public_id: image_public_id || '',
    featured: featured || false,
    priority: priority !== undefined && priority !== null && priority !== '' ? Number(priority) : 1
  });
};

export const updateExistingProject = async (id, updateData) => {
  const existing = await Project.findById(id);
  if (!existing) {
    return null;
  }

  // If new image is uploaded and old image exists, clean up old file from Cloudinary
  if (updateData.image_public_id && existing.image_public_id && updateData.image_public_id !== existing.image_public_id) {
    try {
      await deleteFileFromCloudinary(existing.image_public_id, 'image');
    } catch (err) {
      console.warn(`Failed to cleanup old image ${existing.image_public_id}:`, err);
    }
  }

  if (updateData.tags && typeof updateData.tags === 'string') {
    updateData.tags = updateData.tags.split(',').map(t => t.trim()).filter(Boolean);
  }

  if (updateData.priority !== undefined && updateData.priority !== null && updateData.priority !== '') {
    updateData.priority = Number(updateData.priority);
  }

  if (updateData.featured !== undefined) {
    updateData.featured = Boolean(updateData.featured);
  }

  return await Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

export const removeProject = async (id) => {
  const project = await Project.findById(id);
  if (!project) {
    return null;
  }

  // Purge image from Cloudinary if public_id exists
  if (project.image_public_id) {
    try {
      await deleteFileFromCloudinary(project.image_public_id, 'image');
    } catch (err) {
      console.warn(`Failed to cleanup project image ${project.image_public_id}:`, err);
    }
  }

  await Project.findByIdAndDelete(id);
  return project;
};
