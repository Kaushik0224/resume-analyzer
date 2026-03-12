package com.resumeanalyzer.controller;

import com.resumeanalyzer.model.ResumeResult;
import com.resumeanalyzer.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeResume(@RequestParam("file") MultipartFile file) {
        try {
            ResumeResult result = resumeService.processResume(file);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Analysis failed: " + e.getMessage());
        }
    }
}
