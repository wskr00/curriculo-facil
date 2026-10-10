import { expect, test } from '@playwright/test';

test.use({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});

test('abre, fecha e permite arrastar a prévia no celular', async ({ page }) => {
  await page.goto('/');

  const handle = page.locator('button[aria-controls="resume-preview-sheet-content"]');
  const sheet = page.locator('.resume-preview-sheet');
  const waitForSheetTransition = () =>
    sheet.evaluate(
      (element) =>
        new Promise<void>((resolve) => {
          const onTransitionEnd = (event: Event) => {
            if (
              event.target === element &&
              event instanceof TransitionEvent &&
              event.propertyName === 'transform'
            ) {
              element.removeEventListener('transitionend', onTransitionEnd);
              resolve();
            }
          };

          element.addEventListener('transitionend', onTransitionEnd);
        }),
    );

  await expect(handle).toBeVisible();
  await expect(handle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('complementary', { name: 'Prévia do currículo' })).toBeHidden();

  const expandedTransition = waitForSheetTransition();
  await handle.click();
  await expect(handle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('heading', { name: 'Seu nome completo' })).toBeVisible();
  await expandedTransition;

  const collapsedTransition = waitForSheetTransition();
  await page.getByRole('button', { name: 'Fechar prévia' }).click();
  await collapsedTransition;
  await expect(handle).toHaveAttribute('aria-expanded', 'false');

  const bounds = await handle.boundingBox();
  expect(bounds).not.toBeNull();

  const startX = bounds!.x + bounds!.width / 2;
  const startY = bounds!.y + bounds!.height / 2;
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX, startY - 360, { steps: 12 });
  await page.mouse.up();

  await expect(handle).toHaveAttribute('aria-expanded', 'true');
  await handle.press('Escape');
  await expect(handle).toHaveAttribute('aria-expanded', 'false');
});
