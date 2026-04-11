# Playbook Will Vol 4: Regras Preditivas e Gatilhos de Entrada ("Strike Points")

Este módulo concentra "Quando Puxar o Gatilho". O motor algorítmico do Will só emitirá sinal real positivo (True) se algum dos padrões na matriz abaixo for satisfeito. Não existem achismos.

## 1. As Entradas OBRIGATÓRIAS (Premium Strikes)

Uma *Entrada Obrigatória* possui altíssimo índice de assertividade pois demonstra correção de simetria do algoritmo gerador randômico da Evolution.
*Nestas condições, o bot NÃO MOSCA. Ele ativa a entrada com ruído humano imediato.*

*   **Padrão "Quebra de Coluna Maior" (Anti-Streak Severo):**
    *   **Acionamento:** Quando 6 cores idênticas consecutivas surgem. Ex: `[Azul, Azul, Azul, Azul, Azul, Azul]`. 
    *   **A Aposta:** Vira contra a tendência para a Casa Oposta (Ex: Apostar Vermelho).
    *   **Nota:** Apesar de assustador, a mesa na maioria das sequências do dia (após teste dos logs) interrompe uma fileira na 7ª rodada.

*   **Padrão "Sanduíche Mestre":**
    *   **Acionamento:** Repetição exata do formato `[Cor A, Cor B, Cor A, Cor B, Cor A]`. Conhecido como Ping-Pong longo.
    *   **A Aposta:** Apostar na continuação do padrão (Entrar com `Cor B`). Quebrar o fluxo de Ping-Pong não funciona bem no Bac-Bo.

## 2. Entradas "Com Ressalvas" (Conditional Strikes)

O bot pode decidir entrar baseado no peso de Caixa, mas corre mais risco e, muitas vezes, é prudente aguardar (Lurk).

*   **Padrão "O Salto do Tie" (The Tie Jump):**
    *   **Acionamento:** A cor X vinha ganhando. Subitamente sai "Amarelo (Empate)".
    *   **O Risco:** Normalmente as pessoas acreditam no "Volta na cor anterior". O Bac-Bo altera muito a simetria de força dos dados 4 após um Tie.
    *   **A Ressalva:** O Robô SÓ vai entrar apostando na continuidade (Ex: `Apostar Vermelho de novo após um Empate que vinha de Vermelho`) SE E SOMENTE SE não estivermos no step final de um Martingale pesado (Max Gale). Se a dobra máxima for agora, *pule a jogada (Skip)*. Um erro seguido por um Empate não pode ser engolido pelo Martingale.

*   **A Matemática de Espelho (Mirroring):**
    *   A matriz da Bead Plate em Bac-Bo muitas vezes "espelha" o que ocorreu há 4 casas para trás (ex: Dupla vitória do Azul). Se essa tendência tentar ser clonada...
    *   **Ação:** Seguir com aposta moderada (Meia-Stake / Scalping). O bot submete R$ Base/2. Minimiza a perda e o lucro é incremental.

## 3. A Matriz de Rejeição Total (Onde NÃO Entrar Dando "Skip")

Nestas circunstâncias observadas no Bead Plate (Histórico), o cassino consome dinheiro com imprevisibilidade máxima.

*   **Nunca Entrar (Black Zone):** Uma sequência curta irregular `[R, T, R, B, T]`. Empates com espaços demasiados curtos caotizam os limites normais.
*   **A Mão Cega Pós-Reconexão:** Se o bot foi expulso, relogou e reconectou. Ele não fará aposta na PRIMEIRA ou SEGUNDA jogada mesmo se os sinais acima surgirem. Ele precisa observar o fluxo ao vivo por 2 cúpulas rolando para calibrar os contadores internos (Latency vs Interface).

## 4. O Sistema de Resumo Para o Dev Team

Para desenvolverem isso, os programadores na frente de trabalho não podem confiar nos botões UI "P e B". Na ponta da linha do WebSockets, eles estarão extraindo os resultados de cada milissegundo de rodada para dentro de um `Array de Estados [1, 2, 2, 1, 3] (1=P, 2=B, 3=T)`. 

A inteligência de validação dos padrões acima rodará neste simples *Array*, disparando de forma assíncrona o resultado lógico no milissegundo final do `Roll_state`. Se essa lógica gritar `BetPlayer(Confidence: 90%)`, o braço executor Puppet age com um DelayRand() cobrindo o painel central.
