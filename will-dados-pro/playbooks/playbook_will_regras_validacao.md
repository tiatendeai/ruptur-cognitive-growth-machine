# Playbook Will Vol 1: Validação de Estado e Regras de Operação Passo-a-Passo

Este documento define a fita de execução síncrona do robô. Cada passo deve ser validado estruturalmente em modo de *Test Driven Development (TDD)* antes de ir para a mesa real.

## Fase 1: Ciclo de Sincronia da Mesa (Machine State)

O robô deve compreender a "respiração" do jogo e NUNCA agir fora desse BPM (Batidas por Minuto).

1.  **State `Betting Open` (Aguardando Sinal):**
    *   **Regra:** O robô só entra em estado de "Alerta de Compra" quando o WebSocket (WS) altera o status geral para `Betting Open`.
    *   **Teste (Dev):** Mocar o evento `Betting Open` e certificar que o robô muda sua variável `isAllowedToBet` para `TRUE`.
2.  **O "Timer" de Segurança (Cut-off Time):**
    *   **Regra:** Independentemente da análise, **nenhuma submissão** de aposta pode ocorrer após `X` milissegundos do sinal de Betting Open. A Evolution geralmente dá 10s. O cutoff hard-coded do Will deve ser em `5.000ms`.
    *   **Teste (Dev):** Se a intenção algorítmica chegar em `7.000ms`, o módulo deve **descartar a aposta (Skip)** automaticamente. Atrasos sofrem *Reject* no servidor.
3.  **State `No More Bets` (Lock):**
    *   **Regra:** Trocar `isAllowedToBet` para `FALSE`. Entra no estado de "Leitura de Resultado".
4.  **State `Result` e O "Handshake de Transação":**
    *   **Regra:** Computar a vitória ou derrota recebida no Socket. Atualizar o `Caixa Local`. Se o robô apostou e a resposta não indicar uma liquidação (*Settlement*) positiva/negativa com a conta betboom, é acionado o Alerta de Anomalia.

## Fase 2: Pipeline de Aprovação (Validando a Jogada)

Antes de executar, o sinal matemático (gerado na camada de análise) entra no **Funil do Will**. A aposta só sai se passar por todas as portas:

*   **Porta 1 (Conexões Vivas):** O ping HTTP da API BetBoom é < 200ms? O Socket não perdeu frame? (Se "Não" -> Pular Rodada).
*   **Porta 2 (Validação de Caixa Real):** Há saldo na carteira para o valor da aposta atual + uma possível próxima perca (caso do Martingale ativo)? (Se "Não" -> Abortar).
*   **Porta 3 (Sinal Matemático - Módulo 4 do Playbook):** O padrão lido (Surfing ou Trigger) é forte o bastante? Está na lista de obrigatórios? (Se "Sim" -> Prosseguir).
*   **Porta 4 (Fator de Ruído):** Adicionar um delay Randômico entre 200ms e 900ms para emular um dedo humano clicando.
*   **Ação Final:** Disparar XHR/CDP de injeção da aposta. Ligar "modo escuta" para pegar o status `bet_accepted`.

## O Que Foi Descoberto vs Lacuna (Dev Notice)

*   **Sabemos:** Que a latência domina tudo. A Evolution permite que você mande o request da aposta pelo Websocket wrapper deles contanto que o token JWT seja válido.
*   **A Descobrir no Teste:** Como a BetBoom reage se você mandar a aposta logo no ms=0 do Betting Open (risco de ser flagrado como bot por velocidade não-humana). Precisamos do *Fator de Ruído* em funcionamento estrito!
