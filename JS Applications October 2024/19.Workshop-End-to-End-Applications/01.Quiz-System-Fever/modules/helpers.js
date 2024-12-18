import { page } from "./modules.js";

export async function getAll() {
    const response = await fetch("http://localhost:5001/data/quizzes");

    if (response.ok) {
        const data = await response.json();
        return data.data;
    }
}

export async function getOne(quizId) {
    const response = await fetch(`http://localhost:5001/data/&&quizIdDetails=${quizId}`);

    if (response.ok) {
        const data = await response.json();
        return data;
    }
}

export async function getAllQuestions(quizId) {
    const response = await fetch(`http://localhost:5001/data/questions/&&quizId=${quizId}`);

    if (response.ok) {
        const data = await response.json();
        return data;
    }
}

export function onDetailsClick(e = null, id) {
    e.preventDefault();
    page.redirect(`/browse/${id}`);
}

export function onProfileClick(e, isOwnPage = true, username) {
    e.preventDefault();
    if (isOwnPage) {
        page.redirect(`/profile/${JSON.parse(localStorage.getItem('userData')).username}`);
    }
    else {
        page.redirect(`/profile/${username}`);
    }
}