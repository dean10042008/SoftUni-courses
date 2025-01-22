const form = document.querySelector('.createForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const { title, genre, description, imageUrl, director, year, rating, category } = Object.fromEntries(new FormData(e.currentTarget));

    try {
        if (title === "" || genre === "" || description === "" || imageUrl === "" || director === "" || year === "" || rating === "" || category === "") {
            throw new Error("All fields are required!");
        }

        const res = await fetch('http://localhost:5001/createMovie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, genre, description, imageUrl, director, year, rating, category })
        });

        if (! res.ok) {
            const data = await res.json();
            throw new Error(data.message);
        }

        window.location.href = '/';
    }
    catch (err) {
        alert(err.message);
        console.error(err);
    }
});