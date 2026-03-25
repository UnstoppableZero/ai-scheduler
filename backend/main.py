from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi import UploadFile, File, HTTPException
from llavaAI.ai_service import extract_from_image
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

@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")
    
    image_bytes = await file.read()
    extracted = await extract_from_image(image_bytes)

    entries = extracted.get("entries", [])
    if not entries:
        raise HTTPException(status_code=422, detail={
            "message": "No entries were extracted from the image.",
            "model_output": extracted
        })
    
    inserted_rows = []

    for entry in entries:
        equipment_name = entry.get("equipment_name")
        signed_out_by = entry.get("signed_out_by")
        location = entry.get("location")

        # Skip rows that are too incomplete
        if not equipment_name and not signed_out_by and not location:
            continue

        new_entry = models.EquipmentStatus(
            equipment_name = equipment_name or "UNKNOWN",
            signed_out_by = signed_out_by or "UNKNOWN",
            location = location
        )

        db.add(new_entry)
        inserted_rows.append({
            "equipment_name": new_entry.equipment_name,
            "signed_out_by": new_entry.signed_out_by,
            "location": new_entry.location
        })

    if not inserted_rows:
        raise HTTPException(status_code=422, detail={
            "message": "Entries were returned, but all were empty or invalid.",
            "model_output": extracted
        })
    
    db.commit()

    return {
        "message": "Image processed successfully.",
        "inserted_count": len(inserted_rows),
        "inserted_rows": inserted_rows,
        "model_output": extracted
    }