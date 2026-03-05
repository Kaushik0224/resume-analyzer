package com.resume.analyzer.ai;

import org.springframework.stereotype.Component;

@Component
public class PromptBuilder {

    public String buildPrompt(String resumeText) {
        return "You are an expert ATS (Applicant Tracking System) software and Technical Recruiter.\n" +
                "Your job is to analyze the provided resume text and generate a structured JSON response evaluating its quality, skills, and ATS compliance.\n\n"
                +
                "Input Resume Text:\n" +
                resumeText + "\n\n" +
                "Instructions:\n" +
                "1. Extract the assumed primary role of the candidate.\n" +
                "2. Extract all technical and soft skills.\n" +
                "3. Compare extracted skills against typical requirements for the assumed role, and list missing critical skills.\n"
                +
                "4. Calculate an ATS match score (0-100) based on formatting, keyword density, and clarity.\n" +
                "5. Provide exactly 3 actionable suggestions to improve the resume. If any formatting issue might break an ATS parser, mark it as 'critical' = true.\n\n"
                +
                "Output Format (Strict JSON ONLY):\n" +
                "{\n" +
                "  \"overallScore\": <number>,\n" +
                "  \"atsMatch\": <number>,\n" +
                "  \"assumedRole\": \"<string>\",\n" +
                "  \"extractedSkills\": [\"<string>\"],\n" +
                "  \"missingSkills\": [\"<string>\"],\n" +
                "  \"suggestions\": [\n" +
                "    {\n" +
                "      \"title\": \"<string>\",\n" +
                "      \"detail\": \"<string>\",\n" +
                "      \"critical\": <boolean>\n" +
                "    }\n" +
                "  ]\n" +
                "}";
    }
}
