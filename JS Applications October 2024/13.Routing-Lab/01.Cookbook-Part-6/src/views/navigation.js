export function renderNavigation() {
    const email = localStorage.getItem('email');
    
    const userNavigation = document.getElementById('user');
    const guestNavigation = document.getElementById('guest');

    if (email && email !== 'undefined') {
        userNavigation.style.display = 'inline';
        guestNavigation.style.display = 'none';
    } else {
        userNavigation.style.display = 'none';
        guestNavigation.style.display = 'inline';
    }
}
