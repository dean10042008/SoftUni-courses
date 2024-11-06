import { chromium } from 'playwright-chromium';
import { expect } from 'chai';

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)

const DEBUG = false;

const mockData = {
    list: [
        {
            author: 'Spami',
            content: 'Hello, are you there?',
        },
        {
            author: 'Garry',
            content: 'Yep, whats up :?',
        },
        {
            author: "Spami",
            content: "How are you? Long time no see? :)",
        },
        {
            author: 'George',
            content: 'Hello, guys! :))',
        },
        {
            author: "Spami",
            content: "Hello, George nice to see you! :)))",
        }
    ],
};

const endpoints = {
    list: '/jsonstore/messenger',
};

let browser;
let context;
let page;

describe('E2E tests', function () {
    before(async () => { browser = await chromium.launch(DEBUG ? { headless: false, slowMo: 1000 } : {}) });
    after(async () => { await browser.close() });
    beforeEach(async () => {
        page = await browser.newPage();
    });
    afterEach(async () => {
        await page.close();
    });

    // Test proper
    describe('Messenger Info', () => {
        it('Load Message', async () => {
            await page.goto(host);
            
            await page.click("#refresh");
            await page.waitForSelector("textarea#messages");

            const messageText = await page.inputValue("textarea#messages");
            const correctText = mockData.list
                .map(({ author, content }) => `${author}: ${content}`)
                .join("\n");

            expect(messageText).to.equal(correctText);
        });

        it.only('Send Message API call', async () => {
            const newUser = {
                author: "Dean",
                content: "Hello, everyone! :)",
            }

            await page.goto(host);

            await page.fill('input[name="author"]', newUser.author);
            await page.fill('input[name="content"]', newUser.content);

            await page.click('#submit');
            await page.click("#refresh");
            await page.waitForSelector("textarea#messages");

            mockData.list.push(newUser);

            const messageText = await page.inputValue("textarea#messages");
            const correctText = mockData.list
                .map(({ author, content }) => `${author}: ${content}`)
                .join("\n");

            expect(messageText).to.equal(correctText);
        });
    });
});

async function setupContext(context) {
    // Catalog and Details
    await handleContext(context, endpoints.list, { get: mockData.list });
    await handleContext(context, endpoints.list, { post: mockData.list[0] });
    await handleContext(context, endpoints.info('1001'), {
        get: mockData.details[0],
    });
    await handleContext(context, endpoints.info('1002'), {
        get: mockData.details[1],
    });

    await handleContext(context, endpoints.details('1001'), {
        get: mockData.catalog[0],
    });
    await handleContext(context, endpoints.details('1002'), {
        get: mockData.catalog[1],
    });
    await handleContext(context, endpoints.details('1003'), {
        get: mockData.catalog[2],
    });

    await handleContext(
        endpoints.profile('0001'),
        { get: mockData.catalog.slice(0, 2) },
        context
    );

    await handleContext(endpoints.total('1001'), { get: 6 }, context);
    await handleContext(endpoints.total('1002'), { get: 4 }, context);
    await handleContext(endpoints.total('1003'), { get: 7 }, context);

    await handleContext(endpoints.own('1001', '0001'), { get: 1 }, context);
    await handleContext(endpoints.own('1002', '0001'), { get: 0 }, context);
    await handleContext(endpoints.own('1003', '0001'), { get: 0 }, context);

    // Block external calls
    await context.route(
        (url) => url.href.slice(0, host.length) != host,
        (route) => {
            if (DEBUG) {
                console.log('Preventing external call to ' + route.request().url());
            }
            route.abort();
        }
    );
}

function handle(match, handlers) {
    return handleRaw.call(page, match, handlers);
}

function handleContext(context, match, handlers) {
    return handleRaw.call(context, match, handlers);
}

async function handleRaw(match, handlers) {
    const methodHandlers = {};
    const result = {
        get: (returns, options) => request('GET', returns, options),
        get2: (returns, options) => request('GET', returns, options),
        post: (returns, options) => request('POST', returns, options),
        put: (returns, options) => request('PUT', returns, options),
        patch: (returns, options) => request('PATCH', returns, options),
        del: (returns, options) => request('DELETE', returns, options),
        delete: (returns, options) => request('DELETE', returns, options),
    };

    const context = this;

    await context.route(urlPredicate, (route, request) => {
        if (DEBUG) {
            console.log('>>>', request.method(), request.url());
        }

        const handler = methodHandlers[request.method().toLowerCase()];
        if (handler == undefined) {
            route.continue();
        } else {
            handler(route, request);
        }
    });

    if (handlers) {
        for (let method in handlers) {
            if (typeof handlers[method] == 'function') {
                handlers[method](result[method]);
            } else {
                result[method](handlers[method]);
            }
        }
    }

    return result;

    function request(method, returns, options) {
        let handled = false;

        methodHandlers[method.toLowerCase()] = (route, request) => {
            handled = true;
            route.fulfill(respond(returns, options));
        };

        return {
            onRequest: () => context.waitForRequest(urlPredicate),
            onResponse: () => context.waitForResponse(urlPredicate),
            isHandled: () => handled,
        };
    }

    function urlPredicate(current) {
        if (current instanceof URL) {
            return current.href.toLowerCase().includes(match.toLowerCase());
        } else {
            return current.url().toLowerCase().includes(match.toLowerCase());
        }
    }
}

function respond(data, options = {}) {
    options = Object.assign(
        {
            json: true,
            status: 200,
        },
        options
    );

    const headers = {
        'Access-Control-Allow-Origin': '*',
    };
    if (options.json) {
        headers['Content-Type'] = 'application/json';
        data = JSON.stringify(data);
    }

    return {
        status: options.status,
        headers,
        body: data,
    };
}