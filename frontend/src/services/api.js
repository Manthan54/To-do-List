import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userAPI = {
  login: (credentials) => api.post('/users/login', credentials),
  register: (userData) => api.post('/users', userData),
  getAllUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
  searchUsers: (username) => api.get(`/users/search?username=${username}`),
};

export const taskAPI = {
  getAllTasks: () => api.get('/tasks'),
  getTaskById: (id) => api.get(`/tasks/${id}`),
  createTask: (taskData) => api.post('/tasks', taskData),
  updateTask: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  getUserTasks: (userId) => api.get(`/tasks/user/${userId}`),
  getTaskAssignees: (taskId) => api.get(`/tasks/${taskId}/assignees`),
  assignTask: (taskId, userId) => api.post(`/tasks/${taskId}/assign/${userId}`),
  unassignTask: (taskId, userId) => api.delete(`/tasks/${taskId}/assign/${userId}`),
};

export default api;