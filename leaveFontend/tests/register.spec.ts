import { test , expect } from '@playwright/test';

test('Register Page Test', async ({ page }) => {
  // Navigate to the register page
  await page.goto('http://localhost:4200/login-regis');
  await page.getByRole('button', { name: /register/i }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('pachara');
  await page.getByRole('textbox', { name: 'Email' }).fill('pachara6452@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('fangfang2546');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('form').getByRole('button', { name: 'Register' }).click(); // Wait for the alert to be processed
});