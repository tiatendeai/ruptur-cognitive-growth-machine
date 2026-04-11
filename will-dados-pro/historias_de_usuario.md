# Histórias de Usuário — Case will-dados-pro

Este documento define os objetivos de cada funcionalidade do microserviço sob a perspectiva das necessidades do ecossistema.

---

## US01: Detecção Automática de Drift de UI
**Como** Robô Executor,
**Eu quero** ser notificado imediatamente quando um seletor crítico da BetBoom mudar,
**Para que** eu não tente clicar em elementos inexistentes e exponha a conta a riscos.

- **Critérios de Aceite:**
    - O CGM deve validar seletores a cada mudança de estado da rodada.
    - Se o seletor não for encontrado, gerar evento `DRIFT_DETECTED`.
    - O tempo entre a mudança na plataforma e o sinal de alerta deve ser < 2 segundos.

---

## US02: Auditoria de Contrato de Rede
**Como** SRE / Engenheiro de Sustentação,
**Eu quero** comparar o payload atual do Websocket com o esquema baseline,
**Para que** eu detecte mudanças silenciosas nos dados enviados pelo provedor (Evolution).

- **Critérios de Aceite:**
    - O CGM deve comparar chaves e tipos de dados do JSON recebido.
    - Qualquer mudança deve gerar um `ContractVersionRecord` novo e um alerta.
    - O histórico de mudanças de contrato deve ser persistente.

---

## US03: Geração de Evidências (Snapshots)
**Como** Analista de Suporte,
**Eu quero** visualizar um snapshot do DOM e do console no momento exato de um erro,
**Para que** eu possa diagnosticar a causa raiz sem precisar reproduzir o erro manualmente.

- **Critérios de Aceite:**
    - Snapshot deve conter o HTML completo da área de jogo.
    - Deve incluir timestamp e GameID.
    - O arquivo deve ser acessível via URL segura (Supabase Storage).

---

## US04: Motor de Validação de Hipóteses
**Como** Analista de Dados / IA,
**Eu quero** que o CGM rode algoritmos de validação sobre o stream de dados ao vivo (sem apostar),
**Para que** eu possa medir a assertividade de novas regras antes de enviá-las para produção.

- **Critérios de Aceite:**
    - O CGM deve rastrear o `ExpectedResult` vs `ActualResult`.
    - Deve gerar um `ConfidenceScore` acumulado.
    - Não deve emitir comandos de clique ou aposta durante este processo.

---

## US05: API de Saúde do Sistema (Health Score)
**Como** Backend de Orquestração,
**Eu quero** consultar um endpoint de saúde do CGM que agregue o status da plataforma,
**Para que** eu possa decidir automaticamente se devo habilitar ou desabilitar o tráfego de usuários.

- **Critérios de Aceite:**
    - Endpoint deve retornar um JSON com `healthScore` (0-100).
    - Deve listar as "razões" se o score estiver baixo (ex: "Websocket instável").
    - Cache de resposta não deve exceder 5 segundos.
