1. Open VS Code → Terminal in project root

Make sure you're in:

ai-scheduler/backend

2. Start the database (Docker)
docker compose up -d

✔ Starts PostgreSQL container
✔ Required for backend to run

3. Install required dependencies (run once or as needed)
py -m pip install uvicorn httpx python-multipart sqlalchemy psycopg2-binary

4. Start backend (Terminal #1)
py -m uvicorn main:app --reload

✔ FastAPI server runs at:

5. Start Ollama (Terminal #2)
ollama run llava

✔ Starts LLaVA model
✔ Must stay running

6. Open API docs (browser)
http://127.0.0.1:8000/docs