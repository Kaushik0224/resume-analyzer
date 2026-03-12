package com.resume.analyzer.model;

import java.util.List;

public class ResumeResult {
    private int overallScore;
    private int atsMatch;
    private String assumedRole;
    private List<String> extractedSkills;
    private List<String> missingSkills;
    private List<Suggestion> suggestions;

    // Getters and Setters
    public int getOverallScore() {
        return overallScore;
    }

    public void setOverallScore(int overallScore) {
        this.overallScore = overallScore;
    }

    public int getAtsMatch() {
        return atsMatch;
    }

    public void setAtsMatch(int atsMatch) {
        this.atsMatch = atsMatch;
    }

    public String getAssumedRole() {
        return assumedRole;
    }

    public void setAssumedRole(String assumedRole) {
        this.assumedRole = assumedRole;
    }

    public List<String> getExtractedSkills() {
        return extractedSkills;
    }

    public void setExtractedSkills(List<String> extractedSkills) {
        this.extractedSkills = extractedSkills;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }

    public List<Suggestion> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<Suggestion> suggestions) {
        this.suggestions = suggestions;
    }
}
