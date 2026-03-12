package com.resumeanalyzer.service;

import org.apache.tika.Tika;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStream;

@Service
public class ParsingService {

    private final Tika tika = new Tika();

    public String extractText(MultipartFile file) {
        try (InputStream stream = file.getInputStream()) {
            return tika.parseToString(stream).trim();
        } catch (Exception e) {
            throw new RuntimeException("Failed to read file: " + e.getMessage(), e);
        }
    }
}
