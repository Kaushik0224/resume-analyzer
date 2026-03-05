package com.resume.analyzer.controller;

import com.resume.analyzer.model.ResumeResult;
import com.resume.analyzer.service.ResumeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ResumeControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ResumeService resumeService;

    @Test
    public void testAnalyzeResumeSuccess() throws Exception {
        ResumeResult mockResult = new ResumeResult();
        mockResult.setOverallScore(85);
        mockResult.setAssumedRole("Software Engineer");

        when(resumeService.processResume(any())).thenReturn(mockResult);

        MockMultipartFile file = new MockMultipartFile(
                "resume",
                "test-resume.pdf",
                MediaType.APPLICATION_PDF_VALUE,
                "Hello World".getBytes());

        mockMvc.perform(multipart("/api/resume/analyze").file(file))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.overallScore").value(85))
                .andExpect(jsonPath("$.assumedRole").value("Software Engineer"));
    }

    @Test
    public void testAnalyzeResumeFailure() throws Exception {
        when(resumeService.processResume(any())).thenThrow(new RuntimeException("Parsing failed"));

        MockMultipartFile file = new MockMultipartFile(
                "resume",
                "test-resume.pdf",
                MediaType.APPLICATION_PDF_VALUE,
                "Hello World".getBytes()
        );

        mockMvc.perform(multipart("/api/resume/analyze").file(file))
                .andExpect(status().isInternalServerError());
    }
}
