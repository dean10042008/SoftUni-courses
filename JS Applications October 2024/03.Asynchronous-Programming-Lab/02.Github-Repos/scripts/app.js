async function loadRepos() {
	let repoListEl = document.querySelector("#repos");
	repoListEl.innerHTML = "";

	const input = document.querySelector("input").value;
	if (input === " ") return;

	try {
		const res = await fetch(`https://api.github.com/users/${input}/repos`);
		const data = await res.json();
		
		for (const repo of data) {
			const li = document.createElement("li");
			
			const a = document.createElement("a");
			a.textContent = repo.full_name;
			a.setAttribute("href", repo.html_url);

			li.appendChild(a);
			repoListEl.appendChild(li);
		}
	}
	catch (error) {
        repoListEl.innerHTML = "There was an error. Try again."
    }
}