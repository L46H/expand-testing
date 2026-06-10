import { test, expect } from '@playwright/test';

test('successful health check', async ({ request }) => {
  const response = await request.get('/notes/api/health-check');
  expect(response.status()).toBe(200);

  const jsonData = await response.json();
  expect(jsonData.success).toBe(true);
});
