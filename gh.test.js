let page;

beforeEach(async () => {
  page = await browser.newPage();
  // await page.goto('https://github.com/team');
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe('Github page tests', () => {
  beforeEach(async () => {
    await page.goto('https://github.com/team');
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$('header div div a');
    await firstLink.click();
    // await page.waitForSelector('h1');
    await page.waitForSelector('h1', {
      timeout: 40000,
    });
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  });

  test('The first link attribute', async () => {
    await page.waitForSelector('a', {
      timeout: 40000,
    });
    const actual = await page.$eval('a', link => link.getAttribute('href'));
    expect(actual).toEqual('#start-of-content');
  });

  test('The page contains Sign in button', async () => {
    const btnSelector = '.btn-large-mktg.btn-mktg';
    await page.waitForSelector(btnSelector, {
      visible: true,
      timeout: 40000,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain('Sign up for free');
  });
});

test("The h1 should contain 'Issues'", async () => {
  await page.goto('https://github.com');
  const issuesLink = await page.$(
    'header  nav > ul > li:nth-child(3) > a',
  );
  await issuesLink.click();

  await page.waitForNavigation({
    timeout: 40000,
  });

  await page.waitForSelector('h1', {
    timeout: 40000,
  });
  const title3 = await page.title();
  expect(title3).toEqual(
    'Enterprise · A smarter way to work together · GitHub',
  );
});

test('The h1 should contain search', async () => {
  await page.goto('https://github.com');
  const searchLink = await page.$("[type='text']");
  await searchLink.type('jest');
  await page.keyboard.press('Enter');

  await page.waitForNavigation({
    timeout: 40000,
  });

  await page.waitForSelector('h2', {
    timeout: 40000,
  });
  const title4 = await page.title();
  expect(title4).toEqual('Search · jest · GitHub');
}, 40000);
