function attachEvents() {
    const loadPostsBtn = document.querySelector("#btnLoadPosts");
    const viewCommentsBtn = document.querySelector("#btnViewPost");
    const postsEl = document.querySelector("#posts");
    const postTitleEl = document.querySelector("#post-title");
    const postBodyEl = document.querySelector("#post-body");
    const postCommentsEl = document.querySelector("#post-comments");

    postTitleEl.innerHTML = "";
    postBodyEl.innerHTML = "";
    
    const bodies = {};
    
    loadPostsBtn.addEventListener("click", async () => {
        const postsRes = await fetch("http://localhost:3030/jsonstore/blog/posts");
        const postsData = Object.values(await postsRes.json());
        
        for (const element of postsData) {
            const option = document.createElement("option");
            option.value = element.id;
            option.textContent = element.title;

            bodies[element.title] = [element.body, element.id];

            postsEl.appendChild(option);
        }
    });

    viewCommentsBtn.addEventListener("click", async () => {
        postCommentsEl.innerHTML = "";

        const commentsRes = await fetch(`http://localhost:3030/jsonstore/blog/comments`);
        const comments = Object.values(await commentsRes.json());
        
        const selectedPost = postsEl.selectedOptions[0].text;
        const [body, postId] = bodies[selectedPost];

        const filteredComments = comments.filter(comment => comment.postId === postId);
        
        postTitleEl.textContent = selectedPost;
        postBodyEl.textContent = body;

        for (const comment of filteredComments) {
            const li = document.createElement("li");
            li.textContent = comment.text;

            postCommentsEl.appendChild(li);
        }
    });
}

attachEvents();