# 🤖 [MASTER PROMPT] Missão de Engenharia: Robo Bac Bo "Will-Pro" (Real-World)

**Contexto para o Agente Desenvolvedor:**
Você tem a missão de construir um robô autônomo de apostas para o jogo **Bac Bo** (Cassino ao Vivo da Evolution Gaming, envelopado pela BetBoom). 
A regra máxima é: **"Um robô sem controle é uma Uzi na mão de um macaco bêbado."** Não podemos errar o alvo, não podemos agir cegos. O desenvolvimento **deve** ser fatiado em duas grandes Fases de Integração. Você construirá a fundação primeiro, garantirá a solidez, e só então plugará o "cérebro" de apostas.

---

## 🏗️ FASE 1: O "Bot Primitivo" (Fundação, Olhos e Mãos)

Nesta fase, o robô **não pensa**, ele apenas sabe existir, ler o Matrix do jogo e imitar os cliques de um humano. O objetivo é estabelecer a fundação mecânica de I/O em tempo real.

### 1.1 Infiltração e Setup da Mesa (Os Olhos)
*   **O Problema do Iframe:** O site `betboom.bet.br` envelopa o jogo real da Evolution em um Iframe invisivelmente isolado `launch.billing-boom.com`.
*   **O Monitoramento (CDP):** Não tente ler os dados via HTML DOM. O DOM atrasa até 3 segundos pela UI! Você deve usar Node.js com Puppeteer. Você invocará `CDP (Chrome DevTools Protocol)` e ativará o `Target.setAutoAttach` para interceptar os IFrames isolados, abrindo escuta em `Network.webSocketFrameReceived`.
*   **Decodificador de WebSocket:**
    *   Filtre a enxurrada de dados procurando pacotes que têm IDs da mesa como `BacBo00000000001` e o `Session ID (SID)`.
    *   Você precisa "Parsear" o JSON recebido (que começa ofuscado com números como `42["..."]`).
    *   Mapeie as mudanças de "GameState": `Betting_Open` (Aposta Aberta), `No_More_Bets` (Tranca), `Result` (O momento que os dados rolam no back-end).

### 1.2 O Motor de Execução (As Mãos)
*   Como clicar de forma realista? Nada de enviar payloads de aposta "forjados" via REST ou Socket. A casa bloqueia a conta.
*   **Execução Cirúrgica:** O robô deve emular um Mouse real na página.
    *   *Selecionar Ficha:* Clique nas coordenadas visíveis no rodapé do player.
    *   *Sinal Confirmado:* Ao receber o evento, execute um `Page.mouse.click(x, y)` usando seletores validados no Iframe principal do Evolution.
    *   *Ruído Humano:* **Nunca** clique no MS zero. Todos os loops de clique devem ter um atraso aleatório. `delay: Math.random() * (900 - 300) + 300`.

### 1.3 Entrega da Fase 1
No final da Fase 1, o bot deve conseguir logar, sentar na mesa, printar o histórico da mesa (Bead Plate de bolinhas B, P, T) no console aleta, processar a fase do `Betting_Open` e fazer 1 aposta simples (Ex: R$2 no Azul toda vez), apenas para validarmos o fluxo de ponta-a-ponta, desconexão limpa e atualização de saldo real na BetBoom.

---

## 🎯 FASE 2: O "Mestre Will" (Estratégia e Circuit Breaker)

Com o bot primitivo clicando perfeitamente dentro do timeout, injetamos a **Matrix de Gestão e os Módulos do Will**.

### 2.1 O Array Cronológico (Cérebro do 'Surfing')
Você pegará o socket de dados que lista vitórias passadas e criará um `Lookback Buffer` (um array atualizado dinamicamente com os últimos 20 resultados ex: `['P', 'B', 'T', 'B', 'B', 'B']`).

### 2.2 Estratégias Cruzadas (O Quando Entrar)
Em vez de clicar a esmo, o motor `decide()` só enviará a ordem ao Front se cruzar os Sinais Premium:
1.  **O Anti-Streak Absoluto (Sure-Bet):** Se o Array do buffer registrar 6 repetições exatas (Ex: 6 bolas Azuis seguidas), na abertura do MS do *Betting_Open* o robô crava a apostar na cor Inversa (Banca).
2.  **Sanduíches de Fluxo (Ping-Pong):** Se o array tiver o padrão da mesa alternando `[A, V, A, V]`, e ele pedir a 5º batida, continue o sanduíche.
3.  **Não Entrar (Skip):** Se leu instabilidade (Empates duplos nos últimos 5 frames), o construtor retorna `SKIP_ROUND` e corta a ação do mouse.

### 2.3 Feedback Neural e Multiplicadores 
*   **Correção Rápida:** Se o bot apostar em Surfing e falhar, o próximo GALE (Martingale dinâmico) não buscará o padrão fracassado. Ele muda o "Peso" da decisão lendo qual a nova tendência nascendo.
*   **Gale Inteligente:** O valor não é "só dobrar". Você precisa calcular a taxa da corretora se houver um empate no meio para abater o Red passivo.

### 2.4 A Trava de Titânio (Circuit Breakers)
*O macaco com a uzi é neutralizado aqui.*
*   **Timeout Drop:** O Bot mede o lag. Se o ping ou a demora do socket foi acima de `800ms` pouco antes do "Betting Open", ele DESARMA E NÃO APOSTA NESSA MÃO.
*   **Ghost Transaction Check:** O bot **PRECISA** auditar a carteira real antes e depois. Se ele clicou em apostar R$5, mas em 3 segundos a variável saldo da conta não sofreu o update baixando os R$5 (Significa lag, bug ou rejeição em Shadow DOM), um loop deve disparar o `EMERGENCY_STOP` e derrubar o PID do node. Proteção total de banca.

### RESUMO EXECUTIVO P/ O DEV:
Seu `while(true)` tem o seguinte fluxograma:
1. Escuta WS (Pega Bolinhas Reais).
2. Atualiza Saldo da API Interna BetBoom.
3. Math.Evaluate() -> Chegou sinal do Will?
4. IF SINAL: Timer randômico -> Click Humanizado `(X, Y)`.
5. Valida Resposta de Acerto/Erro -> Atualiza o Multiplicador (Feedback).
6. Repete ou Dispara Circuit Breaker.
