package com.resume.analyzer.service;

import org.apache.tika.Tika;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ParsingService {

    private final Tika tika = new Tika();

    public String extractText(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is empty or null");
        }

        try {
            return tika.parseToString(file.getInputStream());
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract text from file: " + file.getOriginalFilename(), e);
        }
    }
}
