Llava Usage Instructions
------------------------
1.) Open VS Code → Terminal in project root

2.) Make sure you're in:

	/ai-scheduler/backend

3.) Start the database (Docker):

	Run in terminal: docker compose up -d

✔ Starts PostgreSQL container
✔ Required for backend to run

4.) Install required dependencies (run once or as needed in terminal)

	py -m pip install uvicorn httpx python-multipart sqlalchemy psycopg2-binary

5.) Start backend (Terminal #1)

	py -m uvicorn main:app --reload

✔ FastAPI server runs at:

6.) Start Ollama (Terminal #2)

	ollama run llava

✔ Starts LLaVA model
✔ Must stay running

6. Open API docs (browser)
http://127.0.0.1:8000/docs

