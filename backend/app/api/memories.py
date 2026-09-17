from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models import models
from app.schemas import schemas
from app.api.auth import get_current_user
from typing import List

router = APIRouter()

# Auth dependency added

@router.get("/", response_model=List[schemas.MemoryResponse])
def get_memories(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.Memory).filter(models.Memory.user_id == current_user.id).all()

@router.post("/", response_model=schemas.MemoryResponse)
def create_memory(memory: schemas.MemoryCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_memory = models.Memory(**memory.dict(), user_id=current_user.id) 
    db.add(db_memory)
    db.commit()
    db.refresh(db_memory)
    return db_memory

@router.put("/{memory_id}", response_model=schemas.MemoryResponse)
def update_memory(memory_id: int, memory: schemas.MemoryCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_memory = db.query(models.Memory).filter(models.Memory.id == memory_id, models.Memory.user_id == current_user.id).first()
    if not db_memory:
        raise HTTPException(status_code=404, detail="Memory not found")
    
    for key, value in memory.dict().items():
        setattr(db_memory, key, value)
        
    db.commit()
    db.refresh(db_memory)
    return db_memory

@router.delete("/{memory_id}")
def delete_memory(memory_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_memory = db.query(models.Memory).filter(models.Memory.id == memory_id, models.Memory.user_id == current_user.id).first()
    if not db_memory:
        raise HTTPException(status_code=404, detail="Memory not found")
    
    db.delete(db_memory)
    db.commit()
    return {"status": "deleted"}
