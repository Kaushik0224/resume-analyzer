package com.resume.analyzer.service;

import com.resume.analyzer.model.ResumeResult;
import com.resume.analyzer.model.Suggestion;
import org.junit.jupiter.api.Test;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ScoringServiceTest {

    private final ScoringService scoringService = new ScoringService();

    @Test
    public void testBaseScore() {
        ResumeResult result = new ResumeResult();
        int score = scoringService.calculateScore(result, "");
        assertEquals(60, score);
    }

    @Test
    public void testSkillsBonus() {
        ResumeResult result = new ResumeResult();
        result.setExtractedSkills(List.of("Java", "Spring Boot", "AWS", "SQL", "React"));
        int score = scoringService.calculateScore(result, "");
        // 60 + (5 * 2) = 70
        assertEquals(70, score);
    }

    @Test
    public void testMaxSkillsBonus() {
        ResumeResult result = new ResumeResult();
        result.setExtractedSkills(Collections.nCopies(15, "Skill"));
        int score = scoringService.calculateScore(result, "");
        // 60 + 20 (max) = 80
        assertEquals(80, score);
    }

    @Test
    public void testMissingSkillsPenalty() {
        ResumeResult result = new ResumeResult();
        result.setMissingSkills(List.of("Docker", "Kubernetes"));
        int score = scoringService.calculateScore(result, "");
        // 60 - (2 * 5) = 50
        assertEquals(50, score);
    }

    @Test
    public void testCriticalSuggestionPenalty() {
        ResumeResult result = new ResumeResult();
        Suggestion s = new Suggestion();
        s.setCritical(true);
        result.setSuggestions(List.of(s));
        int score = scoringService.calculateScore(result, "");
        // 60 - 10 = 50
        assertEquals(50, score);
    }

    @Test
    public void testScoreBoundaries() {
        ResumeResult result = new ResumeResult();
        // Negative scenario
        Suggestion s = new Suggestion();
        s.setCritical(true);
        result.setSuggestions(Collections.nCopies(10, s));
        result.setMissingSkills(Collections.nCopies(10, "Skill"));
        int score = scoringService.calculateScore(result, "");
        assertTrue(score >= 0);

        // Max scenario
        result = new ResumeResult();
        result.setExtractedSkills(Collections.nCopies(20, "Skill"));
        score = scoringService.calculateScore(result, "");
        assertTrue(score <= 100);
    }

    @Test
    public void testSectionDetectionBonus() {
        ResumeResult result = new ResumeResult();
        String text = "Work EXPERIENCE with some PROJECTS and EDUCATION";
        int score = scoringService.calculateScore(result, text);
        // 60 + 10 (exp) + 10 (proj) + 5 (edu) = 85
        assertEquals(85, score);
    }
}
