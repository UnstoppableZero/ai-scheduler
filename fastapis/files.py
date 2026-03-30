import os
import shutil
from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_path = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    db.execute(
        text("INSERT INTO uploaded_files (filename, file_path) VALUES (:filename, :file_path)"),
        {"filename": file.filename, "file_path": file_path}
    )
    db.commit()
    return {"filename": file.filename, "saved": True}

@router.get("/files")
def get_files(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT id, filename, file_path, uploaded_at FROM uploaded_files"))
    files = [{"id": r[0], "filename": r[1], "file_path": r[2], "uploaded_at": r[3]} for r in result]
    return files
