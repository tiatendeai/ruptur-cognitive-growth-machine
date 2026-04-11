import { z } from 'zod';

export const MissionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  status: z.enum(['PENDING', 'RUNNING', 'COMPLETED', 'FAILED']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const TaskSchema = z.object({
  id: z.string().uuid(),
  missionId: z.string().uuid(),
  title: z.string(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE', 'CANCELLED']),
  evidence: z.array(z.string()).optional(),
  createdAt: z.date(),
});

export const FindingSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['SELECTOR', 'CONTRACT', 'STATE_MACHINE', 'UI_SNAPSHOT']),
  key: z.string(), // e.g. "bet_button_selector"
  value: z.any(),
  confidence: z.number().min(0).max(1),
  evidenceUrl: z.string().optional(),
  detectedAt: z.date(),
});

export const IncidentSchema = z.object({
  id: z.string().uuid(),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  title: z.string(),
  description: z.string(),
  isDrift: z.boolean().default(true),
  metadata: z.record(z.any()).optional(),
  resolved: z.boolean().default(false),
  occurredAt: z.date(),
});

export type Mission = z.infer<typeof MissionSchema>;
export type Task = z.infer<typeof TaskSchema>;
export type Finding = z.infer<typeof FindingSchema>;
export type Incident = z.infer<typeof IncidentSchema>;
