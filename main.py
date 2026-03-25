from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db

app = FastAPI()

class ScheduleRequest(BaseModel):
    schedule_text: str

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# GET — read all schedules from DB
@app.get("/schedules")
def get_schedules(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT * FROM schedules"))
    rows = result.mappings().all()
    return {"schedules": [dict(row) for row in rows]}

# POST — insert a schedule into DB
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