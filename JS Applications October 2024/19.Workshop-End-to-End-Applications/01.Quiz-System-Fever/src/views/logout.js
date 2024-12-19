import { page } from "../../modules/modules.js";

export async function logout() {
    const logoutURL = 'http://localhost:5001/users/logout';

    const userData = JSON.parse(localStorage.getItem('userData'));
    const accessToken = userData.accessToken;

    const res = await fetch(logoutURL, {
        method: 'GET',
        headers: {
            'x-authorization': accessToken
        }
    });
    const data = await res.json();
    if (data.message === 'Logout successful!') {
        localStorage.clear();
        page.redirect('/');
        return;
    }
    if (data.message === 'Failed to find user!') {
        localStorage.clear();
        confirm(data.message);
        page.redirect('/');
    }
}