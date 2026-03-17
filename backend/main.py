from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ScheduleRequest(BaseModel):
    schedule_text: str

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/health")
def health_check():
    return {"status": "healthyy"}

@app.post("/parse-schedule")
def parse_schedule(request: ScheduleRequest):
    print(f"Received from user: {request.schedule_text}")
    return {"received": request.schedule_text}