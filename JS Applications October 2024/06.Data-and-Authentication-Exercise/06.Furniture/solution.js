function solve() {
    const baseUrl = 'http://localhost:3030';

    async function register(email, password) {
        try {
            const response = await fetch(`${baseUrl}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data));
            window.location = 'homeLogged.html'; 
        } catch (error) {
            alert(error.message);
        }
    }

    async function login(email, password) {
        try {
            const response = await fetch(`${baseUrl}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data));
            window.location = 'homeLogged.html'; 
        } catch (error) {
            alert(error.message);
        }
    }

    async function logout() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.accessToken) {
            await fetch(`${baseUrl}/users/logout`, {
                method: 'GET',
                headers: {
                    'X-Authorization': user.accessToken
                }
            });
        }
        localStorage.removeItem('user');
        window.location = 'index.html'; 
    }

    async function getFurniture() {
        const response = await fetch(`${baseUrl}/data/furniture`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        return response.json();
    }

    async function createFurniture(furniture) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.accessToken) return;

        const response = await fetch(`${baseUrl}/data/furniture`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify(furniture)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        return response.json();
    }

    async function buyFurniture(orders) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.accessToken) return;

        const response = await fetch(`${baseUrl}/data/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify(orders)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        return response.json();
    }

    document.getElementById('register-form')?.addEventListener('submit', onRegister);
    document.getElementById('login-form')?.addEventListener('submit', onLogin);
    document.getElementById('logoutBtn')?.addEventListener('click', onLogout);
    document.getElementById('create-form')?.addEventListener('submit', onCreate);
    document.querySelector('.buy')?.addEventListener('click', onBuy);
    document.getElementById('show-orders-btn')?.addEventListener('click', onAllOrders);

    window.addEventListener('load', loadFurniture);

    async function onRegister(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        if (!formData.get('email') || !formData.get('password') || !formData.get('rePass')) {
            return alert('All fields are required');
        }
        if (formData.get('password') !== formData.get('rePass')) {
            return alert('Passwords do not match');
        }

        await register(formData.get('email'), formData.get('password'));
    }

    async function onLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        await login(formData.get('email'), formData.get('password'));
    }

    async function onLogout() {
        await logout();
    }

    async function loadFurniture() {
        const furniture = await getFurniture();
        const table = document.querySelector('.table tbody');
        if (!table) return;

        const rows = furniture.map(item => `
            <tr>
                <td><img src="${item.img}"></td>
                <td><p>${item.name}</p></td>
                <td><p>${item.price}</p></td>
                <td><p>${item.factor}</p></td>
                <td><input type="checkbox" data-id="${item._id}" ${localStorage.getItem('user') ? '' : 'disabled'}/></td>
            </tr>
        `).join('');

        table.innerHTML = rows;
    }

    async function onCreate(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const furniture = {
            name: formData.get('name'),
            price: formData.get('price'),
            factor: formData.get('factor'),
            img: formData.get('img')
        };

        if (!furniture.name || !furniture.price || !furniture.factor || !furniture.img) {
            return alert('All fields are required');
        }

        await createFurniture(furniture);
        event.target.reset();
        await loadFurniture();
    }

    async function onBuy() {
        if (!loggedIn) return;
    
        const checkedItems = document.querySelectorAll('.table tbody tr input[type="checkbox"]:checked');
        if (checkedItems.length === 0) {
            return alert('No items selected for purchase');
        }
    
        const furniture = Array.from(checkedItems).map(cb => cb.getAttribute('data-id'));
        const totalSum = Array.from(checkedItems).reduce((sum, cb) => {
            const row = cb.parentElement.parentElement;
            const price = Number(row.children[2].textContent);
            return sum + price;
        }, 0);
    
        const order = {
            boughtFurniture: furniture,
            totalSum: totalSum,
            _ownerId: userId
        };
    
        await buyFurniture(order);
        await loadFurniture();
    }
    

    async function onAllOrders() {
        if (!loggedIn) return;
    
        const response = await fetch(`${baseUrl}/data/orders?where=_ownerId%3D%22${userId}%22`);
        const ordersData = await response.json();
    
        const ordersElement = document.querySelector('.orders');
        if (!ordersData.length) {
            ordersElement.innerHTML = `
                <p>Bought furniture: <span>Nothing bought yet!</span></p>
                <p>Total price: <span>0 $</span></p>`;
            return;
        }
    
        const boughtFurniture = ordersData.reduce((acc, order) => [...acc, ...order.boughtFurniture], []);
        const totalSum = ordersData.reduce((a, c) => a + Number(c.totalSum), 0);
    
        ordersElement.innerHTML = `
            <p>Bought furniture: <span>${boughtFurniture.join(', ')}</span></p>
            <p>Total price: <span>${totalSum} $</span></p>`;
    }
}

solve();