import {
  getAllProjects,
  countProjects,
  createNewProject,
  updateExistingProject,
  removeProject
} from '../services/projectService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

export const getProjects = async (req, res, next) => {
  try {
    const projects = await getAllProjects();
    return sendSuccess(res, 200, projects, null, { count: projects.length });
  } catch (error) {
    return next(error);
  }
};

export const getProjectCount = async (req, res, next) => {
  try {
    const count = await countProjects();
    return sendSuccess(res, 200, null, null, { count });
  } catch (error) {
    return next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const project = await createNewProject(req.body);
    return sendSuccess(res, 201, project);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return sendError(res, 400, error.message);
    }
    return next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await updateExistingProject(id, req.body);

    if (!updated) {
      return sendError(res, 404, 'Project not found');
    }

    return sendSuccess(res, 200, updated);
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return sendError(res, 400, error.message);
    }
    return next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await removeProject(id);

    if (!project) {
      return sendError(res, 404, 'Project not found');
    }

    return sendSuccess(res, 200, null, 'Project deleted successfully');
  } catch (error) {
    return next(error);
  }
};
