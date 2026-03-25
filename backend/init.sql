CREATE TABLE equipment_status (
    id SERIAL PRIMARY KEY,
    equipment_name VARCHAR(100) NOT NULL,
    signed_out_by VARCHAR(100) NOT NULL,
    location VARCHAR(50),
    time_out TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO equipment_status (equipment_name, signed_out_by, location)
VALUES
('C-Arm X-Ray', 'Dr. Smith', 'OR-3'),
('Portable Ultrasound', 'Nurse Jackson', 'Room 204'),
('Ventilator A', 'Dr. Adams', 'ICU-1');