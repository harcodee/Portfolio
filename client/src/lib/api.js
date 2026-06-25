import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export const getProjects = (featured) => {
  const params = featured !== undefined ? { featured } : {};
  return api.get('/projects', { params });
};

export const getProject = (slug) => api.get(`/projects/${slug}`);

export const getSkills = () => api.get('/skills');

export const getResumePath = () => '/api/resume';

export const getResumeTimeline = () => api.get('/resume/timeline');

export const getConfig = () => api.get('/config');

export const postContact = (data) => api.post('/contact', data);

export default api;
