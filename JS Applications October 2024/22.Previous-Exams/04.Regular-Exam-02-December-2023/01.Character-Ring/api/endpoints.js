const baseUrl = "http://localhost:3030";

export const endpoints = {
    register: `${baseUrl}/users/register`,
    login: `${baseUrl}/users/login`,
    logout: `${baseUrl}/users/logout`,
    getAllItems: `${baseUrl}/data/characters?sortBy=_createdOn%20desc`,
    createItem: `${baseUrl}/data/characters`,
    likeItem: `${baseUrl}/data/useful`,
    getItemDetails: (id) => `${baseUrl}/data/characters/${id}`,
    editItemDetails: (id) => `${baseUrl}/data/characters/${id}`,
    deleteItem: (id) => `${baseUrl}/data/characters/${id}`,
    getItemLikes: (characterId) => `${baseUrl}/data/useful?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`,
    hasUserLikedItem: (characterId, userId) => `${baseUrl}/data/useful?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};