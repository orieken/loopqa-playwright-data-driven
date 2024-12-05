import { test } from '../test-setup';
import { TestCase } from '../types';
import * as testDataFile from '../data/test-cases.json';
import { createSteps } from './steps';
import { captureStepScreenshot } from '../config/playwright-reporting';

const testData = (testDataFile as unknown as { testCases: TestCase[] }).testCases;

if (!testData) {
  console.error('testData is undefined or null');
}

for (const testCase of testData) {
  test.describe(`Feature: ${testCase.feature}`, () => {
    test(`${testCase.name}`, async ({ page, projectBoard }) => {
      // const videoPath = `./test-results/videos/${testCase.name.replace(/\s+/g, '-').toLowerCase()}.webm`;
      // await page.video()?.saveAs(videoPath);

      const steps = createSteps(projectBoard);

      for (const step of testCase.steps) {
        await test.step(step.name, async () => {
          await steps[step.name](page, step.params);

          const screenshotPath = await captureStepScreenshot(page, step.name);
          await test.info().attach(`${step.name} Screenshot`, {
            path: screenshotPath,
            contentType: 'image/png',
          });
        });
      }
    });
  });
}
