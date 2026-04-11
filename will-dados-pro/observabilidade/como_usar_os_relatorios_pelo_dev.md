# 🧪 INSTRUÇÕES PARA O AGENTE DEV: USO DA TELEMETRIA

Desenvolvedor, utilize os relatórios desta pasta (`observabilidade/`) como o seu **Dashboard de Debug e Calibragem**. Eles representam a verdade absoluta (Ground Truth) da mesa e da banca.

## 1. Validando o Parser de Sockets
- **Como usar:** Compare a sequência de bolinhas `[P, B, T, B, B]` informada no `relatorio_003.md` com a saída do seu console no `sniffer.cjs`.
- **Ação:** Se os resultados divergirem, o seu parser de WebSocket está interpretando o payload da Evolution de forma errada ou fora de ordem. Corrija o indexador.

## 2. Calibrando a Latência (O "Delay Sniper")
- **Como usar:** O relatório indica que o evento CDP chega **2.4s** antes da tela.
- **Ação:** Configure o seu executor para disparar a aposta entre **500ms e 1500ms** após o sinal `Betting_Open`. Isso garante proteção contra "Bet Rejected" e ainda mantém a aparência de clique humano.

## 3. Investigando Falhas de Clique (Banca vs Execução)
- **Como usar:** Verifique o "Saldo Atual" em cada relatório.
- **Ação:** Se o seu bot registrou uma vitória mas o relatório de telemetria mostra que o saldo não subiu, você tem um problema de **Auditoria de Transação**. O robô pode estar "fantasiando" lucros. Use os saldos do relatório para recalibrar sua função `getAccountBalance()`.

## 4. Testando a Etapa 2 (Norma do Will)
- **Como usar:** Verifique o campo "Ciclo de Sniper" nos relatórios.
- **Ação:** O relatório indicará quando a mesa atingir as **6 bolinhas iguais**. Use esse momento para ver se o seu cérebro de estratégia disparou o sinal de `QUEBRA` perfeitamente no Giro 7, conforme a Norma do Will.

---
**Prioridade:** Siga os relatórios. Eles são os seus olhos fora da Matrix.
