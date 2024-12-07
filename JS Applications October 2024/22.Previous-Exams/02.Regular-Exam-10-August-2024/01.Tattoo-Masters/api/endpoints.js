const baseUrl = "http://localhost:3030";

export const endpoints = {
    register: `${baseUrl}/users/register`,
    login: `${baseUrl}/users/login`,
    logout: `${baseUrl}/users/logout`,
    catalog: `${baseUrl}/data/tattoos?sortBy=_createdOn%20desc`,
    create: `${baseUrl}/data/tattoos`,
    like: `${baseUrl}/data/likes`,
    search: (query) => `${baseUrl}/data/tattoos?where=name%20LIKE%20%22${query}%22`,
    details: (id) => `${baseUrl}/data/tattoos/${id}`,
    delete: (id) => `${baseUrl}/data/tattoos/${id}`,
    edit: (id) => `${baseUrl}/data/tattoos/${id}`,
    own: (tattooId, userId) => `${baseUrl}/data/tattoos?where=_id%3D%22${tattooId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    totalLikes: (tattooId) => `${baseUrl}/data/likes?where=tattooId%3D%22${tattooId}%22&distinct=_ownerId&count`,
    userLikes: (tattooId, userId) => `${baseUrl}/data/likes?where=tattooId%3D%22${tattooId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};