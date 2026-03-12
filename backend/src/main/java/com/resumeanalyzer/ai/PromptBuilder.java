package com.resumeanalyzer.ai;

import org.springframework.stereotype.Component;

@Component
public class PromptBuilder {

    private final String PROMPT_TEMPLATE = """
            You are an expert AI Recruiter. Analyze this resume:

            RESUME TEXT:
            %s

            Return exactly this JSON structure:
            {
              "score": 0-100,
              "skills": ["skill1", "skill2"],
              "missingSkills": ["missing1"],
              "suggestions": ["suggestion1"]
            }
            """;

    public String build(String text) {
        return String.format(PROMPT_TEMPLATE, text);
    }
}
