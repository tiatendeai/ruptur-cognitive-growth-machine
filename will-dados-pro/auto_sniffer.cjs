const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

process.on('uncaughtException', err => fs.writeFileSync(path.join(__dirname, 'auto-error.log'), String(err.stack)));
process.on('unhandledRejection', err => fs.writeFileSync(path.join(__dirname, 'auto-error.log'), String(err.stack)));

(async () => {
    try {
        console.log('🤖 Iniciando Sniffer 100% Autônomo e Headless...');
        // Headless "new" para rodar oculto, mas o bypass stealth seria ideal se houvesse cloudflare
        const browser = await puppeteer.launch({ 
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            headless: 'new',
            defaultViewport: { width: 1366, height: 768 },
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const logPath = path.join(__dirname, 'telemetria_auto.log');
        if (fs.existsSync(logPath)) fs.unlinkSync(logPath);

        let cdpTargetsCount = 0;

        browser.on('targetcreated', async (target) => {
            if (['page', 'iframe', 'worker', 'other'].includes(target.type())) {
                try {
                    const client = await target.createCDPSession();
                    await client.send('Network.enable');
                    cdpTargetsCount++;
                    
                    client.on('Network.webSocketFrameReceived', ({response}) => {
                        const payload = response.payloadData;
                        if (payload.length > 5) {
                            if (payload.includes('sigap:brazil') || payload.includes('tickerNotify')) return;
                            fs.appendFileSync(logPath, `[RECV][${target.type()}] ` + payload + '\n');
                        }
                    });
                } catch (err) {}
            }
        });

        const targets = await browser.targets();
        for (let target of targets) browser.emit('targetcreated', target);

        console.log('🌍 Navegando para BetBoom...');
        const page = await browser.newPage();
        
        await page.goto('https://betboom.bet.br/', { waitUntil: 'domcontentloaded', timeout: 60000 });
        console.log('Pesquisando botões de Login...');
        
        await new Promise(r => setTimeout(r, 3000));
        
        // Simular o flow de login de forma crua
        console.log('Tentando injetar credenciais via DOM...');
        const loginSucceeded = await page.evaluate(async () => {
            // Tenta abrir modal se existir botão
            const btns = Array.from(document.querySelectorAll('button, a'));
            const loginBtn = btns.find(b => b.textContent && b.textContent.toLowerCase().includes('entrar'));
            if(loginBtn) loginBtn.click();
            
            await new Promise(r => setTimeout(r, 2000));
            
            const inputs = document.querySelectorAll('input');
            let userField = null;
            let passField = null;
            for(let i of inputs) {
                if (i.type === 'email' || i.name.includes('mail') || i.name.includes('phone') || i.name.includes('login')) userField = i;
                if (i.type === 'password') passField = i;
            }
            if(userField && passField) {
                userField.value = 'leticiavoglcosta@gmail.com';
                passField.value = '151327Wil#';
                userField.dispatchEvent(new Event('input', {bubbles: true}));
                passField.dispatchEvent(new Event('input', {bubbles: true}));
                
                // Procurar botao de submit
                const submit = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.toLowerCase().includes('entrar') && b !== loginBtn);
                if (submit) submit.click();
                else document.forms[0] && document.forms[0].submit();
                return true;
            }
            return false;
        });

        if(loginSucceeded) console.log('✅ Tentativa de preenchimento e clique feita com sucesso.');
        else console.log('❌ Falha ao encontrar os campos de login.');
        
        await new Promise(r => setTimeout(r, 4000));
        console.log('Redirecionando para a Bac Bo...');
        await page.goto('https://betboom.bet.br/casino/game/bac_bo-26281/', { waitUntil: 'domcontentloaded' });

        console.log('Tudo configurado, mantendo o processo vivo por 180 segundos para pescar dados da Evolution...');
        await new Promise(r => setTimeout(r, 180000));
        
        console.log(`Sub-agente concluído. Fechando navegador. (Targets lidos: ${cdpTargetsCount})`);
        await browser.close();
        process.exit(0);
    } catch(err) {
        fs.writeFileSync(path.join(__dirname, 'auto-error.log'), String(err.stack));
        console.error("Erro fatal:", err);
        process.exit(1);
    }
})();
