import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavbar } from '../contexts/NavbarContext';
import { FaHeart, FaChevronLeft, FaChevronRight, FaImages, FaVideo } from 'react-icons/fa';
import apiService from '../services/api';

const Gallery = () => {
    const { hideNavbar, showNavbar } = useNavbar();
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Interaction States
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [commentForm, setCommentForm] = useState({ name: '', content: '' });
    const [submittingComment, setSubmittingComment] = useState(false);

    useEffect(() => {
        if (selectedActivity) {
            hideNavbar();
            fetchComments(selectedActivity.id);
            setCurrentSlide(0);
        } else {
            showNavbar();
            setComments([]);
        }
        return () => showNavbar();
    }, [selectedActivity, hideNavbar, showNavbar]);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        setIsLoading(true);
        try {
            const data = await apiService.getGallery();
            if (Array.isArray(data)) {
                const formatted = data.map(item => ({
                    ...item,
                    src: item.media_url || item.src,
                }));
                setActivities(formatted);
            }
        } catch (err) {
            console.error('Error loading gallery', err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchComments = async (galleryId) => {
        setLoadingComments(true);
        try {
            const data = await apiService.getGalleryComments(galleryId);
            if (Array.isArray(data)) {
                setComments(data);
            }
        } catch (error) {
            console.error('Error loading comments:', error);
        } finally {
            setLoadingComments(false);
        }
    };

    const handleLike = async (e, activity) => {
        e.stopPropagation();
        const updatedActivities = activities.map(a =>
            a.id === activity.id ? { ...a, likes: (a.likes || 0) + 1 } : a
        );
        setActivities(updatedActivities);
        if (selectedActivity && selectedActivity.id === activity.id) {
            setSelectedActivity(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }));
        }

        await apiService.likeGalleryItem(activity.id);
    };

    const handlePostComment = async (e) => {
        e.preventDefault();
        if (!commentForm.name.trim() || !commentForm.content.trim()) return;

        setSubmittingComment(true);
        try {
            const { success, data } = await apiService.postGalleryComment(selectedActivity.id, commentForm.name, commentForm.content);
            if (success) {
                setComments([data, ...comments]);
                setCommentForm({ name: '', content: '' });
            }
        } catch (error) {
            console.error('Failed to post comment:', error);
        } finally {
            setSubmittingComment(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen bg-[#000000] text-white pt-24 md:pt-32 pb-20"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
                        <span className="text-[#00B4D8]">ACTIVITY</span>
                        <span className="text-white ml-3">GALLERY</span>
                    </h1>
                    <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto">
                        A visual glimpse into milestones, events, and development moments.
                    </p>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00B4D8]"></div>
                    </div>
                )}

                {/* Masonry Layout */}
                {!isLoading && (
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {activities.map((activity) => {
                            const isVideo = activity.type === 'video';
                            const isMulti = activity.media_urls && activity.media_urls.length > 1;

                            return (
                                <motion.div
                                    key={activity.id}
                                    layoutId={`activity-${activity.id}`}
                                    className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer bg-white/[0.03] border border-white/10 hover:border-[#00B4D8]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,180,216,0.2)]"
                                    onClick={() => setSelectedActivity(activity)}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="relative w-full">
                                        {isVideo ? (
                                            <video
                                                src={activity.src}
                                                className="w-full h-auto object-cover"
                                                muted
                                                loop
                                                playsInline
                                                autoPlay
                                            />
                                        ) : (
                                            <img
                                                src={activity.src}
                                                alt={activity.title}
                                                className="w-full h-auto object-cover"
                                                loading="lazy"
                                                onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'}
                                            />
                                        )}

                                        {/* Mobile Indicators */}
                                        <div className="absolute top-3 right-3 sm:hidden text-white bg-black/60 backdrop-blur-sm rounded-full p-1.5 px-2.5 text-xs flex items-center gap-1">
                                            {isVideo && <FaVideo />}
                                            {!isVideo && isMulti && <FaImages />}
                                        </div>

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                            <span className="text-[#00B4D8] text-xs font-bold uppercase tracking-wider mb-1">{activity.date}</span>
                                            <h3 className="text-white font-bold text-lg leading-tight">{activity.title}</h3>
                                        </div>
                                    </div>

                                    {/* Minimal info */}
                                    <div className="p-4 flex items-center justify-between border-t border-white/10 bg-black/40">
                                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-white/60">
                                            <FaHeart className="text-red-500" /> <span>{activity.likes || 0}</span>
                                        </div>
                                        <div className="text-xs font-bold text-white/80 truncate ml-2 flex-1 text-right sm:text-left">
                                            {activity.title}
                                        </div>
                                        <div className="hidden sm:block text-xs font-medium text-[#00B4D8]">
                                            View Details
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && activities.length === 0 && (
                    <div className="text-center py-20 text-white/40">
                        <p>No activities found yet. Check back later!</p>
                    </div>
                )}
            </div>

            {/* Modal Detail */}
            <AnimatePresence>
                {selectedActivity && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/90 backdrop-blur-md"
                        onClick={() => setSelectedActivity(null)}
                    >
                        <motion.div
                            layoutId={`activity-${selectedActivity.id}`}
                            className="relative w-full md:max-w-5xl bg-[#0a0a0a] border border-white/10 md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-full md:h-[80vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Media Section */}
                            <div className="w-full md:w-[60%] bg-black flex items-center justify-center relative h-[45%] md:h-full group">
                                {(() => {
                                    const files = (selectedActivity.media_urls && selectedActivity.media_urls.length > 0)
                                        ? selectedActivity.media_urls
                                        : [selectedActivity.src];

                                    const currentFile = files[currentSlide] || files[0];
                                    const isVideoFile = currentFile.match(/\.(mp4|webm|ogg)$/i) || (selectedActivity.type === 'video' && files.length === 1);

                                    return (
                                        <>
                                            {isVideoFile ? (
                                                <video
                                                    src={currentFile}
                                                    controls
                                                    autoPlay
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            ) : (
                                                <img
                                                    src={currentFile}
                                                    alt={selectedActivity.title}
                                                    className="max-h-full max-w-full object-contain transition-opacity duration-300"
                                                />
                                            )}

                                            {files.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setCurrentSlide(prev => (prev === 0 ? files.length - 1 : prev - 1));
                                                        }}
                                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                                                    >
                                                        <FaChevronLeft size={18} />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setCurrentSlide(prev => (prev === files.length - 1 ? 0 : prev + 1));
                                                        }}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                                                    >
                                                        <FaChevronRight size={18} />
                                                    </button>

                                                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                                        {files.map((_, idx) => (
                                                            <div
                                                                key={idx}
                                                                className={`h-1.5 rounded-full transition-all ${currentSlide === idx ? 'bg-[#00B4D8] w-6' : 'bg-white/30 w-1.5'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    );
                                })()}

                                <button
                                    onClick={() => setSelectedActivity(null)}
                                    className="absolute top-4 left-4 md:hidden p-2.5 bg-black/60 text-white rounded-full z-10"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Info & Comments Section */}
                            <div className="w-full md:w-[40%] flex flex-col h-[55%] md:h-full border-l border-white/10 bg-[#0a0a0a]">
                                {/* Header Info */}
                                <div className="p-5 border-b border-white/10 flex-shrink-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] border border-[#00B4D8]/30">
                                            {selectedActivity.date}
                                        </span>
                                        <button onClick={() => setSelectedActivity(null)} className="hidden md:block text-white/50 hover:text-white transition-colors">
                                            ✕
                                        </button>
                                    </div>
                                    <h2 className="text-xl font-bold text-white mb-1">{selectedActivity.title}</h2>
                                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-3">
                                        {selectedActivity.description}
                                    </p>
                                </div>

                                {/* Comments List */}
                                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-black/40">
                                    {loadingComments ? (
                                        <div className="flex justify-center py-6"><div className="animate-spin w-6 h-6 border-2 border-[#00B4D8] rounded-full border-t-transparent"></div></div>
                                    ) : comments.length > 0 ? (
                                        comments.map((comment) => (
                                            <div key={comment.id} className="flex gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[#00B4D8]/20 text-[#00B4D8] border border-[#00B4D8]/40 flex-shrink-0 flex items-center justify-center font-bold text-xs">
                                                    {comment.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
                                                        <p className="text-xs font-bold text-white mb-1">{comment.name}</p>
                                                        <p className="text-sm text-white/80">{comment.content}</p>
                                                    </div>
                                                    <span className="text-[10px] text-white/40 ml-1 mt-1 block">
                                                        {new Date(comment.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-white/40 text-sm">
                                            No comments yet. Be the first!
                                        </div>
                                    )}
                                </div>

                                {/* Interaction Area */}
                                <div className="p-4 border-t border-white/10 bg-black/60 flex-shrink-0">
                                    <div className="flex items-center gap-4 mb-3">
                                        <button
                                            onClick={(e) => handleLike(e, selectedActivity)}
                                            className="flex items-center gap-2 text-white/60 hover:text-red-500 transition-colors group"
                                        >
                                            <FaHeart className={`text-lg transition-transform group-active:scale-125 ${selectedActivity.likes > 0 ? 'text-red-500' : ''}`} />
                                            <span className="text-sm font-semibold">{selectedActivity.likes || 0} Likes</span>
                                        </button>
                                    </div>

                                    {/* Comment Form */}
                                    <form onSubmit={handlePostComment} className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={commentForm.name}
                                                onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                                                className="w-1/3 text-xs sm:text-sm px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-[#00B4D8] focus:outline-none text-white"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="Add a comment..."
                                                value={commentForm.content}
                                                onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                                                className="w-2/3 text-xs sm:text-sm px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-[#00B4D8] focus:outline-none text-white"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={submittingComment}
                                            className="ml-auto text-xs font-bold text-[#00B4D8] hover:text-[#33c0e9] disabled:opacity-50 uppercase tracking-wider transition-colors"
                                        >
                                            {submittingComment ? 'Posting...' : 'Post Comment'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Gallery;
