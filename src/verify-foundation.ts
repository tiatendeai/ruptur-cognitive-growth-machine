import logger from './core/observability/logger.js';
import { MissionSchema, type Mission } from './core/database/schema.js';

async function verify() {
  logger.info('Iniciando verificação da fundação do CGM...');

  try {
    const mockMission: Mission = {
      id: '550e8400-e29b-41d1-a51b-447213361234',
      name: 'Missão 001 - Verificação',
      description: 'Testando a integridade da fundação técnica.',
      status: 'RUNNING',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Validação via Zod
    const validated = MissionSchema.parse(mockMission);
    logger.info({ missionId: validated.id }, 'Schema de Missão validado com sucesso!');

    logger.info('Fundação técnica (Logger + Schemas) operacional.');
  } catch (error) {
    logger.error({ error }, 'Falha na verificação da fundação.');
    process.exit(1);
  }
}

verify();
