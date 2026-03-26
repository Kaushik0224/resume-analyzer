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

    @GetMapping("/")
    public ResponseEntity<String> root() {
        return ResponseEntity.ok("Resume Analyzer API is up");
    }

    @PostMapping({"/analyze", "/resume/analyze"})
    public ResponseEntity<?> analyzeResume(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "resume", required = false) MultipartFile resumeFile) {
        try {
            MultipartFile upload = (file != null) ? file : resumeFile;
            if (upload == null || upload.isEmpty()) {
                return ResponseEntity.badRequest().body("No file uploaded");
            }
            ResumeResult result = resumeService.processResume(upload);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Analysis failed: " + e.getMessage());
        }
    }
}
