import { chromium } from "playwright-chromium";
import { expect } from "chai";

describe("Accordion", () => {
    let browser, page;

    let debugMode = false;

    before(async () => { browser = await chromium.launch( debugMode ? { headless: false, slowMo: 500 } : {} ) });
    beforeEach(async () => { page = await browser.newPage() });
    after(async () => { await browser.close() });
    afterEach(async () => { await page.close() });

    it("Loads correct data from server", async () => {
        await page.goto("http://localhost:3000");

        const isFirstArticleVisible = await page.isVisible("#main div:first-of-type span");

        expect(isFirstArticleVisible).to.be.true;
    });

    it("More button has correct functionality", async () => {
        await page.goto("http://localhost:3000");
        await page.click("#main div:first-of-type button");

        const textOfButton = await page.textContent("#main div:first-of-type button");
        const isExtraDivVisible = await page.isVisible("#main div:first-of-type .extra");
        const textOfExtraPara = await page.textContent("#main div:first-of-type .extra p");

        expect(textOfButton).to.equal("Less");
        expect(isExtraDivVisible).to.be.true;
        expect(textOfExtraPara).to.equal("Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vector image format for two-dimensional graphics with support for interactivity and animation. The SVG specification is an open standard developed by the World Wide Web Consortium (W3C) since 1999.");
    });

    it("Less button has correct functionality", async () => {
        await page.goto("http://localhost:3000");
        await page.click("#main div:first-of-type button");
        await page.click("#main div:first-of-type button");

        const textOfButton = await page.textContent("#main div:first-of-type button");
        const isExtraDivVisible = await page.isVisible("#main div:first-of-type .extra");
        const textOfExtraPara = await page.textContent("#main div:first-of-type .extra p");

        expect(textOfButton).to.equal("More");
        expect(isExtraDivVisible).to.not.be.true;
    });
});