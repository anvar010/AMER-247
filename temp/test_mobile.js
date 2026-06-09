const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  
  // Wait for ServiceCards to be visible
  await page.waitForSelector('text=Insurance Services', { timeout: 10000 });
  
  const box = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('h3')).find(e => e.textContent.includes('Insurance Services')).closest('div[class*="card"]');
    const content = el.querySelector('div[class*="content"]');
    const header = el.querySelector('div[class*="header"]');
    const details = el.querySelector('div[class*="details"]');
    return {
      cardHeight: el.offsetHeight,
      contentHeight: content.offsetHeight,
      headerHeight: header.offsetHeight,
      detailsHeight: details.offsetHeight,
      cardFlex: window.getComputedStyle(el).flex,
      detailsDisplay: window.getComputedStyle(details).display,
      detailsMaxHeight: window.getComputedStyle(details).maxHeight,
      gap: window.getComputedStyle(details).gap
    };
  });
  console.log(JSON.stringify(box, null, 2));
  
  await browser.close();
})();
