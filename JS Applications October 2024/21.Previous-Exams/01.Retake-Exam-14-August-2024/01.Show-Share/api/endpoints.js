const baseUrl = "http://localhost:3030";

export const endpoints = {
    register: `${baseUrl}/users/register`,
    login: `${baseUrl}/users/login`,
    logout: `${baseUrl}/users/logout`,
    catalog: `${baseUrl}/data/shows?sortBy=_createdOn%20desc`,
    create: `${baseUrl}/data/shows`,
    search: (query) => `${baseUrl}/data/shows?where=title%20LIKE%20%22${query}%22`,
    details: (id) => `${baseUrl}/data/shows/${id}`,
    delete: (id) => `${baseUrl}/data/shows/${id}`,
    own: (showId, userId) =>
    `${baseUrl}/data/shows?where=showId%3D%22${showId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};