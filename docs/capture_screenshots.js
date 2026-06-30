const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const outDir = process.argv[2] || '.';
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const page = await context.newPage();

  const shots = [
    { url: 'https://vamos-a-definir-la-next.vercel.app/', file: 'velvet_home.png' },
    { url: 'https://vamos-a-definir-la-go.vercel.app/rewards', file: 'velvet_rewards.png' },
    { url: 'https://vamos-a-definir-la-go.vercel.app/rewards/map', file: 'velvet_map.png' },
  ];

  for (const shot of shots) {
    await page.goto(shot.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(outDir, shot.file), fullPage: false });
    console.log('Captured', shot.file);
  }

  await browser.close();
})();
