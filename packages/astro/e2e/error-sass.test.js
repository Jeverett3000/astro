import { expect } from '@playwright/test';
import { testFactory, getErrorOverlayContent } from './test-utils.js';

const test = testFactory({
	experimental: { errorOverlay: true },
	root: './fixtures/error-sass/',
});

let devServer;

test.beforeAll(async ({ astro }) => {
	devServer = await astro.startDevServer();
});

test.afterAll(async ({ astro }) => {
	await devServer.stop();
	astro.resetAllFiles();
});

test.describe('Error: Sass', () => {
	test('overlay', async ({ page, astro }) => {
		await page.goto(astro.resolveUrl('/'));

		const message = (await getErrorOverlayContent(page)).message;
		expect(message).toMatch('Undefined variable');
	});
});
