import Project from '../models/Project.js';
import { deleteFileFromCloudinary } from './uploadController.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ created_at: -1 });
    return res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectCount = async (req, res) => {
  try {
    const count = await Project.countDocuments();
    return res.json({ success: true, count });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, description, tags, demo_url, github_url, image_url, image_public_id, featured } = req.body;

    const formattedTags = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
      ? tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    const project = await Project.create({
      title,
      description,
      tags: formattedTags,
      demo_url,
      github_url,
      image_url,
      image_public_id: image_public_id || '',
      featured: featured || false
    });

    return res.status(201).json({ success: true, data: project });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Project.findById(id);

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // If new image is uploaded and old image exists, delete old file from Cloudinary
    if (req.body.image_public_id && existing.image_public_id && req.body.image_public_id !== existing.image_public_id) {
      await deleteFileFromCloudinary(existing.image_public_id, 'image');
    }

    if (req.body.tags && typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(t => t.trim()).filter(Boolean);
    }

    const updated = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Purge image from Cloudinary if public_id exists
    if (project.image_public_id) {
      await deleteFileFromCloudinary(project.image_public_id, 'image');
    }

    await Project.findByIdAndDelete(id);

    return res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
