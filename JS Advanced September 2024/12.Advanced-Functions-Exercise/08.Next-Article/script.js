function getArticleGenerator(articles) {
    let container = document.getElementById("content")
    
    function displayNextArticle() {
        let currentArticle = articles.shift();

        if (currentArticle) {
            let article = document.createElement("article");
            article.textContent = currentArticle;

            container.appendChild(article);
        }
    }

    return displayNextArticle;
}