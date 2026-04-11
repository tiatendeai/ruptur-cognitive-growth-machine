# Jornadas do Usuário — Case will-dados-pro

Este documento descreve as interações entre o **CGM**, a plataforma **BetBoom** e os consumidores da inteligência (Robô e Suporte).

## Atores
- **Sistema CGM**: Agente de observabilidade e descoberta.
- **Robô Executor**: Sistema de apostas que consome sinais do CGM.
- **Operador de Suporte**: Humano responsável por resolver incidentes críticos.
- **Backend Central**: Orquestrador que persiste achados e alertas.

---

## Jornada 1: Monitoramento e Sincronia de Saúde (Fluxo Feliz)

**Cenário**: O jogo Bac Bo está operando normalmente.

1.  O **CGM** estabelece conexão com o Websocket da BetBoom e carrega o mapa de seletores UI.
2.  A cada nova rodada, o **CGM** valida se o payload de `NewRound` segue o contrato esperado.
3.  O **CGM** atualiza o `Health Score` para 100% no `Backend Central`.
4.  O **Robô Executor** consulta o status, vê que está "GREEN" e prossegue com a lógica de apostas.
5.  O ciclo se repete sem intervenção humana.

---

## Jornada 2: Detecção de Drift e Bloqueio Anticrise (Fluxo de Alerta)

**Cenário**: A plataforma BetBoom muda o ID do botão de aposta ou o formato do resultado.

1.  O **CGM** detecta que o seletor `btn_bet_player` não foi encontrado ou mudou de estrutura.
2.  O **CGM** gera imediatamente um `IncidentRecord` com severidade **CRITICAL**.
3.  O **CGM** envia um sinal de `FREEZE_RECOMENDATION` via webhook para o orquestrador.
4.  O **Robô Executor** recebe o sinal e congela todas as operações pendentes.
5.  O **CGM** tira um snapshot (evidência) do erro e guarda no storage.

---

## Jornada 3: Investigação e Sustentação (Fluxo de Suporte)

**Cenário**: Um operador humano precisa entender por que o sistema parou.

1.  O **Operador de Suporte** recebe o alerta no canal de emergência (n8n/Slack).
2.  Ele acessa a interface de logs/analytics do **CGM**.
3.  O operador consulta o `Discovery Report` gerado na Jornada 2.
4.  O **CGM** apresenta o diff: "Esperado: seletor X | Encontrado: seletor Y".
5.  O operador valida a mudança, atualiza o mapa de seletores (via agente ou manual) e o **CGM** re-testa a saúde.

---

## Jornada 4: Aprendizado Contínuo e Hipóteses

**Cenário**: O analista quer validar se uma nova estratégia de leitura de dados é assertiva.

1.  O **CGM** começa a rastrear o `HypothesisRecord` silenciosamente (sem apostar).
2.  Ele compara o resultado observado na interface com o esperado pela hipótese.
3.  O **CGM** gera um relatório de `Confidence Score` daquela regra ao longo de 100 rodadas.
4.  Os dados alimentam o RAG para futuras evoluções do robô.
