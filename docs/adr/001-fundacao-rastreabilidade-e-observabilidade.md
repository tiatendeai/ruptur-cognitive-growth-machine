# ADR 001: Fundação de Rastreabilidade e Observabilidade

## Status
Aceito

## Contexto
O microserviço **Cognitive Growth Machine** exige um nível extremo de rastreabilidade para garantir que mudanças na plataforma BetBoom sejam detectadas e documentadas com evidências. Além disso, a observabilidade (telemetria) é crítica para evitar falhas silenciosas que impactam o robô executor.

## Decisões
Decidimos utilizar o seguinte stack core para a fundação:

1.  **TypeScript + Zod**: Para garantir tipagem estática e validação de contratos em tempo de execução para todas as entidades de rastreabilidade (Missions, Tasks, Findings).
2.  **Pino (Logging Estruturado)**: Para telemetria robusta em formato JSON, permitindo integração fácil com sistemas de monitoramento e análise de incidentes.
3.  **Supabase (PostgreSQL)**: Como banco de dados principal, aproveitando Row Level Security (RLS) para proteção de dados e facilidade de integração via API REST/Websockets.

## Consequências
- **Positivas**:
    - Garantia de que nenhum dado inválido seja persistido.
    - Logs detalhados e estruturados para debugging rápido.
    - Facilidade de auditoria e geração de evidências.
- **Negativas**:
    - Leve sobrecarga de desenvolvimento ao definir esquemas Zod para cada nova entidade.

## Alternativas Consideradas
- **Prisma**: Considerado, mas Zod provê uma validação de runtime mais flexível para contratos que mudam dinamicamente (como seletores de UI).
- **Console.log**: Rejeitado por não ser estruturado e inadequado para SRE em produção.
