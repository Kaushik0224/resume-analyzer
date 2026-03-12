# AI Resume Analyzer

A production-grade, industry-style Resume Analyzer built for precision and scalability.

## Architecture

![Architecture](docs/architecture.png)

This project is separated into clean modules to avoid spaghetti code and mixing of responsibilities:
- **Frontend**: Vite + React for lightning-fast UI.
- **Backend**: Spring Boot for robust API handling, orchestration, and text parsing.
- **AI Engine**: Completely decoupled AI prompts, scoring rules, and response parsing logic.
- **Database**: Supabase (PostgreSQL) for storing resumes, scores, and history.

## Tech Stack
- **Frontend**: React, Vite, CSS Modules / Tailwind
- **Backend**: Java 17, Spring Boot, Apache Tika
- **AI**: Groq API (LLaMA 3) / OpenAI
- **Database**: Supabase PostgreSQL

## Getting Started

### 1. Database Setup (Supabase)
1. Create a project on [Supabase.com](https://supabase.com/).
2. Run the SQL script located in `docs/system-design.md` to create the `resumes` table.
3. Update `application.properties` with your Supabase JDBC URL, username, and password.

### 2. AI Setup
1. Get a free API key from [Groq](https://console.groq.com).
2. Add `groq.api.key=YOUR_KEY` to `application.properties`.

### 3. Running Backend
```bash
cd backend
mvn spring-boot:run
```

### 4. Running Frontend
```bash
cd frontend
npm install
npm run dev
```

## AI Engine Design
Unlike basic projects, the AI logic is entirely separate from the controllers. 
The backend simply calls `AIClient.java` which injects `ai-engine/prompts/resume-analysis-prompt.txt`. 
Scoring rules are maintained transparently in `ai-engine/scoring-rules/ats-rules.json`.
