import assert from "assert";

import { streamingServiceSelector } from "./streamingServiceSelector.js";

describe("streamingServiceSelector", function() {
    describe("selectingContent", () => {
        it ("throws error for incorrect genres", () => {
            const supportedGenres = ["Action", "Comedy", "Drama", "Thriller", "Horror", "Romance", "Sci-Fi"];
            assert.throws(() => streamingServiceSelector.selectingContent("Movie", "Netflix", "Reality"), Error, `We currently support these genres: ${supportedGenres.join(", ")}.`);
        });
        
        it("throws error for incorrect types", () => {
            assert.throws(() => streamingServiceSelector.selectingContent("Music", "Spotify", "Action"), Error, `We currently only support 'Movie' or 'TV Show' types.`);
        });

        it("returns correct message for supported genres and types", () => {
            const result = streamingServiceSelector.selectingContent("Movie", "Netflix", "Drama");
            const expected = `You can watch this Drama Movie on Netflix. Enjoy your Drama-filled experience!`;

            assert.strictEqual(result, expected);
        });
    });

    describe("availablePlatforms", () => {
        it("throws error for incorrect platforms input", () => {
            assert.throws(() => streamingServiceSelector.availablePlatforms("a", 0));
        });

        it("throws error for incorrect selectedPlatformIndex input", () => {
            assert.throws(() => streamingServiceSelector.availablePlatforms(["Netflix", "Hulu", "Disney +"], "0"), Error, "Invalid platform selection.");
            assert.throws(() => streamingServiceSelector.availablePlatforms(["Netflix", "Hulu", "Disney +"], -1), Error, "Invalid platform selection.");
            assert.throws(() => streamingServiceSelector.availablePlatforms(["Netflix", "Hulu", "Disney +"], 3), Error, "Invalid platform selection.");
        });

        it("correctly returns available platforms", () => {
            const result = streamingServiceSelector.availablePlatforms(["Netflix", "Hulu", "Disney +"], 1);
            const expected = "Other available platforms are: Netflix, Disney +.";

            assert.strictEqual(result, expected);
        });
    });

    describe("contentRating", () => {
        it ("throws error for incorrect runtimeInMinutes input", () => {
            assert.throws(() => streamingServiceSelector.contentRating("0", 5), Error, "Invalid runtime or rating.");
            assert.throws(() => streamingServiceSelector.contentRating(-1, 5), Error, "Invalid runtime or rating.");
        });

        it ("throws error for incorrect viewerRating input", () => {
            assert.throws(() => streamingServiceSelector.contentRating(1, "0"), Error, "Invalid runtime or rating.");
            assert.throws(() => streamingServiceSelector.contentRating(1, -1), Error, "Invalid runtime or rating.");
            assert.throws(() => streamingServiceSelector.contentRating(1, 11), Error, "Invalid runtime or rating.");
        });

        it("has correct output for viewerRating equal to or higher than 7", () => {
            const runtimeInMinutes = 60;
            const viewerRating = 7;

            const runtimeInHours = (runtimeInMinutes / 60).toFixed(2);

            const result = streamingServiceSelector.contentRating(runtimeInMinutes, viewerRating);
            const expected = `This content is highly rated (${viewerRating}/10) and has a runtime of ${runtimeInHours} hours. Enjoy your watch!`;

            assert.strictEqual(result, expected);
        });

        it("has correct output for viewerRating lower than 7", () => {
            const runtimeInMinutes = 60;
            const viewerRating = 6;

            const runtimeInHours = (runtimeInMinutes / 60).toFixed(2);

            const result = streamingServiceSelector.contentRating(runtimeInMinutes, viewerRating);
            const expected = `This content has a lower rating (${viewerRating}/10) and runs for ${runtimeInHours} hours. You might want to check reviews first.`;

            assert.strictEqual(result, expected);
        });
    });
});