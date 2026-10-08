import { test, expect } from '../../fixtures/api.fixture';
import { endpoints } from '../../constants/endpoints';

test('successful health check', async ({ request }) => {
  const response = await request.get(endpoints.healthCheck);
  expect(response.status()).toBe(200);

  const jsonData = await response.json();
  expect(jsonData.success).toBe(true);
});
