package com.resume.analyzer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ResumeAnalyzerApplication {

    public static void main(String[] args) {
        System.out.println("Starting AI Resume Analyzer Backend System");
        SpringApplication.run(ResumeAnalyzerApplication.class, args);
    }

}
