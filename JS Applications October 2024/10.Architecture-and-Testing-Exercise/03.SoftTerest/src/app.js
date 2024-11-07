const [nav, home, register, login, dashboard, detail, create] = document.querySelectorAll(".container, #dashboard-holder");
showHome();
handleNavChanges();

const views = {
    "/home": showHome,
    "/register": showRegister,
    "/login": showLogin,
    "/dashboard": showDashboard,
    "/details": showDetail,
    "/create": showCreate,
    "/logout": logoutUser
}

const links = document.querySelectorAll("a");

links.forEach(link => link.addEventListener("click", (e) => {
    e.preventDefault();
    const path = link.getAttribute("href");
    if (path in views) {
        views[path]();
    }
}));

const loginForm = document.querySelector("#form-login");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

    try {
        const response = await fetch("http://localhost:3030/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error("Invalid credentials!");
        }

        const data = await response.json();
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", data._id);
        loginForm.reset();
        showHome();
        handleNavChanges();
    }
    catch (error) {
        console.error(error);
        alert(error.message);
    }
});

const registerForm = document.querySelector("#form-register");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { email, password, repeatPassword } = Object.fromEntries(new FormData(e.currentTarget));

    if (password.length < 3) {
        alert("Password should be at least 3 characters long!");
        throw new Error("Password should be at least 3 characters long!");
    }

    if (email.length < 3) {
        alert("Email should be at least 3 characters long!");
        throw new Error("Email should be at least 3 characters long!");
    }

    if (password !== repeatPassword) {
        alert("Passwords do not match!");
        throw new Error("Passwords do not match!");
    }

    try {
        const response = await fetch("http://localhost:3030/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error("Registration failed!");
        }

        const data = await response.json();
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", data._id);
        showHome();
        handleNavChanges();
    }
    catch (error) {
        console.error(error);
        alert(error.message);
    }
});

async function logoutUser() {
    try {
        const response = await fetch("http://localhost:3030/users/logout", {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'X-Authorization': localStorage.getItem("accessToken"),
            }
        });

        if (!response.ok) {
            throw new Error("Logout failed!");
        }

        localStorage.clear();
        showHome();
        handleNavChanges();
    }
    catch (error) {
        console.error(error);
        alert(error.message);
    }
}

async function loadIdeas() {
    try {
        const response = await fetch("http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc");
        if (!response.ok) {
            throw new Error("Failed to load ideas!");
        }

        const data = await response.json();

        dashboard.innerHTML = "";

        if (data.length === 0) {
            const h1 = document.createElement("h1");
            h1.innerHTML = "No ideas yet! Be the first one :)";
            dashboard.appendChild(h1);
        }
        else {
            for (const ideaItem of data) {
                const el = createIdeaOverview(ideaItem.title, ideaItem.img, ideaItem._id);
                dashboard.appendChild(el);
            }
        }
    }
    catch (error) {
        console.error(error);
        alert(error.message);
    }
}

function handleNavChanges() {
    const [dashboardLinkEl, createLinkEl, logoutLinkEl, loginLinkEl, registerLinkEl] = document.querySelectorAll(".nav-link");

    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

    if (isLoggedIn) {
        createLinkEl.style.display = "block";
        logoutLinkEl.style.display = "block";
        loginLinkEl.style.display = "none";
        registerLinkEl.style.display = "none";
    }
    else if (!isLoggedIn || isLoggedIn === null) {
        createLinkEl.style.display = "none";
        logoutLinkEl.style.display = "none";
        loginLinkEl.style.display = "block";
        registerLinkEl.style.display = "block";
    }
}

function createIdeaOverview(cardText, imageUrl, id) {
    const outerDiv = document.createElement("div");
    outerDiv.classList.add("card");
    outerDiv.classList.add("overflow-hidden");
    outerDiv.classList.add("current-card");
    outerDiv.classList.add("details");

    outerDiv.style.width = "20rem";
    outerDiv.style.height = "18rem";

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTextEl = document.createElement("p");
    cardTextEl.classList.add("card-text");
    cardTextEl.textContent = cardText;

    cardBody.appendChild(cardTextEl);

    const cardImg = document.createElement("img");
    cardImg.src = imageUrl;
    cardImg.classList.add("card-image");
    cardImg.alt = "Card image cap";

    const a = document.createElement("a");
    a.href = "";
    a.classList.add("btn");
    a.textContent = "Details";

    a.addEventListener("click", (e) => {
        e.preventDefault();
        createIdeaDetails(id);
    });

    outerDiv.appendChild(cardBody);
    outerDiv.appendChild(cardImg);
    outerDiv.appendChild(a);

    return outerDiv;
}

