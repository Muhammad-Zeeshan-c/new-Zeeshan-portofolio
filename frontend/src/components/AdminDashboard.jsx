import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaProjectDiagram,
  FaCertificate,
  FaEnvelope,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaEye,
  FaCheck,
  FaImage,
  FaStar,
  FaFilePdf,
  FaDownload,
  FaUpload,
  FaCheckCircle,
  FaRegEnvelopeOpen
} from 'react-icons/fa';
import apiService from '../services/api';

const AdminDashboard = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [messages, setMessages] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [activeCV, setActiveCV] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image_url: '',
    image_public_id: '',
    demo_url: '',
    github_url: '',
    tags: '',
    featured: false
  });

  const [certificateForm, setCertificateForm] = useState({
    title: '',
    issuer: '',
    issue_date: '',
    credential_url: '',
    image_url: '',
    image_public_id: '',
    pdf_url: '',
    pdf_public_id: ''
  });

  const [galleryForm, setGalleryForm] = useState({
    title: '',
    description: '',
    media_url: '',
    public_ids: [],
    type: 'image',
    date: new Date().toISOString().split('T')[0],
  });

  // File upload states
  const [uploadingFile, setUploadingFile] = useState(false);
  const [cvUploading, setCvUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'projects':
          await fetchProjects();
          break;
        case 'certificates':
          await fetchCertificates();
          break;
        case 'messages':
          await fetchMessages();
          break;
        case 'cv':
          await fetchCV();
          break;
        case 'gallery':
          await fetchGallery();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    const data = await apiService.getProjects();
    setProjects(data);
  };

  const fetchCertificates = async () => {
    const data = await apiService.getCertificates();
    setCertificates(data);
  };

  const fetchMessages = async () => {
    const data = await apiService.getContactMessages();
    setMessages(data);
  };

  const fetchCV = async () => {
    const data = await apiService.getActiveCV();
    setActiveCV(data);
  };

  const fetchGallery = async () => {
    const data = await apiService.getGallery();
    setGallery(data);
  };

  // Upload Project Image to Cloudinary via Express Backend
  const handleProjectImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, WEBP)');
      return;
    }

    try {
      setUploadingFile(true);
      const res = await apiService.uploadFile(file, 'portfolio/projects');
      if (res.success) {
        setProjectForm(prev => ({
          ...prev,
          image_url: res.url,
          image_public_id: res.public_id
        }));
        alert('Project image uploaded to Cloudinary! 📸');
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      alert('Failed to upload image: ' + error.message);
    } finally {
      setUploadingFile(false);
    }
  };

  // Upload Certificate Image
  const handleCertificateImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingFile(true);
      const res = await apiService.uploadFile(file, 'portfolio/certificates');
      if (res.success) {
        setCertificateForm(prev => ({
          ...prev,
          image_url: res.url,
          image_public_id: res.public_id
        }));
        alert('Certificate image uploaded! 🏆');
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploadingFile(false);
    }
  };

  // Upload Certificate PDF
  const handleCertificatePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingFile(true);
      const res = await apiService.uploadFile(file, 'portfolio/certificates/pdfs');
      if (res.success) {
        setCertificateForm(prev => ({
          ...prev,
          pdf_url: res.url,
          pdf_public_id: res.public_id,
          credential_url: res.url
        }));
        alert('Certificate PDF uploaded! 📄');
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploadingFile(false);
    }
  };

  // Upload CV PDF
  const handleCVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file for CV.');
      return;
    }

    try {
      setCvUploading(true);
      const res = await apiService.uploadCV(file, 'Muhammad Zeeshan - Resume');
      if (res.success) {
        alert('CV uploaded & replaced successfully! 📄✨');
        fetchCV();
      } else {
        throw new Error(res.message || res.error);
      }
    } catch (error) {
      alert('CV Upload failed: ' + error.message);
    } finally {
      setCvUploading(false);
    }
  };

  // Delete Active CV
  const handleDeleteCV = async () => {
    if (!confirm('Are you sure you want to delete your active CV?')) return;

    try {
      const res = await apiService.deleteCV();
      if (res.success) {
        alert('Active CV deleted successfully');
        setActiveCV(null);
      } else {
        throw new Error(res.message || res.error);
      }
    } catch (error) {
      alert('Failed to delete CV: ' + error.message);
    }
  };

  // PROJECT CRUD
  const saveProject = async () => {
    if (!projectForm.title || !projectForm.description || !projectForm.image_url) {
      alert('Title, Description, and Image are required!');
      return;
    }

    try {
      if (editingItem) {
        const res = await apiService.updateProject(editingItem._id || editingItem.id, projectForm);
        if (res.success) {
          alert('Project updated successfully! 🚀');
        } else throw new Error(res.message);
      } else {
        const res = await apiService.createProject(projectForm);
        if (res.success) {
          alert('Project created successfully! 🎉');
        } else throw new Error(res.message);
      }
      setIsCreating(false);
      setEditingItem(null);
      resetProjectForm();
      fetchProjects();
    } catch (error) {
      alert('Error saving project: ' + error.message);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project? Image will also be purged from Cloudinary.')) return;
    try {
      const res = await apiService.deleteProject(id);
      if (res.success) {
        alert('Project deleted!');
        fetchProjects();
      } else throw new Error(res.message);
    } catch (error) {
      alert('Error deleting project: ' + error.message);
    }
  };

  // CERTIFICATE CRUD
  const saveCertificate = async () => {
    if (!certificateForm.title || !certificateForm.issuer) {
      alert('Title and Issuer are required!');
      return;
    }

    try {
      if (editingItem) {
        const res = await apiService.updateCertificate(editingItem._id || editingItem.id, certificateForm);
        if (res.success) alert('Certificate updated!');
        else throw new Error(res.message);
      } else {
        const res = await apiService.createCertificate(certificateForm);
        if (res.success) alert('Certificate created!');
        else throw new Error(res.message);
      }
      setIsCreating(false);
      setEditingItem(null);
      resetCertificateForm();
      fetchCertificates();
    } catch (error) {
      alert('Error saving certificate: ' + error.message);
    }
  };

  const deleteCertificate = async (id) => {
    if (!confirm('Are you sure you want to delete this certificate? Files will also be purged.')) return;
    try {
      const res = await apiService.deleteCertificate(id);
      if (res.success) {
        alert('Certificate deleted!');
        fetchCertificates();
      } else throw new Error(res.message);
    } catch (error) {
      alert('Error deleting certificate: ' + error.message);
    }
  };

  // MESSAGE OPERATIONS
  const toggleReadMessage = async (id) => {
    try {
      const res = await apiService.toggleMessageRead(id);
      if (res.success) fetchMessages();
    } catch (error) {
      alert('Error toggling read status: ' + error.message);
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await apiService.deleteContactMessage(id);
      if (res.success) fetchMessages();
    } catch (error) {
      alert('Error deleting message: ' + error.message);
    }
  };

  // GALLERY CRUD
  const saveGallery = async () => {
    if (!galleryForm.title) {
      alert('Title is required');
      return;
    }

    try {
      if (editingItem) {
        const res = await apiService.updateGalleryItem(editingItem._id || editingItem.id, galleryForm);
        if (res.success) alert('Gallery updated!');
      } else {
        const res = await apiService.createGalleryItem(galleryForm);
        if (res.success) alert('Gallery created!');
      }
      setIsCreating(false);
      setEditingItem(null);
      resetGalleryForm();
      fetchGallery();
    } catch (error) {
      alert('Error saving gallery item: ' + error.message);
    }
  };

  const deleteGallery = async (id) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      const res = await apiService.deleteGalleryItem(id);
      if (res.success) fetchGallery();
    } catch (error) {
      alert('Error deleting gallery item: ' + error.message);
    }
  };

  // Reset helpers
  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      description: '',
      image_url: '',
      image_public_id: '',
      demo_url: '',
      github_url: '',
      tags: '',
      featured: false
    });
  };

  const resetCertificateForm = () => {
    setCertificateForm({
      title: '',
      issuer: '',
      issue_date: '',
      credential_url: '',
      image_url: '',
      image_public_id: '',
      pdf_url: '',
      pdf_public_id: ''
    });
  };

  const resetGalleryForm = () => {
    setGalleryForm({
      title: '',
      description: '',
      media_url: '',
      public_ids: [],
      type: 'image',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const startEdit = (item, type) => {
    setEditingItem({ ...item, type });
    if (type === 'project') {
      setProjectForm({
        title: item.title,
        description: item.description,
        image_url: item.image_url || '',
        image_public_id: item.image_public_id || '',
        demo_url: item.demo_url || '',
        github_url: item.github_url || '',
        tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '',
        featured: item.featured || false
      });
    } else if (type === 'certificate') {
      setCertificateForm({
        title: item.title,
        issuer: item.issuer,
        issue_date: item.issue_date || '',
        credential_url: item.credential_url || '',
        image_url: item.image_url || '',
        image_public_id: item.image_public_id || '',
        pdf_url: item.pdf_url || '',
        pdf_public_id: item.pdf_public_id || ''
      });
    } else if (type === 'gallery') {
      setGalleryForm({
        title: item.title,
        description: item.description || '',
        media_url: item.media_url || '',
        public_ids: item.public_ids || [],
        type: item.type || 'image',
        date: item.date || new Date().toISOString().split('T')[0]
      });
    }
  };

  const tabs = [
    { id: 'projects', label: 'Projects', icon: <FaProjectDiagram />, count: projects.length },
    { id: 'certificates', label: 'Certificates', icon: <FaCertificate />, count: certificates.length },
    { id: 'cv', label: 'CV / Resume', icon: <FaFilePdf />, count: activeCV ? 1 : 0 },
    { id: 'messages', label: 'Messages', icon: <FaEnvelope />, count: messages.length },
    { id: 'gallery', label: 'Gallery', icon: <FaImage />, count: gallery.length }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-900 rounded-3xl border border-slate-700 w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-700 flex items-center justify-between bg-gradient-to-r from-cyan-900/30 via-slate-900 to-emerald-900/30">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">Admin Dashboard</h2>
              <p className="text-white/60 text-sm">MongoDB Atlas & Cloudinary Powered Portfolio Manager</p>
            </div>
            <button
              onClick={onClose}
              className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors duration-300 border border-slate-700 text-white"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 p-4 border-b border-slate-800 bg-slate-950/60 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsCreating(false);
                  setEditingItem(null);
                }}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap text-sm ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-900/90">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white/60 text-sm">Fetching live data from MongoDB Atlas...</p>
              </div>
            ) : (
              <>
                {/* ==================== PROJECTS TAB ==================== */}
                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    {!isCreating && !editingItem && (
                      <button
                        onClick={() => {
                          setIsCreating(true);
                          resetProjectForm();
                        }}
                        className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                      >
                        <FaPlus />
                        <span>Add New Project</span>
                      </button>
                    )}

                    {(isCreating || editingItem?.type === 'project') && (
                      <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 shadow-xl space-y-6">
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {isCreating ? 'Create New Project' : 'Edit Project'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-slate-400 mb-2 text-sm font-semibold">Title *</label>
                            <input
                              type="text"
                              value={projectForm.title}
                              onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-cyan-400"
                              placeholder="e.g. AI Powered Portfolio"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-2 text-sm font-semibold">Tags (comma separated)</label>
                            <input
                              type="text"
                              value={projectForm.tags}
                              onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-cyan-400"
                              placeholder="React, Express, MongoDB, Langchain"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-slate-400 mb-2 text-sm font-semibold">Description *</label>
                            <textarea
                              value={projectForm.description}
                              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                              rows="3"
                              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-cyan-400"
                              placeholder="Detailed project description..."
                            ></textarea>
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-2 text-sm font-semibold">Live Demo URL</label>
                            <input
                              type="text"
                              value={projectForm.demo_url}
                              onChange={(e) => setProjectForm({ ...projectForm, demo_url: e.target.value })}
                              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-cyan-400"
                              placeholder="https://myproject.com"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-2 text-sm font-semibold">GitHub Repository URL</label>
                            <input
                              type="text"
                              value={projectForm.github_url}
                              onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })}
                              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-cyan-400"
                              placeholder="https://github.com/username/repo"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-slate-400 mb-2 text-sm font-semibold">Upload Image to Cloudinary *</label>
                            <div className="flex gap-4 items-center">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleProjectImageUpload}
                                disabled={uploadingFile}
                                className="block w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500"
                              />
                              {uploadingFile && <div className="text-cyan-400 text-sm font-semibold animate-pulse">Uploading...</div>}
                            </div>
                            {projectForm.image_url && (
                              <div className="mt-3 flex items-center gap-4">
                                <img src={projectForm.image_url} alt="Preview" className="h-20 w-32 object-cover rounded-xl border border-slate-700" />
                                <span className="text-xs text-emerald-400 font-mono break-all">✓ Cloudinary URL: {projectForm.image_url}</span>
                              </div>
                            )}
                          </div>
                          <div className="md:col-span-2 flex items-center gap-3">
                            <input
                              type="checkbox"
                              id="featured"
                              checked={projectForm.featured}
                              onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                              className="w-5 h-5 accent-cyan-500 rounded"
                            />
                            <label htmlFor="featured" className="text-white font-semibold flex items-center gap-2 cursor-pointer">
                              <FaStar className="text-yellow-400" /> Mark as Featured Project
                            </label>
                          </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                          <button
                            onClick={() => {
                              setIsCreating(false);
                              setEditingItem(null);
                            }}
                            className="px-6 py-3 bg-slate-700 text-slate-300 rounded-xl hover:bg-slate-600 font-semibold"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={saveProject}
                            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white rounded-xl hover:from-cyan-500 hover:to-emerald-500 font-semibold flex items-center gap-2"
                          >
                            <FaSave />
                            Save Project
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projects.map(p => (
                        <div key={p._id || p.id} className="bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
                          <div className="relative h-44">
                            <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                            {p.featured && (
                              <div className="absolute top-3 right-3 bg-yellow-500 text-slate-900 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow">
                                <FaStar /> Featured
                              </div>
                            )}
                          </div>
                          <div className="p-5 space-y-3 flex-1">
                            <h4 className="text-xl font-bold text-white">{p.title}</h4>
                            <p className="text-slate-400 text-sm line-clamp-2">{p.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {p.tags?.map((t, idx) => (
                                <span key={idx} className="text-xs px-2.5 py-1 bg-cyan-950/60 text-cyan-300 rounded-md border border-cyan-800/40">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="p-5 pt-0 flex gap-3">
                            <button
                              onClick={() => startEdit(p, 'project')}
                              className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-cyan-300 rounded-xl font-semibold flex items-center justify-center gap-2"
                            >
                              <FaEdit /> Edit
                            </button>
                            <button
                              onClick={() => deleteProject(p._id || p.id)}
                              className="py-2.5 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-xl font-semibold flex items-center justify-center"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}
                      {projects.length === 0 && !isCreating && (
                        <div className="col-span-full text-center text-slate-400 py-16">
                          No projects uploaded yet in MongoDB. Click "Add New Project" above!
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ==================== CERTIFICATES TAB ==================== */}
                {activeTab === 'certificates' && (
                  <div className="space-y-6">
                    {!isCreating && !editingItem && (
                      <button
                        onClick={() => {
                          setIsCreating(true);
                          resetCertificateForm();
                        }}
                        className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                      >
                        <FaPlus />
                        <span>Add New Certificate</span>
                      </button>
                    )}

                    {(isCreating || editingItem?.type === 'certificate') && (
                      <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 shadow-xl space-y-6">
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {isCreating ? 'Add Certificate' : 'Edit Certificate'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-slate-400 mb-2 text-sm font-semibold">Title *</label>
                            <input
                              type="text"
                              value={certificateForm.title}
                              onChange={(e) => setCertificateForm({ ...certificateForm, title: e.target.value })}
                              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-cyan-400"
                              placeholder="e.g. MERN Stack Specialist"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-2 text-sm font-semibold">Issuer Organization *</label>
                            <input
                              type="text"
                              value={certificateForm.issuer}
                              onChange={(e) => setCertificateForm({ ...certificateForm, issuer: e.target.value })}
                              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-cyan-400"
                              placeholder="e.g. Coursera / HackerRank"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-2 text-sm font-semibold">Issue Date</label>
                            <input
                              type="text"
                              value={certificateForm.issue_date}
                              onChange={(e) => setCertificateForm({ ...certificateForm, issue_date: e.target.value })}
                              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-cyan-400"
                              placeholder="e.g. Oct 2024"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-2 text-sm font-semibold">Credential / Verification URL</label>
                            <input
                              type="text"
                              value={certificateForm.credential_url}
                              onChange={(e) => setCertificateForm({ ...certificateForm, credential_url: e.target.value })}
                              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-cyan-400"
                              placeholder="https://credential-link.com"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-2 text-sm font-semibold">Upload Certificate Image</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleCertificateImageUpload}
                              className="block w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-2 text-sm font-semibold">Upload Certificate PDF</label>
                            <input
                              type="file"
                              accept="application/pdf"
                              onChange={handleCertificatePdfUpload}
                              className="block w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                          <button
                            onClick={() => {
                              setIsCreating(false);
                              setEditingItem(null);
                            }}
                            className="px-6 py-3 bg-slate-700 text-slate-300 rounded-xl hover:bg-slate-600 font-semibold"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={saveCertificate}
                            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white rounded-xl hover:from-cyan-500 hover:to-emerald-500 font-semibold flex items-center gap-2"
                          >
                            <FaSave /> Save Certificate
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {certificates.map(c => (
                        <div key={c._id || c.id} className="bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700/80 p-5 space-y-4">
                          <h4 className="text-xl font-bold text-white">{c.title}</h4>
                          <p className="text-cyan-400 text-sm font-semibold">{c.issuer} • {c.issue_date}</p>
                          <div className="flex gap-3 pt-2">
                            <button
                              onClick={() => startEdit(c, 'certificate')}
                              className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-cyan-300 rounded-xl font-semibold flex items-center justify-center gap-2"
                            >
                              <FaEdit /> Edit
                            </button>
                            <button
                              onClick={() => deleteCertificate(c._id || c.id)}
                              className="py-2.5 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-xl font-semibold"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}
                      {certificates.length === 0 && !isCreating && (
                        <div className="col-span-full text-center text-slate-400 py-16">
                          No certificates added yet.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ==================== CV / RESUME TAB ==================== */}
                {activeTab === 'cv' && (
                  <div className="space-y-8 max-w-3xl mx-auto">
                    <div className="bg-slate-800/90 rounded-3xl p-8 border border-slate-700/80 shadow-2xl space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="p-4 bg-emerald-500/20 text-emerald-400 rounded-2xl text-3xl">
                          <FaFilePdf />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">CV / Resume Manager</h3>
                          <p className="text-slate-400 text-sm">Upload, replace, and manage your active CV PDF file</p>
                        </div>
                      </div>

                      {activeCV ? (
                        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-700/60 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FaCheckCircle className="text-emerald-400 text-xl" />
                              <div>
                                <h4 className="text-lg font-bold text-white">{activeCV.title}</h4>
                                <p className="text-xs text-slate-400 font-mono">
                                  File: {activeCV.file_name} • Last updated: {new Date(activeCV.updated_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/30">
                              ACTIVE CV
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-800">
                            <a
                              href={activeCV.pdf_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl flex items-center gap-2 shadow-lg"
                            >
                              <FaDownload /> View / Download PDF
                            </a>
                            <button
                              onClick={handleDeleteCV}
                              className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 font-semibold rounded-xl flex items-center gap-2"
                            >
                              <FaTrash /> Delete Active CV
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-900/40 p-8 rounded-2xl border border-dashed border-slate-700 text-center space-y-3">
                          <FaFilePdf className="text-5xl text-slate-600 mx-auto" />
                          <p className="text-slate-300 font-medium">No Active CV Uploaded Yet</p>
                          <p className="text-slate-500 text-xs">Upload your PDF resume below to enable public downloads</p>
                        </div>
                      )}

                      {/* Replace / Upload Controls */}
                      <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-700 space-y-4">
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                          <FaUpload className="text-cyan-400" />
                          {activeCV ? 'Replace Current CV with New PDF' : 'Upload CV PDF'}
                        </h4>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={handleCVUpload}
                          disabled={cvUploading}
                          className="block w-full text-sm text-slate-400 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-cyan-600 file:to-emerald-600 file:text-white hover:file:from-cyan-500 hover:file:to-emerald-500"
                        />
                        {cvUploading && (
                          <p className="text-cyan-400 text-sm font-semibold animate-pulse">
                            Uploading PDF to Cloudinary & updating database...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================== MESSAGES TAB ==================== */}
                {activeTab === 'messages' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      {messages.map(m => (
                        <div
                          key={m._id || m.id}
                          className={`p-6 rounded-2xl border transition-all space-y-3 ${m.is_read
                            ? 'bg-slate-800/40 border-slate-800 opacity-80'
                            : 'bg-slate-800/90 border-cyan-500/40 shadow-lg'
                            }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-3">
                                <h4 className="text-lg font-bold text-white">{m.name}</h4>
                                <span className="text-xs px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full font-mono">
                                  {m.email}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 mt-1">
                                {new Date(m.created_at).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => toggleReadMessage(m._id || m.id)}
                                className={`p-2.5 rounded-xl border font-semibold flex items-center gap-1.5 text-xs ${m.is_read
                                  ? 'bg-slate-700 text-slate-400 border-slate-600'
                                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                  }`}
                                title={m.is_read ? 'Mark as Unread' : 'Mark as Read'}
                              >
                                {m.is_read ? <FaRegEnvelopeOpen /> : <FaCheck />}
                                <span>{m.is_read ? 'Read' : 'Unread'}</span>
                              </button>
                              <button
                                onClick={() => deleteMessage(m._id || m.id)}
                                className="p-2.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl border border-red-500/30"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                            <p className="text-xs font-semibold text-cyan-400 mb-1">Subject: {m.subject}</p>
                            <p className="text-slate-200 text-sm leading-relaxed">{m.message}</p>
                          </div>
                        </div>
                      ))}
                      {messages.length === 0 && (
                        <div className="text-center text-slate-400 py-16">
                          No contact messages received yet.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ==================== GALLERY TAB ==================== */}
                {activeTab === 'gallery' && (
                  <div className="space-y-6">
                    {!isCreating && !editingItem && (
                      <button
                        onClick={() => {
                          setIsCreating(true);
                          resetGalleryForm();
                        }}
                        className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                      >
                        <FaPlus />
                        <span>Add Gallery Item</span>
                      </button>
                    )}

                    {(isCreating || editingItem?.type === 'gallery') && (
                      <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 shadow-xl space-y-6">
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {isCreating ? 'Add Gallery Item' : 'Edit Gallery Item'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-slate-400 mb-2 text-sm font-semibold">Title *</label>
                            <input
                              type="text"
                              value={galleryForm.title}
                              onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-cyan-400"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-2 text-sm font-semibold">Media URL</label>
                            <input
                              type="text"
                              value={galleryForm.media_url}
                              onChange={(e) => setGalleryForm({ ...galleryForm, media_url: e.target.value })}
                              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-cyan-400"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                          <button
                            onClick={() => {
                              setIsCreating(false);
                              setEditingItem(null);
                            }}
                            className="px-6 py-3 bg-slate-700 text-slate-300 rounded-xl hover:bg-slate-600 font-semibold"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={saveGallery}
                            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white rounded-xl hover:from-cyan-500 hover:to-emerald-500 font-semibold flex items-center gap-2"
                          >
                            <FaSave /> Save Item
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {gallery.map(g => (
                        <div key={g._id || g.id} className="bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700 p-4 space-y-3">
                          <h4 className="text-lg font-bold text-white">{g.title}</h4>
                          <p className="text-slate-400 text-xs">{g.description}</p>
                          <div className="flex gap-3 pt-2">
                            <button
                              onClick={() => startEdit(g, 'gallery')}
                              className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-cyan-300 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                            >
                              <FaEdit /> Edit
                            </button>
                            <button
                              onClick={() => deleteGallery(g._id || g.id)}
                              className="py-2 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-xl text-sm font-semibold"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminDashboard;
