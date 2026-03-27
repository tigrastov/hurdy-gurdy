const API_BASE = 'https://v3078514.hosted-by-vdsina.ru/api';

// Общая функция для запросов
const request = async (endpoint, options = {}) => {
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

// Кухня
export const kitchenAPI = {
  getAll: () => request('/kitchen.php'),
  add: (data) => request('/kitchen/add.php', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => request('/kitchen/delete.php', { method: 'DELETE', body: JSON.stringify({ id }) }),
  update: (data) => request('/kitchen/update.php', { method: 'PUT', body: JSON.stringify(data) }),
};

// Афиша
export const eventsAPI = {
  getAll: () => request('/events.php'),
  add: (data) => request('/events/add.php', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => request('/events/delete.php', { method: 'DELETE', body: JSON.stringify({ id }) }),
  update: (data) => request('/events/update.php', { method: 'PUT', body: JSON.stringify(data) }),
  cleanup: () => request('/events/cleanup.php', { method: 'DELETE' }),
};

// Галерея
export const galleryAPI = {
  getAll: () => request('/gallery.php'),
  add: (data) => request('/gallery/add.php', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => request('/gallery/delete.php', { method: 'DELETE', body: JSON.stringify({ id }) }),
  update: (data) => request('/gallery/update.php', { method: 'PUT', body: JSON.stringify(data) }),
};