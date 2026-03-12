package com.resumeanalyzer.service;

import com.resumeanalyzer.model.ResumeResult;
import org.springframework.stereotype.Service;

@Service
public class ScoringService {

    /**
     * Optional local ATS Scoring logic before/after AI.
     * Often used to combine rule-based heuristics with AI generated values.
     */
    public ResumeResult applyLocalScoring(ResumeResult result) {
        // e.g. cap scores, apply rules based on DB config
        if (result.getScore() == null) {
            result.setScore(0);
        }
        return result;
    }
}
