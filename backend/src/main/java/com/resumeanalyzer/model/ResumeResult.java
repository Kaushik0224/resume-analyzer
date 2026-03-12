package com.resumeanalyzer.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "resumes")
public class ResumeResult {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Postgres UUID usually mapped this way or UUID type
    private java.util.UUID id;

    private String filename;

    private Integer score;

    @Column(columnDefinition = "TEXT")
    private String skills; // Stored as comma-separated or JSON

    @Column(columnDefinition = "TEXT")
    private String suggestions; // Stored as JSON or text

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
