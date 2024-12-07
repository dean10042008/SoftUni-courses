const baseUrl = "http://localhost:3030";

export const endpoints = {
    register: `${baseUrl}/users/register`,
    login: `${baseUrl}/users/login`,
    logout: `${baseUrl}/users/logout`,
    catalog: `${baseUrl}/data/cars?sortBy=_createdOn%20desc`,
    create: `${baseUrl}/data/cars`,
    search: (query) => `${baseUrl}/data/cars?where=model%20LIKE%20%22${query}%22`,
    details: (id) => `${baseUrl}/data/cars/${id}`,
    delete: (id) => `${baseUrl}/data/cars/${id}`,
    own: (motorcycleId, userId) => `/data/cars?where=_id%3D%22${motorcycleId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};