import { Page } from '@playwright/test';

export async function captureStepScreenshot(
  page: Page,
  stepName: string
): Promise<string> {
  const screenshotPath = `${stepName.replace(/\s+/g, '-').toLowerCase()}.png`;
  await page.screenshot({
    path: screenshotPath,
    fullPage: true
  });
  return screenshotPath;
}
