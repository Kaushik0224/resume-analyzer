package com.resumeanalyzer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Skill {
    private String name;
    private String category; // e.g., "Technical", "Soft"
}
