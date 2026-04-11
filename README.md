# 🧠 Microservice Cognitive Growth Machine

**Bet A.I. — 2DL Company**

Este microserviço é o motor de inteligência, observabilidade e sustentação do ecossistema **Bet A.I.**. Ele atua como o sistema imunológico e o cérebro de aprendizado contínuo, protegendo os robôs executores e alimentando o backend com dados validados.

---

## 🚀 Visão Estratégica

O **Cognitive Growth Machine (CGM)** não executa apostas. Sua missão é garantir que o robô executor nunca opere em condições de incerteza ou falha silenciosa.

### Pilares de Atuação:
*   **Telemetria & Observabilidade**: Monitoramento técnico e funcional em tempo real.
*   **Anticrise & Sustentação**: Detecção proativa de mudanças (Drift) e recomendação de bloqueio.
*   **Discovery & Engenharia Reversa**: Mapeamento contínuo de plataformas (BetBoom/Bac Bo).
*   **Inteligência de Contratos**: Versionamento e auditoria de payloads de rede.
*   **Aprendizado Contínuo (RAG)**: Ingestão de conhecimento e validação de hipóteses.

---

## 🏗️ Arquitetura API-First

O projeto segue uma filosofia onde o contrato define a implementação.
*   **Contrato Central**: `contracts/openapi.yaml`
*   **Casos de Uso**: Localizados em diretórios específicos (ex: `will-dados-pro/`) contendo requisitos e histórias de usuário.
*   **Rastreabilidade**: Todas as missões, tarefas e descobertas são persistidas via **Supabase**.

---

## 🧩 Principais Módulos

*   **`platform-discovery`**: Auditor de seletores e UI.
*   **`network-contract-auditor`**: Auditor de payloads JSON e Websockets.
*   **`drift-detector`**: Identificação de regressões e mudanças bruscas.
*   **`hypothesis-intelligence`**: Motor de validação de regras (sem aposta).
*   **`incident-intelligence`**: Gestão de alertas e runbooks de crise.

---

## ⚠️ Princípios Inegociáveis

1.  **Não Construir Execução de Aposta**: Este serviço é puramente de inteligência e telemetria.
2.  **Não Acoplar ao Executor**: O CGM deve ser independente e reutilizável para outros provedores.
3.  **Evidência Obrigatória**: Toda detecção de falha deve ser acompanhada de snapshots e logs.
4.  **Comunicação PT-BR**: Todas as interações e planos de agentes devem ser em português brasileiro.

---

## 📈 Roadmap

*   **v1 (Fundação)**: Discovery + Contratos + Observabilidade Básica + Auth.
*   **v2 (Inteligência)**: Hypothesis Engine + Confidence Score + RAG.
*   **v3 (Anticrise)**: Automação de Rollback de regras + Inteligência Adaptativa.

---

## 🤝 Contribuição (Agentes)

Utilize o prompt de bootstrap localizado em `docs/bootstrap/agent-bootstrap.md` para iniciar novas missões.
