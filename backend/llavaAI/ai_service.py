import base64
import json
import httpx

from .prompts import PROMPT
from .schemas import SCHEMA

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llava"

async def extract_from_image(image_bytes: bytes):
    image_b64 = base64.b64encode(image_bytes).decode()

    payload = {
        "model": MODEL,
        "prompt": PROMPT,
        "images": [image_b64],
        "format": SCHEMA,
        "stream": False
    }

    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        data = response.json()

    rawOutput = data.get("response", "{}")

    try:
        return json.loads(rawOutput)
    except json.JSONDecodeError:
        return {
            "equipment_name": None,
            "signed_out_by": None,
            "location": None,
            "rawOutput": rawOutput,
            "error": "Model did not return valid JSON"
        }