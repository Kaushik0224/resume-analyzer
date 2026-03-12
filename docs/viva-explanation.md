# Final Year Project Viva - Expected Questions & Answers

If you follow this project structure, your external examiner will be highly impressed. Here is how to defend it:

### Q1: Why did you separate the AI Engine from the backend?
**Answer:** "In most student projects, the AI prompt and parsing logic are hardcoded directly into the API controller. This is an anti-pattern. I created a separate `ai-engine` folder and isolated modular classes (`AIClient`, `PromptBuilder`, `ResponseParser`) in the backend so that if we want to switch from OpenAI to Groq or to a local HuggingFace model, we only touch one file. It makes the system scalable and testable."

### Q2: How does your Scoring System work?
**Answer:** "It's a hybrid approach. The AI provides an initial score based on the `master_prompt`, but I also have a `ScoringService` in Spring Boot that applies local rule-based heuristics defined in `ats-rules.json`. This ensures that candidates aren't just rated on AI hallucination, but strict HR rules (e.g., deducting points for missing contact info)."

### Q3: Why Spring Boot and not Node.js?
**Answer:** "Spring Boot is an industry-standard for enterprise backends. I used it primarily because the Java ecosystem has powerful, robust libraries like Apache Tika for extracting text from messy PDFs and DOCX files. Handling complex multipart file parsing is much more stable in Java."

### Q4: How is the Database structured?
**Answer:** "I am using Supabase, which provides a hosted PostgreSQL database. The backend uses Spring Data JPA to map the `ResumeResult` entity directly to a UUID-indexed `resumes` table. The parsed skills and JSON responses are stored effectively so a recruiter can search them later."

### Q5: How did you ensure the AI returns usable data, not just chat text?
**Answer:** "I strictly enforced JSON mode in the API call payload and structured my master prompt to demand a deterministic JSON output. My `ResponseParser` class uses Jackson ObjectMapper to safely map that JSON into a Java DTO, handling edge cases like markdown fences that AI sometimes sneaks in."
