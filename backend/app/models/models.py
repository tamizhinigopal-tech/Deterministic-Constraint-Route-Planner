from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.database.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="dispatcher")

    memories = relationship("Memory", back_populates="owner")
    plans = relationship("Plan", back_populates="owner")

class Memory(Base):
    __tablename__ = "memories"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    key = Column(String, index=True)
    value = Column(String)
    memory_type = Column(String) # habit, preference, availability, recurring, working_style, scheduling_rule
    confidence = Column(Float, default=1.0)
    source = Column(String, default="user")
    enabled = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    last_used_at = Column(DateTime, nullable=True)
    usage_count = Column(Integer, default=0)

    owner = relationship("User", back_populates="memories")

class Plan(Base):
    __tablename__ = "plans"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    request_json = Column(Text) # The parsed natural language request + derived constraints
    latest_response_json = Column(Text) # The result from OR-Tools
    
    owner = relationship("User", back_populates="plans")
    history = relationship("PlanHistory", back_populates="plan")

class PlanHistory(Base):
    __tablename__ = "plan_history"
    id = Column(Integer, primary_key=True, index=True)
    plan_id = Column(Integer, ForeignKey("plans.id"))
    changed_by = Column(Integer, ForeignKey("users.id"))
    changed_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    diff_summary = Column(String)
    request_json = Column(Text)
    
    plan = relationship("Plan", back_populates="history")

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True)
    plan_id = Column(Integer, ForeignKey("plans.id"), nullable=True)
    kind = Column(String)
    message = Column(String)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    read = Column(Boolean, default=False)
