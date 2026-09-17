from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import engine, Base
from app.api import auth, planner, memories

Base.metadata.create_all(bind=engine)

app = FastAPI(title="DIGITAL DYNOS - AI Route & Resource Planning System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(planner.router, prefix="/planner", tags=["planner"])
app.include_router(memories.router, prefix="/memories", tags=["memories"])

@app.get("/")
def read_root():
    return {"message": "Welcome to DIGITAL DYNOS API"}
