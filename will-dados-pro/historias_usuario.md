# Histórias de Usuário: Bot Will Dados Pro

Este documento lista as *User Stories* baseadas no modelo (Investidor/Operador vs. Bot de IA), detalhando as entregas e testes de aceitação (DoD - Definition of Done).

---

### Epic 1: Telemetria e Mapeamento
**Envolve:** Interceptar o tráfego da Evolution Gaming isolando os dados de vitórias.

**US1.1: Inicialização Limpa e Bypass de Bloqueios**
> **Como** operador, **eu quero** que o bot efetue o login na BetBoom ignorando pop-ups (depósito, bônus) **para que** eu não precise intervir na automação do setup.
* **Teste de Aceite:** O Puppeteer injeta as credenciais e navega via URI direto (`/casino/game/bac_bo-26281/`) e detecta "Balance".

**US1.2: Captura Profunda de Frames Criptografados (Iframe Bypass)**
> **Como** motor de telemetria (CDP), **eu quero** escutar os frames de websocket nativos da Evolution Gaming (site-per-process/AutoAttach) **para que** eu capture exatamente o placar do jogo e os timers em milissegundos.
* **Teste de Aceite:** O log gera outputs identificáveis contendo payloads decodificados de resultados (não apenas os `tickerNotify` front-end da BetBoom).

---

### Epic 2: Gestão de Estado e Análise do Drift (Observabilidade)
**Envolve:** Lógica para compreender os tempos de apostas e contadores de banca/lucros.

**US2.1: Identificação das Fases da Mesa**
> **Como** analisador de estado, **eu quero** detectar instantaneamente quando "Betting Open", "Betting Closed" e "Result" ocorrem **para** não lançar apostas atrasadas (Reject).
* **Teste de Aceite:** Quando o video do dealer anuncia a rodada, o log emite um trace `<TIME> - MESA ABERTA. <X> Segundos restantes.`

**US2.2: O Livro de Caixa e Gestão (Money Management)**
> **Como** gestor do Bot (Will), **eu quero** ler o saldo consolidado atual, calcular o PnL (Lucro e Perda) realístico e garantir que o stop gain/loss não foi violado **para** proteger a banca do investidor.
* **Teste de Aceite:** Após cada evento de vitória, um objeto interno armazena `banca_atual += lucro`. Se a banca atingir limite mínimo, trava de apostas é engatilhada.

---

### Epic 3: Motor de Automação de Apostas (Trade Execution)
**Envolve:** Fazer com que o sistema opere automaticamente baseando-se em inputs probabilísticos e proteja ativamente o negócio.

**US3.1: Gatilho de Compra Automática (Trader Agent)**
> **Como** algoritmo inteligente, **eu quero** disparar o evento de injetar saldo via clique virtual do CDP ou emulação de interface nos primeiros 3 a 5 segundos de betting open **para que** o request da aposta seja computado sem falha pelo servidor da Evolution.
* **Teste de Aceite:** Na interface real verificamos o valor deduzindo instantaneamente na mesa. A lista de transações aparece no log de cassinos.

**US3.2: O "Circuit Breaker" Absoluto (Segurança Ativa)**
> **Como** investidor prudente, **eu quero** que caso algum evento crasso ocorra (falta de balanço de conta real, descarte repetido do token de Auth pela Betboom, erro nas apostas) a máquina aborte a si própria desvinculando o navegador **para que** a conta não perca todo dinheiro gerando apostas fantasma (run-away bots).
* **Teste de Aceite:** Se `BetAccepted` for falho por N vezes seguidas, ou a conexão ping-pong WS falhar, o script joga Exception `Error fatal: Parada Operacional por Inconsistência`, matando o PID do script e finalizando o Chrome.
