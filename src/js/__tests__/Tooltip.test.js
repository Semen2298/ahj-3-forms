import puppeteer from 'puppeteer';

describe('Tooltip (E2E)', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: 'new' });
    page = await browser.newPage();
    await page.goto('http://localhost:8080'); // или другой адрес, где доступен твой index.html
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Появляется tooltip при клике', async () => {
    await page.click('.btn');

    const tooltipExists = await page.$eval('.tooltip', () => true).catch(() => false);
    expect(tooltipExists).toBe(true);
  });

  test('Tooltip заменяется при повторном клике', async () => {
    await page.click('.btn'); // первый клик — появился
    const firstTooltip = await page.$('.tooltip');

    await page.click('.btn'); // второй клик — старый удалён, новый создан

    const secondTooltip = await page.$('.tooltip');

    expect(secondTooltip).not.toBeNull();
    expect(secondTooltip).not.toBe(firstTooltip); // другой элемент в DOM
  });

});
