package com.resume.analyzer.service;

import com.resume.analyzer.model.ResumeResult;
import com.resume.analyzer.model.Suggestion;
import org.springframework.stereotype.Service;

@Service
public class ScoringService {

    public int calculateScore(ResumeResult result, String rawText) {
        int score = 60; // Slightly lower base score to accommodate section bonuses
        String lowerText = rawText.toLowerCase();

        // 1. Section Detection (Heuristics from user suggestion)
        if (lowerText.contains("experience"))
            score += 10;
        if (lowerText.contains("projects"))
            score += 10;
        if (lowerText.contains("education"))
            score += 5;

        // 2. Skill Match Logic
        if (result.getExtractedSkills() != null && !result.getExtractedSkills().isEmpty()) {
            score += Math.min(result.getExtractedSkills().size() * 2, 20);
        }

        // 3. Penalty for missing critical skills
        if (result.getMissingSkills() != null && !result.getMissingSkills().isEmpty()) {
            score -= Math.min(result.getMissingSkills().size() * 5, 15);
        }

        // 4. Suggestions Impact
        if (result.getSuggestions() != null) {
            long criticalCount = result.getSuggestions().stream().filter(Suggestion::isCritical).count();
            score -= (int) (criticalCount * 10);
        }

        // Ensure score stays within 0-100
        return Math.max(0, Math.min(score, 100));
    }
}
