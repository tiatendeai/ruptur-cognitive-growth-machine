# Requisitos e Análise Técnica — Case will-dados-pro

Este documento consolida os requisitos operacionais para o microserviço, focando na integridade do ecossistema **Bet A.I.**.

## 1. Requisitos Funcionais (RF)

| ID | Descrição | Prioridade |
| :--- | :--- | :--- |
| **RF-01** | Detectar mudança de seletores críticos (apostas/timer) na BetBoom. | P0 (Must) |
| **RF-02** | Validar contrato JSON do Websocket de rodada contra baseline conhecido. | P0 (Must) |
| **RF-03** | Capturar snapshots de evidência em caso de divergência UI vs. Rede. | P1 (Should) |
| **RF-04** | Medir latência de resposta do servidor de resultados (Evolution/BetBoom). | P1 (Should) |
| **RF-05** | Notificar `backend-principal` sobre instabilidade ou drift crítico. | P0 (Must) |
| **RF-06** | Manter histórico (logs formatados) de todas as rodadas observadas. | P1 (Should) |
| **RF-07** | Gerar Health Score em tempo real da plataforma. | P2 (Could) |

## 2. Requisitos Não-Funcionais (RNF)

| ID | Descrição | Categoria |
| :--- | :--- | :--- |
| **RNF-01** | Baixo Acoplamento: Não deve depender da lógica do robô executor. | Arquitetura |
| **RNF-02** | Resiliência: Deve recuperar-se automaticamente de quedas de conexão. | SRE |
| **RNF-03** | Rastreabilidade: Toda falha de observação deve gerar um `IncidentRecord`. | Sustentação |
| **RNF-04** | Performance: Detecção de drift de rede deve ocorrer em < 300ms. | Telemetria |
| **RNF-05** | Invisibilidade: Não deve interferir na execução do jogo (Read-only). | Segurança |

## 3. Regras de Negócio (RN)

1.  **Regra de Parada (Safe-Stop)**: Se o `Health Score` cair abaixo de 70%, o CGM deve emitir sinal de recomendação de pausa para o robô.
2.  **Regra de Evidência**: Nenhuma falha de contrato pode ser reportada sem um snapshot do payload e timestamp associado.
3.  **Regra de Histórico**: Dados de auditoria devem ser mantidos por no mínimo 30 dias no `Supabase`.

## 4. Análise de Risco

- **Drift Silencioso**: A plataforma muda um nome de classe CSS e o sistema de telemetria falha em reportar. mitigação: Auditoria cruzada entre DOM e Network.
- **Overhead de Rede**: Muita captura de evidências saturando a banda. Mitigação: Amostragem inteligente (apenas em erros ou rodadas críticas).

---
**Status**: Consolidado para desenvolvimento da v1.
