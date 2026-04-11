const puppeteer = require('puppeteer-core');
(async () => {
    const browser = await puppeteer.launch({ 
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: false,
        defaultViewport: null,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    console.log("Going to betboom...");
    await page.goto('https://betboom.bet.br/', { waitUntil: 'networkidle2' });
    
    console.log("Waiting for Login button...");
    // Try to find the Login button. It might have text like "Login", "Entrar", or "Sign in"
    const loginButtonHandles = await page.$$('button, a');
    let loginBtn = null;
    for (let h of loginButtonHandles) {
        let text = await page.evaluate(el => el.textContent, h);
        if (text && (text.trim().toLowerCase() === 'entrar' || text.trim().toLowerCase() === 'login')) {
            loginBtn = h;
            break;
        }
    }
    
    if (loginBtn) {
        console.log("Clicking Login button...");
        await loginBtn.click();
        await page.waitForTimeout(2000);
    } else {
        console.log("Could not find a login button. Trying to find email inputs directly.");
    }
    
    console.log("Looking for input fields...");
    const inputs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, name: i.name, id: i.id }));
    });
    console.log("Inputs found:", inputs);
    
    await browser.close();
})();
