import { test as base } from '@playwright/test';

const BLOCKED_DOMAINS = [
  'googlesyndication.com',
  'doubleclick.net',
  'adservice.google.com',
  'adsystem.com',
  'amazon-adsystem.com',
  'google-analytics.com',
  'googleoptimize.com',
  'facebook.net'
];

export const test = base.extend({
  page: async ({ page }, use) => {
    // Block ad and tracker requests before the test runs
    await page.route('**/*', route => {
      const requestUrl = route.request().url();
      let hostname: string;
      try {
        hostname = new URL(requestUrl).hostname;
      } catch {
        // Handle special URLs (e.g. data:, blob:) safely
        return route.continue();
      }

      const isBlocked = BLOCKED_DOMAINS.some(
        domain => hostname === domain || hostname.endsWith(`.${domain}`)
      );

      if (isBlocked) {
        return route.abort();
      }

      return route.continue();
    });

    await use(page);
  }
});

export { expect } from '@playwright/test';
