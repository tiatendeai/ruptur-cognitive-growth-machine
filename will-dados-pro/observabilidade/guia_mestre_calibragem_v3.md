# 🚀 GUIA MESTRE: CONSTRUÇÃO E CALIBRAGEM ROBÔ BAC BO (WILL PRO)

Este documento é a diretriz única para o Agente Dev assumir o projeto. Ele separa a execução em duas etapas críticas para garantir que a **banca real** não seja destruída por falhas de infraestrutura.

---

## 🛠️ ETAPA 1: INFRAESTRUTURA, VISÃO E TELEMETRIA
**Objetivo:** Eliminar a cegueira. O robô deve saber exatamente o que acontece no servidor, ignorando o atraso visual da tela.

### Como usar cada parte:
1.  **Receptor de Sockets (O Pulmão):** Implemente o `CDP (Chrome DevTools Protocol)` para grampear o Iframe da Evolution (`launch.billing-boom.com`).
2.  **Parser de Estados:** O código deve identificar o pacote de "Game_State" e extrair:
    -   `Betting_Open`: Início do relógio de 10s.
    -   `Result`: O milissegundo em que os dados pararam no backend.
3.  **Calibrador de Clique (As Mãos):** Use coordenadas `(X, Y)` reais validadas no DOM. 
    -   *Teste:* Execute 10 apostas de valor mínimo (R$ 1) apenas em um lado fixo (ex: Player) para validar se o clique é aceito e se o saldo atualiza no ato. No-trade se o saldo não for debitado em 3s.

---

## 🎯 ETAPA 2: A NORMA DO WILL (ESTRÉGIA SNIPER)
**Objetivo:** Aplicar a inteligência preditiva após a Étapa 1 estar 100% estável.

### A Norma Exata do Will (Baseada no PDF):
O robô agora deve atuar como um **Sniper**, não como um apostador comum.

1.  **Monitoramento de Bolinhas (Bead Plate):**
    -   Armazene as últimas 20 batidas em um Array dinâmico.
    -   **Gatilho Sniper (Obrigatório):** Se houver 6 repetições seguidas da mesma cor (Azul ou Vermelho), a norma do Will exige entrada na **QUEBRA** (Cor oposta) no Giro 7.
2.  **Lógica do Empate (Tie Bias):**
    -   Se a rodada for Empate (Amarelo), considere a perda de 10% da taxa da casa se estiver em recuperação financeira (Martingale).
    -   **Condição Especial:** Após 2 Empates seguidos (Amarelo, Amarelo), **NÃO ENTRE**. Aguarde 2 rodadas limpas.
3.  **Circuit Breaker (A Trava de Titânio):**
    -   **Regra de Ouro:** Se a latência de rede capturada no Socket for > 800ms, o bot deve travar o clique e disparar alerta de "Cegueira Técnica". 
    -   **Stop Loss:** Se o saldo real baixar X% da banca inicial configurada, o bot mata o processo Node.js instantaneamente.

---

## 📋 INSTRUÇÕES DE CALIBRAGEM PARA O DEV
-   **Desenvolvimento:** Use o arquivo `sniffer.cjs` para validar a recepção de dados brutos.
-   **Ajuste Fino:** No arquivo `config.js`, defina `SAFE_MODE = true` enquanto estiver na Etapa 1.
-   **Produção:** Mude para `WILL_SNIPER = true` somente após comprovar que o bot enxerga o resultado antes da animação do dado parar na tela.

---
*Assinado: Antigravity - SRE & Specialist A.I.*
