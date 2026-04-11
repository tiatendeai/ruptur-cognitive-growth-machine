# Playbook Will Vol 2: Lógica de Caixa, Stakes e Matemática de Aposta

A premissa da nossa inteligência é que a matemática do cassino ganha no longo prazo devido à taxa da mesa (ex: "comissão do Banker" no baccarat clássico, ou a absorção das cores em caso de Empate no Bac Bo). O nosso robô deve calcular apostas ativamente cobrindo esses buracos invisíveis.

## 1. A Matriz de Valores (Stakes)
O conceito de *"Valor Fixo Nominal"* (ex: "apostarei R$2 sempre") **não existe**. O robô deverá trabalhar com *Stake Units* (Unidades de Aposta), relativizadas frente à banca global do usuário.

*   **Stake Base ($B):** O valor da primeira aposta inicial. (Exemplo: 1% da Banca).
*   **A "Taxa do Empate" ($Te):** Se a rodada der Amarelo (Empate), a casa devolve 90% da sua aposta. Aqueles **10%** sugados pela mesa entram no prejuízo do cálculo estrutural do robô. 

## 2. Lógicas de Entrada Numérica

A cada nova rodada cujo motor determine uma "compra" válida, o calculador age:

### Cenário A: Win Sequence (Soros Controlador)
*Se ganhamos na rodada passada...*
*   **Regra Segura (Padrão):** Retornar para **1x $B** e guardar o lucro puro.
*   **Regra Agressiva:** Se o módulo apontar *Hot Streak* (probabilidade absurdamente alta de que a próxima mantém), e habilitado na configuração, pode apostar *Lucro Anterior + $B* numa mão de juros compostos rápidos (limitado a 3 ciclos máximos).

### Cenário B: Série de Perdas (Martingale Dinâmico)
O Martingale cego (1, 2, 4, 8) quebra bancas muito rápido. Nosso modelo:
*   **Passo 1 ($M1):** 2x o valor da Stake Base + Ajuste para cobrir lucro falho. (R$ 4).
*   **Passo 2 ($M2):** 4x Stake + Prejuízo Acumulado. (R$ 8).
*   **Regra de Cálculo Essencial (O Gap Oculto):** Todo cálculo $M_x$ deve varrer os eventos antigos da "sessão de perdas". Houve um "Empate" ali no meio? Calcule 10% do que você perdeu ali e injete o valor residual do empate no próximo GALE para o saldo voltar perfeitamente zero-a-zero se ganharmos.

## 3. Gestão Pós-Empate Absoluto
Se o bot decidir fazer o "Tiro Seco" (apostou que ia dar Empate direto no Amarelo com payout de 88x) e ganharmos:
*   **Regra:** Ele recolhe fundos e, obrigatoriamente, faz *Reset Total das Séries de Perda*, assumindo essa rodada vitoriosa como a "mãe financeira" cobrindo o dia inteiro.

## 4. O Sistema de Desistência Parcial (Micro-Stops)
*   **Gale Máximo (GMAX):** Quantas vezes vamos dobrar antes de aceitar a perda? O bot jamais será programado `while(true) dobrar`.
*   O valor de GMAX nunca pode ultrapassar a segurança do Stop Final Diário estabelecido no Circuit Breaker. Se a próxima dobra bater num valor superior a 15% do total da carteira em um único clique... **O Bot assume o loss pontual, zera os steps e começa do Base novamente.**
