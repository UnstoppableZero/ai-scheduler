SCHEMA = {
    "type": "object",
    "properties": {
        "entries": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "equipment_name": {"type": ["string", "null"]},
                    "signed_out_by": {"type": ["string", "null"]},
                    "location": {"type": ["string", "null"]}
                },
                "required": ["equipment_name", "signed_out_by", "location"]
            }
        }
    },
    "required": ["entries"]
}