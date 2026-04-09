const API_BASE = 'https://v3078514.hosted-by-vdsina.ru/api';

const getToken = () => localStorage.getItem('token');

// Запросы без авторизации (для публичных страниц)
const publicRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  
  return response.json();
};

// Запросы с авторизацией (для админки)
const authRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  
  return response.json();
};

// Публичные методы (без авторизации)
export const kitchenAPI = {
  getAll: () => publicRequest('/kitchen.php'),
};

export const eventsAPI = {
  getAll: () => publicRequest('/events.php'),
};

export const galleryAPI = {
  getAll: () => publicRequest('/gallery.php'),
};

// Защищённые методы (с авторизацией)
export const kitchenAdminAPI = {
  add: (data) => authRequest('/kitchen/add.php', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => authRequest('/kitchen/delete.php', { method: 'DELETE', body: JSON.stringify({ id }) }),
  update: (data) => authRequest('/kitchen/update.php', { method: 'PUT', body: JSON.stringify(data) }),
};

export const eventsAdminAPI = {
  add: (data) => authRequest('/events/add.php', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => authRequest('/events/delete.php', { method: 'DELETE', body: JSON.stringify({ id }) }),
  update: (data) => authRequest('/events/update.php', { method: 'PUT', body: JSON.stringify(data) }),
  cleanup: () => authRequest('/events/cleanup.php', { method: 'DELETE' }),
};

export const galleryAdminAPI = {
  add: (data) => authRequest('/gallery/add.php', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => authRequest('/gallery/delete.php', { method: 'DELETE', body: JSON.stringify({ id }) }),
  update: (data) => authRequest('/gallery/update.php', { method: 'PUT', body: JSON.stringify(data) }),
};