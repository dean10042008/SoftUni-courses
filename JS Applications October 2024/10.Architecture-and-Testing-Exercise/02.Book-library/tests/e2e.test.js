import { chromium } from "playwright-chromium";
import { expect } from "chai";

describe("Book library", () => {
    let browser, page;
    let debugMode = false;

    before(async () => { browser = await chromium.launch( debugMode ? { headless: false, slowMo: 500 } : {} ) });
    beforeEach(async () => { page = await browser.newPage() });
    after(async () => { await browser.close() });
    afterEach(async () => { await page.close() });

    it("Loads books properly", async () => {
        await page.goto("http://localhost:3000/");
        await page.waitForSelector("#loadBooks");
        await page.click("#loadBooks");

        await page.waitForSelector("tbody > tr");

        const areBooksLoaded = await page.isVisible("tbody > tr");

        expect(areBooksLoaded).to.be.true;
    });

    it("Adds book to the list", async () => {
        await page.goto("http://localhost:3000/");
        await page.waitForSelector("input[ name = 'title' ]");

        await page.fill("input[ name = 'title' ]", "Neverwhere");
        await page.fill("input[ name = 'author' ]", "Neil Gaiman");

        await page.click("form button");

        await page.click("#loadBooks");
        const textOfLastAddedBook = await page.textContent("tbody tr:last-of-type td:first-of-type");

        expect(textOfLastAddedBook).to.equal("Neverwhere");
    });

    describe("Edit functionality", function() {
        it("Correctly loads data into the correct form", async () => {
            await page.goto("http://localhost:3000/");
            await page.waitForSelector("#loadBooks");
            await page.click("#loadBooks");

            await page.waitForSelector("tbody > tr");

            await page.click("tbody tr:first-of-type td:last-of-type button:first-of-type");
            await page.waitForSelector("form");

            const formTitle = await page.inputValue("input[ name = 'title' ]");
            const formAuthor = await page.inputValue("input[ name = 'author' ]");

            expect(formTitle).to.equal("Harry Potter and the Philosopher's Stone");
            expect(formAuthor).to.equal("J.K.Rowling");
        });

        it("Updates book data correctly", async () => {
            await page.goto("http://localhost:3000/");
            await page.waitForSelector("#loadBooks");
            await page.click("#loadBooks");

            await page.waitForSelector("tbody > tr");

            await page.click("tbody tr:last-of-type td:last-of-type button:first-of-type");
            await page.waitForSelector("form");

            await page.fill("input[ name = 'title' ]", "C# Fundamentals-edit");

            await page.click("form button");
            await page.click("#loadBooks");

            await page.waitForSelector("tbody > tr");

            const textOfEditedBook = await page.textContent("tbody tr:last-of-type td:first-of-type");

            expect(textOfEditedBook).to.equal("C# Fundamentals-edit");
        });
    });

    it("Deletes book correctly", async () => {
        await page.goto("http://localhost:3000/");
        await page.waitForSelector("#loadBooks");
        await page.click("#loadBooks");

        await page.waitForSelector("tbody > tr");

        await page.click("tbody tr:last-of-type td:last-of-type button:last-of-type");
        await page.waitForSelector("tbody > tr");

        await page.click("#loadBooks");

        await page.waitForSelector("tbody > tr");

        const titleOfLastBook = await page.textContent("tbody tr:last-of-type td:first-of-type");

        expect(titleOfLastBook).to.equal("C# Fundamentals");
    });
});