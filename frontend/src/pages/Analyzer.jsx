import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadBox from '../components/UploadBox';
import Loader from '../components/Loader';
import { analyzeResume } from '../services/resumeService';

const Analyzer = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUpload = async (file) => {
        setLoading(true);
        try {
            // Typically you'd pass the file to your backend
            const result = await analyzeResume(file);
            // Pass the result via router state to the Results page
            navigate('/results', { state: { result } });
        } catch (error) {
            console.error("Analysis Failed", error);
            alert("Failed to analyze resume. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="analyzer-page">
            <div className="analyzer-header">
                <h2>Resume Analyzer</h2>
                <p>Drop your resume below to get instant AI feedback. (PDF or DOCX)</p>
            </div>

            {loading ? (
                <Loader message="AI is analyzing your resume..." />
            ) : (
                <UploadBox onUpload={handleUpload} />
            )}
        </div>
    );
};

export default Analyzer;
