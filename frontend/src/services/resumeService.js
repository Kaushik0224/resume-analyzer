import api from './api';

export const analyzeResume = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        // Call the real Spring Boot backend
        const response = await api.post('/analyze', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        return response.data;
    } catch (error) {
        console.error("Error analyzing resume", error);
        throw error;
    }
};
