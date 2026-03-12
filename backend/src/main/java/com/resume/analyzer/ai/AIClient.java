package com.resume.analyzer.ai;

import com.resume.analyzer.model.ResumeResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.List;

@Component
public class AIClient {

    private final PromptBuilder promptBuilder;
    private final ResponseParser responseParser;
    private final RestTemplate restTemplate;

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    @Value("${groq.api.model}")
    private String model;

    public AIClient(PromptBuilder promptBuilder, ResponseParser responseParser) {
        this.promptBuilder = promptBuilder;
        this.responseParser = responseParser;
        this.restTemplate = new RestTemplate();
    }

    public ResumeResult analyze(String text) {
        String prompt = promptBuilder.buildPrompt(text);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> requestBody = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "system", "content", "You are an expert ATS system. Return ONLY valid JSON."),
                        Map.of("role", "user", "content", prompt)),
                "response_format", Map.of("type", "json_object"),
                "temperature", 0.5);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            System.out.println("Calling Groq API with model: " + model);
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, entity, Map.class);
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null && responseBody.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
                Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                String rawJsonOutput = (String) message.get("content");
                System.out.println("Received raw response: " + rawJsonOutput);
                return responseParser.parse(rawJsonOutput);
            } else {
                System.err.println("Groq API response body: " + responseBody);
                throw new RuntimeException("Invalid response from Groq API");
            }
        } catch (Exception e) {
            System.err.println("Groq API error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to call Groq API: " + e.getMessage(), e);
        }
    }
}
