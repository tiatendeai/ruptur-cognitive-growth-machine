const puppeteer = require('puppeteer-core');
(async () => {
    const browser = await puppeteer.launch({ 
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://betboom.bet.br/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2000));
    const btn = await page.$$eval('button, a', (els) => els.map(e => e.textContent).filter(t => t && t.toLowerCase().includes('entrar')));
    const inputs = await page.$$eval('input', els => els.map(i => ({type: i.type, name: i.name, placeholder: i.placeholder})));
    console.log("Buttons:", btn);
    console.log("Inputs:", inputs);
    await browser.close();
})();
