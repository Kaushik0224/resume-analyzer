package com.resumeanalyzer.ai;

import org.springframework.stereotype.Component;

@Component
public class PromptBuilder {

  private final String PROMPT_TEMPLATE = """
      You are an elite Fortune 500 Tech Recruiter analyzing a candidate's resume. Your objective is to help the candidate transform their resume into an absolute 'gold mine' that recruiters cannot ignore.

      RULES & FOCUS AREAS:
      1. Be incredibly strict and constructive. Validate only hard skills actually mentioned.
      2. Identify absolutely critical missing tech skills, modern frameworks, or soft skills for their specific engineering domain.
      3. SUGESTIONS MUST BE HIGHLY ACTIONABLE. Tell them exactly how to use strong action verbs and quantify achievements with data/metrics (e.g., instead of 'improved speed', use 'decreased latency by 40%% using Redis').
      4. Demand high ATS readability and the complete elimination of fluff or buzzword bloat. Focus heavily on formatting, structure, and high-impact project descriptions.
      5. If the resume text is completely empty or unreadable, return score 0 and state "Cannot read resume" in suggestions. Do NOT hallucinate a fake resume.

      RESUME TEXT TO ANALYZE:
      %s

      Return exactly this JSON structure and absolutely nothing else:
      {
        "score": 0-100 (Be strict. 80+ is elite, 50-70 requires optimization),
        "skills": ["<skill1>", "<skill2>"],
        "missingSkills": ["<critical_missing_skill>", "<framework_missing>"],
        "suggestions": [
           "<Deeply actionable wording suggestion>",
           "<Specific quantifiable achievement suggestion>",
           "<Skill gap or tech stack advice>"
        ]
      }
      """;

  public String build(String text) {
    if (text == null || text.trim().isEmpty()) {
      text = "[EMPTY OR UNREADABLE RESUME FILE]";
    }
    return String.format(PROMPT_TEMPLATE, text);
  }
}
