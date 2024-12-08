const baseUrl = "http://localhost:3030";

export const endpoints = {
    register: `${baseUrl}/users/register`,
    login: `${baseUrl}/users/login`,
    logout: `${baseUrl}/users/logout`,
    getAllItems: `${baseUrl}/data/drones?sortBy=_createdOn%20desc`,
    createItem: `${baseUrl}/data/drones`,
    getItemDetails: (id) => `${baseUrl}/data/drones/${id}`,
    editItemDetails: (id) => `${baseUrl}/data/drones/${id}`,
};