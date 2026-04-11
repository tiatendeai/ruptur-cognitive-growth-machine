# 🛡️ [MASTER PROMPT V2] DIRETRIZ DE ENGENHARIA "WILL DADOS PRO" (REAL MONEY)

**WARNING CRÍTICO AO AGENTE DESENVOLVEDOR:**
O código que você vai escrever operará sob **FUNDOS REAIS (Banca de Dinheiro Verdadeiro)** na corretora BetBoom / Evolution Gaming. Qualquer latência excessiva, bug de UI, clique duplo invisível ou falha em ler os saldos causará **PERDA FINANCEIRA CATASTRÓFICA** para o operador. A regra é: Robustez extrema. Operação cirúrgica. Um robô sem controle de estado é uma "Uzi destravada na mão de um macaco bêbado".

A missão deve obrigatoriamente ser entregue respeitando esta segregação de fases. **NÃO escreva lógica de estratégia antes de garantir a infraestrutura de visão.**

---

## 🏗️ ETAPA 1: O "Bot Primitivo" (Visão Absoluta e Prova Física)

**Objetivo:** Extirpar a cegueira mecânica da mesa. O Bot não deve pensar, apenas "Ler", "Relatar" e "Apertar o Botão" se provando perfeitamente sincronizado com o back-end da Evolution, ignorando as animações atrasadas da tela.

### 1.1 Infiltração na Via Expressa (WebSockets)
*   Como o jogo roda no iframe `launch.billing-boom.com` (isolado via CORS/Cloudflare), você **não deve** confiar em HTML scraping para ler o histórico ou relógio.
*   Estabeleça a interceptação total via **Puppeteer CDP (Chrome DevTools Protocol)** -> `Network.webSocketFrameReceived`.
*   Sua meta diária: Fazer o parser de Node.js capturar instantaneamente a array do Bead Plate (Bolinhas) com a latência real do servidor, identificando os estados obrigatórios de rodada (1: `Betting_Open`, 2: `No_More_Bets`, 3: `Result_Calculated`).

### 1.2 O Teste de "Toque" (A Execução Mecânica Cegamente Segura)
*   Você ensinará o robô a clicar com precisão submilimétrica na plataforma, sem ser agressivo. Em cada click de UI (selecionar ficha de R$2, clicar no Blue), insira um `DelayRand(400ms, 900ms)` para evitar o ban por Padrão de Automação Headless.
*   **A Prova Física:** Configure o bot para apostar *literalmente o mínimo possível* toda rodada de maneira fixa (ex: Sempre Azul), apenas para provar que a latência não causa erro de *Bet Rejected* e que os iframes não derrubaram a thread. 
*   **Condição de Avanço:** Só siga para a Etapa 2 se o bot primitivo bater 10 rodadas sem perder foco de tela, conseguindo logar a aposta perfeitamente dentro da janela do "Betting Open".

---

## 🎯 ETAPA 2: A Norma do "Will" (Acoplagem do Cérebro Preditivo)

**Objetivo:** Eleve o bot primitivo para a classe *Will Intelligence*. Ele passa a jogar com as regras absolutas da doutrina oficial de Bac Bo.

### 2.1 A Integração das Normas Exatas do "PDF do Will"
A estratégia não é aleatória nem joga cara e coroa. Traduza para código as seguintes normativas inegociáveis:

1.  **O "Anti-Streak" de Limite Fundo (Segurança de Coluna):**
    *   **Acionador:** Identificou-se pelo WS que a mesma cor (Ex: Azul) saiu **6 vezes seguidas** no histórico canônico de resultados.
    *   **Ordem de Execução:** Disparar aposta no lado OPOSTO (Vermelho - Banker) para "quebrar" a linha de variância. (Sanduíche Longo e Ping Pongs prolongados seguem a mesma regra de quebra extrema de probabilidade).

2.  **O "Tie Tax" (Lógica de Caixa Mestre):**
    *   Sempre que bater `Martingale` ou reentrada de recuperação financeira, o sistema tem que varrer os empates (Ties - Amarelos). No Bac-Bo, o Cassino taxa em 10% quem apostava numa cor quando dá Empate.
    *   O motor tem que embutir essa perda na Stake-Alvo ($M2) de forma agnóstica para não deixar a banca derreter via taxas passivas invisíveis.

### 2.2 Zonas Rejeitadas (No-Trade Zones)
Dita as regras exatas de QUANDO **NÃO** ENTRAR (Fazer o "Skip"):
*   **Cluster de Empates:** Caem dois ou três amarelos muito colados? (Ex: `A, Am, V, Am`). A mesa está caótica no desvio padrão. O bot entra em *Lurk Mode* (Congela e só escuta) por 2 cúpulas para o sistema de números voltar à média.
*   **Latency Ghosting:** Você fez a primeira ordem de R$2. Mas os *R$2* não abateram do "AccountBalance" da carteira (API real da BetBoom) em até 3.5 segundos via XHR?
    *   O comando final é: `KILL_SWITCH`. Paralisar envio (Emergency Lock). Se ele assumir que apostou mas o servidor não computou, o bot executará Martingale duplo para o vento imaginando vitórias e perdas fantasmas.

**Entregável Esperado da Execução:** 
O pipeline completo, separando o Core File do Parser (Olhos da Etapa 1) e o Motor de Decisão (Cérebro da Etapa 2). Comunique-se via EventEmitters rígidos para que o UI da extensão (Popup Will Intelligence) exiba "Rodada Localizada", "Temperatura: HOT", e "Aposta Confirmada".
