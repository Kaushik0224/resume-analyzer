import api from './api';

export const analyzeResume = async (file) => {
    try {
        const formData = new FormData();
        formData.append('resume', file);

        // Call the real Spring Boot backend
        const response = await api.post('/resume/analyze', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        return response.data;
    } catch (error) {
        console.error("Error analyzing resume", error);
        throw error;
    }
};
