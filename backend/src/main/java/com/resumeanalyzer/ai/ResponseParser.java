package com.resumeanalyzer.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumeanalyzer.model.ResumeResult;
import org.springframework.stereotype.Component;

@Component
public class ResponseParser {

    private final ObjectMapper mapper = new ObjectMapper();

    public ResumeResult parse(String jsonString) {
        ResumeResult result = new ResumeResult();
        try {
            // Clean markdown fences if any
            String cleanJson = jsonString.trim();
            if (cleanJson.startsWith("```json")) {
                cleanJson = cleanJson.substring(7);
            }
            if (cleanJson.endsWith("```")) {
                cleanJson = cleanJson.substring(0, cleanJson.length() - 3);
            }

            JsonNode root = mapper.readTree(cleanJson.trim());

            result.setScore(root.path("score").asInt(0));
            result.setSkills(root.path("skills").toString());
            result.setMissingSkills(root.path("missingSkills").toString());
            result.setSuggestions(root.path("suggestions").toString());

            return result;
        } catch (Exception e) {
            System.err.println("JSON Parse Error: " + e.getMessage());
            result.setScore(0);
            result.setSkills("[]");
            result.setMissingSkills("[]");
            result.setSuggestions("[\"Failed to parse AI response\"]");
            return result;
        }
    }
}
