function monkeyPatcher(action) {
    let result = [];

    switch (action) {
        case "upvote": this.upvotes++; break;
        case "downvote": this.downvotes++; break;
        case "score": result = getScore.call(this); break;
    }

    function getScore() {
        let positives = this.upvotes;
        let negatives = this.downvotes;
        let total = positives + negatives;
        let score = positives - negatives;
        let rating = 'new';

        if (total > 50) {
            const num = Math.ceil(Math.max(positives, negatives) * 0.25);
            positives += num;
            negatives += num;
        }

        if (total < 10) {
            rating = 'new';
        }
        else if (this.upvotes > total * 0.66) {
            rating = 'hot';
        }
        else if (total > 100 && score >= 0) {
            rating = 'controversial';
        }
        else if (score < 0) {
            rating = 'unpopular';
        }

        return [positives, negatives, score, rating];
    }

    return result;
}

let post = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};
monkeyPatcher.call(post, 'upvote');
monkeyPatcher.call(post, 'downvote');
let score = monkeyPatcher.call(post, 'score'); // [127, 127, 0, 'controversial']
monkeyPatcher.call(post, 'downvote');         // (executed 50 times)
score = monkeyPatcher.call(post, 'score');     // [139, 189, -50, 'unpopular']
console.log(score);
