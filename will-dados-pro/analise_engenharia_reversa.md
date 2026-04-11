# Analise de Engenharia Reversa - Bac Bo (BetBoom)

## 1. Mapeamento de Seletores (DOM)
- **Container Principal (Iframe):** `iframe[src*="launch.billing-boom.com"]` (UID prefix 12)
- **Grid de Histórico (Bead Plate):** Elementos contendo "B" (Banker - Vermelho), "P" (Player - Azul) e "T" (Tie - Amarelo).
    - Ex: `uid=12_770` (B), `uid=12_777` (P).
- **Cartões de Resultado:** `uid=12_823` (Pontuação Jogador), `uid=12_851` (Pontuação Banca).
- **Botão SRE (Limpeza de Obstrução):** `uid=12_1249` ("FECHAR" modal saldo baixo).

## 2. Contratos de Rede (Telemetria)
### 2.1 Identificadores Críticos (Extraídos via Console)
- **tableId:** `BacBo00000000001` (ID Fixo da Mesa de Bac Bo)
- **vtId/vtid:** `rmca2m7musxgighe` (Virtual Table ID)
- **Session ID (sid):** `tr4gst2rbb3ajipwtvvbnidp2flixze701049b21` (Id de sessão único)
- **Object Global:** `window.EVO_ECAS` (Contém o estado interno do motor da Evolution)

### 2.2 Autenticação (Verification Token)
- **JWT Detectado:** O token contém o escopo de jurisdição (`jur: CW`), moeda (`cur: BRL`) e o ID de integração (`cid: egamings00000001`).
- **Uso:** Provavelmente enviado no handshake do WebSocket ou como query param na conexão de dados.

### 2.3 Fluxo de Dados
- **WebSocket:** Localizado sob o motor `launch.billing-boom.com` (Wrapper).
- **Backend de Chat:** `https://chatbackend.sa.watchers.io`
- **Drift Detection:** Monitoramento via alteração de estados no UID `12_823`/`12_851` (Resultado Final) ou via interceptação de mensagens `type: "result"` no Socket.
