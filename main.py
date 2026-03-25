from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db
from fastapis import files

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(files.router)

class ScheduleRequest(BaseModel):
    schedule_text: str

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/schedules")
def get_schedules(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT * FROM schedules"))
    rows = result.mappings().all()
    return {"schedules": [dict(row) for row in rows]}

@app.post("/schedules")
def create_schedule(request: ScheduleRequest, db: Session = Depends(get_db)):
    db.execute(text("INSERT INTO schedules (schedule_text) VALUES (:text)"), {"text": request.schedule_text})
    db.commit()
    return {"created": request.schedule_text}

@app.post("/parse-schedule")
def parse_schedule(request: ScheduleRequest):
    print(f"Received from user: {request.schedule_text}")
    return {"received": request.schedule_text}

@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"db": "connected"}