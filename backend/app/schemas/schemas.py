from pydantic import BaseModel
from typing import List, Optional, Any, Literal
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    role: str
    
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class MemoryCreate(BaseModel):
    key: str
    value: str
    memory_type: str
    source: str = "user"
    enabled: bool = True

class MemoryResponse(MemoryCreate):
    id: int
    user_id: int
    confidence: float
    usage_count: int
    
    class Config:
        orm_mode = True

class DynamicConstraint(BaseModel):
    type: str # availability, deadline, dependency, priority, resource_limit
    subject: str
    operator: str
    value: Any
    hardness: Literal["hard", "soft"]
    source: Literal["user", "memory", "system"]

class TaskSchema(BaseModel):
    id: str
    name: str
    duration: int
    priority: str = "Medium" # Critical, High, Medium, Low
    
class ResourceSchema(BaseModel):
    id: str
    name: str
    capacity: int

class PlanRequestSchema(BaseModel):
    horizon: int
    tasks: List[TaskSchema]
    resources: List[ResourceSchema]
    constraints: List[DynamicConstraint] = []

class TaskSchedule(BaseModel):
    task_id: str
    resource_id: str
    start: int
    end: int
    status: str
    explanation: Optional[List[str]] = None

class ConflictSchema(BaseModel):
    task_id: Optional[str] = None
    resource_id: Optional[str] = None
    message: str
    suggestion: str

class PlanResponseSchema(BaseModel):
    status: str # FEASIBLE, INFEASIBLE, PARTIAL
    schedule: List[TaskSchedule]
    conflicts: List[ConflictSchema]
    objective_score: int
    utilization: Any
