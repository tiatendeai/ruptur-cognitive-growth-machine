# Levantamento e Análise de Requisitos: Bot Will Dados Pro (Bac Bo)

## 1. Visão Geral do Projeto
O **Will Dados Pro** é um sistema de Inteligência Artificial para análise e operação automatizada no jogo **Bac Bo** (cassino ao vivo da Evolution Gaming, via plataforma BetBoom). O objetivo é criar um ecossistema que intercepta a telemetria do jogo em tempo real (resultados dos dados), analisa padrões, identifica as melhores oportunidades de aposta através de algoritmos de predição e realiza as apostas de forma autônoma sem intervenção humana direta.

## 2. Requisitos Funcionais (RF)

### 2.1 Eixo de Telemetria e Captura (Core)
- **RF01:** O sistema DEVE interceptar e decodificar o tráfego WebSocket do motor Evolution Gaming (iframe).
- **RF02:** O sistema DEVE isolar com precisão os eventos de `game_state`, `betting_open`, `betting_closed`, `result_player` e `result_banker`.
- **RF03:** O sistema DEVE registrar as pontuações e resultados sem latência considerável em relação à transmissão ao vivo.

### 2.2 Eixo de Observabilidade e Análise
- **RF04:** O sistema DEVE manter um banco de dados temporal com o histórico de rodadas (Drift Monitor).
- **RF05:** O sistema DEVE aplicar inferência algorítmica para determinar a direção (Blue/Player, Red/Banker, Tie) e confiança da aposta.
- **RF06:** O sistema DEVE disponibilizar um Dashboard SR para visualização de uptime do serviço, latência do websockets e taxa de assertividade.

### 2.3 Eixo de Automação de Apostas (Trader Agent)
- **RF07:** O sistema DEVE ser capaz de injetar a intenção de aposta no cliente do jogo via protocolo (CDP/Puppeteer) ou interface reproduzida simulando o clique natural humano nos botões do Bac Bo.
- **RF08:** O sistema DEVE aplicar estratégias de gestão de banca rigorosa (ex: Martingale limitado, stop-loss automático, stake base fixa).
- **RF09:** O sistema DEVE parar imediatamente (Circuit Breaker) ao detectar "low balance", desconexão do socket ou "bet rejected".

## 3. Requisitos Não-Funcionais (RNF)

- **RNF01 (Segurança):** Credenciais e chaves JWT/Tokens operacionais (`verification_token`, `SID`) devem ser criptografados e não exibidos em logs brutos.
- **RNF02 (Resiliência):** O módulo de telemetria deve ser auto-recuperável. Se o socket da Evolution fechar (EOF), o sistema deve reengajar a conexão automaticamente via headless browser em background.
- **RNF03 (Performance):** A detecção do "betting_open" e a execução da aposta devem ocorrer em under 1.5s para evitar apostas tardias rejeitadas pelo dealer.
- **RNF04 (Bypass):** O scraper de rede deve operar indetectável mediante desativação do "IsolateOrigins", evitando blacklists ou CAPTCHAs da Cloudflare/Evolution.

## 4. Regras de Negócio (RN)
- **RN01:** O bot JAMAIS poderá ultrapassar um Stop-Loss definido por sessão em variáveis de configuração segura.
- **RN02:** O bot só atuará na mesa `BacBo00000000001` (ou a equivalente instanciada na BetBoom naquele SID).
- **RN03:** Em caso de perda de sincronia de frames, apostas na rodada corrente são sumariamente abortadas em nome da segurança de caixa.
