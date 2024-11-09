import { html, render } from "./node_modules/lit-html/lit-html.js";

let addForm, editForm;
const baseUrl = "http://localhost:3030/jsonstore/collections/books";

document.addEventListener("DOMContentLoaded", () => {
    render(renderInitialLayout(), document.body);
    addForm = document.getElementById("add-form");
    addForm.addEventListener("submit", addBook);

    editForm = document.getElementById("edit-form");
    editForm.remove();
});

function renderInitialLayout() {
    return html`
        <button @click=${loadBooks} id="loadBooks">LOAD ALL BOOKS</button>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>

        <form id="add-form">
            <h3>Add book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title...">
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author...">
            <input type="submit" value="Submit">
        </form>

        <form id="edit-form">
            <input type="hidden" name="id">
            <h3>Edit book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title...">
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author...">
            <input type="submit" value="Save">
        </form>
    `;
}


async function loadBooks(e) {
    e.preventDefault();

    try {
        const response = await fetch(baseUrl);
        const booksData = await response.json();
        
        const rows = Object.entries(booksData).map(([id, { title, author }]) => {
            return renderBookRow(title, author, id);
        });
        
        render(html`${rows}`, document.querySelector("tbody"));
    }
    catch (error) {
        console.error(error);
    }
}

function renderBookRow(title, author, id) {
    return html`
        <tr>
            <td>${title}</td>
            <td>${author}</td>
            <td>
                <button @click=${editBook} data-id=${id}>Edit</button>
                <button @click=${deleteBook} data-id=${id}>Delete</button>
            </td>
        </tr>
    `;
}

async function addBook(e) {
    e.preventDefault();

    const { title, author } = Object.fromEntries(new FormData(e.currentTarget));
    
    if (title === "" || author === "") return;

    try {
        await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, author })
        });

        addForm.reset();
    }
    catch (error) {
        console.error(error);
    }
}

async function editBook(e) {
    e.preventDefault();

    addForm.remove();
    document.body.appendChild(editForm);

    const id = e.target.dataset.id;

    const { title, author } = await getBookById(id);
    
    const titleEl = editForm.querySelector("input[name='title']");
    const authorEl = editForm.querySelector("input[name='author']");

    titleEl.value = title;
    authorEl.value = author;

    editForm.querySelector("input[type=submit]").addEventListener("click", async (e) => {
        e.preventDefault();

        try {
            await fetch(baseUrl + `/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: titleEl.value, author: authorEl.value })
            });

            editForm.remove();
            document.body.appendChild(addForm);
        }
        catch (error) {
            console.error(error);
        }
    });
}

async function deleteBook(e) {
    e.preventDefault();

    const id = e.target.dataset.id;

    try {
        await fetch(baseUrl + `/${id}`, { method: "DELETE" });

        const row = e.target.parentNode.parentNode;
        row.remove();
    }
    catch (error) {
        console.error(error);
    }
}

async function getBookById(id) {
    try {
        const response = await fetch(`${baseUrl}/${id}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
}