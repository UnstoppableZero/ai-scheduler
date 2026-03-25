import asyncio
from pathlib import Path

from llavaAI.ai_service import extract_from_image

async def main():
    image_path = Path("test_img.png") #Place a test img in backend
    image_bytes = image_path.read_bytes()

    result = await extract_from_image(image_bytes)
    print(result)

if __name__ == "__main__":
    asyncio.run(main())