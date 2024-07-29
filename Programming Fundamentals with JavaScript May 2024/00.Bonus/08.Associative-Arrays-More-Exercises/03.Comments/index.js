function comments(arr) {
    const articles = new Set();
    const users = new Set();
    const result = {};

    for (const command of arr) {
        if (command.includes('user ')) {
            const userToAdd = command.split('user ')[1];
            users.add(userToAdd);
        }
        else if (command.includes('article ')) {
            const articleToAdd = command.split('article ')[1];
            articles.add(articleToAdd);
        }
        else if (command.includes(' posts on ')) {
            const [username, rest] = command.split(' posts on ');
            const [article, comment] = rest.split(': ');
            const [title, content] = comment.split(', ');

            if ((users.has(username)) && (articles.has(article))) {
                if (!(result[article])) {
                    result[article] = [];
                }

                result[article].push({
                    username,
                    commentTitle: title,
                    commentContent: content,
                });
            }
        }
    }

    const sortedArticles = Object.entries(result).sort((a, b) => b[1].length - a[1].length);

    for (const [article, comments] of sortedArticles) {
        console.log(`Comments on ${article}`);

        comments.sort((a, b) => a.username.localeCompare(b.username));

        for (const comment of comments) {
            console.log(`--- From user ${comment.username}: ${comment.commentTitle} - ${comment.commentContent}`);
        }
    }
}

comments(['user aUser123', 'someUser posts on someArticle: NoTitle, stupidComment', 'article Books', 'article Movies', 'article Shopping', 'user someUser', 'user uSeR4', 'user lastUser', 'uSeR4 posts on Books: I like books, I do really like them', 'uSeR4 posts on Movies: I also like movies, I really do', 'someUser posts on Shopping: title, I go shopping every day', 'someUser posts on Movies: Like, I also like movies very much']);