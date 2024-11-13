export const endpoints = {
    register: "http://localhost:3030/users/register",
    login: "http://localhost:3030/users/login",
    logout: "http://localhost:3030/users/logout",
    create: "http://localhost:3030/data/catalog",
    getAll: "http://localhost:3030/data/catalog",
    details: (id) => `http://localhost:3030/data/catalog/${id}`,
    update: (id) => `http://localhost:3030/data/catalog/${id}`,
    delete: (id) => `http://localhost:3030/data/catalog/${id}`,
    getOwn: (userId) => `http://localhost:3030/data/catalog?where=_ownerId%3D%22${userId}%22`,
};