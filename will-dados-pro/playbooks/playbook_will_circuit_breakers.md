# Playbook Will Vol 3: Arquitetura de Defesa, Stops e Circuit Breaker

Todo robô precisa de um cérebro financeiro. O Circuit breaker *precisa* atuar antes da camada de processamento de interface, não depois.

## 1. Segurança Primária (Stop Gains & Stop Loss)

*   **Take Profit Base (Stop Gain):** 
    *   Estabelecido como uma '%' (Ex: "Atingiu 5% da Banca Inicial Diária").
    *   **Ação:** O Bot desarma. Envia mensagem "Meta Batida. Missão Concluída no Caixa = $X". Entra em modo Sleep (Não opera, só observa telemetria para treinar os algoritmos sem apostar seu saldo real).
*   **Draw Down Definitivo (Stop Loss Diário):**
    *   **Ação:** Corte Rígido. Esse é o limite que jamais será furado. Ele é acionado *no momento em que uma meta de aposta ultrapassaria ou se igualaria ao teto de perda estabelecido*. 
    *   **Execução:** Chama a rotina `fatal_disconnect()`. Não há recuperação. O bot só religa no dia seguinte com autorização humana.

## 2. A Camada "Circuit Breaker" Operacional

Protege o sistema contra surtos da casa **Evolution Gaming**. Estes comportamentos nos dizem que as condições técnicas da mesa são um "gap" instável:

### Gatilhos Críticos (Acionamentos Imediatos de Pausa):
1.  **Sequência de Rejeições (Socket Reject Anomalies):**
    *   Se 3 tentativas de apostas dentro das regras forem negadas repetidamente pela Evolution com status `BetRejected`, o Breaker abaixa e desliga a automação por 15 minutos (assumimos lag no gateway do Brasil ou atualização no painel do dealer anti-bot).
2.  **O "Ghost Transaction" (Assincronia Financeira):**
    *   A nossa arquitetura exige checar o `AccountBalance` real. Se o robô deduzir que deve apostar R$4, e a reposta do saldo não vir descontada R$4 dentro de 3.5 segundos, uma pausa imediata de 2 rodadas é forçada. Se persistir, encerramos a sessão.
3.  **Fechamento do WebSocket em Massa (EOF):**
    *   A plataforma pode mudar de iframe se o jogo "Bac Bo A" ficar muito lotado. Isso desconecta o *TargetAttach*. O CDP solta erro de contexto.
    *   **Ação:** Trigger de Circuit Breaker. O bot cancela todas as intenções de aposta atuais. Faz reload completo na página e roda novamente o Handshake inicial.

## 3. As Condições e Regras Onde *NUNCA* Devemos Entrar

Para que o time Dev saiba quando codificar o bloqueio de "Skip Round":

*   **A "Rodada Cega":** Excesso de atraso no websocket (Ping > 800ms pro exterior). Isso significa que estamos operando tarde. Se a latência for medida como alta na rodada anterior, NUNCA apostemos na atual para não sofrer Rejeição comendo nosso saldo sem ir pra banca.
*   **Caixa Mínima Inválida na Mesa:** BetBoom avisa o Bac Bo qual o minimum stake. Se o bot calcular que o $Base desejado é inferior à *limit_min_bet* anunciada pela interface, não arredonde para o mínimo da sala (isso desvirtua o Bankroll Management). **Aborte operação** até o painel central informar que temos caixa robusto para suportar o limit da sala.
*   **Múltiplos Empates em Loop (Anomalia de Máquina):** Após o segundo evento de "Empate" seguido em uma única stream, a mesa entra em modo super-variante. O bot *Fica Cego* e deve esperar 2 rodadas normais para recomeçar o surfing de leitura. O risco é letal e corrói a banca na dupla-taxa de devolução.
