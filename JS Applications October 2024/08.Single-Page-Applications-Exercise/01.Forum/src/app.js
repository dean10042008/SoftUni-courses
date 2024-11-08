const postsUrl = "http://localhost:3030/jsonstore/collections/myboard/posts";
const commentUrl = "http://localhost:3030/jsonstore/collections/myboard/comments";

const [cancelBtn, postBtn] = document.querySelectorAll(".new-topic-buttons > *");
const [topicNameEl, usernameEl, postTextEl] = document.querySelectorAll(".new-topic-title > input, .new-topic-content > textarea");
const postList = document.querySelector(".topic-title");
const newPostEl = document.querySelector(".new-topic-border");
const commentList = document.querySelector(".theme-content");

let id = "";

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch(postsUrl);
    const posts = Object.values(await response.json());

    postList.innerHTML = "";
    commentList.style.display = "none";

    posts.forEach(post => {
        postList.appendChild(createBlogTopic(post.content, post.username, post.time, post.title, post._id));
    });
});

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();

    topicNameEl.value = "";
    usernameEl.value = "";
    postTextEl.value = "";
});

postBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (topicNameEl.value === "" || usernameEl.value === "" || postTextEl.value === "") return;

    try {
        const topic = topicNameEl.value;
        const username = usernameEl.value;
        const content = postTextEl.value;
        const time = new Date();

        const res = await fetch(postsUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: topic,
                username,
                content,
                time,
            }),
        });

        const data = await res.json();

        postList.appendChild(createBlogTopic(data.content, data.username, data.time, data.title, data._id));

        topicNameEl.value = "";
        usernameEl.value = "";
        postTextEl.value = "";
    }
    catch (error) {
        console.error("Error posting new topic:", error);
    }
});

const addCommentForm = document.querySelector(".answer form");

addCommentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const [postTextEl, usernameEl] = addCommentForm.querySelectorAll("textarea input");

    if (postTextEl.value === "" || usernameEl.value === "") return;

    try {
        const content = postTextEl.value;
        const username = usernameEl.value;
        const time = new Date().toISOString();

        addCommentForm.reset();

        await fetch(commentUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content,
                username,
                time,
                postId: id,
            }),
        });

        document.querySelector(".comment").appendChild(addNewComment(content, username, time));
    }
    catch (error) {
        console.error("Error adding comment:", error);
    }
});

function addNewComment(content, username, time) {
    const userCommentDiv = document.createElement("div");
    userCommentDiv.id = "user-comment";

    userCommentDiv.innerHTML = `
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <p><strong>${username}</strong> commented on <time>${time}</time></p>
                <div class="post-content">
                    <p>${content}</p>
                </div>
            </div>
        </div>
    `;

    return userCommentDiv;
};

function createBlogTopic(content, username, time, topic, topicId) {
    const div = document.createElement("div");
    div.classList.add("topic-container");

    const topicNameWrapperDiv = document.createElement("div");
    topicNameWrapperDiv.classList.add("topic-name-wrapper");

    const topicNameDiv = document.createElement("div");
    topicNameDiv.classList.add("topic-name");

    const a = document.createElement("a");

    const h2 = document.createElement("h2");
    h2.textContent = topic;

    a.appendChild(h2);

    h2.addEventListener("click", async (e) => {
        e.preventDefault();
        postList.style.display = "none";
        newPostEl.style.display = "none";
        commentList.style.display = "block";

        id = topicId;

        const res = await fetch(postsUrl + `/${id}`);
        const { content, time, title, username } = await res.json();

        const themeTitle = document.createElement("div");
        themeTitle.classList.add("theme-title");

        themeTitle.innerHTML = `
                <div class="theme-name-wrapper">
                    <div class="theme-name">
                        <h2>${title}</h2>
                    </div>
                </div>
            `;

        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");

        commentDiv.innerHTML = `
                <div class="header">
                    <img src="./static/profile.png" alt="avatar">
                    <p><span>${username}</span> posted on <time>${new Date(time).toUTCString()}</time></p>
                    
                    <p class="post-content">${content}</p>
                </div>
            `;
        try {
            const commentsRes = await fetch(commentUrl);
            const comments = Object.values(await commentsRes.json()).filter(comment => comment.postId === id);

            comments.forEach(({ content, username, time }) => {
                commentDiv.appendChild(addNewComment(content, username, time));
            });
        }
        catch (error) {
            console.error(error);
        }

        commentList.prepend(themeTitle, commentDiv);
    });

    topicNameDiv.appendChild(a);

    const columnsDiv = document.createElement("div");
    columnsDiv.classList.add("columns");

    const innerColumnsDiv = document.createElement("div");

    const p = document.createElement("p");
    p.textContent = content;
    p.innerHTML = `Date: <time>${(new Date(time)).toDateString() || "N/A"}</time>`;

    innerColumnsDiv.appendChild(p);

    const nicknameDiv = document.createElement("div");
    nicknameDiv.classList.add("nick-name");

    const pNickname = document.createElement("p");
    pNickname.innerHTML = `Username: <span>${username}</span>`;

    nicknameDiv.appendChild(pNickname);
    innerColumnsDiv.appendChild(nicknameDiv);

    columnsDiv.appendChild(innerColumnsDiv);
    topicNameDiv.appendChild(columnsDiv);
    topicNameWrapperDiv.appendChild(topicNameDiv);

    div.appendChild(topicNameWrapperDiv);

    return div;
}

const homeBtn = document.querySelector("nav ul li a");
homeBtn.addEventListener("click", (e) => {
    e.preventDefault();

    postList.style.display = "block";
    newPostEl.style.display = "block";
    commentList.querySelector(".theme-title").remove();
    commentList.querySelector(".comment").remove();
    commentList.style.display = "none";
});