import api from './api';

const uploadVideo = (formData, onUploadProgress) =>
    api.post('/videos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress,
    });

const getVideos = () => api.get('/videos');

export default { uploadVideo, getVideos };