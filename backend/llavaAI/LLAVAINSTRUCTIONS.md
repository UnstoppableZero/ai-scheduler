Llava Usage Instructions
------------------------
1.) Ensure the server is running

	uvicorn main:app --reload

2.) Make sure you're in:

	/ai-scheduler

3.) Start the database (Docker):

	docker compose up -d
then swap to /ai-scheduler/backend:

	cd backend

✔ Starts PostgreSQL container
✔ Required for backend to run

4.) Install required dependencies (run once or as needed in terminal)

	py -m pip install uvicorn httpx python-multipart sqlalchemy psycopg2-binary

or:

	python -m pip install uvicorn httpx python-multipart sqlalchemy psycopg2-binary

5.) Start backend (Terminal #1)

	py -m uvicorn main:app --reload

or:

	python -m uvicorn main:app --reload

✔ FastAPI server runs at:

	http://127.0.0.1:8000

6.) Make a new terminal and start Ollama (Terminal #2)

	ollama run llava

✔ Starts LLaVA model
✔ Must stay running

6.) Open API docs (browser)

	http://127.0.0.1:8000/docs

7.) Use this to open the db:

	http://127.0.0.1:8000/equipment

