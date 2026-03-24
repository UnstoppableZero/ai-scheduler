from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models
from database import engine, get_db

# This line forces SQLAlchemy to double-check that the table exists
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}

# Our new endpoint to fetch the equipment!
@app.get("/equipment")
def get_equipment(db: Session = Depends(get_db)):
    # Reaching into the database to grab all the rows
    items = db.query(models.EquipmentStatus).all()
    return items