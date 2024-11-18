const baseUrl = "http://localhost:3030";

export const endpoints = {
    register: `${baseUrl}/users/register`,
    login: `${baseUrl}/users/login`,
    logout: `${baseUrl}/users/logout`,
    getAllItems: `${baseUrl}/data/cyberpunk?sortBy=_createdOn%20desc`,
    createItem: `${baseUrl}/data/cyberpunk`,
    getItemDetails: (id) => `${baseUrl}/data/cyberpunk/${id}`,
    editItemDetails: (id) => `${baseUrl}/data/cyberpunk/${id}`,
};