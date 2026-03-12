package com.resumeanalyzer.service;

import com.resumeanalyzer.ai.AIClient;
import com.resumeanalyzer.ai.PromptBuilder;
import com.resumeanalyzer.ai.ResponseParser;
import com.resumeanalyzer.model.ResumeResult;
import com.resumeanalyzer.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ParsingService parsingService;
    private final PromptBuilder promptBuilder;
    private final AIClient aiClient;
    private final ResponseParser responseParser;
    private final ScoringService scoringService;
    private final ResumeRepository repository;

    /**
     * Orchestrates the entire flow of resume analysis.
     */
    public ResumeResult processResume(MultipartFile file) {

        // 1. Extract text from PDF/DOCX
        String parsedText = parsingService.extractText(file);

        // 2. Build the AI prompt
        String prompt = promptBuilder.build(parsedText);

        // 3. Send to AI
        String rawJson = aiClient.sendRequest(prompt);

        // 4. Parse AI response
        ResumeResult result = responseParser.parse(rawJson);

        // 5. Apply local ATS logic if needed
        result = scoringService.applyLocalScoring(result);

        // 6. Set additional metadata and save to DB
        result.setFilename(file.getOriginalFilename());

        return repository.save(result);
    }
}
