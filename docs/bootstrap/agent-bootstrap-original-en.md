# Microservice Cognitive Growth Machine — Agent Bootstrap

## Project context
This repository is the bootstrap point for the **Microservice Cognitive Growth Machine** inside **Bet A.I. / 2DL Company**.

The initial project case is **will-dados-pro**, with focus on **BetBoom / Bac Bo** as the discovery, rules, contracts, observability, telemetry, anti-crisis, support, sustainment and continuous-learning target.

This service must **not** become the betting robot.
It must become the **intelligence, observability, anti-drift and sustainment layer** that protects the robot and the surrounding services.

---

## What this service is
This microservice exists to:
- perform continuous discovery on the target platform
- validate rules, contracts, states, selectors, websocket connectivity and telemetry sources
- detect drift before the robot silently breaks
- maintain traceability of tasks, demands, findings, incidents, logs and historical evidence
- measure hypothesis quality without placing bets
- feed backend, robot, support, sustainment, analytics and future services with structured intelligence
- stay reusable for other providers, games and projects

---

## What this service is NOT
Do not:
- build the betting executor
- place bets
- click to operate the game
- couple this service to the runtime executor
- mix operational execution with observability/research/sustainment

---

## What strong implementations usually do differently
Use these principles as guardrails:

### Do this
- separate **intelligence** from **execution**
- version contracts, baselines and discoveries
- record evidence for every finding
- keep tasks, demands, incidents, logs and historical snapshots traceable
- use metrics, logs and traces together
- compare current platform state against a known baseline
- detect websocket, payload, selector and state-machine drift proactively
- score source confidence before trusting a signal
- treat rules from documents as **hypotheses** until revalidated on the platform
- expose outputs through APIs, events and knowledge artifacts
- support anti-crisis workflows and fast rollback/freeze decisions

### Avoid this
- hardcoding fragile selectors everywhere
- treating UI text as the only source of truth
- mixing discovery, execution, recovery and analytics in one module
- letting undocumented assumptions drive the robot
- relying on manual memory instead of tracked history
- measuring only hit rate and ignoring data quality / drift / ambiguity
- changing contracts without versioning
- trusting websocket or payload structure forever
- allowing silent failures when the platform changes

---

## Required traceability model
The service must preserve traceability for:
- tasks
- demands
- missions
- findings
- rules snapshots
- contract versions
- state-machine snapshots
- UI maps
- network snapshots
- hypothesis runs
- incidents
- alerts
- support cases
- backlog items
- decisions
- evidence references
- timestamps
- owners and status when applicable

Recommended minimum entities:
- `task_record`
- `mission_record`
- `finding_record`
- `contract_version_record`
- `baseline_snapshot_record`
- `incident_record`
- `hypothesis_record`
- `hypothesis_outcome_record`
- `support_case_record`
- `audit_run_record`
- `health_snapshot_record`

---

## Required first checks before any work
1. Read this repository and summarize current project understanding.
2. Verify whether a `.env` file exists.
3. Verify whether the expected token(s) are present in `.env`.
4. Do **not** print secret values in output.
5. Only report:
   - whether `.env` exists
   - which required keys are missing
   - whether values appear present/non-empty
6. If missing, create a clear checklist of what must be configured.

---

## First mission for the agent
Your first mission is to **understand the project and prepare the microservice foundation**, not to build the betting robot.

### Mission name
`mission-001-project-understanding-and-foundation`

### Mission goals
- understand the repository and the intended role of the microservice
- verify environment/token readiness via `.env`
- propose the initial bounded contexts
- propose the initial folder structure
- define the core records needed for traceability
- define the first anti-crisis and drift-detection routines
- define how other services will consume outputs
- create the first backlog of implementation tasks

### Expected outputs
Produce:
1. project understanding summary
2. environment readiness summary
3. missing configuration checklist
4. recommended architecture outline
5. bounded contexts list
6. suggested folder/module structure
7. traceability entities list
8. first scheduled routines list
9. first consumer interfaces list
10. prioritized backlog

---

## Agent operating prompt
Use the following prompt as the operating instruction for the agent:

```text
You are the lead agent for the Microservice Cognitive Growth Machine in Bet A.I. / 2DL Company.

Your current assignment is NOT to build the betting robot.
Your assignment is to understand the project and bootstrap the intelligence/observability/sustainment microservice that protects and feeds the robot ecosystem.

Context:
- Initial case: will-dados-pro
- Target domain: BetBoom / Bac Bo
- Service role: autoresearch, agentic RAG, observability, telemetry, anti-crisis, sustainment, support, drift detection, contracts intelligence, rules intelligence, state intelligence, hypothesis intelligence, continuous learning
- Architectural rule: this service must stay decoupled from execution
- Reuse rule: it must be reusable for other providers/games/projects

Before doing anything else:
1. inspect the repository structure
2. verify the `.env` file
3. verify whether required token keys exist and are non-empty
4. never expose secret values
5. report only presence/missing/empty status

Then:
1. explain your understanding of the project
2. identify what already exists and what is missing
3. define the first bounded contexts
4. define the first core records for traceability
5. define the first periodic routines for anti-crisis and sustainment
6. define how outputs should be consumed by backend, robot, analytics and support
7. propose the first implementation backlog

Important constraints:
- do not build betting execution
- do not add real betting flows
- do not entangle this service with the runtime executor
- prefer modular, versioned, traceable, evidence-based design
- separate observed facts, hypotheses, contracts, incidents and recommendations

Deliver your output in organized sections:
1. Project understanding
2. Environment and token check
3. Current repo assessment
4. Proposed architecture
5. Bounded contexts
6. Traceability model
7. Scheduled routines
8. Consumer interfaces
9. First backlog
10. Risks and unknown unknowns
```

---

## Starter implementation direction
Start with modules like:
- `platform-discovery`
- `ui-map-auditor`
- `network-contract-auditor`
- `state-machine-observer`
- `hypothesis-intelligence`
- `drift-detector`
- `health-score-engine`
- `incident-intelligence`
- `knowledge-ingestor`
- `consumer-api`

---

## Suggested first scheduled routines
Short interval:
- websocket health check
- selector critical check
- phase/history availability check

Medium interval:
- contract drift audit
- UI baseline comparison
- state machine comparison

Long interval:
- hypothesis score recomputation
- RAG reindex review
- incident pattern review
- backlog reprioritization

---

## Success condition
Success means the repository gains a clear, traceable and reusable foundation for the microservice, with the first mission executed safely and with no drift toward betting execution.
