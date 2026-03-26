package com.resumeanalyzer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public ResponseEntity<String> root() {
        return ResponseEntity.ok("Resume Analyzer API is up");
    }

    @GetMapping("/api")
    public ResponseEntity<String> apiRoot() {
        return ResponseEntity.ok("Resume Analyzer API endpoint is up");
    }
}
