import * as uploadService from './uploadService.js';
import * as projectService from './projectService.js';
import * as certificateService from './certificateService.js';
import * as messageService from './messageService.js';
import * as cvService from './cvService.js';
import * as galleryService from './galleryService.js';
import * as authService from './authService.js';

class ApiService {
  // File Upload
  uploadFile(file, folder = 'portfolio') {
    return uploadService.uploadFile(file, folder);
  }

  deleteFile(public_id, resource_type = 'image') {
    return uploadService.deleteFile(public_id, resource_type);
  }

  // Projects API
  getProjects() {
    return projectService.getProjects();
  }

  getProjectCount() {
    return projectService.getProjectCount();
  }

  createProject(projectData) {
    return projectService.createProject(projectData);
  }

  updateProject(id, projectData) {
    return projectService.updateProject(id, projectData);
  }

  deleteProject(id) {
    return projectService.deleteProject(id);
  }

  // Certificates API
  getCertificates() {
    return certificateService.getCertificates();
  }

  getCertificateCount() {
    return certificateService.getCertificateCount();
  }

  createCertificate(certData) {
    return certificateService.createCertificate(certData);
  }

  updateCertificate(id, certData) {
    return certificateService.updateCertificate(id, certData);
  }

  deleteCertificate(id) {
    return certificateService.deleteCertificate(id);
  }

  // Contact Messages API
  sendContactMessage(messageData) {
    return messageService.sendContactMessage(messageData);
  }

  getContactMessages() {
    return messageService.getContactMessages();
  }

  toggleMessageRead(id) {
    return messageService.toggleMessageRead(id);
  }

  deleteContactMessage(id) {
    return messageService.deleteContactMessage(id);
  }

  // CV / Resume API
  getActiveCV() {
    return cvService.getActiveCV();
  }

  uploadCV(file, title = 'Muhammad Zeeshan - Resume') {
    return cvService.uploadCV(file, title);
  }

  deleteCV() {
    return cvService.deleteCV();
  }

  // Gallery API
  getGallery() {
    return galleryService.getGallery();
  }

  createGalleryItem(itemData) {
    return galleryService.createGalleryItem(itemData);
  }

  updateGalleryItem(id, itemData) {
    return galleryService.updateGalleryItem(id, itemData);
  }

  deleteGalleryItem(id) {
    return galleryService.deleteGalleryItem(id);
  }

  // Auth API
  adminLogin(username, password) {
    return authService.adminLogin(username, password);
  }
}

export default new ApiService();
