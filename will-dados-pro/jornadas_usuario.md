oa # Jornadas de Usuário: Bot Will Dados Pro

## Perfil do Usuário
**Operador/Investidor (Diego):** Responsável por monitorar o motor de IA, ajustar stakes, gerenciar e alocar banca no sistema, e garantir o funcionamento ininterrupto da infraestrutura na BetBoom.
**Agente IA (Will):** Sub-agente que atua na automação de navegação e leitura do CDP.

---

## 🚀 Jornada 1: O "Bootstrap" da Sessão (Ativação Segura)

**Contexto:** O Operador quer iniciar uma nova sessão de mineração de dados e apostas automáticas.

1. **Setup de Ambiente:** O Operador executa o script de inicialização do Bot na máquina/servidor.
2. **Navegação Clandestina:** O motor Puppeteer (ou sub-agente) abre silenciosamente o site da BetBoom.
3. **Autenticação Direta:** A interface invisível realiza o preenchimento de login (`leticia...`) e senha, contornando modais ou bloqueios.
4. **Estabelecimento de Vínculo (Handshake):** O bot escuta a rede, sequestra o `verification_token` e o `Session ID`, confirmando a autorização do provedor (Evolution Gaming).
5. **Sinal Verde:** Um log ou notificação no Dashboard avisa ao Operador: *"Conexão estabelecida ao motor de Bac Bo. Observabilidade = ON."*

---

## 📊 Jornada 2: A Escuta Ativa e Extração de Inteligência (Drift Monitoring)

**Contexto:** O Agente IA está plugado e "ouvindo" a mesa.

1. **Abertura da Mesa:** O dealer no vídeo lança os dados. O WS (WebSocket) dispara o estado: *"Betting Open."*
2. **Intercepção Furtiva:** O Bot (membro de telemetria) coleta todas as transações em tempo real do túnel CDP.
3. **Rolagem do Dado:** Os dados caem: Player tem [4, 5] (9), Banker tem [2, 3] (5).
4. **Decodificação de Score:** O bot identifica que "Player Wins", registra no DB Temporal o resultado `P`, a hora e armazena os contadores sequenciais de probabilidade.
5. **Análise Neural/Padrões:** O motor de análise determina as porcentagens de quebra de sequência (ex: tendência para Banker). O painel de controle mapeia as tendências visivelmente para o Operador.

---

## 💰 Jornada 3: O "Sniper Strike" (Automação de Aposta)

**Contexto:** Uma janela de alta probabilidade se formou e o Bot tomará uma ação.

1. **Sinal de Ignição:** O algoritmo preditivo ultrapassa a "confidence score" de 85% para a cor AZUL (Player).
2. **Checagem de Saúde Financeira:** O Circuit Breaker valida que a stake da operação (R$ 5) não fere a meta diária e que a banca cobrirá caso a rodada requeira Martingale.
3. **Disparo do Payload:** Segundos após o sinal de "Betting Open", a automação injeta um frame HTTP/WS (ou um clique CDP via simulação) emitindo a intenção de aposta.
4. **Confirmação:** A interface/socket devolve o status `"bet_accepted"`.
5. **Encerramento da Strike:** O dado cai. O resultado é azul (vitória). O sistema computa o lucro no relatório SR, reseta os multiplicadores e entra de volta no modo *Escuta Ativa*.

---

## ⚠️ Jornada 4: Acionamento do Circuit Breaker (Recuo Tático)

**Contexto:** Algo dá errado com o status financeiro ou infraestrutura.

1. **Evento de Anomalia:** O socket dispara repentinamente um status "Saldo Insuficiente", "Token Expirado", ou o saldo diário atinge seu Stop Loss agressivo.
2. **Desengate Emergencial:** Instantaneamente (no mesmo ms), o módulo de segurança desarma a função de injetar aposta.
3. **Fechamento Seguro:** O script faz o desligamento do motor Puppeteer de forma "graceful", fechando conexões remanescentes para evitar locks ou punições no cassino.
4. **Alerta Pushing:** O Operador recebe uma notificação Crítica (via push/log trace): *"Sistema Will-Dados-Pro interrompido. Motivo: Atingiu Stop-Loss ou Instabilidade de Rede."*
