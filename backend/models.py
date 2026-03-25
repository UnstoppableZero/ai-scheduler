from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class EquipmentStatus(Base):
    # 1. The Link: This tells Python exactly which SQL table to look for
    __tablename__ = "equipment_status" 

    # 2. The Columns: These must match your init.sql blueprint exactly
    id = Column(Integer, primary_key=True, index=True)
    equipment_name = Column(String, nullable=False)
    signed_out_by = Column(String, nullable=False)
    location = Column(String)
    time_out = Column(DateTime(timezone=True), server_default=func.now())