const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

process.on('uncaughtException', err => fs.writeFileSync(path.join(__dirname, 'sniffer-error.log'), String(err.stack)));
process.on('unhandledRejection', err => fs.writeFileSync(path.join(__dirname, 'sniffer-error.log'), String(err.stack)));

(async () => {
    try {
        console.log('🚀 Iniciando Sniffer (MODO NUCLEAR: AutoAttach CDP)...');
        const browser = await puppeteer.launch({ 
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            headless: false,
            defaultViewport: null,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const logPath = path.join(__dirname, 'telemetria.log');
        if (fs.existsSync(logPath)) fs.unlinkSync(logPath);

        let cdpTargetsCount = 0;

        // Ouve a criação de novos targets (inclusive IFRAMES Isolados e Workers)
        browser.on('targetcreated', async (target) => {
            if (target.type() === 'page' || target.type() === 'iframe' || target.type() === 'other' || target.type() === 'worker') {
                try {
                    const client = await target.createCDPSession();
                    await client.send('Network.enable');
                    cdpTargetsCount++;
                    
                    client.on('Network.webSocketFrameSent', ({response}) => {
                        const payload = response.payloadData;
                        if (payload.length > 5 && !payload.includes('tickerNotify')) {
                            fs.appendFileSync(logPath, `[SENT][${target.type()}] ` + payload + '\n');
                        }
                    });

                    client.on('Network.webSocketFrameReceived', ({response}) => {
                        const payload = response.payloadData;
                        if (payload.length > 5) {
                            if (payload.includes('sigap:brazil') || payload.includes('tickerNotify')) return;
                            
                            // É a Evolution!
                            fs.appendFileSync(logPath, `[RECV][${target.type()}] ` + payload + '\n');
                            if (payload.includes('BacBo') || payload.length > 100) {
                                console.log(`\n🚨 [EVO WS] Target: ${target.url()}`);
                                console.log(payload.substring(0, 300));
                            }
                        }
                    });
                } catch (err) {}
            }
        });

        // Força a conexão a targets que já existiam na inicialização
        const targets = await browser.targets();
        for (let target of targets) browser.emit('targetcreated', target);

        console.log('🌍 Navegando para o Bac Bo BetBoom...');
        const page = await browser.newPage();
        
        // Vamos logar URLs de rede também para ter certeza se a Evolution carregou
        page.on('response', async (res) => {
            if (res.url().includes('evo-games') || res.url().includes('evolution')) {
                fs.appendFileSync(logPath, `[XHR/FETCH] Evolution carregou URL: ${res.url()}\n`);
            }
        });

        await page.goto('https://betboom.bet.br/casino/game/bac_bo-26281/', { waitUntil: 'domcontentloaded' });

        console.log('\n========================================================');
        console.log('⚠️ Faça o login na BetBoom: leticiavoglcosta@gmail.com / 151327Wil#');
        console.log('Se já carregou o vídeo, aguarde as rodadas.');
        console.log('O log agora gravará TUDO: XHR, Fetch e WebSocket das profundezas.');
        console.log('========================================================\n');

        await new Promise(r => setTimeout(r, 120000));
        
        console.log(`\n🛑 Sniper concluído. Total de Sub-Targets analisados: ${cdpTargetsCount}`);
        await browser.close();
        process.exit(0);
    } catch(err) {
        fs.writeFileSync(path.join(__dirname, 'sniffer-error.log'), String(err.stack));
        console.error("Erro fatal:", err);
        process.exit(1);
    }
})();
