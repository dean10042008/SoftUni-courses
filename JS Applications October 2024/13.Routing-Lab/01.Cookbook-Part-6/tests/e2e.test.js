import { chromium } from 'playwright-chromium';
import { expect } from 'chai';

let browser;
let context;
let page;
let debugMode = false;

describe('E2E tests', function () {
    before(async () => {
        browser = await chromium.launch( debugMode ? { headless: false, slowMo: 1000 } : {});
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();

        // block intensive resources and external calls (page routes take precedence)
        await context.route('**/*.{png,jpg,jpeg}', route => route.abort());
        await context.route(url => {
            return url.hostname != 'localhost';
        }, route => route.abort());

        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    describe('Cookbook-Part-4', function () {
        describe('Catalog', () => { 
            it("Should load and render the content of the API", async () => {
                await page.goto("http://localhost:3000");
                await page.waitForSelector("#catalog .preview:first-of-type");

                expect(await page.isVisible("#catalog .preview:first-of-type")).to.be.true;
            });

            it("Displays the recipe details", async () => {
                await page.goto("http://localhost:3000");
                await page.click("#catalog .preview:first-of-type");
                await page.waitForLoadState();

                expect(await page.isVisible("#details article .band h3")).to.be.true;
            });
        });

        describe('Authentication', () => { 
            it('"register" makes correct API call', async () => {
                await page.goto("http://localhost:3000");
                await page.click("#registerLink");
                await page.waitForSelector("#registerLink");

                await page.fill("[name=email]", "dean@example.com");
                await page.fill("[name=password]", "password123");
                await page.fill("[name=rePass]", "password123");

                await page.click("[value=Register]");
            });

            it('"login" makes correct API call', async () => {
                await page.goto("http://localhost:3000");
                await page.click("#loginLink");
                await page.waitForSelector("#loginLink");

                await page.fill("[name=email]", "dean@example.com");
                await page.fill("[name=password]", "password123");

                await page.click("[value=Login]");
            });
        });

        describe('CRUD Operations', () => {
            it('"create" makes correct API call for logged in user', async () => {
                await page.goto("http://localhost:3000");
                await page.click("#loginLink");
                await page.waitForSelector("#loginLink");

                await page.fill("[name=email]", "dean@example.com");
                await page.fill("[name=password]", "password123");

                await page.click("[value=Login]");
                await page.click("#createLink");

                await page.fill("[name=name]", "Bob");
                await page.fill("[name=img]", "https://m4.netinfo.bg/media/images/50743/50743962/960-ratio-bob-kola.jpg");
                await page.fill("[name=ingredients]", "1 c. meat, 1 c. vegetables, 1 c. spices");
                await page.fill("[name=steps]", "1. Prepare meat, 2. Cook vegetables, 3. Add spices");

                await page.click('input[type="submit"]');

                await page.waitForSelector("#details article h2");

                expect(await page.textContent("#details article h2")).to.equal("Bob");
            });

            it('The author can see the "Edit" and "Delete" button', async () => {
                await page.goto("http://localhost:3000");
                await page.click("#loginLink");
                await page.waitForSelector("#loginLink");

                await page.fill("[name=email]", "dean@example.com");
                await page.fill("[name=password]", "password123");

                await page.click("[value=Login]");
                await page.click("#createLink");

                await page.fill("[name=name]", "Bob");
                await page.fill("[name=img]", "https://m4.netinfo.bg/media/images/50743/50743962/960-ratio-bob-kola.jpg");
                await page.fill("[name=ingredients]", "1 c. meat, 1 c. vegetables, 1 c. spices");
                await page.fill("[name=steps]", "1. Prepare meat, 2. Cook vegetables, 3. Add spices");

                await page.click('input[type="submit"]');

                await page.waitForSelector("#details article .controls");

                expect(await page.isVisible("#details article .controls")).to.be.true;
            });

            it('"edit" loads the correct article data for logged in user', async () => {
                await page.goto("http://localhost:3000");
                await page.click("#loginLink");
                await page.waitForSelector("#loginLink");

                await page.fill("[name=email]", "dean@example.com");
                await page.fill("[name=password]", "password123");

                await page.click("[value=Login]");
                await page.click("#createLink");

                await page.fill("[name=name]", "Bob");
                await page.fill("[name=img]", "https://m4.netinfo.bg/media/images/50743/50743962/960-ratio-bob-kola.jpg");
                await page.fill("[name=ingredients]", "1 c. meat, 1 c. vegetables, 1 c. spices");
                await page.fill("[name=steps]", "1. Prepare meat, 2. Cook vegetables, 3. Add spices");

                await page.click('input[type="submit"]');
                await page.waitForSelector("#details article .controls");

                await page.click('#details article .controls :first-child');
                await page.waitForSelector("#edit");

                expect(await page.inputValue("[name=name]")).to.be.equal("Bob");
                expect(await page.inputValue("[name=img]")).to.be.equal("https://m4.netinfo.bg/media/images/50743/50743962/960-ratio-bob-kola.jpg");
                expect(await page.inputValue("[name=ingredients]")).to.be.equal("1 c. meat, 1 c. vegetables, 1 c. spices");
                expect(await page.inputValue("[name=steps]")).to.be.equal("1. Prepare meat, 2. Cook vegetables, 3. Add spices");
            });

            it('"edit" makes correct API call for logged in user', async () => {
                await page.goto("http://localhost:3000");
                await page.click("#loginLink");
                await page.waitForSelector("#loginLink");

                await page.fill("[name=email]", "dean@example.com");
                await page.fill("[name=password]", "password123");

                await page.click("[value=Login]");
                await page.click("#createLink");

                await page.fill("[name=name]", "Bob");
                await page.fill("[name=img]", "https://m4.netinfo.bg/media/images/50743/50743962/960-ratio-bob-kola.jpg");
                await page.fill("[name=ingredients]", "1 c. meat, 1 c. vegetables, 1 c. spices");
                await page.fill("[name=steps]", "1. Prepare meat, 2. Cook vegetables, 3. Add spices");

                await page.click('input[type="submit"]');
                await page.waitForSelector("#details article .controls");

                await page.click('#details article .controls :first-child');
                await page.waitForSelector("#edit");

                await page.fill("[name=name]", "Bob-Updated");

                await page.click('input[type="submit"]');
                await page.waitForSelector("#details article h2");

                expect(await page.textContent("#details article h2")).to.equal("Bob-Updated");
            });

            it.only('"delete" makes correct API call for logged in user', async () => {
                await page.goto("http://localhost:3000");
                await page.click("#loginLink");
                await page.waitForSelector("#loginLink");

                await page.fill("[name=email]", "dean@example.com");
                await page.fill("[name=password]", "password123");

                await page.click("[value=Login]");
                await page.click("#createLink");

                await page.fill("[name=name]", "Bob");
                await page.fill("[name=img]", "https://m4.netinfo.bg/media/images/50743/50743962/960-ratio-bob-kola.jpg");
                await page.fill("[name=ingredients]", "1 c. meat, 1 c. vegetables, 1 c. spices");
                await page.fill("[name=steps]", "1. Prepare meat, 2. Cook vegetables, 3. Add spices");

                await page.click('input[type="submit"]');
                await page.waitForSelector("#details article .controls");

                page.on('dialog', dialog => dialog.accept());

                await page.click('#details article .controls :last-child');
                await page.waitForSelector("#details article h2");

                expect(await page.textContent("#details article h2")).to.equal("Recipe deleted");
            });
        });
    });
});