const baseUrl = "http://localhost:3030";

export const endpoints = {
    register: `${baseUrl}/users/register`,
    login: `${baseUrl}/users/login`,
    logout: `${baseUrl}/users/logout`,
    getAllItems: `${baseUrl}/data/solutions?sortBy=_createdOn%20desc`,
    createItem: `${baseUrl}/data/solutions`,
    getItemDetails: (id) => `${baseUrl}/data/solutions/${id}`,
    editItemDetails: (id) => `${baseUrl}/data/solutions/${id}`,
    deleteItem: (id) => `${baseUrl}/data/solutions/${id}`,
    getItemLikes: (solutionId) => `${baseUrl}/data/likes?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`,
    hasUserLikedItem: (itemId, userId) => `${baseUrl}/data/likes?where=solutionId%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    likeItem: `${baseUrl}/data/likes`,
};