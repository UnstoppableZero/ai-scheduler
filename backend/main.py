from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import ollama
import json


app = FastAPI()

class ScheduleRequest(BaseModel):
    schedule_text: str


@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

#NEW ENDPOINT

@app.post("/parse-schedule")
def parse_schedule(request: ScheduleRequest):
    print(f"Received from user: {request.schedule_text}")


    try:
        prompt = f"""
        You are an API that converts natural language schedules into JSON.
        Do not explain. Do not write code. Return ONLY the raw JSON object.
        
        Example 1:
        Input: "I'm free on Friday at 7pm for dinner"
        Output: {{ "day": "Friday", "time": "19:00", "activity": "Dinner" }}
        
        Example 2:
        Input: "Gym Tuesday morning at 8"
        Output: {{ "day": "Tuesday", "time": "08:00", "activity": "Gym" }}
        
        Current Input: "{request.schedule_text}"
        Output:
        """
        
        response = ollama.chat(model="llama3.2", messages=[
            {"role": "user", "content": prompt}
])
        
        ai_content = response["message"]["content"]

        try:
            clean_data = json.loads(ai_content)
        except json.JSONDecodeError:
            clean_data = ai_content

        return {"extracted_data": clean_data}
    
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="AI processing failed. Is Ollama running?")