# Descobertas Firecrawl — BetBoom / Bac Bo — 2026-04-09

## Objetivo

Consolidar as primeiras descobertas externas e de superfície web para orientar a implementação do **Cognitive Growth Machine** com foco em **BetBoom Brasil** e no jogo **Bac Bo**.

## Artefatos locais gerados

- `.firecrawl/search-betboom-bacbo.json`
- `.firecrawl/search-betboom-live-casino-bacbo.json`
- `.firecrawl/search-bacbo-rules-evolution.json`
- `.firecrawl/search-br-betboom-bacbo.json`
- `.firecrawl/search-betboom-bacbo-evolution-brasil.json`
- `.firecrawl/evolution-news-bacbo.md`
- `.firecrawl/evolution-first-person-bacbo.md`
- `.firecrawl/wizardofodds-bacbo.md`
- `.firecrawl/br-betboom-live-casino.json`
- `.firecrawl/betboom-live-casino-raw.html`
- `.firecrawl/betboom-game-26281.json`
- `.firecrawl/betboom-game-26281-query.txt`
- `.firecrawl/betboom-game-26281-raw.html`
- `.firecrawl/betboom-speed-baccarat-38506-query.txt`
- `.firecrawl/br-betboom-live-casino-query.txt`
- `.firecrawl/m-betboom-pt-query.txt`
- `.firecrawl/wizard-betboom-review-query.txt`
- `.firecrawl/casinoguru-betboom-review-query.txt`

## Descobertas principais

### 1. A BetBoom Brasil possui Bac Bo listado no Live Casino

Evidência:
- `https://betboom.bet.br/live-casino/`
- `.firecrawl/br-betboom-live-casino.json`
- `.firecrawl/betboom-live-casino-raw.html`

Achados:
- a página de Live Casino da BetBoom Brasil lista o jogo `«Bac bo»`
- o card público usa o texto `Aproveite sua sorte!`
- usuários não autenticados recebem CTA de cadastro/login
- a rota pública descoberta foi `https://betboom.bet.br/live-casino/`

### 2. O jogo Bac Bo possui ID interno identificável

Evidência:
- `.firecrawl/betboom-live-casino-raw.html`
- `.firecrawl/betboom-game-26281.json`

Achados:
- o catálogo/estado da página expõe o jogo Bac Bo com rota de jogo `https://betboom.bet.br/casino/game/26281/`
- no banner do Live Casino aparecem referências internas associadas ao Bac Bo
- isso permite rastrear o jogo por ID estável, não apenas por texto de UI

### 3. O provedor do Bac Bo na BetBoom é Evolution Gaming

Evidência:
- `.firecrawl/betboom-game-26281.json`
- `.firecrawl/betboom-game-26281-query.txt`

Achados:
- o jogo `Bac Bo` aparece com `provider logo`
- o provedor identificado na página do jogo é `Evolution Gaming`
- o modo demo não está disponível sem autenticação

### 4. Há mistura de provedores no mesmo ecossistema Live Casino

Evidência:
- `.firecrawl/betboom-speed-baccarat-38506-query.txt`
- `.firecrawl/betboom-live-casino-raw.html`

Achados:
- `Speed Baccarat 1` aparece como `Pragmatic Play Live`
- isso confirma que o catálogo não depende de um único fornecedor
- portanto o CGM precisa modelar **provider mapping por jogo**, não por seção inteira

### 5. O site brasileiro ativo é `betboom.bet.br`

Evidência:
- `.firecrawl/br-betboom-live-casino.json`
- `.firecrawl/m-betboom-pt-query.txt`
- `.firecrawl/search-betboom-bacbo.json`

Achados:
- a experiência útil e acessível em BR apareceu no domínio `betboom.bet.br`
- buscas feitas a partir de contexto US retornaram bloqueio geográfico em páginas como `br.betboom.com/live-casino/`
- isso sugere que o monitoramento deve tratar **domínios, locale e geo** como variáveis explícitas de auditoria

### 6. Há sinais claros de stack e configuração cliente expostos na superfície web

