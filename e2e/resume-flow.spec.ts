import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('valida o currículo, revisa a prévia paginada e baixa o PDF', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/curriculo\/dados-pessoais$/);
  await expect(page.getByRole('heading', { name: 'Vamos começar pelo básico' })).toBeVisible();

  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByText('Informe seu nome completo.')).toBeVisible();
  await expect(page).toHaveURL(/\/curriculo\/dados-pessoais$/);

  await page.getByLabel('Nome completo').fill('Pessoa Exemplo');
  await page.getByLabel('Telefone').fill('00000000000');
  await expect(page.getByLabel('Telefone')).toHaveValue('(00) 00000-0000');
  await page.getByLabel('E-mail').fill('pessoa@example.test');
  await page.getByLabel('Cidade e estado').fill('Cidade Exemplo, SP');
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByText('Etapa 2 de 6')).toBeVisible();
  await page.getByLabel('Cargo ou área').fill('Atendente');
  await page
    .getByLabel('Objetivo profissional')
    .fill('Busco uma oportunidade para trabalhar com atendimento ao público.');
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByText('Etapa 3 de 6')).toBeVisible();
  await page.getByLabel('Função').nth(0).fill('Auxiliar de loja');
  await page.getByLabel('Empresa ou local').nth(0).fill('Mercado do Bairro');
  await page.getByRole('group', { name: 'Início' }).nth(0).getByLabel('Mês').selectOption('03');
  await page.getByRole('group', { name: 'Início' }).nth(0).getByLabel('Ano').selectOption('2020');
  await page.getByRole('group', { name: 'Fim' }).getByLabel('Mês').selectOption('08');
  await page.getByRole('group', { name: 'Fim' }).getByLabel('Ano').selectOption('2021');
  await page
    .getByLabel('O que você fazia?')
    .nth(0)
    .fill('Atendimento ao público e organização dos produtos da loja.');

  await page.getByRole('button', { name: 'Adicionar outra experiência' }).click();
  await page.getByLabel('Função').nth(1).fill('Atendente');
  await page.getByLabel('Empresa ou local').nth(1).fill('Comércio Central');
  await page.getByRole('group', { name: 'Início' }).nth(1).getByLabel('Mês').selectOption('01');
  await page.getByRole('group', { name: 'Início' }).nth(1).getByLabel('Ano').selectOption('2024');
  await page
    .getByRole('group', { name: 'Experiência 2' })
    .getByLabel('Ainda estou trabalhando aqui')
    .check();
  await page
    .getByLabel('O que você fazia?')
    .nth(1)
    .fill(
      'Atendimento ao público, organização de produtos e apoio no fechamento da loja. '.repeat(45),
    );
  const firstExperienceEndYear = page
    .getByRole('group', { name: 'Experiência 1' })
    .getByRole('group', { name: 'Fim' })
    .getByLabel('Ano');
  await firstExperienceEndYear.selectOption('2019');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(
    page.getByText('A data final deve ser igual ou posterior à data inicial.'),
  ).toBeVisible();
  await expect(page).toHaveURL(/\/curriculo\/experiencias$/);

  await firstExperienceEndYear.selectOption('2021');
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByText('Etapa 4 de 6')).toBeVisible();
  await page.getByLabel('Escolaridade').fill('Ensino médio');
  await page.getByLabel('Instituição').fill('Escola Estadual');
  await page.getByLabel('Situação').selectOption({ label: 'Concluído' });
  await page.getByLabel('Ano ou previsão').fill('2022');
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByText('Etapa 5 de 6')).toBeVisible();
  await page.getByRole('textbox', { name: 'Curso' }).fill('Informática básica');
  await page.getByText('Comunicação', { exact: true }).click();
  await expect(page.getByRole('checkbox', { name: 'Comunicação' })).toBeChecked();
  await page.getByLabel('Outra habilidade').fill('Organização de estoque');
  await page.getByRole('button', { name: 'Adicionar', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Remover habilidade Organização de estoque' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Revisar currículo' }).click();

  await expect(page).toHaveURL(/\/curriculo\/revisao$/);
  await expect(page.getByRole('heading', { name: 'Confira antes de baixar' })).toBeVisible();
  await expect(page.getByText('Etapa 6 de 6')).toBeVisible();

  const preview = page.getByRole('region', { name: 'Prévia do currículo' });
  await expect(preview).toHaveCount(1);
  const resumeDocument = preview.getByRole('article', { name: 'Currículo em prévia' });
  await expect(
    resumeDocument.getByRole('heading', { name: 'Pessoa Exemplo' }),
  ).toBeVisible();
  await expect(resumeDocument.getByText('Organização de estoque')).toBeVisible();

  const resumeText = await resumeDocument.innerText();
  expect(resumeText.indexOf('Comércio Central')).toBeLessThan(
    resumeText.indexOf('Mercado do Bairro'),
  );
  await expect
    .poll(() => preview.locator('.resume-preview__sheet').count(), { timeout: 20_000 })
    .toBeGreaterThan(1);

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Baixar currículo em PDF' }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe('Curriculo Pessoa Exemplo.pdf');
  const downloadedFile = await download.path();
  expect(downloadedFile).not.toBeNull();

  const pdf = await readFile(downloadedFile!);
  expect(pdf.subarray(0, 5).toString('ascii')).toBe('%PDF-');
  expect(pdf.byteLength).toBeGreaterThan(1_000);
});
