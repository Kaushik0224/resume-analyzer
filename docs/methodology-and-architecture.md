# AI Resume Analyzer - Methodology & System Architecture

## 1. Project Methodology

The AI Resume Analyzer follows a **Modular Microservice-Oriented Architecture** ensuring clear separation of concerns, scalability, and maintainability. The development lifecycle is structured around these key phases:

1.  **Requirement Analysis & Architecture Design:** Defining the core capabilities (resume parsing, AI scoring, dashboard visualization) and selecting the optimal tech stack (React, Spring Boot, Supabase, Groq LLaMA 3).
2.  **Data Extraction Layer Implementation:** Utilizing Apache Tika within Spring Boot to reliably parse semi-structured data (PDFs/DOCXs) into raw text strings.
3.  **AI Orchestration Layer Setup:** Designing a deterministic master prompt (`ai-engine/prompts/resume-analysis-prompt.txt`) to force the LLM (Groq LLaMA 3.3 70B) to return structured JSON instead of conversational text.
4.  **Backend API Development:** Creating secure REST APIs matching the exact industry folder structure (Controllers, Services, Repositories).
5.  **Frontend Dashboard Creation:** Building an interactive React (Vite) application with responsive UI components (Tailwind CSS) for real-time visual feedback.
6.  **Database Integration:** Wiring the backend to Supabase PostgreSQL for persistent storage of candidate analysis history.

---

## 2. Core Components

The system is decoupled into four primary domains:

### 2.1 Frontend (Vite + React)
Provides the interactive user dashboard.
*   **`UploadBox`:** Handles multipart file uploads via drag-and-drop.
*   **`ScoreCard`:** Visually represents the overall ATS match out of 100.
*   **`SkillsList`:** Categorizes extracted technical/soft skills and highlights missing keywords based on the Job Description.
*   **`SuggestionsPanel`:** Renders actionable, structured feedback from the AI engine.

### 2.2 Backend (Spring Boot)
The orchestration engine that connects the user, the AI, and the database.
*   **`ResumeController`:** Exposes the `/api/analyze` endpoint.
*   **`ParsingService`:** Leverages `Apache Tika` to parse complex file streams.
*   **`AIClient` & `PromptBuilder`:** Wraps the external LLM API securely, injecting the parsed text into the strict JSON-forcing prompt.
*   **`ScoringService`:** Applies deterministic, rule-based heuristics (defined in `ats-rules.json`) on top of the AI's generated score to ensure consistent HR standards.

### 2.3 AI Engine Module
Decoupled logic for testing and prompt tuning without altering compiled backend code.
*   **`prompts/`:** Houses the `master_prompt.txt` template.
*   **`scoring-rules/`:** JSON configuration for heuristic score weights and penalties.
*   **`skills-database/`:** Static JSON dictionaries for offline/pre-AI skill tagging capabilities.

### 2.4 Database (Supabase PostgreSQL)
Persistent data tier.
*   **`resumes` table:** Stores metadata (`id`, `filename`, `score`) and JSON representations of the AI output (`skills`, `suggestions`) for historical lookup.

---

## 3. Authentication & Security Strategy

For an application like a Resume Analyzer, the authentication strategy depends on if this is built for **Candidates (B2C)** or **Recruiters (B2B)**. 

### Current State: Open API Structure
In its current iterative phase, the API is open (relies on CORS policies via `CorsConfig` to restrict access strictly to `http://localhost:5173`).

### Proposed Production Strategy: JWT Tokens (JSON Web Tokens)
For the final production deployment, the system will utilize **JWT (JSON Web Tokens) via Stateful/Stateless Auth**.

**Why JWT?**
*   **Stateless Scalability:** The Spring Boot backend doesn't need to store session IDs in memory, making it easier to scale across multiple instances.
*   **Decoupled Frontend:** React (Vite) can seamlessly store the token and attach it as a `Bearer` token in the `Authorization` header on every request to `/api/analyze`.

**Authentication Flow (JWT implementation):**
1.  **Login:** Recruiter logs in via the React frontend.
2.  **Verification:** Spring Boot validates credentials against a `users` table in Supabase.
3.  **Token Issuance:** Spring Boot generates a signed JWT containing the user's ID and role, returning it to the frontend.
4.  **Storage:** React stores the JWT in `sessionStorage` (or an `HttpOnly` secure cookie for higher security against XSS attacks).
5.  **API Requests:** When uploading a resume, React attaches `Authorization: Bearer <token>`. Spring Boot's Security Filter chain validates the signature before allowing the Tika extraction to proceed. 

**Database Level (Supabase RLS):**
Supabase supports Row Level Security (RLS) natively. If integrating Supabase Auth directly on the frontend, Supabase issues the JWT, and the backend validates it using the Supabase JWT secret. This allows restricting rows in the `resumes` table so a recruiter can only see reports they generated.
