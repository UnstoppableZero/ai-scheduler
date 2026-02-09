# AI-Powered Event Scheduler

> **Status:** Active Development (MVP Phase)
> **Goal:** Eliminate the "when are you free?" coordination friction using local AI.

## 📖 Overview
This project is an intelligent scheduling assistant that helps friend groups and student teams find the optimal time to meet. Unlike standard calendars, it allows users to input availability in **natural language** (e.g., *"I'm free after 5pm on Friday"*), which is parsed by a local LLM (Ollama) into structured data.

### 📚 Documentation
For detailed engineering documents, please see the `/docs` folder:
* [Project Proposal](docs/proposal.md)
* [Requirements Specification](docs/requirements.md)
* [System Architecture](docs/architecture.md)

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | Next.js (React) | Responsive web interface for users. |
| **Backend** | FastAPI (Python) | High-performance API handling logic & AI orchestration. |
| **AI Engine** | Ollama | Local LLM for privacy-focused Natural Language Processing. |
| **Database** | PostgreSQL | Relational storage for schedules and groups. |

---

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites
* **Python 3.10+**
* **Node.js 18+**
* **Ollama** (Running locally)

### 1. Backend Setup (FastAPI + AI)

1.  **Navigate to the backend:**
    ```bash
    cd backend
    ```

2.  **Create and activate Virtual Environment:**
    ```bash
    # Windows
    python -m venv venv
    .\venv\Scripts\Activate

    # Mac/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Prepare the AI Model:**
    Make sure Ollama is installed, then pull the required model:
    ```bash
    ollama pull llama3.2
    ```

5.  **Run the Server:**
    ```bash
    uvicorn main:app --reload
    ```
    *The API will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000)*


## ⚡ API Documentation

Once the backend is running, you can access the interactive Swagger UI to test the endpoints:
**URL:** `http://127.0.0.1:8000/docs`

### Key Endpoints
* `GET /` - Health check.
* `POST /parse-schedule` - **AI Feature.** Sends natural language text to Ollama and returns structured JSON.

**Example Payload:**
```json
{
  "schedule_text": "Dinner on Friday at 7pm"
}
