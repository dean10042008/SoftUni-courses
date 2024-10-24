async function loadCommits() {
    const commitsListEl = document.querySelector("#commits");
    commitsListEl.innerHTML = "";

    const [usernameEl, repoEl] = document.querySelectorAll("input");
    const username = usernameEl.value;
    const repo = repoEl.value;

    if (username === "" || repo === "") return;

    try {
        const res = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
        const data = await res.json();
        
        for (const commit of data) {
            console.log(commit);
            const li = document.createElement("li");
            li.textContent = `${commit.commit.author.name}: ${commit.commit.message}`;
            commitsListEl.appendChild(li);
        }
    }
    catch (error) {
        const li = document.createElement("li");
        li.textContent = `Error: ${error} (Not Found)`;
        commitsListEl.appendChild(li);
    }
}