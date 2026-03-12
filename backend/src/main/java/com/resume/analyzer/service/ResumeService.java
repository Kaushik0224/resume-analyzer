package com.resume.analyzer.service;

import com.resume.analyzer.model.ResumeResult;
import com.resume.analyzer.ai.AIClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ResumeService {

    private final ParsingService parsingService;
    private final ScoringService scoringService;
    private final AIClient aiClient;

    @Autowired
    public ResumeService(ParsingService parsingService, ScoringService scoringService, AIClient aiClient) {
        this.parsingService = parsingService;
        this.scoringService = scoringService;
        this.aiClient = aiClient;
    }

    public ResumeResult processResume(MultipartFile file) {
        // 1. Parse formatting and extract raw text
        String extractedText = parsingService.extractText(file);

        // 2. Pass text to AI Engine
        ResumeResult aiAnalysis = aiClient.analyze(extractedText);

        // 3. Apply deterministic scoring rules
        int finalScore = scoringService.calculateScore(aiAnalysis, extractedText);
        aiAnalysis.setOverallScore(finalScore);

        return aiAnalysis;
    }
}