async function createIdeaDetails(id) {
    showDetail();

    detail.innerHTML = "";

    try {
        const response = await fetch(`http://localhost:3030/data/ideas/${id}`);

        if (!response.ok) {
            throw new Error("Failed to load details!");
        }

        const data = await response.json();
        const isOwner = data._ownerId === localStorage.getItem("userId");

        const imgEl = document.createElement("img");
        imgEl.src = data.img;
        imgEl.classList.add("det-img");

        const descDiv = document.createElement("div");
        descDiv.classList.add("desc");

        const titleEl = document.createElement("h2");
        titleEl.classList.add("display-5");
        titleEl.textContent = data.title;

        const descStaticEl = document.createElement("p");
        descStaticEl.textContent = "Description:";
        descStaticEl.classList.add("infoType");

        const descActualP = document.createElement("p");
        descActualP.textContent = data.description;
        descActualP.classList.add("idea-description");

        descDiv.appendChild(titleEl);
        descDiv.appendChild(descStaticEl);
        descDiv.appendChild(descActualP);

        const deleteBtnDiv = document.createElement("div");
        deleteBtnDiv.classList.add("text-center");

        const deleteEl = document.createElement("a");
        deleteEl.href = "";
        deleteEl.classList.add("btn");
        deleteEl.classList.add("detb");
        deleteEl.textContent = "Delete";

        detail.appendChild(imgEl);
        detail.appendChild(descDiv);

        if (isOwner) {
            deleteBtnDiv.appendChild(deleteEl);
            detail.appendChild(deleteBtnDiv);

            deleteEl.addEventListener("click", async (e) => {
                e.preventDefault();
                
                try {
                    await fetch(`http://localhost:3030/data/ideas/${id}`, {
                        method: "DELETE",
                        headers: {
                            'X-Authorization': localStorage.getItem("accessToken"),
                        }
                    });
                    
                    showDashboard();
                }
                catch (error) {
                    console.error(error);
                    alert(error.message);
                }
            });
        }
    }
    catch (error) {
        console.error(error);
        alert(error.message);
    }
}

const ideaForm = document.querySelector("#form-idea");
ideaForm.addEventListener("submit", createNewIdea);

async function createNewIdea(e) {
    e.preventDefault();
    const { title, description, imageURL } = Object.fromEntries(new FormData(e.currentTarget));
    
    if (title.length < 6) {
        alert("Title should be at least 6 characters long!");
        throw new Error("Title should be at least 6 characters long!");
    }
    if (description.length < 10) {
        alert("Description should be at least 10 characters long!");
        throw new Error("Description should be at least 10 characters long!");
    }

    if (imageURL.length < 6) {
        alert("Image URL should be at least 6 characters long!");
        throw new Error("Image URL should be at least 6 characters long!");
    }

    try {
        await fetch("http://localhost:3030/data/ideas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken")
            },
            body: JSON.stringify({ 
                title, description,
                img: imageURL,
            })
        });

        ideaForm.reset();
        showDashboard();
    }
    catch (error) {
        console.error(error);
        alert(error.message);
    }
}

function showHome() {
    home.style.display = 'block';
    register.style.display = 'none';
    login.style.display = 'none';
    dashboard.style.display = 'none';
    detail.style.display = 'none';
    create.style.display = 'none';
}

function showRegister() {
    home.style.display = 'none';
    register.style.display = 'block';
    login.style.display = 'none';
    dashboard.style.display = 'none';
    detail.style.display = 'none';
    create.style.display = 'none';
}

function showLogin() {
    home.style.display = 'none';
    register.style.display = 'none';
    login.style.display = 'flex';
    dashboard.style.display = 'none';
    detail.style.display = 'none';
    create.style.display = 'none';
}

function showDashboard() {
    loadIdeas();

    home.style.display = 'none';
    register.style.display = 'none';
    login.style.display = 'none';
    dashboard.style.display = 'flex';
    detail.style.display = 'none';
    create.style.display = 'none';
}

function showDetail() {
    home.style.display = 'none';
    register.style.display = 'none';
    login.style.display = 'none';
    dashboard.style.display = 'none';
    detail.style.display = 'flex';
    create.style.display = 'none';
}

function showCreate() {
    home.style.display = 'none';
    register.style.display = 'none';
    login.style.display = 'none';
    dashboard.style.display = 'none';
    detail.style.display = 'none';
    create.style.display = 'block';
}