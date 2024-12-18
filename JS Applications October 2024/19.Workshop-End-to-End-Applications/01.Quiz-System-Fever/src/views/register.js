import { html, render, page } from "../../modules/modules.js";

const main = document.querySelector('body > #container > #content');

const template = (formHandler) => html`
    <section id="register">
        <div class="pad-large">
            <div class="glass narrow">
                <header class="tab layout">
                    <a class="tab-item" href="/login">Login</a>
                    <h1 class="tab-item active">Register</h1>
                </header>
                <form @submit=${formHandler} class="pad-med centered">
                    <label class="block centered">Username: <input class="auth-input input" type="text"
                            name="username" /></label>
                    <label class="block centered">Email: <input class="auth-input input" type="text"
                            name="email" /></label>
                    <label class="block centered">Password: <input class="auth-input input" type="password"
                            name="password" /></label>
                    <label class="block centered">Repeat: <input class="auth-input input" type="password"
                            name="repass" /></label>
                    <input class="block action cta" type="submit" value="Create Account" />
                </form>
                <footer class="tab-footer">
                    Already have an account? <a class="invert" href="/login">Sign in here</a>.
                </footer>
            </div>
        </div>
    </section>
`;

export function registerView() {
    render(template(registerHandler), main);
}

async function registerHandler(e) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const formData = Object.fromEntries(form);

    if (!Object.values(formData).every(value => !!value)) {
        alert('All fields are required!');
        return;
    }

    if (formData.password !== formData.repass) {
        alert('Passwords do not match!');
        return;
    }

    const registerURL = 'http://localhost:5001/users/register';

    const res = await fetch(registerURL, {
        method: 'POST',
        body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json();
    if (data.message === 'Account registered successfully!') {
        localStorage.setItem('userData', JSON.stringify(data.data));
        page.redirect('/');
        return;
    }
    if (data.message !== 'Account registered successfully!') {
        return alert(data.message);
    }
}