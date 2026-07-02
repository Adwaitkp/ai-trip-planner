import api from './axiosInstance';

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  profile: () => api.get('/auth/profile'),
};

export const uploadApi = {
  upload: (formData) => api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

export const itineraryApi = {
  generate: (uploadId) => api.post('/itinerary/generate', { uploadId }),
  getAll: () => api.get('/itinerary'),
  getById: (id) => api.get(`/itinerary/${id}`),
  delete: (id) => api.delete(`/itinerary/${id}`),
  toggleShare: (id) => api.patch(`/itinerary/${id}/share`),
};

export const shareApi = {
  getShared: (shareId) => api.get(`/share/${shareId}`),
};