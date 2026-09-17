# DIGITAL DYNOS

**AI Route & Resource Planning System**

DIGITAL DYNOS is an AI-assisted planning system that converts natural-language user requirements into validated constraints, retrieves relevant persistent user planning memories, optimizes the plan using Google OR-Tools CP-SAT, detects conflicts, and provides an explainable schedule.

## Architecture

1. **AI Natural Language Interpretation**: (Mock/Claude) converts user intents into potential constraints and memories.
2. **Persistent Planning Memory**: Stores user habits, preferences, and availabilities.
3. **Dynamic Pydantic Validation**: Ensures the AI outputs valid constraints that the solver can ingest.
4. **OR-Tools Constraint Optimization**: Google's CP-SAT solver resolves constraints, deadlines, and capacities to generate an optimal schedule.

## Features

- **AI Planner**: Chat interface to plan and save memories.
- **Dynamic Constraints System**: Resolves complex scheduling conditions automatically.
- **OR-Tools Engine**: Real, deterministic CP-SAT constraint optimization.
- **Validation Inspector & Conflict Center**: Trace execution and solve capacity problems.

## Tech Stack

- **Frontend**: React + Vite + Vanilla CSS
- **Backend**: FastAPI + Pydantic + SQLAlchemy (SQLite) + OR-Tools CP-SAT

## Installation

### Prerequisites
- Node.js (for frontend)
- Python 3.9+ (for backend)

### Backend Setup
1. `cd backend`
2. `pip install -r requirements.txt`
3. `uvicorn app.main:app --reload`

The backend runs on `http://127.0.0.1:8000`. Database tables (`dynos.db`) are automatically created on first run.

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

The frontend runs on `http://localhost:5173`.

## Sample Demo

1. Open the **AI Planner** tab.
2. Enter: *"I wake up at 6 AM, exercise for 30 minutes every morning and prefer studying AI before college."*
3. The AI will extract the memories and prompt you to save them. Save them.
4. Later, enter: *"Plan my morning with 2 hours of AI study."*
5. The system fetches the memory, creates constraints, validates them, and the OR-Tools solver returns an optimal schedule.

## Future Improvements
- Integrate Claude provider instead of Mock AI.
- Enhanced analytics with real historical data.
- PostgreSQL migration.
- Advanced timeline dragging and Gantt visualization.
