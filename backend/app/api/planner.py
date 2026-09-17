from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models import models
from app.schemas import schemas
from app.ai.mock_provider import interpret_natural_language as mock_interpret
from app.ai.claude_provider import interpret_with_claude
from app.optimization.solver import solve_plan
from app.api.auth import get_current_user
from typing import List
import os

router = APIRouter()

# Auth dependency added

@router.post("/interpret")
def interpret_request(nl_request: str, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    provider = os.getenv("AI_PROVIDER", "mock")
    if provider == "claude":
        result = interpret_with_claude(nl_request)
    else:
        result = mock_interpret(nl_request)
    return result

@router.post("/plan", response_model=schemas.PlanResponseSchema)
def generate_plan(request: schemas.PlanRequestSchema, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Run constraint validation
    # (Pydantic already validated types, but we can do domain validation here)

    # Solve
    response = solve_plan(request)
    return response

@router.post("/replan")
def replan(request: schemas.PlanRequestSchema, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return {"status": "replan_successful"}
