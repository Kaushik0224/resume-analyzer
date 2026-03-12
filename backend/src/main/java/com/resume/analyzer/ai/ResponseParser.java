package com.resume.analyzer.ai;

import org.springframework.stereotype.Component;
import com.resume.analyzer.model.ResumeResult;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class ResponseParser {

    private final ObjectMapper objectMapper = new ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    public ResumeResult parse(String rawJsonOutput) {
        try {
            // Remove markdown code block if LLM included it despite instructions
            String cleanJson = rawJsonOutput.trim();
            if (cleanJson.startsWith("```json")) {
                cleanJson = cleanJson.substring(7);
                if (cleanJson.endsWith("```")) {
                    cleanJson = cleanJson.substring(0, cleanJson.length() - 3);
                }
            } else if (cleanJson.startsWith("```")) {
                cleanJson = cleanJson.substring(3);
                if (cleanJson.endsWith("```")) {
                    cleanJson = cleanJson.substring(0, cleanJson.length() - 3);
                }
            }

            return objectMapper.readValue(cleanJson.trim(), ResumeResult.class);
        } catch (Exception e) {
            System.err.println("Failed to parse JSON: " + rawJsonOutput);
            throw new RuntimeException("Content Parsing Error: " + e.getMessage(), e);
        }
    }
}
