PROMPT = """
You are reading a handwritten hospital equipment sign-out sheet.

The image is a 3-column table:
- Equipment Name
- Signed Out By
- Location

Read the table row by row from top to bottom.
For each row, read left to right:
equipment_name, then signed_out_by, then location.

IMPORTANT:
- The output MUST return ALL 3 CATEGORIES
    - equipment_name
    - signed_out_by
    - location
- Each row must stay aligned (do not mix values across rows)
- Read left-to-right per row
- Do not guess or invent missing values

Return ONLY valid JSON in this format:

{
    "entries": [
        {
            "equipment_name": "...",
            "signed_out_by": "...",
            "location": "..."
        }
    ]
}

Criteria:
- Return one object per visible filled row
- Keep values from the same horizontal row together
- Do not mix values from different rows
- If a field in a row is unclear, use null
- Do not invent new text
- Do not skip rows unless completely empty
- Do not include empty rows
- Do not include explanations
"""