const baseUrl = 'http://localhost:3030/users';

function login(email, password) {
    return fetch(`${baseUrl}/login`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.code >= 400) {
                throw new Error('Something went wrong');
            }

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('email', data.email);
            localStorage.setItem('_id', data._id);
        })
}

function register(email, password) {
    return fetch(`${baseUrl}/register`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('email', data.email);
            localStorage.setItem('_id', data._id);

            return data;
        });
}

const auth = {
    login,
    register,
}

export default auth;
