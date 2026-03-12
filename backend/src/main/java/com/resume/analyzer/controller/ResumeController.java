package com.resume.analyzer.controller;

import com.resume.analyzer.model.ResumeResult;
import com.resume.analyzer.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "*") // Typically handled by CorsConfig
public class ResumeController {

    private final ResumeService resumeService;

    @Autowired
    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<ResumeResult> analyzeResume(@RequestParam("resume") MultipartFile file) {
        try {
            ResumeResult result = resumeService.processResume(file);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