Evidência:
- `.firecrawl/betboom-live-casino-raw.html`
- `.firecrawl/betboom-game-26281-raw.html`

Achados:
- páginas renderizadas por app com rotas `/liveCasino` e `/game`
- `buildId`: `pqUjku63ZsL_21fBSDGu7`
- `BUILD_NUMBER`: `8.421.0.20201`
- presença de `Sentry`, `Yandex Metrika`, `GTM`, `Mindbox`, `Comm100`
- `Comm100` com `siteId 85000867` e workgroup Brasil
- endpoints e websocket configs de esporte também aparecem no runtime config
- script global de Pragmatic aparece carregado no app

### 7. O site brasileiro expõe sinais regulatórios e operacionais relevantes

Evidência:
- `.firecrawl/betboom-game-26281.json`
- `.firecrawl/m-betboom-pt-query.txt`

Achados:
- operador: `BetBoom Ltda.`
- endereço em São Paulo
- referência a `Portaria de Licença definitiva SPA/MF nº 2.103 de 30/12/2024`
- suporte 24/7, telefone e e-mail público

Isso é útil para:
- observabilidade regulatória
- modelagem de ambiente Brasil
- rastreabilidade de mudanças institucionais na plataforma

### 8. Baseline externo de regras do Bac Bo foi recuperado

Evidência:
- `https://www.evolution.com/news/evolution-launches-bac-bo-its-unique-dice-baccarat-game/`
- `https://wizardofodds.com/games/bac-bo/`
- `.firecrawl/evolution-news-bacbo.md`
- `.firecrawl/wizardofodds-bacbo.md`

Achados:
- Evolution descreve Bac Bo como uma variação de Baccarat com dados
- Player e Banker usam dois dados cada
- empate pode pagar até `88:1`
- análise externa do Wizard of Odds registra house edge aproximada de:
  - `1.13%` para Player/Banker
  - `4.48%` para Tie

## Implicações imediatas para o CGM

### Entidades que agora fazem sentido

- `provider_record`
- `game_catalog_record`
- `game_route_record`
- `surface_snapshot_record`
- `runtime_config_snapshot_record`
- `geo_access_record`
- `regulatory_snapshot_record`

### Checks automáticos recomendados

1. **Catalog check**
   - Bac Bo continua listado?
   - título mudou?
   - CTA mudou?

2. **Provider check**
   - Bac Bo continua mapeado para Evolution?
   - Speed Baccarat continua mapeado para Pragmatic Play Live?

3. **Route check**
   - `/live-casino/` continua acessível?
   - `/casino/game/26281/` continua resolvendo?

4. **Build/runtime drift**
   - `buildId` mudou?
   - `BUILD_NUMBER` mudou?
   - runtime config expôs novas integrações?

5. **Access/geo drift**
   - comportamento muda entre BR e US?
   - domínio principal mudou?

6. **Auth wall check**
   - demo segue indisponível?
   - fluxo de login/cadastro mudou?

## Próximos passos sugeridos

1. promover essas descobertas para o modelo de dados do projeto
2. criar o módulo `platform-discovery` com snapshots HTML/metadata
3. criar `provider-map` como baseline inicial
4. criar `drift-detector` para:
   - game title
   - provider
   - route
   - build id
   - build number
   - disponibilidade geo
5. versionar esses artefatos como evidência inicial da Missão 001

## Fontes externas principais

- BetBoom Brasil Live Casino: `https://betboom.bet.br/live-casino/`
- BetBoom Brasil Bac Bo: `https://betboom.bet.br/casino/game/26281/`
- Evolution — lançamento Bac Bo: `https://www.evolution.com/news/evolution-launches-bac-bo-its-unique-dice-baccarat-game/`
- Evolution — First Person Bac Bo: `https://www.evolution.com/games/first-person-bac-bo/`
- Wizard of Odds — Bac Bo: `https://wizardofodds.com/games/bac-bo/`
- Wizard of Odds — BetBoom review: `https://wizardofodds.com/online-casinos/reviews/betboom-casino/`
- Casino Guru — BetBoom BR review: `https://casino.guru/betboom-casino-br-review`
