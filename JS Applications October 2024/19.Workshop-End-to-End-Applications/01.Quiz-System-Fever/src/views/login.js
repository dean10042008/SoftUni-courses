import { html, render, page } from "../../modules/modules.js";

const main = document.querySelector('body > #container > #content');

const template = (formHandler) => html`
    <section id="login">
        <div class="pad-large">
            <div class="glass narrow">
                <header class="tab layout">
                    <h1 class="tab-item active">Login</h1>
                    <a class="tab-item" href="/register">Register</a>
                </header>
                <form @submit=${formHandler} class="pad-med centered">
                    <label class="block centered">Email: <input class="auth-input input" type="text"
                            name="email" /></label>
                    <label class="block centered">Password: <input class="auth-input input" type="password"
                            name="password" /></label>
                    <input class="block action cta" type="submit" value="Sign In" />
                </form>
                <footer class="tab-footer">
                    Don't have an account? <a class="invert" href="/register">Create one here</a>.
                </footer>
            </div>
        </div>
    </section>
`;

export function loginView() {
    render(template(loginHandler), main);
}

async function loginHandler(e) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const formData = Object.fromEntries(form);

    if (!Object.values(formData).every(value => !!value)) {
        alert('All fields are required!');
        return;
    }

    const loginURL = 'http://localhost:5001/users/login';

    const res = await fetch(loginURL, {
        method: 'POST',
        body: JSON.stringify({
            email: formData.email,
            password: formData.password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await res.json();
    if (data.message === 'Account logged successfully!') {
        localStorage.setItem('userData', JSON.stringify(data.data));
        page.redirect('/');
        return;
    }
    if (data.message !== 'Account logged successfully!') {
        return alert(data.message);
    }
}