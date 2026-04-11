# Playbook Will Vol 5: Leitura Sensorial (Bolinhas) e Ciclo de Correção de Feedback

Este módulo detalha o verdadeiro "Motor Cognitivo" do Will. Ele não atua apenas de forma estática; ele observa o quadro histórico e adapta o peso de suas próximas decisões (Feedback Loop). Este processo é comumente apelidado de "*A Leitura das Bolinhas*".

## 1. A Matriz de Ouro: O Quadro de Bolinhas (Bead Plate)

A plataforma constrói o placar usando um grid preenchido top-down, left-to-right de bolinhas coloridas (🔴 Vermelho=Banca, 🔵 Azul=Jogador, 🟡 Amarelo=Empate). 
Para o nosso algoritmo, isso se resume a um vetor cronológico imutável (ex: `[B, P, P, T, B]`).

### O Aprendizado Constante (Lookback Buffer)
O Will deve possuir uma função nativa de `Buffer` que audita as **últimas 20 bolinhas**. 
*   **A "Temperatura" da Cor:** A cada nova bolinha, o robô recalcula qual cor está "Quente" (Dominância > 60% nas últimas 20 casas). 
*   **O Veredito:** Se a bolinha Azul está "Quente", o robô atribui um multiplicador de Confiança (`+15%`) em todo trigger gerado a favor do Azul.

## 2. Padrões Visuais Exatos nas Bolinhas

Exigem ação imediata da automação ou suspensão do trade:

*   **A Escadinha ("Stairs"):** 
    *   *Visão:* O quadro começa a empilhar alternâncias: `1 Azul, 2 Vermelhas, 3 Azuis...`
    *   *Ação do Will:* O bot percebe o padrão progressivo e aposta na quebra da subida logo que o cluster ameaçar chegar a 4.
*   **O "Falso Empate" Escorregadio (Slippery Tie):**
    *   *Visão:* Surge um Tie 🟡 ladeado pela mesma cor (ex: 🔵🟡🔵). 
    *   *Aprendizado do Will:* A mesa está confirmando a coloração Azul mesmo após o empate. O Will ativa um "Sinal Verde de Correção" forçando a aposta em 🔵 no próximo giro válido.

## 3. Correção Lógica Pós-Rodada (Feedback Analítico)

A automação *não engata Marcha Ré* baseada no medo; ela calcula o Delta. Isto é o "Feedback Loop" do bot:

### A) Correção de Falso-Positivo
*   **Situação:** O bot identificou um Padrão Sanduíche Perfeito (🔵🔴🔵🔴🔵), recomendou que a 6º bolinha seria 🔴 e submeteu aposta. Caiu 🔵 (Quebra de Padrão).
*   **Ajuste de Feedback do Will:** Imediatamente após a bolinha Azul confirmar o revés, a matriz interna `NeuralWeight` penaliza esse "Sinal de Sanduíche" naquela hora em específica. Se o bot for engatar um Martingale, ele **NÃO o fará apostando na volta do Sanduíche**. Ele assumirá que uma **Linha Contínua (Streak)** de Azuis acabou de nascer e usará a dobra de caixa a favor da nova tendência dominante.

### B) O Peso do 'Quase' (Feedback de Pontuação)
*   **A Importância do Número, Não Só da Cor:** O bot extrai o log de Websockets. A bolinha foi 🔴 da Banca. Mas por que os dados caíram 7 contra 6? Ou 11 contra 2?
*   **A Regra da Sobrecarga:** Se o Jogador tem perdido de *"Massacre"* (ex: 12 a 3 da Banca sucessivamente), o algoritmo sabe que os dados 1 e 2 estão viciando em números pesados. O Will diminui drasticamente a esperança de apostar em Reversões para o Azul enquanto não houverem duas rodadas seguidas onde o Azul perca por no máximo "1 ponto" de diferença (Margem Fechada).

## 4. O Sistema "Auto-Tune"

A última fronteira do Bot, que o eleva acima da simples lógica condicional `if/then`:

1.  Se o Will acumula **Erros (Red)** consecutivamente (Falha no Back-Testing paralelo): O limiar de disparo aumenta. Ele passa a exigir *"Super Padrões"* (ex: 7 repetições visíveis nas bolinhas) para emitir uma nova ordem de compra real.
2.  Se o Will consolida **Acertos (Green)**: O limiar é afrouxado dinamicamente para aumentar agressividade financeira durante o "Mergulho de Sorte" (Lucky Dip).

---
**Guia ao Dev Backend:** Para processarem isso e injetarem na "Mente do Will", utilizem Matrizes Bidimensionais para modelar o quadro de bolinhas via cache em memória (ex: Redis / Maps locais `Map<string, string[]>`) e recalcularem esses padrões a cada evento `Network.webSocketFrameReceived`.
